import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Heart, ChevronDown, ChevronUp, Plus, ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Recipe } from "@/data/recipes";

interface RecipeCardProps {
  recipe: Recipe;
  isSaved: boolean;
  onSave: () => void;
  onAddToCalendar: () => void;
  onAddToShopping?: (ingredientId: string) => void;
}

const mealTypeConfig = {
  breakfast: {
    bg: "bg-gradient-to-r from-amber-400/20 to-orange-400/20",
    border: "border-amber-400/30",
    text: "text-amber-700 dark:text-amber-400",
    emoji: "🌅",
    label: "Breakfast"
  },
  lunch: {
    bg: "bg-gradient-to-r from-emerald-400/20 to-teal-400/20",
    border: "border-emerald-400/30",
    text: "text-emerald-700 dark:text-emerald-400",
    emoji: "☀️",
    label: "Lunch"
  },
  dinner: {
    bg: "bg-gradient-to-r from-violet-400/20 to-purple-400/20",
    border: "border-violet-400/30",
    text: "text-violet-700 dark:text-violet-400",
    emoji: "🌙",
    label: "Dinner"
  },
};

export function RecipeCard({ recipe, isSaved, onSave, onAddToCalendar, onAddToShopping }: RecipeCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const missingIngredients = recipe.ingredients.filter(
    ing => !recipe.matchedIngredients.includes(ing)
  );

  const config = mealTypeConfig[recipe.mealType];
  const matchPercentage = Math.round((recipe.matchedIngredients.length / recipe.ingredients.length) * 100);

  return (
    <Card className={cn(
      "group overflow-hidden transition-all duration-500 hover-lift border-border/50",
      "bg-card/80 backdrop-blur-sm",
      "animate-scale-in"
    )}>
      <CardHeader className="pb-3 relative">
        {/* Decorative gradient */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-30 pointer-events-none">
          <div className={cn("w-full h-full rounded-full blur-3xl", config.bg)} />
        </div>

        <div className="flex items-start justify-between gap-3 relative">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <Badge className={cn(
                "text-xs font-semibold px-3 py-1 rounded-full border",
                config.bg, config.border, config.text
              )}>
                <span className="mr-1">{config.emoji}</span>
                {config.label}
              </Badge>
              {matchPercentage >= 80 && (
                <Badge variant="outline" className="text-xs font-medium px-2 py-0.5 bg-secondary/10 border-secondary/30 text-secondary">
                  <Check className="h-3 w-3 mr-1" />
                  Great Match
                </Badge>
              )}
            </div>
            <h3 className="font-serif text-xl font-semibold text-foreground leading-tight group-hover:text-primary transition-colors">
              {recipe.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {recipe.description}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onSave}
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
        </div>

        <div className="flex items-center gap-4 mt-4 text-sm">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{recipe.cookTime}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{recipe.servings} servings</span>
          </div>
        </div>

        {/* Matched ingredients */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {recipe.matchedIngredients.slice(0, 5).map((ing) => (
            <Badge key={ing} variant="outline" className="text-xs font-medium bg-secondary/5 border-secondary/20 text-secondary">
              <Check className="h-3 w-3 mr-1" />
              {ing.replace("-", " ")}
            </Badge>
          ))}
          {recipe.matchedIngredients.length > 5 && (
            <Badge variant="outline" className="text-xs bg-muted/50">
              +{recipe.matchedIngredients.length - 5}
            </Badge>
          )}
        </div>

        {/* Missing ingredients */}
        {missingIngredients.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {missingIngredients.slice(0, 3).map((ing) => (
              <Badge
                key={ing}
                variant="outline"
                className={cn(
                  "text-xs font-medium cursor-pointer transition-all duration-200",
                  "bg-accent/30 border-accent-foreground/20 text-accent-foreground",
                  "hover:bg-primary/10 hover:border-primary/30 hover:text-primary"
                )}
                onClick={() => onAddToShopping?.(ing)}
              >
                <Plus className="h-3 w-3 mr-1" />
                {ing.replace("-", " ")}
              </Badge>
            ))}
            {missingIngredients.length > 3 && (
              <Badge variant="outline" className="text-xs bg-muted/50 text-muted-foreground">
                +{missingIngredients.length - 3} more
              </Badge>
            )}
          </div>
        )}
      </CardHeader>

      <CardContent className="pt-0 space-y-3">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-between text-muted-foreground hover:text-foreground rounded-xl"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className="font-medium">{isExpanded ? "Hide" : "Show"} Recipe</span>
          <div className={cn(
            "transition-transform duration-300",
            isExpanded && "rotate-180"
          )}>
            <ChevronDown className="h-4 w-4" />
          </div>
        </Button>

        {isExpanded && (
          <div className="space-y-5 pt-2 animate-fade-in">
            <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <span className="text-lg">🥗</span> Ingredients
              </h4>
              <ul className="text-sm space-y-2">
                {recipe.ingredients.map((ing, i) => {
                  const isMatched = recipe.matchedIngredients.includes(ing);
                  return (
                    <li key={i} className={cn(
                      "flex items-center gap-3 py-1",
                      !isMatched && "text-muted-foreground"
                    )}>
                      <span className={cn(
                        "w-5 h-5 rounded-full flex items-center justify-center text-xs",
                        isMatched 
                          ? "bg-secondary/20 text-secondary" 
                          : "bg-accent/50 text-accent-foreground"
                      )}>
                        {isMatched ? <Check className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                      </span>
                      <span className="capitalize font-medium">{ing.replace("-", " ")}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <span className="text-lg">👨‍🍳</span> Instructions
              </h4>
              <ol className="text-sm space-y-3">
                {recipe.instructions.map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full gradient-warm text-primary-foreground text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span className="text-muted-foreground leading-relaxed pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}

        {missingIngredients.length > 0 && onAddToShopping && (
          <Button
            variant="glass"
            size="sm"
            className="w-full"
            onClick={() => missingIngredients.forEach(ing => onAddToShopping(ing))}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add {missingIngredients.length} missing to list
          </Button>
        )}
        
        <Button
          variant="warm"
          size="default"
          className="w-full"
          onClick={onAddToCalendar}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add to Meal Plan
        </Button>
      </CardContent>
    </Card>
  );
}