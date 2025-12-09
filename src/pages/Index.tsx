import { useState } from "react";
import { Header } from "@/components/Header";
import { IngredientSelector } from "@/components/IngredientSelector";
import { RecipeResults } from "@/components/RecipeResults";
import { MealCalendar, type MealPlanEntry } from "@/components/MealCalendar";
import { SavedRecipes } from "@/components/SavedRecipes";
import { ShoppingList, type ShoppingItem } from "@/components/ShoppingList";
import { AddToCalendarDialog } from "@/components/AddToCalendarDialog";
import { AddToShoppingDialog } from "@/components/AddToShoppingDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { getRecipesForIngredients, type Recipe } from "@/data/recipes";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Sparkles, Calendar, Heart, ChefHat, X, ShoppingCart } from "lucide-react";

const Index = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [showRecipes, setShowRecipes] = useState(false);
  const [savedRecipes, setSavedRecipes] = useLocalStorage<string[]>("savedRecipes", []);
  const [mealPlan, setMealPlan] = useLocalStorage<MealPlanEntry[]>("mealPlan", []);
  const [shoppingList, setShoppingList] = useLocalStorage<ShoppingItem[]>("shoppingList", []);
  const [calendarDialogRecipe, setCalendarDialogRecipe] = useState<Recipe | null>(null);
  const [shoppingDialogIngredient, setShoppingDialogIngredient] = useState<string | null>(null);

  const recipes = getRecipesForIngredients(selectedIngredients);

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
    
    // Check if already in list
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

  return (
    <div className="min-h-screen bg-background gradient-cream">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <Tabs defaultValue="ingredients" className="space-y-6">
          <TabsList className="w-full max-w-lg mx-auto grid grid-cols-4 h-12 bg-muted/50 p-1 rounded-xl">
            <TabsTrigger value="ingredients" className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm flex items-center gap-2">
              <ChefHat className="h-4 w-4" />
              <span className="hidden sm:inline">Ingredients</span>
            </TabsTrigger>
            <TabsTrigger value="calendar" className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Meal Plan</span>
            </TabsTrigger>
            <TabsTrigger value="saved" className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm flex items-center gap-2">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Saved</span>
            </TabsTrigger>
            <TabsTrigger value="shopping" className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm flex items-center gap-2 relative">
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">Shop</span>
              {shoppingList.length > 0 && (
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center">
                  {shoppingList.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ingredients" className="space-y-6 mt-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Ingredient Selection */}
              <Card className="shadow-card">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-serif text-xl">What's in your kitchen?</CardTitle>
                    {selectedIngredients.length > 0 && (
                      <Button variant="ghost" size="sm" onClick={handleClearAll}>
                        Clear all
                      </Button>
                    )}
                  </div>
                  {selectedIngredients.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {selectedIngredients.slice(0, 8).map((id) => (
                        <Badge
                          key={id}
                          variant="secondary"
                          className="capitalize cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors group"
                          onClick={() => handleToggleIngredient(id)}
                        >
                          {id.replace("-", " ")}
                          <X className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100" />
                        </Badge>
                      ))}
                      {selectedIngredients.length > 8 && (
                        <Badge variant="outline">+{selectedIngredients.length - 8} more</Badge>
                      )}
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  <IngredientSelector
                    selectedIngredients={selectedIngredients}
                    onToggle={handleToggleIngredient}
                  />
                  
                  <div className="mt-6 pt-4 border-t border-border/50">
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

              {/* Recipe Results */}
              <div className="space-y-6">
                {showRecipes ? (
                  <RecipeResults
                    recipes={recipes}
                    savedRecipes={savedRecipes}
                    onSave={handleSaveRecipe}
                    onAddToCalendar={handleAddToCalendar}
                    onAddToShopping={handleAddToShopping}
                  />
                ) : (
                  <Card className="shadow-card">
                    <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                      <div className="p-4 rounded-full bg-primary/10 mb-4">
                        <Sparkles className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="font-serif text-xl font-semibold mb-2">
                        Ready to cook?
                      </h3>
                      <p className="text-muted-foreground max-w-sm">
                        Select ingredients from your fridge, pantry, and spice cabinet, then click "Find Recipes" to discover what you can make!
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="mt-6">
            <MealCalendar mealPlan={mealPlan} onRemove={handleRemoveFromCalendar} />
          </TabsContent>

          <TabsContent value="saved" className="mt-6">
            <SavedRecipes savedRecipeIds={savedRecipes} onRemove={handleSaveRecipe} />
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
