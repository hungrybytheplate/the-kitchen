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
import { cn } from "@/lib/utils";

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
    <div className="min-h-screen gradient-glow">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <Tabs defaultValue="ingredients" className="space-y-8">
          <TabsList className="w-full max-w-xl mx-auto grid grid-cols-4 h-14 glass p-1.5 rounded-2xl shadow-soft">
            <TabsTrigger value="ingredients" className="rounded-xl data-[state=active]:bg-card data-[state=active]:shadow-md data-[state=active]:text-primary flex items-center gap-2 font-semibold transition-all duration-300">
              <ChefHat className="h-4 w-4" />
              <span className="hidden sm:inline">Cook</span>
            </TabsTrigger>
            <TabsTrigger value="calendar" className="rounded-xl data-[state=active]:bg-card data-[state=active]:shadow-md data-[state=active]:text-primary flex items-center gap-2 font-semibold transition-all duration-300">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Plan</span>
            </TabsTrigger>
            <TabsTrigger value="saved" className="rounded-xl data-[state=active]:bg-card data-[state=active]:shadow-md data-[state=active]:text-primary flex items-center gap-2 font-semibold transition-all duration-300">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Saved</span>
            </TabsTrigger>
            <TabsTrigger value="shopping" className="rounded-xl data-[state=active]:bg-card data-[state=active]:shadow-md data-[state=active]:text-primary flex items-center gap-2 font-semibold transition-all duration-300 relative">
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">Shop</span>
              {shoppingList.length > 0 && (
                <Badge className="absolute -top-1.5 -right-1.5 h-5 min-w-5 p-0 text-[10px] flex items-center justify-center gradient-warm border-2 border-background">
                  {shoppingList.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ingredients" className="space-y-8 mt-8 animate-fade-in">
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Ingredient Selection */}
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
                  <Card className="shadow-elevated border-border/50 bg-card/90 backdrop-blur-sm">
                    <CardContent className="flex flex-col items-center justify-center py-20 text-center">
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
                        Select ingredients from your fridge, pantry, and spice cabinet, then click "Find Recipes" to discover delicious meals!
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
