import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import type { Recipe, DietaryTag, DifficultyLevel, MealType } from "@/data/recipes";

export interface CustomRecipe {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  meal_type: string;
  cook_time: string;
  servings: number;
  difficulty: string | null;
  ingredients: string[];
  ingredient_amounts: { id: string; amount: string; unit: string }[];
  instructions: string[];
  dietary_tags: string[];
  nutrition: { calories?: number; protein?: number; carbs?: number; fat?: number } | null;
  source_url: string | null;
  created_at: string;
  updated_at: string;
}

export function useCustomRecipes() {
  const { user } = useAuth();
  const [customRecipes, setCustomRecipes] = useState<CustomRecipe[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCustomRecipes = useCallback(async () => {
    if (!user) {
      setCustomRecipes([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('custom_recipes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Parse JSON fields from the database
      const parsedRecipes = (data || []).map(recipe => ({
        ...recipe,
        ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients : [],
        ingredient_amounts: Array.isArray(recipe.ingredient_amounts) ? recipe.ingredient_amounts : [],
        instructions: Array.isArray(recipe.instructions) ? recipe.instructions : [],
        dietary_tags: Array.isArray(recipe.dietary_tags) ? recipe.dietary_tags : [],
        nutrition: recipe.nutrition && typeof recipe.nutrition === 'object' ? recipe.nutrition : null,
      })) as CustomRecipe[];

      setCustomRecipes(parsedRecipes);
    } catch (error) {
      console.error('Error loading custom recipes:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadCustomRecipes();
  }, [loadCustomRecipes]);

  const deleteCustomRecipe = async (recipeId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('custom_recipes')
        .delete()
        .eq('id', recipeId)
        .eq('user_id', user.id);

      if (error) throw error;

      setCustomRecipes(prev => prev.filter(r => r.id !== recipeId));
    } catch (error) {
      console.error('Error deleting custom recipe:', error);
      throw error;
    }
  };

  // Convert custom recipe to the Recipe format used by the app
  const toRecipeFormat = (custom: CustomRecipe): Recipe => ({
    id: `custom-${custom.id}`,
    title: custom.title,
    description: custom.description || '',
    mealType: custom.meal_type as MealType,
    cookTime: custom.cook_time,
    servings: custom.servings,
    difficulty: (custom.difficulty || 'medium') as DifficultyLevel,
    ingredients: custom.ingredients,
    ingredientAmounts: custom.ingredient_amounts,
    instructions: custom.instructions,
    dietaryTags: custom.dietary_tags as DietaryTag[],
    nutrition: custom.nutrition as Recipe['nutrition'],
    matchedIngredients: [],
    matchedKeyIngredients: [],
  });

  const getRecipesAsAppFormat = (): Recipe[] => {
    return customRecipes.map(toRecipeFormat);
  };

  return {
    customRecipes,
    loading,
    refresh: loadCustomRecipes,
    deleteCustomRecipe,
    getRecipesAsAppFormat,
    toRecipeFormat,
  };
}
