import { useState } from "react";
import { Header } from "@/components/Header";
import { IngredientSelector } from "@/components/IngredientSelector";
import { RecipeResults } from "@/components/RecipeResults";

import { DrinkIngredientSelector } from "@/components/DrinkIngredientSelector";
import { DrinkResults } from "@/components/DrinkResults";
import { DrinkLookup } from "@/components/DrinkLookup";
import { MealCalendar, type MealPlanEntry } from "@/components/MealCalendar";
import { SavedRecipes, type RecipeNotes } from "@/components/SavedRecipes";
import { ShoppingList, type ShoppingItem } from "@/components/ShoppingList";
import { AddToCalendarDialog } from "@/components/AddToCalendarDialog";
import { AddToShoppingDialog } from "@/components/AddToShoppingDialog";
import { WelcomeTour } from "@/components/WelcomeTour";
import { QuickTooltip } from "@/components/Tooltip";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { getRecipesForIngredients, sampleRecipes, type Recipe } from "@/data/recipes";
import { getDrinksForIngredients } from "@/data/drinks";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Sparkles, Calendar, Heart, ChefHat, X, ShoppingCart, Wine, GlassWater, Search, Clock, Users } from "lucide-react";
import { cn } from "@/lib/utils";

// Inline Lookup Results Component
interface LookupResultsProps {
  search: string;
  onAddToShopping: (ingredients: string[]) => void;
  onClear: () => void;
}

