import { useState } from "react";
import { RecipeCard } from "./RecipeCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import type { Recipe, DietaryTag, CuisineType } from "@/data/recipes";
import { Sunrise, Sun, Moon, Filter, ChevronDown, Cake, Croissant, Clock, Flame, Dumbbell, Leaf, Globe, Snowflake } from "lucide-react";
import { cn } from "@/lib/utils";

interface RecipeResultsProps {
  recipes: Recipe[];
  savedRecipes: string[];
  onSave: (recipeId: string) => void;
  onAddToCalendar: (recipe: Recipe) => void;
  onAddToShopping: (ingredientId: string) => void;
}

const dietaryFilters: { tag: DietaryTag; label: string; icon: string }[] = [
  { tag: "vegetarian", label: "Vegetarian", icon: "🥬" },
  { tag: "vegan", label: "Vegan", icon: "🌱" },
  { tag: "gluten-free", label: "Gluten-Free", icon: "🌾" },
  { tag: "dairy-free", label: "Dairy-Free", icon: "🥛" },
  { tag: "keto", label: "Keto", icon: "🥑" },
  { tag: "paleo", label: "Paleo", icon: "🍖" },
  { tag: "high-protein", label: "High Protein", icon: "💪" },
  { tag: "low-carb", label: "Low Carb", icon: "🥗" },
  { tag: "high-fiber", label: "High Fiber", icon: "🌾" },
];

const cuisineFilters: { cuisine: CuisineType; label: string; icon: string }[] = [
  { cuisine: "italian", label: "Italian", icon: "🇮🇹" },
  { cuisine: "mexican", label: "Mexican", icon: "🇲🇽" },
  { cuisine: "asian", label: "Asian", icon: "🥢" },
  { cuisine: "mediterranean", label: "Mediterranean", icon: "🫒" },
  { cuisine: "american", label: "American", icon: "🇺🇸" },
  { cuisine: "french", label: "French", icon: "🇫🇷" },
  { cuisine: "indian", label: "Indian", icon: "🇮🇳" },
  { cuisine: "middle-eastern", label: "Middle Eastern", icon: "🧆" },
  { cuisine: "comfort", label: "Comfort Food", icon: "🏠" },
  { cuisine: "healthy", label: "Healthy", icon: "💚" },
];

const cookTimeFilters = [
  { value: "quick", label: "Under 15 min", maxMinutes: 15 },
  { value: "medium", label: "15-30 min", maxMinutes: 30, minMinutes: 15 },
  { value: "long", label: "30-60 min", maxMinutes: 60, minMinutes: 30 },
];

const calorieFilters = [
  { value: "low", label: "Low Cal (<300)", max: 300 },
  { value: "medium", label: "Medium (300-500)", min: 300, max: 500 },
  { value: "high", label: "High Cal (500+)", min: 500 },
];

