import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import type { DietaryTag, DifficultyLevel } from '@/data/recipes';
import type { Json } from '@/integrations/supabase/types';

export interface MealTimes {
  breakfast: string;
  lunch: string;
  dinner: string;
  dessert: string;
  sides: string;
  snack: string;
  happyHour: string;
}

export interface UserPreferences {
  dietaryPreferences: DietaryTag[];
  defaultServings: number;
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  mealTimes: MealTimes;
}

const defaultMealTimes: MealTimes = {
  breakfast: '08:00',
  lunch: '12:00',
  dinner: '18:00',
  dessert: '19:00',
  sides: '18:00',
};

const defaultPreferences: UserPreferences = {
  dietaryPreferences: [],
  defaultServings: 4,
  skillLevel: 'beginner',
  mealTimes: defaultMealTimes,
};

export function useUserPreferences() {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);
  const [loading, setLoading] = useState(true);

  const loadPreferences = useCallback(async () => {
    if (!user) {
      setPreferences(defaultPreferences);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (data) {
        setPreferences({
          dietaryPreferences: (data.dietary_preferences as DietaryTag[]) || [],
          defaultServings: data.default_servings || 4,
          skillLevel: (data.skill_level as UserPreferences['skillLevel']) || 'beginner',
          mealTimes: (data.meal_times as unknown as MealTimes) || defaultMealTimes,
        });
      } else {
        // No preferences found, use defaults
        setPreferences(defaultPreferences);
      }
    } catch (error) {
      console.error('Error loading preferences:', error);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    loadPreferences();
  }, [loadPreferences]);

  const updatePreferences = async (updates: Partial<UserPreferences>) => {
    if (!user) return;

    const newPreferences = { ...preferences, ...updates };
    setPreferences(newPreferences);

    const dbData = {
      user_id: user.id,
      dietary_preferences: newPreferences.dietaryPreferences as Json,
      default_servings: newPreferences.defaultServings,
      skill_level: newPreferences.skillLevel,
      meal_times: newPreferences.mealTimes as unknown as Json,
    };

    // Try to update first, if no rows affected, insert
    const { error: updateError } = await supabase
      .from('user_preferences')
      .update(dbData)
      .eq('user_id', user.id);

    if (updateError) {
      // If update failed (no existing row), insert
      await supabase.from('user_preferences').insert([dbData]);
    }
  };

  const toggleDietaryPreference = async (tag: DietaryTag) => {
    const newPrefs = preferences.dietaryPreferences.includes(tag)
      ? preferences.dietaryPreferences.filter(t => t !== tag)
      : [...preferences.dietaryPreferences, tag];
    
    await updatePreferences({ dietaryPreferences: newPrefs });
  };

  const setSkillLevel = async (level: UserPreferences['skillLevel']) => {
    await updatePreferences({ skillLevel: level });
  };

  const setDefaultServings = async (servings: number) => {
    await updatePreferences({ defaultServings: servings });
  };

  const setMealTime = async (mealType: keyof MealTimes, time: string) => {
    await updatePreferences({ 
      mealTimes: { ...preferences.mealTimes, [mealType]: time } 
    });
  };

  // Get matching difficulty based on skill level
  const getMatchingDifficulties = (): DifficultyLevel[] => {
    switch (preferences.skillLevel) {
      case 'beginner':
        return ['easy'];
      case 'intermediate':
        return ['easy', 'medium'];
      case 'advanced':
        return ['easy', 'medium', 'hard'];
      default:
        return ['easy', 'medium', 'hard'];
    }
  };

  return {
    preferences,
    loading,
    updatePreferences,
    toggleDietaryPreference,
    setSkillLevel,
    setDefaultServings,
    setMealTime,
    getMatchingDifficulties,
  };
}
