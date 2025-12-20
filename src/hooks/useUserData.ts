import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import type { Recipe } from '@/data/recipes';

export interface ShoppingItem {
  id: string;
  ingredientId: string;
  variant: string;
  checked: boolean;
}

export interface MealPlanEntry {
  date: string;
  recipe: Recipe;
}

export interface RecipeNotes {
  [recipeId: string]: string;
}

export function useUserData() {
  const { user } = useAuth();
  const [savedRecipes, setSavedRecipes] = useState<string[]>([]);
  const [savedDrinks, setSavedDrinks] = useState<string[]>([]);
  const [mealPlan, setMealPlan] = useState<MealPlanEntry[]>([]);
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([]);
  const [recipeNotes, setRecipeNotes] = useState<RecipeNotes>({});
  const [loading, setLoading] = useState(true);

  // Load user data from database
  const loadUserData = useCallback(async () => {
    if (!user) {
      setSavedRecipes([]);
      setSavedDrinks([]);
      setMealPlan([]);
      setShoppingList([]);
      setRecipeNotes({});
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      // Load saved recipes
      const { data: recipesData } = await supabase
        .from('saved_recipes')
        .select('recipe_id')
        .eq('user_id', user.id);
      setSavedRecipes(recipesData?.map(r => r.recipe_id) || []);

      // Load saved drinks
      const { data: drinksData } = await supabase
        .from('saved_drinks')
        .select('drink_id')
        .eq('user_id', user.id);
      setSavedDrinks(drinksData?.map(d => d.drink_id) || []);

      // Load meal plans
      const { data: mealData } = await supabase
        .from('meal_plans')
        .select('date, recipe_id, recipe_data')
        .eq('user_id', user.id);
      setMealPlan(mealData?.map(m => ({
        date: m.date,
        recipe: m.recipe_data as unknown as Recipe
      })) || []);

      // Load shopping list
      const { data: shoppingData } = await supabase
        .from('shopping_list')
        .select('id, ingredient_id, variant, checked')
        .eq('user_id', user.id);
      setShoppingList(shoppingData?.map(s => ({
        id: s.id,
        ingredientId: s.ingredient_id,
        variant: s.variant,
        checked: s.checked
      })) || []);

      // Load recipe notes
      const { data: notesData } = await supabase
        .from('recipe_notes')
        .select('recipe_id, notes')
        .eq('user_id', user.id);
      const notes: RecipeNotes = {};
      notesData?.forEach(n => {
        notes[n.recipe_id] = n.notes;
      });
      setRecipeNotes(notes);
    } catch (error) {
      console.error('Error loading user data:', error);
    }

    setLoading(false);
  }, [user]);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  // Save recipe
  const saveRecipe = async (recipeId: string) => {
    if (!user) return;

    const isSaved = savedRecipes.includes(recipeId);

    if (isSaved) {
      await supabase
        .from('saved_recipes')
        .delete()
        .eq('user_id', user.id)
        .eq('recipe_id', recipeId);
      setSavedRecipes(prev => prev.filter(id => id !== recipeId));
    } else {
      await supabase
        .from('saved_recipes')
        .insert({ user_id: user.id, recipe_id: recipeId });
      setSavedRecipes(prev => [...prev, recipeId]);
    }
  };

  // Save drink
  const saveDrink = async (drinkId: string) => {
    if (!user) return;

    const isSaved = savedDrinks.includes(drinkId);

    if (isSaved) {
      await supabase
        .from('saved_drinks')
        .delete()
        .eq('user_id', user.id)
        .eq('drink_id', drinkId);
      setSavedDrinks(prev => prev.filter(id => id !== drinkId));
    } else {
      await supabase
        .from('saved_drinks')
        .insert({ user_id: user.id, drink_id: drinkId });
      setSavedDrinks(prev => [...prev, drinkId]);
    }
  };

  // Add to meal plan
  const addToMealPlan = async (date: string, recipe: Recipe) => {
    if (!user) return;

    const recipeData = JSON.parse(JSON.stringify(recipe));
    
    await supabase
      .from('meal_plans')
      .insert({
        user_id: user.id,
        date,
        recipe_id: recipe.id,
        recipe_data: recipeData
      });
    setMealPlan(prev => [...prev, { date, recipe }]);
  };

  // Remove from meal plan
  const removeFromMealPlan = async (date: string, recipeId: string) => {
    if (!user) return;

    await supabase
      .from('meal_plans')
      .delete()
      .eq('user_id', user.id)
      .eq('date', date)
      .eq('recipe_id', recipeId);
    setMealPlan(prev => prev.filter(entry => !(entry.date === date && entry.recipe.id === recipeId)));
  };

  // Move meal to a different date
  const moveMeal = async (fromDate: string, toDate: string, recipeId: string) => {
    if (!user) return;

    // Update the date in the database
    await supabase
      .from('meal_plans')
      .update({ date: toDate })
      .eq('user_id', user.id)
      .eq('date', fromDate)
      .eq('recipe_id', recipeId);
    
    // Update local state
    setMealPlan(prev => prev.map(entry => 
      entry.date === fromDate && entry.recipe.id === recipeId
        ? { ...entry, date: toDate }
        : entry
    ));
  };

  // Add to shopping list
  const addToShoppingList = async (ingredientId: string, variant: string) => {
    if (!user) return;

    const exists = shoppingList.some(item => item.variant === variant);
    if (exists) return;

    const { data } = await supabase
      .from('shopping_list')
      .insert({
        user_id: user.id,
        ingredient_id: ingredientId,
        variant,
        checked: false
      })
      .select('id')
      .single();

    if (data) {
      setShoppingList(prev => [...prev, {
        id: data.id,
        ingredientId,
        variant,
        checked: false
      }]);
    }
  };

  // Toggle shopping item
  const toggleShoppingItem = async (itemId: string) => {
    if (!user) return;

    const item = shoppingList.find(i => i.id === itemId);
    if (!item) return;

    await supabase
      .from('shopping_list')
      .update({ checked: !item.checked })
      .eq('id', itemId);

    setShoppingList(prev => prev.map(i =>
      i.id === itemId ? { ...i, checked: !i.checked } : i
    ));
  };

  // Remove from shopping list
  const removeFromShoppingList = async (itemId: string) => {
    if (!user) return;

    await supabase
      .from('shopping_list')
      .delete()
      .eq('id', itemId);

    setShoppingList(prev => prev.filter(i => i.id !== itemId));
  };

  // Clear shopping list
  const clearShoppingList = async () => {
    if (!user) return;

    await supabase
      .from('shopping_list')
      .delete()
      .eq('user_id', user.id);

    setShoppingList([]);
  };

  // Update recipe notes
  const updateRecipeNotes = async (recipeId: string, notes: string) => {
    if (!user) return;

    const existing = recipeNotes[recipeId];

    if (existing !== undefined) {
      await supabase
        .from('recipe_notes')
        .update({ notes, updated_at: new Date().toISOString() })
        .eq('user_id', user.id)
        .eq('recipe_id', recipeId);
    } else {
      await supabase
        .from('recipe_notes')
        .insert({
          user_id: user.id,
          recipe_id: recipeId,
          notes
        });
    }

    setRecipeNotes(prev => ({ ...prev, [recipeId]: notes }));
  };

  return {
    savedRecipes,
    savedDrinks,
    mealPlan,
    shoppingList,
    recipeNotes,
    loading,
    saveRecipe,
    saveDrink,
    addToMealPlan,
    removeFromMealPlan,
    moveMeal,
    addToShoppingList,
    toggleShoppingItem,
    removeFromShoppingList,
    clearShoppingList,
    updateRecipeNotes
  };
}
