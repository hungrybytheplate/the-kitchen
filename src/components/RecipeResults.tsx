import { useState } from "react";
import { RecipeCard } from "./RecipeCard";
import { RecipeCardSkeletonGrid } from "./RecipeCardSkeleton";
import { MealTypeEmptyState } from "./EmptyState";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Card, CardContent } from "@/components/ui/card";
import type { Recipe, DietaryTag, CuisineType } from "@/data/recipes";
import { Sunrise, Sun, Moon, Filter, ChevronDown, Cake, Croissant, Clock, Flame, Dumbbell, Leaf, Globe, Snowflake, Cookie, ChefHat, Lightbulb, Search, Zap, Timer, Gauge, Droplets, Package, Baby, PiggyBank } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { staggerContainer } from "@/components/ui/animated";

// Recipe IDs that are snacks and appetizers
const snackRecipeIds = [
  // Dips
  "buffalo-chicken-dip",
  "spinach-artichoke-dip",
  "classic-hummus",
  "queso-dip",
  "french-onion-dip",
  "seven-layer-dip",
  // Mini muffins
  "mini-blueberry-muffins",
  "chocolate-chip-mini-muffins",
  "banana-nut-mini-muffins",
  // Cookie dough
  "edible-cookie-dough",
  "peanut-butter-cookie-dough",
  // Appetizers
  "crab-rangoon",
  "classic-deviled-eggs",
  "stuffed-mushrooms",
  "classic-bruschetta",
  "cheese-balls",
];

// Recipe IDs that are sauces and condiments
const sauceRecipeIds = [
  // Nutritious sauces
  "pink-beet-feta-sauce",
  "spinach-power-sauce",
  "golden-carrot-ginger-sauce",
  "roasted-red-pepper-cashew-sauce",
  "creamy-avocado-herb-sauce",
  "cauliflower-alfredo-sauce",
  "sweet-potato-tahini-sauce",
  // International sauces
  "korean-gochujang-cream-sauce",
  "thai-peanut-sauce",
  "indian-tikka-masala-sauce",
  "japanese-teriyaki-sauce",
  "argentinian-chimichurri",
  "quick-mexican-mole",
  "yemeni-zhug",
  // Dips that are also sauces
  "gochujang-mayo",
  "classic-raita",
  "olive-tapenade",
];

// Recipe IDs that are kid-friendly
const kidFriendlyRecipeIds = [
  "kid-friendly-mac-cheese",
  "kid-friendly-chicken-nuggets",
  "kid-friendly-pizza-bagels",
  "kid-friendly-pbj-rollups",
  "kid-friendly-mini-corn-dogs",
  "kid-friendly-cheesy-quesadillas",
  "kid-friendly-spaghetti-meatballs",
  "kid-friendly-grilled-cheese",
  "kid-friendly-banana-pancakes",
  "kid-friendly-fish-sticks",
  // Other family-friendly recipes
  "banana-pancakes",
  "french-toast",
  "grilled-cheese",
  "cheese-pizza",
  "spaghetti-meatballs",
];

// Recipe IDs that are budget-friendly (under $10)
const budgetRecipeIds = [
  "budget-rice-beans",
  "budget-egg-fried-rice",
  "budget-pasta-aglio-olio",
  "budget-lentil-soup",
  "budget-ramen-upgrade",
  "budget-bean-tacos",
  "budget-chickpea-curry",
  "budget-tuna-pasta",
  "budget-potato-hash",
  "budget-veggie-stir-fry",
  // Other budget-friendly staples
  "overnight-oats",
  "egg-muffins",
  "lentil-soup",
  "chili-con-carne",
  "fried-rice",
];

