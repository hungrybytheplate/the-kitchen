import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart, Plus, Clock, Users, ChefHat } from "lucide-react";
import { sampleRecipes, type Recipe } from "@/data/recipes";
import { cn } from "@/lib/utils";

interface RecipeLookupProps {
  onAddToShopping: (ingredients: string[]) => void;
}

export function RecipeLookup({ onAddToShopping }: RecipeLookupProps) {
  const [search, setSearch] = useState("");
  
  const matchingRecipes = search.trim().length >= 2
    ? sampleRecipes.filter(r => 
        r.title.toLowerCase().includes(search.toLowerCase())
      ).slice(0, 6)
    : [];

  const mealTypeColors = {
    breakfast: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
    lunch: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
    dinner: "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300",
  };

  const handleAddAllToShopping = (recipe: Recipe) => {
    onAddToShopping(recipe.ingredients);
  };

  return (
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
              matchingRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
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
                      <h4 className="font-semibold">{recipe.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{recipe.description}</p>
                    </div>
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
                    onClick={() => handleAddAllToShopping(recipe)}
                    className="w-full"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add All Ingredients to Shopping List
                  </Button>
                </div>
              ))
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
  );
}
