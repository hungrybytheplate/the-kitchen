import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, History, X, Heart, Calendar } from "lucide-react";
import { sampleRecipes, type Recipe } from "@/data/recipes";
import { cn } from "@/lib/utils";

interface RecentlyViewedProps {
  recentIds: string[];
  onClear: () => void;
  onViewRecipe: (recipe: Recipe) => void;
  savedRecipes: string[];
  onSaveRecipe: (recipeId: string) => void;
  onAddToCalendar: (recipe: Recipe) => void;
}

const mealTypeColors: Record<string, string> = {
  breakfast: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  lunch: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  dinner: "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300",
  dessert: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
  sides: "bg-stone-100 text-stone-800 dark:bg-stone-900/30 dark:text-stone-300",
};

export function RecentlyViewed({
  recentIds,
  onClear,
  onViewRecipe,
  savedRecipes,
  onSaveRecipe,
  onAddToCalendar,
}: RecentlyViewedProps) {
  // Get the actual recipe objects
  const recentRecipes = recentIds
    .map(id => sampleRecipes.find(r => r.id === id))
    .filter((r): r is Recipe => r !== undefined);

  if (recentRecipes.length === 0) {
    return null;
  }

  return (
    <Card className="shadow-elevated border-border/50 bg-card/90 backdrop-blur-sm overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/60 to-secondary/60" />
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="font-serif text-xl flex items-center gap-2">
            <History className="h-5 w-5 text-primary" />
            Recently Viewed
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="text-muted-foreground hover:text-destructive text-xs"
          >
            <X className="h-3 w-3 mr-1" />
            Clear
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-thin">
          {recentRecipes.map((recipe) => {
            const isSaved = savedRecipes.includes(recipe.id);
            return (
              <div
                key={recipe.id}
                className="flex-shrink-0 w-[200px] group cursor-pointer"
                onClick={() => onViewRecipe(recipe)}
              >
                <div className="relative bg-muted/30 rounded-xl p-3 hover:bg-muted/50 transition-all hover:shadow-md">
                  {/* Meal type badge */}
                  <Badge className={cn("text-[10px] mb-2", mealTypeColors[recipe.mealType])}>
                    {recipe.mealType}
                  </Badge>
                  
                  {/* Title */}
                  <h4 className="font-medium text-sm line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                    {recipe.title}
                  </h4>
                  
                  {/* Cook time */}
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                    <Clock className="h-3 w-3" />
                    {recipe.cookTime}
                  </div>
                  
                  {/* Quick actions */}
                  <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "h-7 px-2 text-xs",
                        isSaved && "text-primary bg-primary/10"
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSaveRecipe(recipe.id);
                      }}
                    >
                      <Heart className={cn("h-3 w-3 mr-1", isSaved && "fill-current")} />
                      {isSaved ? "Saved" : "Save"}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCalendar(recipe);
                      }}
                    >
                      <Calendar className="h-3 w-3 mr-1" />
                      Plan
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
