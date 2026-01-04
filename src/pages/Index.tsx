import { useState, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { IngredientSelector } from "@/components/IngredientSelector";
import { RecipeResults } from "@/components/RecipeResults";

import { DrinkIngredientSelector } from "@/components/DrinkIngredientSelector";
import { DrinkResults } from "@/components/DrinkResults";
import { MealCalendar } from "@/components/MealCalendar";
import { SavedRecipes } from "@/components/SavedRecipes";

import { ShoppingList } from "@/components/ShoppingList";
import { AddToCalendarDialog } from "@/components/AddToCalendarDialog";
import { AddToShoppingDialog } from "@/components/AddToShoppingDialog";
import { WelcomeTour } from "@/components/WelcomeTour";
import { InstallBanner } from "@/components/InstallBanner";
import { QuickTooltip } from "@/components/Tooltip";
import { RecipeDetailDialog } from "@/components/RecipeDetailDialog";
import { DrinkDetailDialog } from "@/components/DrinkDetailDialog";
import { UndoToast } from "@/components/UndoToast";
import { KeyboardShortcutsHelp } from "@/components/KeyboardShortcutsHelp";
import { RecentlyViewed } from "@/components/RecentlyViewed";
import { SmartSuggestions } from "@/components/SmartSuggestions";
import { WeeklyNutritionSummary } from "@/components/WeeklyNutritionSummary";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useAuth } from "@/hooks/useAuth";
import { useUserData, type ShoppingItem, type MealPlanEntry, type RecipeNotes } from "@/hooks/useUserData";

import { useUndo } from "@/hooks/useUndo";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { getRecipesForIngredients, sampleRecipes, type Recipe } from "@/data/recipes";
import { getDrinksForIngredients, sampleDrinks, type Drink } from "@/data/drinks";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Sparkles, Calendar, Heart, UtensilsCrossed, X, ShoppingCart, Wine, GlassWater, Search, Clock, Snowflake } from "lucide-react";
import { cn } from "@/lib/utils";

// Inline Lookup Results Component
interface LookupResultsProps {
  search: string;
  onAddToShopping: (ingredients: string[]) => void;
  onClear: () => void;
  savedRecipes: string[];
  onSave: (recipeId: string) => void;
  onAddToCalendar: (recipe: Recipe) => void;
}

function LookupResults({ search, onAddToShopping, onClear, savedRecipes, onSave, onAddToCalendar }: LookupResultsProps) {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  
  const matchingRecipes = sampleRecipes
    .filter(r => r.title.toLowerCase().includes(search.toLowerCase()))
    .slice(0, 5);

  const mealTypeColors: Record<string, string> = {
    breakfast: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
    lunch: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
    dinner: "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300",
    dessert: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
    sides: "bg-stone-100 text-stone-800 dark:bg-stone-900/30 dark:text-stone-300",
  };

  if (matchingRecipes.length === 0) {
    return (
      <div className="absolute z-50 w-full mt-2 p-4 rounded-xl bg-card border border-border shadow-elevated text-center">
        <p className="text-muted-foreground text-sm">No recipes found for "{search}"</p>
      </div>
    );
  }

  return (
    <>
      <div className="absolute z-50 w-full mt-2 rounded-xl bg-card border border-border shadow-elevated overflow-hidden max-h-[400px] overflow-y-auto">
        {matchingRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="p-3 hover:bg-muted/50 transition-colors border-b border-border/50 last:border-0 cursor-pointer"
            onClick={() => setSelectedRecipe(recipe)}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <Badge className={cn("text-xs", mealTypeColors[recipe.mealType])}>
                  {recipe.mealType}
                </Badge>
                <span className="font-medium text-sm">{recipe.title}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {recipe.cookTime}
              </div>
            </div>
            <div className="flex flex-wrap gap-1 mb-2">
              {recipe.ingredients.slice(0, 6).map((ing) => (
                <Badge key={ing} variant="outline" className="text-[10px] capitalize">
                  {ing.replace(/-/g, " ")}
                </Badge>
              ))}
              {recipe.ingredients.length > 6 && (
                <Badge variant="outline" className="text-[10px]">+{recipe.ingredients.length - 6} more</Badge>
              )}
            </div>
            <Button
              size="sm"
              variant="warm"
              className="w-full h-8 text-xs"
              onClick={(e) => {
                e.stopPropagation();
                onAddToShopping(recipe.ingredients);
                onClear();
              }}
            >
              <ShoppingCart className="h-3 w-3 mr-1" />
              Add {recipe.ingredients.length} ingredients to list
            </Button>
          </div>
        ))}
      </div>

      {selectedRecipe && (
        <RecipeDetailDialog
          recipe={{
            ...selectedRecipe,
            matchedIngredients: [],
            matchedKeyIngredients: []
          }}
          open={!!selectedRecipe}
          onOpenChange={(open) => !open && setSelectedRecipe(null)}
          isSaved={savedRecipes.includes(selectedRecipe.id)}
          onSave={() => onSave(selectedRecipe.id)}
          onAddToCalendar={() => onAddToCalendar(selectedRecipe)}
          onAddToShopping={(ing) => onAddToShopping([ing])}
        />
      )}
    </>
  );
}