function LookupResults({ search, onAddToShopping, onClear }: LookupResultsProps) {
  const matchingRecipes = sampleRecipes
    .filter(r => r.title.toLowerCase().includes(search.toLowerCase()))
    .slice(0, 5);

  const mealTypeColors = {
    breakfast: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
    lunch: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
    dinner: "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300",
  };

  if (matchingRecipes.length === 0) {
    return (
      <div className="absolute z-50 w-full mt-2 p-4 rounded-xl bg-card border border-border shadow-elevated text-center">
        <p className="text-muted-foreground text-sm">No recipes found for "{search}"</p>
      </div>
    );
  }

  return (
    <div className="absolute z-50 w-full mt-2 rounded-xl bg-card border border-border shadow-elevated overflow-hidden max-h-[400px] overflow-y-auto">
      {matchingRecipes.map((recipe) => (
        <div
          key={recipe.id}
          className="p-3 hover:bg-muted/50 transition-colors border-b border-border/50 last:border-0"
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
            onClick={() => {
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
  );
}

const Index = () => {
  // Mode switching (Cook vs Drink)
  const [appMode, setAppMode] = useState<"cook" | "drink">("cook");
  
  // Cook mode state
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [showRecipes, setShowRecipes] = useState(false);
  const [savedRecipes, setSavedRecipes] = useLocalStorage<string[]>("savedRecipes", []);
  const [recipeSearch, setRecipeSearch] = useState("");
  
  // Drink mode state
  const [selectedDrinkIngredients, setSelectedDrinkIngredients] = useState<string[]>([]);
  const [showDrinks, setShowDrinks] = useState(false);
  const [drinkSearch, setDrinkSearch] = useState("");
  const [savedDrinks, setSavedDrinks] = useLocalStorage<string[]>("savedDrinks", []);
  const [recipeNotes, setRecipeNotes] = useLocalStorage<RecipeNotes>("recipeNotes", {});
  
  // Shared state
  const [mealPlan, setMealPlan] = useLocalStorage<MealPlanEntry[]>("mealPlan", []);
  const [shoppingList, setShoppingList] = useLocalStorage<ShoppingItem[]>("shoppingList", []);
  const [calendarDialogRecipe, setCalendarDialogRecipe] = useState<Recipe | null>(null);
  const [shoppingDialogIngredient, setShoppingDialogIngredient] = useState<string | null>(null);
  const [hasSeenTour, setHasSeenTour] = useLocalStorage<boolean>("hasSeenTour", false);
  const [showTour, setShowTour] = useState(!hasSeenTour);
  const [activeTab, setActiveTab] = useState("ingredients");

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

  const handleSaveDrink = (drinkId: string) => {
    setSavedDrinks((prev) =>
      prev.includes(drinkId)
        ? prev.filter((id) => id !== drinkId)
        : [...prev, drinkId]
    );
    const isSaving = !savedDrinks.includes(drinkId);
    toast({
      title: isSaving ? "Drink saved!" : "Drink removed",
      description: isSaving
        ? "You can find it in your saved recipes."
        : "Drink removed from saved list.",
    });
  };

  // Shared handlers
  const handleSaveRecipe = (recipeId: string) => {
    setSavedRecipes((prev) =>
      prev.includes(recipeId)
        ? prev.filter((id) => id !== recipeId)
        : [...prev, recipeId]
    );
    const isSaving = !savedRecipes.includes(recipeId);
    toast({
      title: isSaving ? "Recipe saved!" : "Recipe removed",
      description: isSaving
        ? "You can find it in your saved recipes."
        : "Recipe removed from saved list.",
    });
  };

  const handleAddToCalendar = (recipe: Recipe) => {
    setCalendarDialogRecipe(recipe);
  };

  const handleConfirmCalendarAdd = (date: Date) => {
    if (!calendarDialogRecipe) return;
    
    const entry: MealPlanEntry = {
      date: format(date, "yyyy-MM-dd"),
      recipe: calendarDialogRecipe,
    };
    
    setMealPlan((prev) => [...prev, entry]);
    toast({
      title: "Added to meal plan!",
      description: `${calendarDialogRecipe.title} added for ${format(date, "EEEE, MMM d")}.`,
    });
    setCalendarDialogRecipe(null);
  };

  const handleRemoveFromCalendar = (date: string, recipeId: string) => {
    setMealPlan((prev) =>
      prev.filter((entry) => !(entry.date === date && entry.recipe.id === recipeId))
    );
    toast({
      title: "Removed from meal plan",
      description: "The recipe has been removed from your calendar.",
    });
  };

  const handleAddToShopping = (ingredientId: string) => {
    setShoppingDialogIngredient(ingredientId);
  };

  const handleConfirmShoppingAdd = (ingredientId: string, variant: string) => {
    const newItem: ShoppingItem = {
      id: `${ingredientId}-${Date.now()}`,
      ingredientId,
      variant,
      checked: false,
    };
    
    const exists = shoppingList.some(item => item.variant === variant);
    if (exists) {
      toast({
        title: "Already in list",
        description: `${variant} is already in your shopping list.`,
      });
      return;
    }
    
    setShoppingList((prev) => [...prev, newItem]);
    toast({
      title: "Added to shopping list",
      description: `${variant} has been added to your list.`,
    });
  };

  const handleToggleShoppingItem = (id: string) => {
    setShoppingList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleRemoveShoppingItem = (id: string) => {
    setShoppingList((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCompletedShopping = () => {
    setShoppingList((prev) => prev.filter((item) => !item.checked));
    toast({
      title: "Cleared completed items",
      description: "All checked items have been removed.",
    });
  };

  const handleClearAllShopping = () => {
    setShoppingList([]);
    toast({
      title: "Shopping list cleared",
      description: "All items have been removed.",
    });
  };

  const handleBulkAddToShopping = (ingredients: string[]) => {
    let addedCount = 0;
    const newItems: ShoppingItem[] = [];
    
    ingredients.forEach(ing => {
      const variant = ing.replace(/-/g, " ");
      const exists = shoppingList.some(item => item.variant.toLowerCase() === variant.toLowerCase());
      if (!exists && !newItems.some(item => item.variant.toLowerCase() === variant.toLowerCase())) {
        newItems.push({
          id: `${ing}-${Date.now()}-${Math.random()}`,
          ingredientId: ing,
          variant: variant.charAt(0).toUpperCase() + variant.slice(1),
          checked: false,
        });
        addedCount++;
      }
    });
    
    if (newItems.length > 0) {
      setShoppingList((prev) => [...prev, ...newItems]);
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
      
      <Header onShowTour={() => setShowTour(true)} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Top-level Cook/Drink toggle */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="inline-flex p-1.5 rounded-2xl glass shadow-soft">
            <button
              onClick={() => setAppMode("cook")}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300",
                appMode === "cook"
                  ? "bg-card shadow-md text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <ChefHat className="h-5 w-5" />
              <span>Plate</span>
            </button>
            <button
              onClick={() => setAppMode("drink")}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300",
                appMode === "drink"
                  ? "bg-card shadow-md text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Wine className="h-5 w-5" />
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
              />
            )}
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="w-full max-w-xl mx-auto grid grid-cols-4 h-14 glass p-1.5 rounded-2xl shadow-soft">
            <QuickTooltip content={appMode === "cook" ? "Select ingredients & find recipes" : "Select ingredients & find drinks"} side="bottom">
              <TabsTrigger value="ingredients" className="rounded-xl data-[state=active]:bg-card data-[state=active]:shadow-md data-[state=active]:text-primary flex items-center gap-2 font-semibold transition-all duration-300">
                {appMode === "cook" ? <ChefHat className="h-4 w-4" /> : <GlassWater className="h-4 w-4" />}
                <span className="hidden sm:inline">{appMode === "cook" ? "Cook" : "Mix"}</span>
              </TabsTrigger>
            </QuickTooltip>
            <QuickTooltip content="Plan your weekly meals" side="bottom">
              <TabsTrigger value="calendar" className="rounded-xl data-[state=active]:bg-card data-[state=active]:shadow-md data-[state=active]:text-primary flex items-center gap-2 font-semibold transition-all duration-300">
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">Plan</span>
                {mealPlan.length > 0 && (
                  <Badge className="h-5 min-w-5 p-0 text-[10px] flex items-center justify-center bg-secondary text-secondary-foreground">
                    {mealPlan.length}
                  </Badge>
                )}
              </TabsTrigger>
            </QuickTooltip>
            <QuickTooltip content="Your favorite recipes" side="bottom">
              <TabsTrigger value="saved" className="rounded-xl data-[state=active]:bg-card data-[state=active]:shadow-md data-[state=active]:text-primary flex items-center gap-2 font-semibold transition-all duration-300">
                <Heart className="h-4 w-4" />
                <span className="hidden sm:inline">Saved</span>
                {(savedRecipes.length + savedDrinks.length) > 0 && (
                  <Badge className="h-5 min-w-5 p-0 text-[10px] flex items-center justify-center bg-primary/20 text-primary">
                    {savedRecipes.length + savedDrinks.length}
                  </Badge>
                )}
              </TabsTrigger>
            </QuickTooltip>
            <QuickTooltip content="Your shopping list" side="bottom">
              <TabsTrigger value="shopping" className="rounded-xl data-[state=active]:bg-card data-[state=active]:shadow-md data-[state=active]:text-primary flex items-center gap-2 font-semibold transition-all duration-300 relative">
                <ShoppingCart className="h-4 w-4" />
                <span className="hidden sm:inline">Shop</span>
                {shoppingList.length > 0 && (
                  <Badge className="absolute -top-1.5 -right-1.5 h-5 min-w-5 p-0 text-[10px] flex items-center justify-center gradient-warm border-2 border-background">
                    {shoppingList.length}
                  </Badge>
                )}
              </TabsTrigger>
            </QuickTooltip>
          </TabsList>

          <TabsContent value="ingredients" className="space-y-8 mt-8 animate-fade-in">
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

                <DrinkLookup onAddToShopping={handleBulkAddToShopping} />

                <div className="space-y-4">
                  {showDrinks ? (
                    <DrinkResults
                      drinks={drinks}
                      savedDrinks={savedDrinks}
                      onSave={handleSaveDrink}
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

          <TabsContent value="calendar" className="mt-6">
            <MealCalendar mealPlan={mealPlan} onRemove={handleRemoveFromCalendar} />
          </TabsContent>

          <TabsContent value="saved" className="mt-6">
            <SavedRecipes 
              savedRecipeIds={savedRecipes} 
              savedDrinkIds={savedDrinks}
              onRemoveRecipe={handleSaveRecipe} 
              onRemoveDrink={handleSaveDrink}
              recipeNotes={recipeNotes}
              onSaveNote={(recipeId, note) => {
                setRecipeNotes(prev => ({ ...prev, [recipeId]: note }));
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
    </div>
  );
};

export default Index;
