import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Lightbulb, Heart, Calendar, ChevronRight } from "lucide-react";
import { getSmartSuggestions } from "@/lib/smartSuggestions";
import { sampleRecipes, type Recipe } from "@/data/recipes";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { RecipeDetailDialog } from "./RecipeDetailDialog";

interface SmartSuggestionsProps {
  savedRecipeIds: string[];
  onSaveRecipe: (recipeId: string) => void;
  onAddToCalendar: (recipe: Recipe) => void;
  onAddToShopping: (ingredientId: string) => void;
}

const mealTypeColors: Record<string, string> = {
  breakfast: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  lunch: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  dinner: "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300",
  dessert: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
  sides: "bg-stone-100 text-stone-800 dark:bg-stone-900/30 dark:text-stone-300",
};

export function SmartSuggestions({
  savedRecipeIds,
  onSaveRecipe,
  onAddToCalendar,
  onAddToShopping,
}: SmartSuggestionsProps) {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  
  const suggestions = getSmartSuggestions(savedRecipeIds, 4);
  
  if (suggestions.length === 0) {
    return null;
  }

  return (
    <>
      <Card className="shadow-elevated border-border/50 bg-card/90 backdrop-blur-sm overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400/60 via-primary/60 to-violet-400/60" />
        <CardHeader className="pb-3">
          <CardTitle className="font-serif text-xl flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-amber-500" />
            You Might Also Like
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Based on your saved recipes
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {suggestions.map(({ recipe, reason }) => {
              const isSaved = savedRecipeIds.includes(recipe.id);
              return (
                <div
                  key={recipe.id}
                  className="group relative bg-muted/30 rounded-xl p-4 hover:bg-muted/50 transition-all cursor-pointer hover:shadow-md"
                  onClick={() => setSelectedRecipe(recipe)}
                >
                  {/* Meal type badge */}
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={cn("text-[10px]", mealTypeColors[recipe.mealType])}>
                      {recipe.mealType}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground italic">
                      {reason}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h4 className="font-medium text-sm line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                    {recipe.title}
                  </h4>
                  
                  {/* Description */}
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                    {recipe.description}
                  </p>
                  
                  {/* Cook time */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {recipe.cookTime}
                    </div>
                    
                    {/* Quick actions */}
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={cn(
                          "h-7 w-7 p-0",
                          isSaved && "text-primary"
                        )}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSaveRecipe(recipe.id);
                        }}
                      >
                        <Heart className={cn("h-3.5 w-3.5", isSaved && "fill-current")} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCalendar(recipe);
                        }}
                      >
                        <Calendar className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* View arrow */}
                  <ChevronRight className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              );
            })}
          </div>
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
          isSaved={savedRecipeIds.includes(selectedRecipe.id)}
          onSave={() => onSaveRecipe(selectedRecipe.id)}
          onAddToCalendar={() => onAddToCalendar(selectedRecipe)}
          onAddToShopping={onAddToShopping}
        />
      )}
    </>
  );
}
