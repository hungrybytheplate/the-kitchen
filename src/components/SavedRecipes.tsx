import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Trash2 } from "lucide-react";
import { sampleRecipes } from "@/data/recipes";
import { cn } from "@/lib/utils";

interface SavedRecipesProps {
  savedRecipeIds: string[];
  onRemove: (id: string) => void;
}

export function SavedRecipes({ savedRecipeIds, onRemove }: SavedRecipesProps) {
  const savedRecipes = sampleRecipes.filter((r) => savedRecipeIds.includes(r.id));

  if (savedRecipes.length === 0) {
    return (
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="font-serif text-xl flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            Saved Recipes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-6">
            No saved recipes yet. Click the heart icon on a recipe to save it!
          </p>
        </CardContent>
      </Card>
    );
  }

  const mealTypeColors = {
    breakfast: "bg-accent text-accent-foreground",
    lunch: "bg-secondary text-secondary-foreground",
    dinner: "bg-primary text-primary-foreground",
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="font-serif text-xl flex items-center gap-2">
          <Heart className="h-5 w-5 text-primary fill-primary" />
          Saved Recipes ({savedRecipes.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {savedRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <Badge className={cn("text-xs", mealTypeColors[recipe.mealType])}>
                  {recipe.mealType}
                </Badge>
                <span className="font-medium">{recipe.title}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemove(recipe.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
