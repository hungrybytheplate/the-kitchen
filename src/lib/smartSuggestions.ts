import { sampleRecipes, type Recipe } from "@/data/recipes";

interface SuggestionResult {
  recipe: Recipe;
  reason: string;
  score: number;
}

export function getSmartSuggestions(savedRecipeIds: string[], limit: number = 5): SuggestionResult[] {
  if (savedRecipeIds.length === 0) return [];

  // Get saved recipes
  const savedRecipes = sampleRecipes.filter(r => savedRecipeIds.includes(r.id));
  
  // Analyze preferences
  const mealTypeCounts: Record<string, number> = {};
  const cuisineCounts: Record<string, number> = {};
  const tagCounts: Record<string, number> = {};
  
  savedRecipes.forEach(recipe => {
    // Count meal types
    mealTypeCounts[recipe.mealType] = (mealTypeCounts[recipe.mealType] || 0) + 1;
    
    // Count cuisines
    if (recipe.cuisine) {
      cuisineCounts[recipe.cuisine] = (cuisineCounts[recipe.cuisine] || 0) + 1;
    }
    
    // Count dietary tags
    recipe.dietaryTags?.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  // Get unsaved recipes
  const unsavedRecipes = sampleRecipes.filter(r => !savedRecipeIds.includes(r.id));
  
  // Score each unsaved recipe based on similarity to preferences
  const scored: SuggestionResult[] = unsavedRecipes.map(recipe => {
    let score = 0;
    const reasons: string[] = [];
    
    // Meal type match (weight: 2)
    if (mealTypeCounts[recipe.mealType]) {
      score += mealTypeCounts[recipe.mealType] * 2;
      if (mealTypeCounts[recipe.mealType] >= 2) {
        reasons.push(`You love ${recipe.mealType} recipes`);
      }
    }
    
    // Cuisine match (weight: 3)
    if (recipe.cuisine && cuisineCounts[recipe.cuisine]) {
      score += cuisineCounts[recipe.cuisine] * 3;
      reasons.push(`Similar to your ${recipe.cuisine} favorites`);
    }
    
    // Dietary tag matches (weight: 2 per tag)
    const matchedTags: string[] = [];
    recipe.dietaryTags?.forEach(tag => {
      if (tagCounts[tag]) {
        score += tagCounts[tag] * 2;
        matchedTags.push(tag);
      }
    });
    if (matchedTags.length > 0) {
      reasons.push(`Matches your ${matchedTags[0]} preference`);
    }
    
    // Holiday bonus if user has saved holiday recipes
    const savedHolidayCount = savedRecipes.filter(r => r.isHoliday).length;
    if (recipe.isHoliday && savedHolidayCount > 0) {
      score += 5;
      reasons.push("Holiday favorite");
    }
    
    // Pick the best reason
    const reason = reasons[0] || "Based on your taste";
    
    return { recipe, reason, score };
  });
  
  // Sort by score descending and take top results
  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