// Inline Drink Lookup Results Component
interface DrinkLookupResultsProps {
  search: string;
  onAddToShopping: (ingredients: string[]) => void;
  onClear: () => void;
  savedDrinks: string[];
  onSave: (drinkId: string) => void;
}

function DrinkLookupResults({ search, onAddToShopping, onClear, savedDrinks, onSave }: DrinkLookupResultsProps) {
  const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null);
  
  const matchingDrinks = sampleDrinks
    .filter(d => d.title.toLowerCase().includes(search.toLowerCase()))
    .slice(0, 5);

  const drinkTypeColors: Record<string, string> = {
    cocktail: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300",
    mocktail: "bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300",
    smoothie: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    wellness: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  };

  if (matchingDrinks.length === 0) {
    return (
      <div className="absolute z-50 w-full mt-2 p-4 rounded-xl bg-card border border-border shadow-elevated text-center">
        <p className="text-muted-foreground text-sm">No drinks found for "{search}"</p>
      </div>
    );
  }

  return (
    <>
      <div className="absolute z-50 w-full mt-2 rounded-xl bg-card border border-border shadow-elevated overflow-hidden max-h-[400px] overflow-y-auto">
        {matchingDrinks.map((drink) => (
          <div
            key={drink.id}
            className="p-3 hover:bg-muted/50 transition-colors border-b border-border/50 last:border-0 cursor-pointer"
            onClick={() => setSelectedDrink(drink)}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <Badge className={cn("text-xs capitalize", drinkTypeColors[drink.drinkType])}>
                  {drink.drinkType}
                </Badge>
                <span className="font-medium text-sm">{drink.title}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {drink.prepTime}
              </div>
            </div>
            <div className="flex flex-wrap gap-1 mb-2">
              {drink.ingredients.slice(0, 6).map((ing) => (
                <Badge key={ing} variant="outline" className="text-[10px] capitalize">
                  {ing.replace(/-/g, " ")}
                </Badge>
              ))}
              {drink.ingredients.length > 6 && (
                <Badge variant="outline" className="text-[10px]">+{drink.ingredients.length - 6} more</Badge>
              )}
            </div>
            <Button
              size="sm"
              variant="warm"
              className="w-full h-8 text-xs"
              onClick={(e) => {
                e.stopPropagation();
                onAddToShopping(drink.ingredients);
                onClear();
              }}
            >
              <ShoppingCart className="h-3 w-3 mr-1" />
              Add {drink.ingredients.length} ingredients to list
            </Button>
          </div>
        ))}
      </div>

      {selectedDrink && (
        <DrinkDetailDialog
          drink={{
            ...selectedDrink,
            matchedIngredients: [],
            matchedKeyIngredients: []
          }}
          open={!!selectedDrink}
          onOpenChange={(open) => !open && setSelectedDrink(null)}
          isSaved={savedDrinks.includes(selectedDrink.id)}
          onSave={() => onSave(selectedDrink.id)}
        />
      )}
    </>
  );
}

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();
  const {
    savedRecipes,
    savedDrinks,
    mealPlan,
    shoppingList,
    recipeNotes,
    loading: dataLoading,
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
  } = useUserData();
  
  const { pendingAction, addUndoAction, executeUndo, dismissUndo, hasUndo } = useUndo();
  const { recentlyViewed, addRecentlyViewed, clearRecentlyViewed } = useRecentlyViewed();
  const [recentViewedRecipe, setRecentViewedRecipe] = useState<Recipe | null>(null);
  const [sharedRecipeDialog, setSharedRecipeDialog] = useState<Recipe | null>(null);

  // Handle shared recipe URL
  useEffect(() => {
    const recipeId = searchParams.get('recipe');
    if (recipeId) {
      const recipe = sampleRecipes.find(r => r.id === recipeId);
      if (recipe) {
        setSharedRecipeDialog(recipe);
        addRecentlyViewed(recipeId);
        // Clear the URL param without refreshing
        setSearchParams({}, { replace: true });
      }
    }
  }, [searchParams, setSearchParams, addRecentlyViewed]);

  // Mode switching (Cook vs Drink)
  const [appMode, setAppMode] = useState<"cook" | "drink">("cook");
  
  // Cook mode state
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [showRecipes, setShowRecipes] = useState(false);
  const [recipeSearch, setRecipeSearch] = useState("");
  
  // Drink mode state
  const [selectedDrinkIngredients, setSelectedDrinkIngredients] = useState<string[]>([]);
  const [showDrinks, setShowDrinks] = useState(false);
  const [drinkSearch, setDrinkSearch] = useState("");
  
  // Shared state
  const [calendarDialogRecipe, setCalendarDialogRecipe] = useState<Recipe | null>(null);
  const [shoppingDialogIngredient, setShoppingDialogIngredient] = useState<string | null>(null);
  const [hasSeenTour, setHasSeenTour] = useLocalStorage<boolean>("hasSeenTour", false);
  const [showTour, setShowTour] = useState(!hasSeenTour);
  const [activeTab, setActiveTab] = useState("ingredients");
  const [showShortcutsHelp, setShowShortcutsHelp] = useState(false);

  // Keyboard shortcuts
  useKeyboardShortcuts([
    { key: 's', action: () => setActiveTab('shopping'), description: 'Shopping list' },
    { key: 'm', action: () => setActiveTab('calendar'), description: 'Meal plan' },
    { key: 'r', action: () => setActiveTab('saved'), description: 'Saved recipes' },
    { key: 'i', action: () => setActiveTab('ingredients'), description: 'Ingredients' },
    { key: '?', action: () => setShowShortcutsHelp(true), description: 'Show help' },
    { key: 'Escape', action: () => {
      setCalendarDialogRecipe(null);
      setShoppingDialogIngredient(null);
      setShowShortcutsHelp(false);
    }, description: 'Close dialogs' },
  ]);

  const allRecipes = getRecipesForIngredients(selectedIngredients);
  const allDrinks = getDrinksForIngredients(selectedDrinkIngredients);
  
  // Filter by search
  const recipes = allRecipes.filter(r => 
    r.title.toLowerCase().includes(recipeSearch.toLowerCase())
  );
  const drinks = allDrinks.filter(d => 
    d.title.toLowerCase().includes(drinkSearch.toLowerCase())
  );

  // Cook mode handlers
  const handleToggleIngredient = (id: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleClearAll = () => {
    setSelectedIngredients([]);
    setShowRecipes(false);
  };

  const handleGenerateRecipes = () => {
    if (selectedIngredients.length === 0) {
      toast({
        title: "No ingredients selected",
        description: "Please select at least one ingredient to generate recipes.",
        variant: "destructive",
      });
      return;
    }
    setShowRecipes(true);
    toast({
      title: "Recipes found!",
      description: `Found ${recipes.length} recipes matching your ingredients.`,
    });
  };

  // Drink mode handlers
  const handleToggleDrinkIngredient = (id: string) => {
    setSelectedDrinkIngredients((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleClearAllDrinks = () => {
    setSelectedDrinkIngredients([]);
    setShowDrinks(false);
  };

  const handleGenerateDrinks = () => {
    if (selectedDrinkIngredients.length === 0) {
      toast({
        title: "No ingredients selected",
        description: "Please select at least one ingredient to find drinks.",
        variant: "destructive",
      });
      return;
    }
    setShowDrinks(true);
    toast({
      title: "Drinks found!",
      description: `Found ${drinks.length} drinks matching your ingredients.`,
    });
  };

  const handleSaveDrink = async (drinkId: string) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save drinks.",
        variant: "destructive",
      });
      return;
    }
    const isSaving = !savedDrinks.includes(drinkId);
    await saveDrink(drinkId);
    toast({
      title: isSaving ? "Drink saved!" : "Drink removed",
      description: isSaving
        ? "You can find it in your saved recipes."
        : "Drink removed from saved list.",
    });
  };

  // Shared handlers
  const handleSaveRecipe = async (recipeId: string) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save recipes.",
        variant: "destructive",
      });
      return;
    }
    const isSaving = !savedRecipes.includes(recipeId);
    await saveRecipe(recipeId);
    toast({
      title: isSaving ? "Recipe saved!" : "Recipe removed",
      description: isSaving
        ? "You can find it in your saved recipes."
        : "Recipe removed from saved list.",
    });
  };

  const handleAddToCalendar = (recipe: Recipe) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to use the meal planner.",
        variant: "destructive",
      });
      return;
    }
    setCalendarDialogRecipe(recipe);
  };

  const handleConfirmCalendarAdd = async (date: Date) => {
    if (!calendarDialogRecipe) return;
    
    await addToMealPlan(format(date, "yyyy-MM-dd"), calendarDialogRecipe);
    toast({
      title: "Added to meal plan!",
      description: `${calendarDialogRecipe.title} added for ${format(date, "EEEE, MMM d")}.`,
    });
    setCalendarDialogRecipe(null);
  };

  const handleRemoveFromCalendar = useCallback(async (date: string, recipeId: string) => {
    // Find the meal entry for undo
    const mealEntry = mealPlan.find(m => m.date === date && m.recipe.id === recipeId);
    
    await removeFromMealPlan(date, recipeId);
    
    if (mealEntry) {
      addUndoAction({
        id: `meal-${date}-${recipeId}`,
        description: `Restored "${mealEntry.recipe.title}" to meal plan`,
        data: mealEntry,
        undo: async () => {
          await addToMealPlan(date, mealEntry.recipe);
        }
      });
    }
    
    toast({
      title: "Removed from meal plan",
      description: "The recipe has been removed. Undo available for 5 seconds.",
    });
  }, [mealPlan, removeFromMealPlan, addToMealPlan, addUndoAction]);

  const handleAddToShopping = (ingredientId: string) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to use the shopping list.",
        variant: "destructive",
      });
      return;
    }
    setShoppingDialogIngredient(ingredientId);
  };

  const handleConfirmShoppingAdd = async (ingredientId: string, variant: string) => {
    const exists = shoppingList.some(item => item.variant === variant);
    if (exists) {
      toast({
        title: "Already in list",
        description: `${variant} is already in your shopping list.`,
      });
      return;
    }
    
    await addToShoppingList(ingredientId, variant);
    toast({
      title: "Added to shopping list",
      description: `${variant} has been added to your list.`,
    });
  };

  const handleToggleShoppingItem = async (id: string) => {
    await toggleShoppingItem(id);
  };

  const handleRemoveShoppingItem = useCallback(async (id: string) => {
    // Find the item for undo
    const item = shoppingList.find(i => i.id === id);
    
    await removeFromShoppingList(id);
    
    if (item) {
      addUndoAction({
        id: `shopping-${id}`,
        description: `Restored "${item.variant}" to shopping list`,
        data: item,
        undo: async () => {
          await addToShoppingList(item.ingredientId, item.variant);
        }
      });
    }
  }, [shoppingList, removeFromShoppingList, addToShoppingList, addUndoAction]);

  const handleClearCompletedShopping = async () => {
    // Remove checked items one by one
    const checkedItems = shoppingList.filter(item => item.checked);
    for (const item of checkedItems) {
      await removeFromShoppingList(item.id);
    }
    toast({
      title: "Cleared completed items",
      description: "All checked items have been removed.",
    });
  };

  const handleClearAllShopping = async () => {
    await clearShoppingList();
    toast({
      title: "Shopping list cleared",
      description: "All items have been removed.",
    });
  };

  const handleBulkAddToShopping = async (ingredients: string[]) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to use the shopping list.",
        variant: "destructive",
      });
      return;
    }
    
    let addedCount = 0;
    
    for (const ing of ingredients) {
      const variant = ing.replace(/-/g, " ");
      const formattedVariant = variant.charAt(0).toUpperCase() + variant.slice(1);
      const exists = shoppingList.some(item => item.variant.toLowerCase() === variant.toLowerCase());
      if (!exists) {
        await addToShoppingList(ing, formattedVariant);
        addedCount++;
      }
    }
    
    if (addedCount > 0) {
      toast({
        title: "Added to shopping list!",
        description: `${addedCount} ingredient${addedCount > 1 ? 's' : ''} added to your list.`,
      });
    } else {
      toast({
        title: "Already in list",
        description: "All these ingredients are already in your shopping list.",
      });
    }
  };

  const handleCompleteTour = () => {
    setShowTour(false);
    setHasSeenTour(true);
    toast({
      title: "Welcome aboard! 🎉",
      description: "Start by selecting ingredients from your kitchen.",
    });
  };

  const handleSkipTour = () => {
    setShowTour(false);
    setHasSeenTour(true);
  };

  return (
    <div className="min-h-screen gradient-glow">
      {showTour && (
        <WelcomeTour onComplete={handleCompleteTour} onSkip={handleSkipTour} />
      )}
      
      <InstallBanner />
      
      <Header onShowTour={() => setShowTour(true)} />

      <main className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Top-level Cook/Drink toggle */}
        <div className="flex flex-col items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="inline-flex p-1 sm:p-1.5 rounded-xl sm:rounded-2xl glass shadow-soft">
            <button
              onClick={() => setAppMode("cook")}
              className={cn(
                "flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base",
                appMode === "cook"
                  ? "bg-card shadow-md text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <UtensilsCrossed className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Plate</span>
            </button>
            <button
              onClick={() => setAppMode("drink")}
              className={cn(
                "flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base",
                appMode === "drink"
                  ? "bg-card shadow-md text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Wine className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Glass</span>
            </button>
          </div>
          
          {/* Recipe/Drink Lookup */}
          <div className="w-full max-w-lg">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={appMode === "cook" 
                  ? "Look up a recipe (e.g., chicken cutlet)..." 
                  : "Look up a drink (e.g., margarita)..."}
                value={appMode === "cook" ? recipeSearch : drinkSearch}
                onChange={(e) => appMode === "cook" ? setRecipeSearch(e.target.value) : setDrinkSearch(e.target.value)}
                className="pl-9 pr-9 bg-card/90 border-border/50 rounded-xl"
              />
              {((appMode === "cook" && recipeSearch) || (appMode === "drink" && drinkSearch)) && (
                <button
                  onClick={() => appMode === "cook" ? setRecipeSearch("") : setDrinkSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            
            {/* Lookup Results Dropdown */}
            {appMode === "cook" && recipeSearch.trim().length >= 2 && (
              <LookupResults 
                search={recipeSearch} 
                onAddToShopping={handleBulkAddToShopping}
                onClear={() => setRecipeSearch("")}
                savedRecipes={savedRecipes}
                onSave={handleSaveRecipe}
                onAddToCalendar={handleAddToCalendar}
              />
            )}
            {appMode === "drink" && drinkSearch.trim().length >= 2 && (
              <DrinkLookupResults 
                search={drinkSearch} 
                onAddToShopping={handleBulkAddToShopping}
                onClear={() => setDrinkSearch("")}
                savedDrinks={savedDrinks}
                onSave={handleSaveDrink}
              />
            )}
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6 sm:space-y-8">
          <TabsList className="w-full max-w-2xl mx-auto grid grid-cols-4 h-12 sm:h-14 glass p-1 sm:p-1.5 rounded-xl sm:rounded-2xl shadow-soft">
            <QuickTooltip content={appMode === "cook" ? "Select ingredients & find recipes" : "Select ingredients & find drinks"} side="bottom">
              <TabsTrigger value="ingredients" aria-label={appMode === "cook" ? "Cook - Select ingredients and find recipes" : "Mix - Select ingredients and find drinks"} className="rounded-lg sm:rounded-xl data-[state=active]:bg-card data-[state=active]:shadow-md data-[state=active]:text-primary flex items-center justify-center gap-1 sm:gap-2 font-semibold transition-all duration-300 text-xs sm:text-sm px-1 sm:px-3">
                {appMode === "cook" ? <UtensilsCrossed className="h-4 w-4 shrink-0" /> : <GlassWater className="h-4 w-4 shrink-0" />}
                <span className="hidden sm:inline">{appMode === "cook" ? "Cook" : "Mix"}</span>
              </TabsTrigger>
            </QuickTooltip>
            <QuickTooltip content="Plan your weekly meals" side="bottom">
              <TabsTrigger value="calendar" aria-label="Plan - Plan your weekly meals" className="rounded-lg sm:rounded-xl data-[state=active]:bg-card data-[state=active]:shadow-md data-[state=active]:text-primary flex items-center justify-center gap-1 sm:gap-2 font-semibold transition-all duration-300 text-xs sm:text-sm px-1 sm:px-3 relative">
                <Calendar className="h-4 w-4 shrink-0" />
                <span className="hidden sm:inline">Plan</span>
                {mealPlan.length > 0 && (
                  <Badge className="h-4 sm:h-5 min-w-4 sm:min-w-5 p-0 text-[9px] sm:text-[10px] flex items-center justify-center bg-secondary text-secondary-foreground ml-0.5 sm:ml-1">
                    {mealPlan.length}
                  </Badge>
                )}
              </TabsTrigger>
            </QuickTooltip>
            <QuickTooltip content="Your favorite recipes" side="bottom">
              <TabsTrigger value="saved" aria-label="Saved - Your favorite recipes" className="rounded-lg sm:rounded-xl data-[state=active]:bg-card data-[state=active]:shadow-md data-[state=active]:text-primary flex items-center justify-center gap-1 sm:gap-2 font-semibold transition-all duration-300 text-xs sm:text-sm px-1 sm:px-3 relative">
                <Heart className="h-4 w-4 shrink-0" />
                <span className="hidden sm:inline">Saved</span>
                {(savedRecipes.length + savedDrinks.length) > 0 && (
                  <Badge className="h-4 sm:h-5 min-w-4 sm:min-w-5 p-0 text-[9px] sm:text-[10px] flex items-center justify-center bg-primary/20 text-primary ml-0.5 sm:ml-1">
                    {savedRecipes.length + savedDrinks.length}
                  </Badge>
                )}
              </TabsTrigger>
            </QuickTooltip>
            <QuickTooltip content="Your shopping list" side="bottom">
              <TabsTrigger value="shopping" aria-label="Shop - Your shopping list" className="rounded-lg sm:rounded-xl data-[state=active]:bg-card data-[state=active]:shadow-md data-[state=active]:text-primary flex items-center justify-center gap-1 sm:gap-2 font-semibold transition-all duration-300 text-xs sm:text-sm px-1 sm:px-3 relative">
                <ShoppingCart className="h-4 w-4 shrink-0" />
                <span className="hidden sm:inline">Shop</span>
                {shoppingList.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 sm:-top-1.5 sm:-right-1.5 h-4 sm:h-5 min-w-4 sm:min-w-5 p-0 text-[9px] sm:text-[10px] flex items-center justify-center gradient-warm border-2 border-background">
                    {shoppingList.length}
                  </Badge>
                )}
              </TabsTrigger>
            </QuickTooltip>
          </TabsList>

          <TabsContent value="ingredients" className="space-y-8 mt-8 animate-fade-in">
            {/* Recently Viewed Section */}
            {appMode === "cook" && recentlyViewed.length > 0 && (
              <RecentlyViewed
                recentIds={recentlyViewed}
                onClear={clearRecentlyViewed}
                onViewRecipe={(recipe) => {
                  setRecentViewedRecipe(recipe);
                  addRecentlyViewed(recipe.id);
                }}
                savedRecipes={savedRecipes}
                onSaveRecipe={handleSaveRecipe}
                onAddToCalendar={handleAddToCalendar}
              />
            )}

            {appMode === "cook" ? (
              // COOK MODE
            <div className="grid gap-4 lg:grid-cols-2">
                <Card className="shadow-elevated border-border/50 bg-card/90 backdrop-blur-sm overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 gradient-warm" />
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="font-serif text-2xl">What's in your kitchen?</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">Select ingredients to find matching recipes</p>
                      </div>
                      {selectedIngredients.length > 0 && (
                        <Button variant="ghost" size="sm" onClick={handleClearAll} className="text-muted-foreground hover:text-destructive">
                          Clear all
                        </Button>
                      )}
                    </div>
                    {selectedIngredients.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border/50">
                        {selectedIngredients.slice(0, 8).map((id, index) => (
                          <Badge
                            key={id}
                            variant="secondary"
                            className={cn(
                              "capitalize cursor-pointer transition-all duration-200 hover:bg-destructive hover:text-destructive-foreground group px-3 py-1",
                              `stagger-${Math.min(index + 1, 5)}`
                            )}
                            onClick={() => handleToggleIngredient(id)}
                          >
                            {id.replace("-", " ")}
                            <X className="h-3 w-3 ml-1.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                          </Badge>
                        ))}
                        {selectedIngredients.length > 8 && (
                          <Badge variant="outline" className="px-3">+{selectedIngredients.length - 8} more</Badge>
                        )}
                      </div>
                    )}
                  </CardHeader>
                  <CardContent>
                    <IngredientSelector
                      selectedIngredients={selectedIngredients}
                      onToggle={handleToggleIngredient}
                    />
                    
                    <div className="mt-6 pt-6 border-t border-border/50">
                      <Button
                        variant="warm"
                        size="xl"
                        className="w-full"
                        onClick={handleGenerateRecipes}
                        disabled={selectedIngredients.length === 0}
                      >
                        <Sparkles className="h-5 w-5 mr-2" />
                        Find Recipes ({selectedIngredients.length} ingredients)
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  {showRecipes ? (
                    <RecipeResults
                      recipes={recipes}
                      savedRecipes={savedRecipes}
                      onSave={handleSaveRecipe}
                      onAddToCalendar={handleAddToCalendar}
                      onAddToShopping={handleAddToShopping}
                      onViewRecipe={(recipe) => addRecentlyViewed(recipe.id)}
                      loading={dataLoading}
                    />
                  ) : (
                    <Card className="shadow-elevated border-border/50 bg-card/90 backdrop-blur-sm">
                      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="relative mb-6">
                          <div className="absolute inset-0 gradient-warm blur-2xl opacity-30 animate-pulse-soft" />
                          <div className="relative p-5 rounded-3xl gradient-warm shadow-warm">
                            <Sparkles className="h-10 w-10 text-primary-foreground" />
                          </div>
                        </div>
                        <h3 className="font-serif text-2xl font-semibold mb-3">
                          Ready to cook?
                        </h3>
                        <p className="text-muted-foreground max-w-sm leading-relaxed">
                          Select ingredients or use the search above to look up any recipe and build your shopping list!
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            ) : (
              // DRINK MODE
              <div className="grid gap-4 lg:grid-cols-2">
                <Card className="shadow-elevated border-border/50 bg-card/90 backdrop-blur-sm overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 gradient-warm" />
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="font-serif text-2xl">What's in your bar?</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">Select spirits, mixers & garnishes</p>
                      </div>
                      {selectedDrinkIngredients.length > 0 && (
                        <Button variant="ghost" size="sm" onClick={handleClearAllDrinks} className="text-muted-foreground hover:text-destructive">
                          Clear all
                        </Button>
                      )}
                    </div>
                    {selectedDrinkIngredients.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border/50">
                        {selectedDrinkIngredients.slice(0, 8).map((id, index) => (
                          <Badge
                            key={id}
                            variant="secondary"
                            className={cn(
                              "capitalize cursor-pointer transition-all duration-200 hover:bg-destructive hover:text-destructive-foreground group px-3 py-1",
                              `stagger-${Math.min(index + 1, 5)}`
                            )}
                            onClick={() => handleToggleDrinkIngredient(id)}
                          >
                            {id.replace("-", " ")}
                            <X className="h-3 w-3 ml-1.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                          </Badge>
                        ))}
                        {selectedDrinkIngredients.length > 8 && (
                          <Badge variant="outline" className="px-3">+{selectedDrinkIngredients.length - 8} more</Badge>
                        )}
                      </div>
                    )}
                  </CardHeader>
                  <CardContent>
                    <DrinkIngredientSelector
                      selectedIngredients={selectedDrinkIngredients}
                      onToggle={handleToggleDrinkIngredient}
                    />
                    
                    <div className="mt-6 pt-6 border-t border-border/50">
                      <Button
                        variant="warm"
                        size="xl"
                        className="w-full"
                        onClick={handleGenerateDrinks}
                        disabled={selectedDrinkIngredients.length === 0}
                      >
                        <Sparkles className="h-5 w-5 mr-2" />
                        Find Drinks ({selectedDrinkIngredients.length} ingredients)
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                

                <div className="space-y-4">
                  {showDrinks ? (
                    <DrinkResults
                      drinks={drinks}
                      savedDrinks={savedDrinks}
                      onSave={handleSaveDrink}
                      loading={dataLoading}
                    />
                  ) : (
                    <Card className="shadow-elevated border-border/50 bg-card/90 backdrop-blur-sm">
                      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="relative mb-6">
                          <div className="absolute inset-0 gradient-warm blur-2xl opacity-30 animate-pulse-soft" />
                          <div className="relative p-5 rounded-3xl gradient-warm shadow-warm">
                            <Wine className="h-10 w-10 text-primary-foreground" />
                          </div>
                        </div>
                        <h3 className="font-serif text-2xl font-semibold mb-3">
                          Ready to mix?
                        </h3>
                        <p className="text-muted-foreground max-w-sm leading-relaxed">
                          Select ingredients or use the search above to look up any drink and build your shopping list!
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="calendar" className="mt-6 space-y-8">
            {/* Regular Meal Calendar */}
            <MealCalendar 
              mealPlan={mealPlan} 
              onRemove={handleRemoveFromCalendar}
              onMoveMeal={moveMeal}
              onAddToShopping={handleAddToShopping}
              savedRecipes={savedRecipes}
              onSaveRecipe={handleSaveRecipe}
              onAddToCalendar={handleAddToCalendar}
            />

            {/* Weekly Nutrition Summary */}
            <WeeklyNutritionSummary mealPlan={mealPlan} />
          </TabsContent>

          <TabsContent value="saved" className="mt-6 space-y-6">
            {/* Smart Suggestions */}
            <SmartSuggestions
              savedRecipeIds={savedRecipes}
              onSaveRecipe={handleSaveRecipe}
              onAddToCalendar={handleAddToCalendar}
              onAddToShopping={handleAddToShopping}
            />
            
            <SavedRecipes 
              savedRecipeIds={savedRecipes} 
              savedDrinkIds={savedDrinks}
              onRemoveRecipe={handleSaveRecipe} 
              onRemoveDrink={handleSaveDrink}
              recipeNotes={recipeNotes}
              onSaveNote={async (recipeId, note) => {
                await updateRecipeNotes(recipeId, note);
              }}
            />
          </TabsContent>


          <TabsContent value="shopping" className="mt-6">
            <ShoppingList
              items={shoppingList}
              onToggleItem={handleToggleShoppingItem}
              onRemoveItem={handleRemoveShoppingItem}
              onClearCompleted={handleClearCompletedShopping}
              onClearAll={handleClearAllShopping}
            />
          </TabsContent>
        </Tabs>
      </main>

      <AddToCalendarDialog
        recipe={calendarDialogRecipe}
        open={!!calendarDialogRecipe}
        onOpenChange={(open) => !open && setCalendarDialogRecipe(null)}
        onConfirm={handleConfirmCalendarAdd}
      />

      <AddToShoppingDialog
        open={!!shoppingDialogIngredient}
        onOpenChange={(open) => !open && setShoppingDialogIngredient(null)}
        ingredientId={shoppingDialogIngredient || ""}
        onConfirm={handleConfirmShoppingAdd}
      />

      <KeyboardShortcutsHelp 
        open={showShortcutsHelp} 
        onOpenChange={setShowShortcutsHelp} 
      />

      {hasUndo && pendingAction && (
        <UndoToast
          message={`Item removed`}
          onUndo={executeUndo}
          onDismiss={dismissUndo}
        />
      )}

      {/* Dialog for viewing recently viewed recipes */}
      {recentViewedRecipe && (
        <RecipeDetailDialog
          recipe={{
            ...recentViewedRecipe,
            matchedIngredients: [],
            matchedKeyIngredients: []
          }}
          open={!!recentViewedRecipe}
          onOpenChange={(open) => !open && setRecentViewedRecipe(null)}
          isSaved={savedRecipes.includes(recentViewedRecipe.id)}
          onSave={() => handleSaveRecipe(recentViewedRecipe.id)}
          onAddToCalendar={() => handleAddToCalendar(recentViewedRecipe)}
          onAddToShopping={handleAddToShopping}
        />
      )}

      {/* Dialog for shared recipe links */}
      {sharedRecipeDialog && (
        <RecipeDetailDialog
          recipe={{
            ...sharedRecipeDialog,
            matchedIngredients: [],
            matchedKeyIngredients: []
          }}
          open={!!sharedRecipeDialog}
          onOpenChange={(open) => !open && setSharedRecipeDialog(null)}
          isSaved={savedRecipes.includes(sharedRecipeDialog.id)}
          onSave={() => handleSaveRecipe(sharedRecipeDialog.id)}
          onAddToCalendar={() => handleAddToCalendar(sharedRecipeDialog)}
          onAddToShopping={handleAddToShopping}
        />
      )}
    </div>
  );
};

export default Index;
