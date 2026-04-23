import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import type { Recipe } from '@/data/recipes';

const MEAL_PLAN_CACHE_PREFIX = 'kitchen.mealPlanCache.';

/** Build the localStorage key for a given user's meal plan cache. */
function mealPlanCacheKey(userId: string) {
  return `${MEAL_PLAN_CACHE_PREFIX}${userId}`;
}

/** Read cached meal plan entries (returns [] when missing/corrupt). */
function readMealPlanCache(userId: string): MealPlanEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(mealPlanCacheKey(userId));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (e): e is MealPlanEntry =>
        e && typeof e === 'object' && typeof e.date === 'string' && e.recipe && typeof e.recipe.id === 'string',
    );
  } catch {
    return [];
  }
}

/** Persist meal plan entries for the given user to localStorage. */
function writeMealPlanCache(userId: string, entries: MealPlanEntry[]) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(mealPlanCacheKey(userId), JSON.stringify(entries));
  } catch {
    // ignore quota / privacy-mode errors
  }
}

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

export interface ItemRating {
  itemId: string;
  itemType: 'recipe' | 'drink';
  rating: number;
}

export interface Ratings {
  [key: string]: number; // key format: `${itemType}-${itemId}`
}

export interface RecipeOverride {
  servings?: number | null;
}

export interface RecipeOverrides {
  [recipeId: string]: RecipeOverride;
}

export function useUserData() {
  const { user } = useAuth();
  const [savedRecipes, setSavedRecipes] = useState<string[]>([]);
  const [savedDrinks, setSavedDrinks] = useState<string[]>([]);
  const [mealPlan, setMealPlan] = useState<MealPlanEntry[]>([]);
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([]);
  const [recipeNotes, setRecipeNotes] = useState<RecipeNotes>({});
  const [ratings, setRatings] = useState<Ratings>({});
  const [recipeOverrides, setRecipeOverrides] = useState<RecipeOverrides>({});
  const [loading, setLoading] = useState(true);

  // Load user data from database
  const loadUserData = useCallback(async () => {
    if (!user) {
      setSavedRecipes([]);
      setSavedDrinks([]);
      setMealPlan([]);
      setShoppingList([]);
      setRecipeNotes({});
      setRatings({});
      setRecipeOverrides({});
      setLoading(false);
      return;
    }

    setLoading(true);

    // Hydrate meal plan immediately from local cache so it's visible offline.
    const cachedMealPlan = readMealPlanCache(user.id);
    if (cachedMealPlan.length > 0) {
      setMealPlan(cachedMealPlan);
    }

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
      if (mealData) {
        const fresh: MealPlanEntry[] = mealData.map(m => ({
          date: m.date,
          recipe: m.recipe_data as unknown as Recipe,
        }));
        setMealPlan(fresh);
        writeMealPlanCache(user.id, fresh);
      }

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

      // Load ratings
      const { data: ratingsData } = await supabase
        .from('ratings')
        .select('item_id, item_type, rating')
        .eq('user_id', user.id);
      const ratingsMap: Ratings = {};
      ratingsData?.forEach(r => {
        ratingsMap[`${r.item_type}-${r.item_id}`] = r.rating;
      });
      setRatings(ratingsMap);

      // Load per-recipe overrides (custom servings, etc.)
      const { data: overridesData } = await supabase
        .from('recipe_overrides')
        .select('recipe_id, servings')
        .eq('user_id', user.id);
      const overridesMap: RecipeOverrides = {};
      overridesData?.forEach(o => {
        overridesMap[o.recipe_id] = { servings: o.servings };
      });
      setRecipeOverrides(overridesMap);
    } catch (error) {
      console.error('Error loading user data:', error);
      // Meal plan already hydrated from cache above; leave UI on cached copy.
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

  // Set rating for recipe or drink
  const setItemRating = async (itemId: string, itemType: 'recipe' | 'drink', rating: number) => {
    if (!user) return;

    const key = `${itemType}-${itemId}`;
    const existing = ratings[key];

    if (existing !== undefined) {
      // Update existing rating
      await supabase
        .from('ratings')
        .update({ rating, updated_at: new Date().toISOString() })
        .eq('user_id', user.id)
        .eq('item_id', itemId)
        .eq('item_type', itemType);
    } else {
      // Insert new rating
      await supabase
        .from('ratings')
        .insert({
          user_id: user.id,
          item_id: itemId,
          item_type: itemType,
          rating
        });
    }

    setRatings(prev => ({ ...prev, [key]: rating }));
  };

  // Get rating for an item
  const getItemRating = (itemId: string, itemType: 'recipe' | 'drink'): number | undefined => {
    return ratings[`${itemType}-${itemId}`];
  };

  // Remove rating
  const removeItemRating = async (itemId: string, itemType: 'recipe' | 'drink') => {
    if (!user) return;

    await supabase
      .from('ratings')
      .delete()
      .eq('user_id', user.id)
      .eq('item_id', itemId)
      .eq('item_type', itemType);

    const key = `${itemType}-${itemId}`;
    setRatings(prev => {
      const newRatings = { ...prev };
      delete newRatings[key];
      return newRatings;
    });
  };

  // Upsert a per-user recipe override (e.g. custom servings).
  // The (user_id, recipe_id) unique constraint guarantees a single row,
  // so editing always updates the existing override instead of duplicating it.
  const updateRecipeOverride = async (
    recipeId: string,
    override: RecipeOverride,
  ) => {
    if (!user) return;

    const { error } = await supabase
      .from('recipe_overrides')
      .upsert(
        {
          user_id: user.id,
          recipe_id: recipeId,
          servings: override.servings ?? null,
        },
        { onConflict: 'user_id,recipe_id' },
      );

    if (error) {
      console.error('Error saving recipe override:', error);
      throw error;
    }

    setRecipeOverrides(prev => ({ ...prev, [recipeId]: override }));
  };

  // Remove a per-user override (revert to the recipe's defaults).
  const clearRecipeOverride = async (recipeId: string) => {
    if (!user) return;

    await supabase
      .from('recipe_overrides')
      .delete()
      .eq('user_id', user.id)
      .eq('recipe_id', recipeId);

    setRecipeOverrides(prev => {
      const next = { ...prev };
      delete next[recipeId];
      return next;
    });
  };

  return {
    savedRecipes,
    savedDrinks,
    mealPlan,
    shoppingList,
    recipeNotes,
    ratings,
    recipeOverrides,
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
    updateRecipeNotes,
    setItemRating,
    getItemRating,
    removeItemRating,
    updateRecipeOverride,
    clearRecipeOverride,
  };
}