// Recipe IDs that are good for meal prep (store well, make in bulk)
const mealPrepRecipeIds = [
  // Proteins that reheat well
  "honey-garlic-chicken",
  "15-minute-honey-garlic-chicken",
  "teriyaki-chicken",
  "grilled-chicken-salad",
  "beef-stir-fry",
  "slow-cooker-pulled-pork",
  "slow-cooker-pot-roast",
  "slow-cooker-chicken-tacos",
  "instant-pot-beef-stew",
  "instant-pot-chicken-curry",
  "instant-pot-carnitas",
  // Grain bowls and salads
  "chicken-caesar-salad",
  "quinoa-salad",
  "mediterranean-bowl",
  "burrito-bowl",
  // Soups and stews (freeze beautifully)
  "minestrone-soup",
  "chicken-noodle-soup",
  "tomato-basil-soup",
  "beef-stew",
  "chili-con-carne",
  "white-chicken-chili",
  "lentil-soup",
  // Casseroles and baked dishes
  "lasagna",
  "baked-ziti",
  "chicken-enchiladas",
  "shepherd-pie",
  "tuna-casserole",
  // Breakfast prep
  "overnight-oats",
  "egg-muffins",
  "breakfast-burritos",
  "banana-pancakes",
  "granola",
  // Sauces that keep well
  "thai-peanut-sauce",
  "indian-tikka-masala-sauce",
  "korean-gochujang-cream-sauce",
  "japanese-teriyaki-sauce",
  // Slow cooker meals
  "slow-cooker-bbq-ribs",
  "slow-cooker-beef-bourguignon",
  "slow-cooker-honey-garlic-chicken",
  // Dump and bake
  "dump-and-bake-tuscan-chicken-pasta",
  "dump-and-bake-chicken-fajita-rice",
  "dump-and-bake-meatball-subs",
  "dump-and-bake-pizza-pasta",
  "dump-and-bake-crack-chicken",
  // New meal prep recipes
  "freezer-breakfast-burritos",
  "mason-jar-greek-salad",
  "mason-jar-asian-noodle-salad",
  "chicken-burrito-bowl-prep",
  "teriyaki-chicken-protein-bowl",
  "mediterranean-quinoa-power-bowl",
  "beef-and-broccoli-meal-prep",
  "turkey-taco-lettuce-cups",
  "sheet-pan-sausage-vegetables",
  "honey-garlic-salmon-meal-prep",
  "egg-muffin-cups",
  "chicken-fried-rice-meal-prep",
  "overnight-chia-pudding",
  "greek-chicken-meal-prep",
  "black-bean-sweet-potato-bowls",
];

interface RecipeResultsProps {
  recipes: Recipe[];
  savedRecipes: string[];
  onSave: (recipeId: string) => void;
  onAddToCalendar: (recipe: Recipe) => void;
  onAddToShopping: (ingredientId: string) => void;
  onViewRecipe?: (recipe: Recipe) => void;
  loading?: boolean;
  saveCounts?: { [recipeId: string]: number };
  ratings?: { [key: string]: number };
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
  { value: "over60", label: "Over 1 hour", minMinutes: 60 },
];

const calorieFilters = [
  { value: "low", label: "Low Cal (<300)", max: 300 },
  { value: "medium", label: "Medium (300-500)", min: 300, max: 500 },
  { value: "high", label: "High Cal (500+)", min: 500 },
];

