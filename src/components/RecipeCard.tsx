import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Heart, Plus, ShoppingCart, Check, ChefHat, Key, Snowflake } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Recipe } from "@/data/recipes";
import { RecipeDetailDialog } from "./RecipeDetailDialog";

interface RecipeCardProps {
  recipe: Recipe;
  isSaved: boolean;
  onSave: () => void;
  onAddToCalendar: () => void;
  onAddToShopping?: (ingredientId: string) => void;
  onViewRecipe?: () => void;
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
  dessert: {
    bg: "bg-gradient-to-r from-pink-400/20 to-rose-400/20",
    border: "border-pink-400/30",
    text: "text-pink-700 dark:text-pink-400",
    emoji: "🍰",
    label: "Dessert"
  },
  sides: {
    bg: "bg-gradient-to-r from-stone-400/20 to-amber-400/20",
    border: "border-stone-400/30",
    text: "text-stone-700 dark:text-stone-400",
    emoji: "🍞",
    label: "Sides"
  },
};

export function RecipeCard({ recipe, isSaved, onSave, onAddToCalendar, onAddToShopping, onViewRecipe }: RecipeCardProps) {
  const [showDetail, setShowDetail] = useState(false);
  
  const handleViewRecipe = () => {
    setShowDetail(true);
    onViewRecipe?.();
  };
  
  const missingIngredients = recipe.ingredients.filter(
    ing => !recipe.matchedIngredients.includes(ing)
  );

  const config = mealTypeConfig[recipe.mealType];
  const matchPercentage = Math.round((recipe.matchedIngredients.length / recipe.ingredients.length) * 100);

  return (
    <>
      <Card 
        className={cn(
          "group overflow-hidden transition-all duration-500 hover-lift border-border/50",
          "bg-card/80 backdrop-blur-sm",
          "animate-scale-in cursor-pointer"
        )}
        onClick={handleViewRecipe}
      >
        <CardHeader className="pb-3 relative">
          {/* Decorative gradient */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-30 pointer-events-none">
            <div className={cn("w-full h-full rounded-full blur-3xl", config.bg)} />
          </div>

          <div className="flex items-start justify-between gap-3 relative">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge className={cn(
                  "text-xs font-semibold px-3 py-1 rounded-full border",
                  config.bg, config.border, config.text
                )}>
                  <span className="mr-1">{config.emoji}</span>
                  {config.label}
                </Badge>
                {recipe.isHoliday && (
                  <Badge className="text-xs font-semibold px-2.5 py-1 bg-red-500/15 border border-red-500/30 text-red-600 dark:text-red-400">
                    <Snowflake className="h-3 w-3 mr-1" />
                    Holiday
                  </Badge>
                )}
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
              onClick={(e) => { e.stopPropagation(); onSave(); }}
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

          {/* Key ingredients matched */}
          {recipe.matchedKeyIngredients && recipe.matchedKeyIngredients.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4">
              {recipe.matchedKeyIngredients.map((ing) => (
                <Badge key={ing} className="text-xs font-semibold px-2.5 py-1 bg-primary/15 border border-primary/30 text-primary">
                  <Key className="h-3 w-3 mr-1" />
                  {ing.replace("-", " ")}
                </Badge>
              ))}
            </div>
          )}

          {/* Matched ingredients */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {recipe.matchedIngredients
              .filter(ing => !recipe.matchedKeyIngredients?.includes(ing))
              .slice(0, 4).map((ing) => (
              <Badge key={ing} variant="outline" className="text-xs font-medium bg-secondary/5 border-secondary/20 text-secondary">
                <Check className="h-3 w-3 mr-1" />
                {ing.replace("-", " ")}
              </Badge>
            ))}
            {recipe.matchedIngredients.filter(ing => !recipe.matchedKeyIngredients?.includes(ing)).length > 4 && (
              <Badge variant="outline" className="text-xs bg-muted/50">
                +{recipe.matchedIngredients.filter(ing => !recipe.matchedKeyIngredients?.includes(ing)).length - 4}
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
                  onClick={(e) => { e.stopPropagation(); onAddToShopping?.(ing); }}
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
            className="w-full justify-center text-muted-foreground hover:text-foreground rounded-xl gap-2"
            onClick={(e) => { e.stopPropagation(); handleViewRecipe(); }}
          >
            <ChefHat className="h-4 w-4" />
            <span className="font-medium">View Recipe & Cook</span>
          </Button>

          {missingIngredients.length > 0 && onAddToShopping && (
            <Button
              variant="glass"
              size="sm"
              className="w-full"
              onClick={(e) => { e.stopPropagation(); missingIngredients.forEach(ing => onAddToShopping(ing)); }}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add {missingIngredients.length} missing to list
            </Button>
          )}
          
          <Button
            variant="warm"
            size="default"
            className="w-full"
            onClick={(e) => { e.stopPropagation(); onAddToCalendar(); }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add to Meal Plan
          </Button>
        </CardContent>
      </Card>

      <RecipeDetailDialog
        recipe={recipe}
        open={showDetail}
        onOpenChange={setShowDetail}
        isSaved={isSaved}
        onSave={onSave}
        onAddToCalendar={onAddToCalendar}
        onAddToShopping={onAddToShopping}
      />
    </>
  );
}