export function RecipeResults({ recipes, savedRecipes, onSave, onAddToCalendar, onAddToShopping }: RecipeResultsProps) {
  const [activeFilters, setActiveFilters] = useState<DietaryTag[]>([]);
  const [activeCuisines, setActiveCuisines] = useState<CuisineType[]>([]);
  const [cookTimeFilter, setCookTimeFilter] = useState<string | null>(null);
  const [calorieFilter, setCalorieFilter] = useState<string | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [showHolidayOnly, setShowHolidayOnly] = useState(false);

  const holidayCount = recipes.filter(r => r.isHoliday).length;

  const toggleFilter = (tag: DietaryTag) => {
    setActiveFilters(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const toggleCuisine = (cuisine: CuisineType) => {
    setActiveCuisines(prev => 
      prev.includes(cuisine) ? prev.filter(c => c !== cuisine) : [...prev, cuisine]
    );
  };

  const clearFilters = () => {
    setActiveFilters([]);
    setActiveCuisines([]);
    setCookTimeFilter(null);
    setCalorieFilter(null);
    setShowHolidayOnly(false);
  };

  const hasActiveFilters = activeFilters.length > 0 || activeCuisines.length > 0 || cookTimeFilter || calorieFilter || showHolidayOnly;

  const parseCookTime = (cookTime: string): number => {
    const match = cookTime.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  // Filter recipes
  const filteredRecipes = recipes.filter(recipe => {
    // Holiday filter
    if (showHolidayOnly && !recipe.isHoliday) {
      return false;
    }
    // Dietary filter
    if (activeFilters.length > 0 && !activeFilters.every(filter => recipe.dietaryTags?.includes(filter))) {
      return false;
    }
    // Cuisine filter
    if (activeCuisines.length > 0 && !activeCuisines.includes(recipe.cuisine as CuisineType)) {
      return false;
    }
    // Cook time filter
    if (cookTimeFilter) {
      const minutes = parseCookTime(recipe.cookTime);
      const filter = cookTimeFilters.find(f => f.value === cookTimeFilter);
      if (filter) {
        if (filter.minMinutes && minutes < filter.minMinutes) return false;
        if (filter.maxMinutes && minutes > filter.maxMinutes) return false;
      }
    }
    // Calorie filter
    if (calorieFilter && recipe.nutrition) {
      const filter = calorieFilters.find(f => f.value === calorieFilter);
      if (filter) {
        if (filter.min && recipe.nutrition.calories < filter.min) return false;
        if (filter.max && recipe.nutrition.calories > filter.max) return false;
      }
    }
    return true;
  });

  // Sort recipes: perfect matches first (100%), then by match score descending
  const sortedRecipes = [...filteredRecipes].sort((a, b) => {
    const scoreA = a.matchScore ?? (a.matchedIngredients.length / a.ingredients.length);
    const scoreB = b.matchScore ?? (b.matchedIngredients.length / b.ingredients.length);
    return scoreB - scoreA;
  });

  const breakfastRecipes = sortedRecipes.filter(r => r.mealType === "breakfast");
  const lunchRecipes = sortedRecipes.filter(r => r.mealType === "lunch");
  const dinnerRecipes = sortedRecipes.filter(r => r.mealType === "dinner");
  const dessertRecipes = sortedRecipes.filter(r => r.mealType === "dessert");
  const sidesRecipes = sortedRecipes.filter(r => r.mealType === "sides");

  // Helper to render recipes grouped by match quality
  const renderRecipeList = (recipeList: Recipe[], emptyMessage: string) => {
    if (recipeList.length === 0) {
      return (
        <p className="text-muted-foreground col-span-2 text-center py-8">
          {hasActiveFilters 
            ? `No recipes match your filters. Try removing some filters!`
            : emptyMessage}
        </p>
      );
    }

    const perfectMatches = recipeList.filter(r => {
      const score = r.matchScore ?? (r.matchedIngredients.length / r.ingredients.length);
      return score >= 0.99;
    });
    const closeMatches = recipeList.filter(r => {
      const score = r.matchScore ?? (r.matchedIngredients.length / r.ingredients.length);
      return score < 0.99;
    });

    return (
      <div className="space-y-4">
        {perfectMatches.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20">
                ✓ Perfect Matches
              </Badge>
              <span className="text-xs text-muted-foreground">You have all ingredients</span>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {perfectMatches.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  isSaved={savedRecipes.includes(recipe.id)}
                  onSave={() => onSave(recipe.id)}
                  onAddToCalendar={() => onAddToCalendar(recipe)}
                  onAddToShopping={onAddToShopping}
                />
              ))}
            </div>
          </div>
        )}
        {closeMatches.length > 0 && (
          <div>
            {perfectMatches.length > 0 && (
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline" className="text-muted-foreground border-border">
                  Close Matches
                </Badge>
                <span className="text-xs text-muted-foreground">Missing a few ingredients</span>
              </div>
            )}
            <div className="grid gap-3 md:grid-cols-2">
              {closeMatches.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  isSaved={savedRecipes.includes(recipe.id)}
                  onSave={() => onSave(recipe.id)}
                  onAddToCalendar={() => onAddToCalendar(recipe)}
                  onAddToShopping={onAddToShopping}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  if (recipes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Select some ingredients to see recipe suggestions!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Holiday Favorites Filter - Prominent Position */}
      {holidayCount > 0 && (
        <div className="p-3 bg-gradient-to-r from-red-500/10 to-green-500/10 rounded-xl border border-border/50 shadow-sm">
          <div className="flex items-center gap-3">
            <Badge
              variant={showHolidayOnly ? "default" : "outline"}
              className={cn(
                "cursor-pointer transition-all hover:scale-105 px-4 py-2 text-sm",
                showHolidayOnly 
                  ? "bg-red-500 hover:bg-red-600 text-white shadow-md" 
                  : "bg-background hover:bg-muted border-border"
              )}
              onClick={() => setShowHolidayOnly(!showHolidayOnly)}
            >
              <Snowflake className="h-4 w-4 mr-2" />
              Holiday Favorites
              <span className="ml-2 text-xs opacity-80">({holidayCount})</span>
            </Badge>
            {showHolidayOnly && (
              <span className="text-sm text-muted-foreground">
                Showing seasonal recipes perfect for the holidays
              </span>
            )}
          </div>
        </div>
      )}

      {/* Cuisine Quick Filters - Always Visible */}
      <div className="p-3 bg-card rounded-xl border border-border/50 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Globe className="h-4 w-4 text-primary" />
            <span>Filter by Cuisine</span>
          </div>
          {activeCuisines.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-xs text-muted-foreground hover:text-destructive"
              onClick={() => setActiveCuisines([])}
            >
              Clear
            </Button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {cuisineFilters.map(({ cuisine, label, icon }) => (
            <Badge
              key={cuisine}
              variant={activeCuisines.includes(cuisine) ? "default" : "outline"}
              className={cn(
                "cursor-pointer transition-all hover:scale-105 px-3 py-1.5",
                activeCuisines.includes(cuisine) 
                  ? "bg-primary text-primary-foreground shadow-md" 
                  : "bg-background hover:bg-muted border-border"
              )}
              onClick={() => toggleCuisine(cuisine)}
            >
              <span className="mr-1.5 text-base">{icon}</span>
              {label}
            </Badge>
          ))}
        </div>
      </div>

      {/* More Filters (Dietary, Cook Time, Calories) */}
      <Collapsible open={filtersOpen} onOpenChange={setFiltersOpen}>
        <CollapsibleTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full justify-between bg-muted/30 border-border/50 rounded-xl"
          >
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>More Filters</span>
              {(activeFilters.length > 0 || cookTimeFilter || calorieFilter) && (
                <Badge className="h-5 min-w-5 p-0 text-[10px] bg-primary text-primary-foreground">
                  {activeFilters.length + (cookTimeFilter ? 1 : 0) + (calorieFilter ? 1 : 0)}
                </Badge>
              )}
            </div>
            <ChevronDown className={cn("h-4 w-4 transition-transform", filtersOpen && "rotate-180")} />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 pt-3">
          {/* Dietary Filters */}
          <div className="p-3 bg-muted/30 rounded-xl border border-border/50">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
              <Leaf className="h-4 w-4" />
              <span>Diet & Nutrition</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {dietaryFilters.map(({ tag, label, icon }) => (
                <Badge
                  key={tag}
                  variant={activeFilters.includes(tag) ? "default" : "outline"}
                  className={cn(
                    "cursor-pointer transition-all hover:scale-105",
                    activeFilters.includes(tag) 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-background hover:bg-muted"
                  )}
                  onClick={() => toggleFilter(tag)}
                >
                  <span className="mr-1">{icon}</span>
                  {label}
                </Badge>
              ))}
            </div>
          </div>

          {/* Cook Time & Calories */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-muted/30 rounded-xl border border-border/50">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
                <Clock className="h-4 w-4" />
                <span>Cook Time</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cookTimeFilters.map(({ value, label }) => (
                  <Badge
                    key={value}
                    variant={cookTimeFilter === value ? "default" : "outline"}
                    className={cn(
                      "cursor-pointer text-xs transition-all",
                      cookTimeFilter === value 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-background hover:bg-muted"
                    )}
                    onClick={() => setCookTimeFilter(cookTimeFilter === value ? null : value)}
                  >
                    {label}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="p-3 bg-muted/30 rounded-xl border border-border/50">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
                <Flame className="h-4 w-4" />
                <span>Calories</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {calorieFilters.map(({ value, label }) => (
                  <Badge
                    key={value}
                    variant={calorieFilter === value ? "default" : "outline"}
                    className={cn(
                      "cursor-pointer text-xs transition-all",
                      calorieFilter === value 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-background hover:bg-muted"
                    )}
                    onClick={() => setCalorieFilter(calorieFilter === value ? null : value)}
                  >
                    {label}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {(activeFilters.length > 0 || cookTimeFilter || calorieFilter) && (
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-muted-foreground hover:text-destructive"
              onClick={() => {
                setActiveFilters([]);
                setCookTimeFilter(null);
                setCalorieFilter(null);
              }}
            >
              Clear dietary filters
            </Button>
          )}
        </CollapsibleContent>
      </Collapsible>

      {/* Filtered Results Count */}
      {hasActiveFilters && (
        <p className="text-sm text-muted-foreground">
          Showing {filteredRecipes.length} of {recipes.length} recipes
        </p>
      )}

      <Tabs defaultValue="breakfast" className="w-full">
        <TabsList className="w-full grid grid-cols-5 h-12 bg-muted/50 p-1 rounded-xl mb-6">
          <TabsTrigger 
            value="breakfast" 
            className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm flex items-center gap-1 text-xs sm:text-sm"
          >
            <Sunrise className="h-4 w-4" />
            <span className="hidden sm:inline">Breakfast</span>
            <span className="text-[10px] text-muted-foreground">({breakfastRecipes.length})</span>
          </TabsTrigger>
          <TabsTrigger 
            value="lunch" 
            className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm flex items-center gap-1 text-xs sm:text-sm"
          >
            <Sun className="h-4 w-4" />
            <span className="hidden sm:inline">Lunch</span>
            <span className="text-[10px] text-muted-foreground">({lunchRecipes.length})</span>
          </TabsTrigger>
          <TabsTrigger 
            value="dinner" 
            className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm flex items-center gap-1 text-xs sm:text-sm"
          >
            <Moon className="h-4 w-4" />
            <span className="hidden sm:inline">Dinner</span>
            <span className="text-[10px] text-muted-foreground">({dinnerRecipes.length})</span>
          </TabsTrigger>
          <TabsTrigger 
            value="dessert" 
            className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm flex items-center gap-1 text-xs sm:text-sm"
          >
            <Cake className="h-4 w-4" />
            <span className="hidden sm:inline">Dessert</span>
            <span className="text-[10px] text-muted-foreground">({dessertRecipes.length})</span>
          </TabsTrigger>
          <TabsTrigger 
            value="sides" 
            className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm flex items-center gap-1 text-xs sm:text-sm"
          >
            <Croissant className="h-4 w-4" />
            <span className="hidden sm:inline">Sides</span>
            <span className="text-[10px] text-muted-foreground">({sidesRecipes.length})</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="breakfast" className="mt-0">
          {renderRecipeList(breakfastRecipes, "No breakfast recipes match your ingredients. Try adding eggs, oats, or bread!")}
        </TabsContent>

        <TabsContent value="lunch" className="mt-0">
          {renderRecipeList(lunchRecipes, "No lunch recipes match your ingredients. Try adding chicken, lettuce, or pasta!")}
        </TabsContent>

        <TabsContent value="dinner" className="mt-0">
          {renderRecipeList(dinnerRecipes, "No dinner recipes match your ingredients. Try adding chicken, beef, or pasta!")}
        </TabsContent>

        <TabsContent value="dessert" className="mt-0">
          {renderRecipeList(dessertRecipes, "No dessert recipes match your ingredients. Try adding flour, sugar, or chocolate!")}
        </TabsContent>

        <TabsContent value="sides" className="mt-0">
          {renderRecipeList(sidesRecipes, "No sides recipes match your ingredients. Try adding flour, yeast, or butter!")}
        </TabsContent>
      </Tabs>
    </div>
  );
}