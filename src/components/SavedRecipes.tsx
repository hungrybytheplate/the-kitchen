import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Trash2, ChefHat, ArrowRight } from "lucide-react";
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
      <Card className="shadow-elevated border-border/50 bg-card/90 backdrop-blur-sm overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 gradient-sunset" />
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <div className="relative mb-6">
            <div className="absolute inset-0 gradient-sunset blur-2xl opacity-30 animate-pulse-soft" />
            <div className="relative p-4 rounded-2xl gradient-sunset shadow-warm">
              <Heart className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h3 className="font-serif text-2xl font-semibold mb-3">
            Your Recipe Collection
          </h3>
          <p className="text-muted-foreground max-w-sm leading-relaxed mb-6">
            Save your favorite recipes by clicking the heart icon. They'll appear here for quick access anytime!
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-4 py-2 rounded-full">
            <ChefHat className="h-4 w-4" />
            <span>Find recipes in the Cook tab</span>
            <ArrowRight className="h-4 w-4" />
          </div>
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
    <Card className="shadow-elevated border-border/50 bg-card/90 backdrop-blur-sm overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 gradient-sunset" />
      <CardHeader>
        <CardTitle className="font-serif text-2xl flex items-center gap-2">
          <Heart className="h-6 w-6 text-primary fill-primary" />
          Saved Recipes
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          {savedRecipes.length} recipe{savedRecipes.length === 1 ? '' : 's'} saved
        </p>
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
