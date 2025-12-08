import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Heart, ChevronDown, ChevronUp, Plus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Recipe } from "@/data/recipes";

interface RecipeCardProps {
  recipe: Recipe;
  isSaved: boolean;
  onSave: () => void;
  onAddToCalendar: () => void;
}

const mealTypeColors = {
  breakfast: "bg-accent text-accent-foreground",
  lunch: "bg-secondary text-secondary-foreground",
  dinner: "bg-primary text-primary-foreground",
};

const mealTypeEmojis = {
  breakfast: "🌅",
  lunch: "☀️",
  dinner: "🌙",
};

export function RecipeCard({ recipe, isSaved, onSave, onAddToCalendar }: RecipeCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 shadow-card hover:shadow-soft",
      "animate-scale-in"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge className={cn("capitalize text-xs font-medium", mealTypeColors[recipe.mealType])}>
                {mealTypeEmojis[recipe.mealType]} {recipe.mealType}
              </Badge>
            </div>
            <h3 className="font-serif text-xl font-semibold text-foreground leading-tight">
              {recipe.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {recipe.description}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onSave}
            className={cn(
              "shrink-0 transition-colors",
              isSaved && "text-destructive hover:text-destructive"
            )}
          >
            <Heart className={cn("h-5 w-5", isSaved && "fill-current")} />
          </Button>
        </div>

        <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>{recipe.cookTime}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4" />
            <span>{recipe.servings} servings</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-3">
          {recipe.matchedIngredients.slice(0, 5).map((ing) => (
            <Badge key={ing} variant="outline" className="text-xs bg-primary/5 border-primary/20">
              {ing}
            </Badge>
          ))}
          {recipe.matchedIngredients.length > 5 && (
            <Badge variant="outline" className="text-xs">
              +{recipe.matchedIngredients.length - 5} more
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-between text-muted-foreground hover:text-foreground"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span>{isExpanded ? "Hide" : "Show"} Instructions</span>
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>

        {isExpanded && (
          <div className="mt-4 space-y-4 animate-fade-in">
            <div>
              <h4 className="font-semibold text-sm mb-2">Ingredients</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                {recipe.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                    <span className="capitalize">{ing.replace("-", " ")}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2">Instructions</h4>
              <ol className="text-sm text-muted-foreground space-y-2">
                {recipe.instructions.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="font-medium text-primary shrink-0">{i + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}

        <Button
          variant="outline"
          size="sm"
          className="w-full mt-4"
          onClick={onAddToCalendar}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add to Meal Plan
        </Button>
      </CardContent>
    </Card>
  );
}
