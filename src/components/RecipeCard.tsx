import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Heart, Plus, ShoppingCart, Check, ChefHat, Key, Snowflake, Star, Gauge, HeartPulse, Sparkles } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Recipe } from "@/data/recipes";
import { RecipeDetailDialog } from "./RecipeDetailDialog";
import { motion } from "framer-motion";
import { staggerItem, heartBeat } from "@/components/ui/animated";
interface RecipeCardProps {
  recipe: Recipe;
  isSaved: boolean;
  onSave: () => void;
  onAddToCalendar: () => void;
  onAddToShopping?: (ingredientId: string) => void;
  onViewRecipe?: () => void;
  saveCount?: number;
  userRating?: number;
}

const difficultyConfig = {
  easy: {
    label: "Easy",
    color: "bg-emerald-500/15 border-emerald-500/30 text-emerald-600 dark:text-emerald-400",
    icon: "🌱",
  },
  medium: {
    label: "Medium",
    color: "bg-amber-500/15 border-amber-500/30 text-amber-600 dark:text-amber-400",
    icon: "🔥",
  },
  hard: {
    label: "Hard",
    color: "bg-red-500/15 border-red-500/30 text-red-600 dark:text-red-400",
    icon: "⚡",
  },
};

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

export function RecipeCard({ recipe, isSaved, onSave, onAddToCalendar, onAddToShopping, onViewRecipe, saveCount = 0, userRating }: RecipeCardProps) {
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

  // Format save count for display
  const formatSaveCount = (count: number): string => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <>
      <motion.div
        variants={staggerItem}
        whileHover={{ 
          y: -6, 
          scale: 1.02,
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        <Card 
          className={cn(
            "group overflow-hidden transition-all duration-300 border-border/50",
            "bg-card/80 backdrop-blur-sm cursor-pointer",
            "hover:shadow-lg hover:shadow-primary/10"
          )}
          onClick={handleViewRecipe}
        >
        <CardHeader className="p-3 sm:pb-3 sm:p-6 relative">
          {/* Decorative gradient */}
          <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 opacity-30 pointer-events-none">
            <div className={cn("w-full h-full rounded-full blur-3xl", config.bg)} />
          </div>

          <div className="flex items-start justify-between gap-2 sm:gap-3 relative">
            <div className="flex-1 space-y-1 sm:space-y-2 min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <Badge className={cn(
                  "text-[10px] sm:text-xs font-semibold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border",
                  config.bg, config.border, config.text
                )}>
                  <span className="mr-0.5 sm:mr-1">{config.emoji}</span>
                  {config.label}
                </Badge>
                {recipe.difficulty && difficultyConfig[recipe.difficulty] && (
                  <Badge className={cn(
                    "text-[10px] sm:text-xs font-semibold px-1.5 sm:px-2.5 py-0.5 sm:py-1 border",
                    difficultyConfig[recipe.difficulty].color
                  )}>
                    <Gauge className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5 sm:mr-1" />
                    {difficultyConfig[recipe.difficulty].label}
                  </Badge>
                )}
                {userRating && userRating > 0 && (
                  <Badge className="text-[10px] sm:text-xs font-semibold px-1.5 sm:px-2.5 py-0.5 sm:py-1 bg-yellow-500/15 border border-yellow-500/30 text-yellow-600 dark:text-yellow-400">
                    <Star className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5 sm:mr-1 fill-current" />
                    {userRating}
                  </Badge>
                )}
                {recipe.heartHealthy && (
                  <Badge className="text-[10px] sm:text-xs font-semibold px-1.5 sm:px-2.5 py-0.5 sm:py-1 bg-red-500/15 border border-red-500/30 text-red-600 dark:text-red-400">
                    <HeartPulse className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5 sm:mr-1" />
                    <span className="hidden xs:inline">Heart Healthy</span>
                  </Badge>
                )}
                {recipe.antiInflammatory && (
                  <Badge className="text-[10px] sm:text-xs font-semibold px-1.5 sm:px-2.5 py-0.5 sm:py-1 bg-orange-500/15 border border-orange-500/30 text-orange-600 dark:text-orange-400">
                    <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5 sm:mr-1" />
                    <span className="hidden xs:inline">Anti-Inflammatory</span>
                  </Badge>
                )}
                {recipe.isHoliday && (
                  <Badge className="text-[10px] sm:text-xs font-semibold px-1.5 sm:px-2.5 py-0.5 sm:py-1 bg-red-500/15 border border-red-500/30 text-red-600 dark:text-red-400">
                    <Snowflake className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5 sm:mr-1" />
                    <span className="hidden xs:inline">Holiday</span>
                  </Badge>
                )}
                {matchPercentage >= 80 && (
                  <Badge variant="outline" className="text-[10px] sm:text-xs font-medium px-1.5 sm:px-2 py-0.5 bg-secondary/10 border-secondary/30 text-secondary">
                    <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5 sm:mr-1" />
                    <span className="hidden sm:inline">Great Match</span>
                    <span className="sm:hidden">Match</span>
                  </Badge>
                )}
              </div>
              <h3 className="font-serif text-base sm:text-xl font-semibold text-foreground leading-tight group-hover:text-primary transition-colors line-clamp-2">
                {recipe.title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-1 sm:line-clamp-2">
                {recipe.description}
              </p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <motion.div whileTap={heartBeat}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => { e.stopPropagation(); onSave(); }}
                  className={cn(
                    "shrink-0 rounded-full transition-all duration-300 h-8 w-8 sm:h-10 sm:w-10",
                    isSaved 
                      ? "text-primary bg-primary/10 hover:bg-primary/20" 
                      : "hover:bg-accent/60"
                  )}
                  aria-label={isSaved ? `Remove ${recipe.title} from saved recipes` : `Save ${recipe.title}`}
                >
                  <motion.div
                    animate={isSaved ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Heart className={cn(
                      "h-4 w-4 sm:h-5 sm:w-5 transition-all duration-300",
                      isSaved && "fill-current"
                    )} />
                  </motion.div>
                </Button>
              </motion.div>
              {saveCount > 0 && (
                <span className="text-[10px] sm:text-xs text-muted-foreground font-medium">
                  {formatSaveCount(saveCount)}
                </span>
              )}
            </div>
          </div>

          {/* Cook time & servings - inline on mobile */}
          <div className="flex items-center gap-2 sm:gap-4 mt-2 sm:mt-4 text-xs sm:text-sm">
            <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-0.5 sm:py-1.5 rounded-full bg-muted/50">
              <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
              <span className="font-medium">{recipe.cookTime}</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-0.5 sm:py-1.5 rounded-full bg-muted/50">
              <Users className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
              <span className="font-medium">{recipe.servings}<span className="hidden sm:inline"> servings</span></span>
            </div>
          </div>

          {/* Ingredients summary - condensed on mobile */}
          <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-2 sm:mt-3">
            {/* Key ingredients matched */}
            {recipe.matchedKeyIngredients?.slice(0, 2).map((ing) => (
              <Badge key={`key-${ing}`} className="text-[10px] sm:text-xs font-semibold px-1.5 sm:px-2.5 py-0.5 bg-primary/15 border border-primary/30 text-primary">
                <Key className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5" />
                {ing.replace("-", " ")}
              </Badge>
            ))}
            {/* Regular matched ingredients */}
            {recipe.matchedIngredients
              .filter(ing => !recipe.matchedKeyIngredients?.includes(ing))
              .slice(0, 2).map((ing) => (
              <Badge key={ing} variant="outline" className="text-[10px] sm:text-xs font-medium bg-secondary/10 border-secondary/30 text-secondary-foreground px-1.5 sm:px-2 py-0.5">
                <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5" />
                {ing.replace("-", " ")}
              </Badge>
            ))}
            {/* Missing count */}
            {missingIngredients.length > 0 && (
              <Badge
                variant="outline"
                className="text-[10px] sm:text-xs font-medium cursor-pointer transition-all duration-200 px-1.5 sm:px-2 py-0.5 bg-accent/50 border-accent-foreground/30 text-accent-foreground hover:bg-primary/10 hover:border-primary/30 hover:text-primary"
                onClick={(e) => { e.stopPropagation(); missingIngredients.forEach(ing => onAddToShopping?.(ing)); }}
              >
                <Plus className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5" />
                {missingIngredients.length} missing
              </Badge>
            )}
            {/* Overflow count */}
            {(recipe.matchedIngredients.length + missingIngredients.length) > 4 && (
              <Badge variant="outline" className="text-[10px] sm:text-xs bg-muted/50 text-muted-foreground px-1.5 py-0.5">
                +{recipe.matchedIngredients.length + missingIngredients.length - 4}
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="pt-0 px-3 pb-3 sm:px-6 sm:pb-6 space-y-1.5 sm:space-y-3">
          <div className="flex gap-1.5 sm:hidden">
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 justify-center text-muted-foreground hover:text-foreground rounded-lg gap-1.5 h-8 text-xs"
              onClick={(e) => { e.stopPropagation(); handleViewRecipe(); }}
            >
              <ChefHat className="h-3.5 w-3.5" />
              View
            </Button>
            <Button
              variant="warm"
              size="sm"
              className="flex-1 h-8 text-xs"
              onClick={(e) => { e.stopPropagation(); onAddToCalendar(); }}
            >
              <Plus className="h-3.5 w-3.5 mr-1" />
              Plan
            </Button>
          </div>

          <div className="hidden sm:block space-y-3">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-center text-muted-foreground hover:text-foreground rounded-xl gap-2 h-9 text-sm"
              onClick={(e) => { e.stopPropagation(); handleViewRecipe(); }}
            >
              <ChefHat className="h-4 w-4" />
              <span className="font-medium">View Recipe</span>
            </Button>

            {missingIngredients.length > 0 && onAddToShopping && (
              <Button
                variant="glass"
                size="sm"
                className="w-full h-9 text-sm"
                onClick={(e) => { e.stopPropagation(); missingIngredients.forEach(ing => onAddToShopping(ing)); }}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add {missingIngredients.length} missing
              </Button>
            )}
            
            <Button
              variant="warm"
              size="sm"
              className="w-full h-10 text-sm"
              onClick={(e) => { e.stopPropagation(); onAddToCalendar(); }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add to Meal Plan
            </Button>
          </div>
        </CardContent>
      </Card>
      </motion.div>

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