import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart, Clock, Users, ChefHat, Heart } from "lucide-react";
import { sampleRecipes, type Recipe } from "@/data/recipes";
import { cn } from "@/lib/utils";
import { RecipeDetailDialog } from "./RecipeDetailDialog";

interface RecipeLookupProps {
  onAddToShopping: (ingredients: string[]) => void;
  savedRecipes?: string[];
  onSave?: (recipeId: string) => void;
  onAddToCalendar?: (recipe: Recipe) => void;
}

export function RecipeLookup({ onAddToShopping, savedRecipes = [], onSave, onAddToCalendar }: RecipeLookupProps) {
  const [search, setSearch] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  
  const matchingRecipes = search.trim().length >= 2
    ? sampleRecipes.filter(r => 
        r.title.toLowerCase().includes(search.toLowerCase())
      ).slice(0, 6)
    : [];

  const mealTypeColors = {
    breakfast: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
    lunch: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
    dinner: "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300",
    dessert: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
    sides: "bg-stone-100 text-stone-800 dark:bg-stone-900/30 dark:text-stone-300",
  };

  const handleAddAllToShopping = (e: React.MouseEvent, recipe: Recipe) => {
    e.stopPropagation();
    onAddToShopping(recipe.ingredients);
  };

  return (
    <>
      <Card className="shadow-elevated border-border/50 bg-card/90 backdrop-blur-sm overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 gradient-warm" />
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-primary/10">
              <ChefHat className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-semibold">Recipe Lookup</h3>
              <p className="text-sm text-muted-foreground">Search any recipe to see ingredients needed</p>
            </div>
          </div>
          
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Type a recipe name (e.g., chicken cutlet, pasta)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-background/50"
            />
          </div>

          {search.trim().length >= 2 && (
            <div className="space-y-3">
              {matchingRecipes.length > 0 ? (
                matchingRecipes.map((recipe) => {
                  const isSaved = savedRecipes.includes(recipe.id);
                  return (
                    <div
                      key={recipe.id}
                      className="p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group"
                      onClick={() => setSelectedRecipe(recipe)}
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className={cn("text-xs", mealTypeColors[recipe.mealType])}>
                              {recipe.mealType}
                            </Badge>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {recipe.cookTime}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Users className="h-3 w-3" />
                              {recipe.servings}
                            </div>
                          </div>
                          <h4 className="font-semibold group-hover:text-primary transition-colors">{recipe.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{recipe.description}</p>
                        </div>
                        {onSave && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => { e.stopPropagation(); onSave(recipe.id); }}
                            className={cn(
                              "shrink-0 rounded-full transition-all duration-300",
                              isSaved 
                                ? "text-primary bg-primary/10 hover:bg-primary/20" 
                                : "hover:bg-accent/60"
                            )}
                          >
                            <Heart className={cn(
                              "h-5 w-5 transition-all duration-300",
                              isSaved && "fill-current scale-110"
                            )} />
                          </Button>
                        )}
                      </div>
                      
                      <div className="mb-3">
                        <p className="text-xs font-medium text-muted-foreground mb-2">
                          Ingredients needed ({recipe.ingredients.length}):
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {recipe.ingredients.map((ing) => (
                            <Badge 
                              key={ing} 
                              variant="outline" 
                              className="text-xs capitalize bg-background/50"
                            >
                              {ing.replace(/-/g, " ")}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <Button
                        size="sm"
                        variant="warm"
                        onClick={(e) => handleAddAllToShopping(e, recipe)}
                        className="w-full"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add All Ingredients to Shopping List
                      </Button>
                    </div>
                  );
                })
              ) : (
                <p className="text-center text-muted-foreground py-4">
                  No recipes found for "{search}". Try a different name!
                </p>
              )}
            </div>
          )}

          {search.trim().length < 2 && (
            <p className="text-center text-muted-foreground text-sm py-4">
              Start typing to search recipes...
            </p>
          )}
        </CardContent>
      </Card>

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
          onSave={() => onSave?.(selectedRecipe.id)}
          onAddToCalendar={() => onAddToCalendar?.(selectedRecipe)}
          onAddToShopping={(ing) => onAddToShopping([ing])}
        />
      )}
    </>
  );
}