export function RecipeResults({ recipes, savedRecipes, onSave, onAddToCalendar, onAddToShopping, onViewRecipe, loading, saveCounts = {}, ratings = {} }: RecipeResultsProps) {
  const [activeFilters, setActiveFilters] = useState<DietaryTag[]>([]);
  const [activeCuisines, setActiveCuisines] = useState<CuisineType[]>([]);
  const [cookTimeFilter, setCookTimeFilter] = useState<string | null>(null);
  const [calorieFilter, setCalorieFilter] = useState<string | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [showHolidayOnly, setShowHolidayOnly] = useState(false);
  const [showSnacksOnly, setShowSnacksOnly] = useState(false);
  const [showSaucesOnly, setShowSaucesOnly] = useState(false);
  const [showMealPrepOnly, setShowMealPrepOnly] = useState(false);
  const [showOnePanOnly, setShowOnePanOnly] = useState(false);
  const [showQuickEasyOnly, setShowQuickEasyOnly] = useState(false);
  const [showSlowCookerOnly, setShowSlowCookerOnly] = useState(false);
  const [showInstantPotOnly, setShowInstantPotOnly] = useState(false);
  const [showKidFriendlyOnly, setShowKidFriendlyOnly] = useState(false);
  const [showBudgetOnly, setShowBudgetOnly] = useState(false);

  const parseCookTime = (cookTime: string): number => {
    const match = cookTime.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  const holidayCount = recipes.filter(r => r.isHoliday).length;
  const snacksCount = recipes.filter(r => snackRecipeIds.includes(r.id)).length;
  const saucesCount = recipes.filter(r => sauceRecipeIds.includes(r.id)).length;
  const mealPrepCount = recipes.filter(r => mealPrepRecipeIds.includes(r.id)).length;
  const onePanCount = recipes.filter(r => r.isOnePan).length;
  const quickEasyCount = recipes.filter(r => {
    const minutes = parseCookTime(r.cookTime);
    return minutes <= 20 && r.difficulty === "easy";
  }).length;
  const slowCookerCount = recipes.filter(r => r.isSlowCooker).length;
  const instantPotCount = recipes.filter(r => r.isInstantPot).length;
  const kidFriendlyCount = recipes.filter(r => kidFriendlyRecipeIds.includes(r.id)).length;
  const budgetCount = recipes.filter(r => budgetRecipeIds.includes(r.id)).length;

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
    setShowSnacksOnly(false);
    setShowSaucesOnly(false);
    setShowMealPrepOnly(false);
    setShowOnePanOnly(false);
    setShowQuickEasyOnly(false);
    setShowSlowCookerOnly(false);
    setShowInstantPotOnly(false);
    setShowKidFriendlyOnly(false);
    setShowBudgetOnly(false);
  };

  const hasActiveFilters = activeFilters.length > 0 || activeCuisines.length > 0 || cookTimeFilter || calorieFilter || showHolidayOnly || showSnacksOnly || showSaucesOnly || showMealPrepOnly || showOnePanOnly || showQuickEasyOnly || showSlowCookerOnly || showInstantPotOnly || showKidFriendlyOnly || showBudgetOnly;

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
    // Snacks & Appetizers filter
    if (showSnacksOnly && !snackRecipeIds.includes(recipe.id)) {
      return false;
    }
    // Sauces & Condiments filter
    if (showSaucesOnly && !sauceRecipeIds.includes(recipe.id)) {
      return false;
    }
    // Meal Prep filter
    if (showMealPrepOnly && !mealPrepRecipeIds.includes(recipe.id)) {
      return false;
    }
    // One-Pan filter
    if (showOnePanOnly && !recipe.isOnePan) {
      return false;
    }
    // Quick & Easy filter
    if (showQuickEasyOnly) {
      const minutes = parseCookTime(recipe.cookTime);
      if (minutes > 20 || recipe.difficulty !== "easy") {
        return false;
      }
    }
    // Slow Cooker filter
    if (showSlowCookerOnly && !recipe.isSlowCooker) {
      return false;
    }
    // Instant Pot filter
    if (showInstantPotOnly && !recipe.isInstantPot) {
      return false;
    }
    // Kid-Friendly filter
    if (showKidFriendlyOnly && !kidFriendlyRecipeIds.includes(recipe.id)) {
      return false;
    }
    // Budget filter
    if (showBudgetOnly && !budgetRecipeIds.includes(recipe.id)) {
      return false;
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
  const renderRecipeList = (recipeList: Recipe[], mealType: "breakfast" | "lunch" | "dinner" | "dessert" | "sides") => {
    if (recipeList.length === 0) {
      return hasActiveFilters ? (
        <Card className="col-span-2 border-dashed">
          <CardContent className="py-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-muted mb-4">
              <Filter className="h-6 w-6 text-muted-foreground" />
            </div>
            <h4 className="font-medium text-lg mb-2">Filters too restrictive</h4>
            <p className="text-muted-foreground text-sm max-w-sm mx-auto mb-4">
              No {mealType} recipes match your current filters. Try removing some filters to see more results.
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearFilters}
              className="gap-2"
            >
              Clear all filters
            </Button>
          </CardContent>
        </Card>
      ) : (
        <MealTypeEmptyState mealType={mealType} />
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
            <motion.div 
              className="grid gap-2 sm:gap-3 grid-cols-1 sm:grid-cols-2"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {perfectMatches.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  isSaved={savedRecipes.includes(recipe.id)}
                  onSave={() => onSave(recipe.id)}
                  onAddToCalendar={() => onAddToCalendar(recipe)}
                  onAddToShopping={onAddToShopping}
                  onViewRecipe={() => onViewRecipe?.(recipe)}
                  saveCount={saveCounts[recipe.id] || 0}
                  userRating={ratings[`recipe-${recipe.id}`]}
                />
              ))}
            </motion.div>
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
            <motion.div 
              className="grid gap-2 sm:gap-3 grid-cols-1 sm:grid-cols-2"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
            {closeMatches.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  isSaved={savedRecipes.includes(recipe.id)}
                  onSave={() => onSave(recipe.id)}
                  onAddToCalendar={() => onAddToCalendar(recipe)}
                  onAddToShopping={onAddToShopping}
                  onViewRecipe={() => onViewRecipe?.(recipe)}
                  saveCount={saveCounts[recipe.id] || 0}
                  userRating={ratings[`recipe-${recipe.id}`]}
                />
              ))}
            </motion.div>
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="grid gap-2 sm:gap-3 grid-cols-1 sm:grid-cols-2">
        <RecipeCardSkeletonGrid count={6} />
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="py-12 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-muted mb-4">
            <Search className="h-7 w-7 text-muted-foreground" />
          </div>
          <h3 className="font-serif text-xl font-semibold mb-2">Select Ingredients First</h3>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            Choose ingredients from your kitchen to discover recipes you can make. We'll show you perfect matches and what's missing.
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mb-3">
            <Lightbulb className="h-3.5 w-3.5" />
            <span className="font-medium">Popular starting ingredients</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="outline" className="px-3 py-1.5 text-xs">🥚 Eggs</Badge>
            <Badge variant="outline" className="px-3 py-1.5 text-xs">🍗 Chicken</Badge>
            <Badge variant="outline" className="px-3 py-1.5 text-xs">🧀 Cheese</Badge>
            <Badge variant="outline" className="px-3 py-1.5 text-xs">🍝 Pasta</Badge>
            <Badge variant="outline" className="px-3 py-1.5 text-xs">🧄 Garlic</Badge>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Special Category Filters */}
      <div className="p-3 bg-card rounded-xl border border-border/50 shadow-sm">
        <div className="flex items-center gap-2 text-sm font-medium mb-2">
          <ChefHat className="h-4 w-4 text-primary" />
          <span>Quick Filters</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {/* Quick & Easy Filter */}
          {quickEasyCount > 0 && (
            <Badge
              variant={showQuickEasyOnly ? "default" : "outline"}
              className={cn(
                "cursor-pointer transition-all hover:scale-105 px-3 py-1.5",
                showQuickEasyOnly 
                  ? "bg-sky-500 hover:bg-sky-600 text-white shadow-md" 
                  : "bg-background hover:bg-muted border-border"
              )}
              onClick={() => setShowQuickEasyOnly(!showQuickEasyOnly)}
            >
              <Zap className="h-3.5 w-3.5 mr-1.5" />
              Quick & Easy
              <span className="ml-1.5 text-xs opacity-80">({quickEasyCount})</span>
            </Badge>
          )}

          {/* Holiday Filter */}
          {holidayCount > 0 && (
            <Badge
              variant={showHolidayOnly ? "default" : "outline"}
              className={cn(
                "cursor-pointer transition-all hover:scale-105 px-3 py-1.5",
                showHolidayOnly 
                  ? "bg-red-500 hover:bg-red-600 text-white shadow-md" 
                  : "bg-background hover:bg-muted border-border"
              )}
              onClick={() => setShowHolidayOnly(!showHolidayOnly)}
            >
              <Snowflake className="h-3.5 w-3.5 mr-1.5" />
              Holiday Favorites
              <span className="ml-1.5 text-xs opacity-80">({holidayCount})</span>
            </Badge>
          )}

          {/* Snacks & Appetizers Filter */}
          {snacksCount > 0 && (
            <Badge
              variant={showSnacksOnly ? "default" : "outline"}
              className={cn(
                "cursor-pointer transition-all hover:scale-105 px-3 py-1.5",
                showSnacksOnly 
                  ? "bg-amber-500 hover:bg-amber-600 text-white shadow-md" 
                  : "bg-background hover:bg-muted border-border"
              )}
              onClick={() => setShowSnacksOnly(!showSnacksOnly)}
            >
              <Cookie className="h-3.5 w-3.5 mr-1.5" />
              Snacks & Appetizers
              <span className="ml-1.5 text-xs opacity-80">({snacksCount})</span>
            </Badge>
          )}

          {/* One-Pan Dinners Filter */}
          {onePanCount > 0 && (
            <Badge
              variant={showOnePanOnly ? "default" : "outline"}
              className={cn(
                "cursor-pointer transition-all hover:scale-105 px-3 py-1.5",
                showOnePanOnly 
                  ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-md" 
                  : "bg-background hover:bg-muted border-border"
              )}
              onClick={() => setShowOnePanOnly(!showOnePanOnly)}
            >
              <Flame className="h-3.5 w-3.5 mr-1.5" />
              One-Pan Dinners
              <span className="ml-1.5 text-xs opacity-80">({onePanCount})</span>
            </Badge>
          )}

          {/* Slow Cooker Filter */}
          {slowCookerCount > 0 && (
            <Badge
              variant={showSlowCookerOnly ? "default" : "outline"}
              className={cn(
                "cursor-pointer transition-all hover:scale-105 px-3 py-1.5",
                showSlowCookerOnly 
                  ? "bg-orange-500 hover:bg-orange-600 text-white shadow-md" 
                  : "bg-background hover:bg-muted border-border"
              )}
              onClick={() => setShowSlowCookerOnly(!showSlowCookerOnly)}
            >
              <Timer className="h-3.5 w-3.5 mr-1.5" />
              Slow Cooker
              <span className="ml-1.5 text-xs opacity-80">({slowCookerCount})</span>
            </Badge>
          )}

          {/* Instant Pot Filter */}
          {instantPotCount > 0 && (
            <Badge
              variant={showInstantPotOnly ? "default" : "outline"}
              className={cn(
                "cursor-pointer transition-all hover:scale-105 px-3 py-1.5",
                showInstantPotOnly 
                  ? "bg-violet-500 hover:bg-violet-600 text-white shadow-md" 
                  : "bg-background hover:bg-muted border-border"
              )}
              onClick={() => setShowInstantPotOnly(!showInstantPotOnly)}
            >
              <Gauge className="h-3.5 w-3.5 mr-1.5" />
              Instant Pot
              <span className="ml-1.5 text-xs opacity-80">({instantPotCount})</span>
            </Badge>
          )}

          {/* Sauces & Condiments Filter */}
          {saucesCount > 0 && (
            <Badge
              variant={showSaucesOnly ? "default" : "outline"}
              className={cn(
                "cursor-pointer transition-all hover:scale-105 px-3 py-1.5",
                showSaucesOnly 
                  ? "bg-rose-500 hover:bg-rose-600 text-white shadow-md" 
                  : "bg-background hover:bg-muted border-border"
              )}
              onClick={() => setShowSaucesOnly(!showSaucesOnly)}
            >
              <Droplets className="h-3.5 w-3.5 mr-1.5" />
              Sauces & Condiments
              <span className="ml-1.5 text-xs opacity-80">({saucesCount})</span>
            </Badge>
          )}

          {/* Meal Prep Filter */}
          {mealPrepCount > 0 && (
            <Badge
              variant={showMealPrepOnly ? "default" : "outline"}
              className={cn(
                "cursor-pointer transition-all hover:scale-105 px-3 py-1.5",
                showMealPrepOnly 
                  ? "bg-teal-500 hover:bg-teal-600 text-white shadow-md" 
                  : "bg-background hover:bg-muted border-border"
              )}
              onClick={() => setShowMealPrepOnly(!showMealPrepOnly)}
            >
              <Package className="h-3.5 w-3.5 mr-1.5" />
              Meal Prep
              <span className="ml-1.5 text-xs opacity-80">({mealPrepCount})</span>
            </Badge>
          )}

          {/* Kid-Friendly Filter */}
          {kidFriendlyCount > 0 && (
            <Badge
              variant={showKidFriendlyOnly ? "default" : "outline"}
              className={cn(
                "cursor-pointer transition-all hover:scale-105 px-3 py-1.5",
                showKidFriendlyOnly 
                  ? "bg-pink-500 hover:bg-pink-600 text-white shadow-md" 
                  : "bg-background hover:bg-muted border-border"
              )}
              onClick={() => setShowKidFriendlyOnly(!showKidFriendlyOnly)}
            >
              <Baby className="h-3.5 w-3.5 mr-1.5" />
              Kid-Friendly
              <span className="ml-1.5 text-xs opacity-80">({kidFriendlyCount})</span>
            </Badge>
          )}

          {/* Budget-Friendly Filter */}
          {budgetCount > 0 && (
            <Badge
              variant={showBudgetOnly ? "default" : "outline"}
              className={cn(
                "cursor-pointer transition-all hover:scale-105 px-3 py-1.5",
                showBudgetOnly 
                  ? "bg-lime-500 hover:bg-lime-600 text-white shadow-md" 
                  : "bg-background hover:bg-muted border-border"
              )}
              onClick={() => setShowBudgetOnly(!showBudgetOnly)}
            >
              <PiggyBank className="h-3.5 w-3.5 mr-1.5" />
              Budget Meals
              <span className="ml-1.5 text-xs opacity-80">({budgetCount})</span>
            </Badge>
          )}
        </div>
        {(showHolidayOnly || showSnacksOnly || showSaucesOnly || showMealPrepOnly || showOnePanOnly || showQuickEasyOnly || showSlowCookerOnly || showInstantPotOnly || showKidFriendlyOnly || showBudgetOnly) && (
          <p className="text-xs text-muted-foreground mt-2">
            {showQuickEasyOnly && "Showing recipes under 20 minutes with easy difficulty"}
            {showHolidayOnly && "Showing seasonal recipes perfect for the holidays"}
            {showSnacksOnly && "Showing dips, muffins, and finger foods"}
            {showSaucesOnly && "Showing homemade sauces, dips, and condiments"}
            {showMealPrepOnly && "Showing recipes that store well and can be made in bulk"}
            {showOnePanOnly && "Showing easy one-pan and sheet pan dinners"}
            {showSlowCookerOnly && "Showing slow cooker and crockpot recipes"}
            {showInstantPotOnly && "Showing Instant Pot and pressure cooker recipes"}
            {showKidFriendlyOnly && "Showing picky-eater approved kid favorites"}
            {showBudgetOnly && "Showing affordable meals under $10"}
          </p>
        )}
      </div>

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
        <TabsList className="w-full grid grid-cols-5 h-10 sm:h-12 bg-muted/50 p-0.5 sm:p-1 rounded-lg sm:rounded-xl mb-4 sm:mb-6">
          <TabsTrigger 
            value="breakfast" 
            className="rounded-md sm:rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm flex items-center justify-center gap-0.5 sm:gap-1 text-[10px] sm:text-sm px-1"
          >
            <Sunrise className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
            <span className="hidden sm:inline">Breakfast</span>
            <span className="text-[9px] sm:text-[10px] text-muted-foreground">({breakfastRecipes.length})</span>
          </TabsTrigger>
          <TabsTrigger 
            value="lunch" 
            className="rounded-md sm:rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm flex items-center justify-center gap-0.5 sm:gap-1 text-[10px] sm:text-sm px-1"
          >
            <Sun className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
            <span className="hidden sm:inline">Lunch</span>
            <span className="text-[9px] sm:text-[10px] text-muted-foreground">({lunchRecipes.length})</span>
          </TabsTrigger>
          <TabsTrigger 
            value="dinner" 
            className="rounded-md sm:rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm flex items-center justify-center gap-0.5 sm:gap-1 text-[10px] sm:text-sm px-1"
          >
            <Moon className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
            <span className="hidden sm:inline">Dinner</span>
            <span className="text-[9px] sm:text-[10px] text-muted-foreground">({dinnerRecipes.length})</span>
          </TabsTrigger>
          <TabsTrigger 
            value="dessert" 
            className="rounded-md sm:rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm flex items-center justify-center gap-0.5 sm:gap-1 text-[10px] sm:text-sm px-1"
          >
            <Cake className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
            <span className="hidden sm:inline">Dessert</span>
            <span className="text-[9px] sm:text-[10px] text-muted-foreground">({dessertRecipes.length})</span>
          </TabsTrigger>
          <TabsTrigger 
            value="sides" 
            className="rounded-md sm:rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm flex items-center justify-center gap-0.5 sm:gap-1 text-[10px] sm:text-sm px-1"
          >
            <Croissant className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
            <span className="hidden sm:inline">Sides</span>
            <span className="text-[9px] sm:text-[10px] text-muted-foreground">({sidesRecipes.length})</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="breakfast" className="mt-0">
          {renderRecipeList(breakfastRecipes, "breakfast")}
        </TabsContent>

        <TabsContent value="lunch" className="mt-0">
          {renderRecipeList(lunchRecipes, "lunch")}
        </TabsContent>

        <TabsContent value="dinner" className="mt-0">
          {renderRecipeList(dinnerRecipes, "dinner")}
        </TabsContent>

        <TabsContent value="dessert" className="mt-0">
          {renderRecipeList(dessertRecipes, "dessert")}
        </TabsContent>

        <TabsContent value="sides" className="mt-0">
          {renderRecipeList(sidesRecipes, "sides")}
        </TabsContent>
      </Tabs>
    </div>
  );
}