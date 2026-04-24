import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Clock, ChefHat, RefreshCw, Sun, Coffee, Moon, Cookie } from "lucide-react";
import { sampleRecipes, getRecipesForIngredients, type Recipe, type MealType } from "@/data/recipes";
import { RecipeDetailDialog } from "@/components/RecipeDetailDialog";
import { cn } from "@/lib/utils";

interface WhatsForDinnerProps {
  pantryItems: string[];
  selectedIngredients: string[];
  savedRecipes: string[];
  onSaveRecipe: (recipeId: string) => void;
  onAddToCalendar: (recipe: Recipe) => void;
  onAddToShopping: (ingredient: string) => void;
  onViewRecipe?: (recipe: Recipe) => void;
}

function getTimeContext(): { mealType: MealType; label: string; icon: typeof Sun; greeting: string } {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 11) {
    return { mealType: "breakfast", label: "breakfast", icon: Coffee, greeting: "What's for breakfast?" };
  }
  if (hour >= 11 && hour < 15) {
    return { mealType: "lunch", label: "lunch", icon: Sun, greeting: "What's for lunch?" };
  }
  if (hour >= 15 && hour < 17) {
    return { mealType: "lunch", label: "a snack", icon: Cookie, greeting: "Afternoon bite?" };
  }
  if (hour >= 21 || hour < 5) {
    return { mealType: "dessert", label: "a treat", icon: Cookie, greeting: "Late-night treat?" };
  }
  return { mealType: "dinner", label: "dinner", icon: Moon, greeting: "What's for dinner tonight?" };
}

export function WhatsForDinner({
  pantryItems,
  selectedIngredients,
  savedRecipes,
  onSaveRecipe,
  onAddToCalendar,
  onAddToShopping,
  onViewRecipe,
}: WhatsForDinnerProps) {
  const ctx = useMemo(getTimeContext, []);
  const [shuffleKey, setShuffleKey] = useState(0);
  const [openRecipe, setOpenRecipe] = useState<Recipe | null>(null);

  // Pool: prefer pantry, fall back to selectedIngredients, then any matching meal type
  const candidates = useMemo(() => {
    const ingredientPool = pantryItems.length > 0 ? pantryItems : selectedIngredients;

    let pool: Recipe[] = [];
    if (ingredientPool.length > 0) {
      pool = getRecipesForIngredients(ingredientPool).filter(r => r.mealType === ctx.mealType);
    }

    // Fallback: any recipe of the right meal type
    if (pool.length === 0) {
      pool = sampleRecipes.filter(r => r.mealType === ctx.mealType);
    }

    // Deterministic shuffle anchor on time bucket so it's stable per session
    return pool;
  }, [pantryItems, selectedIngredients, ctx.mealType]);

  const suggestion = useMemo(() => {
    if (candidates.length === 0) return null;
    const idx = (shuffleKey + new Date().getHours()) % candidates.length;
    return candidates[idx];
  }, [candidates, shuffleKey]);

  if (!suggestion) return null;

  const Icon = ctx.icon;
  const matchCount =
    pantryItems.length > 0
      ? suggestion.ingredients.filter(ing =>
          pantryItems.some(p => p === ing || ing.includes(p) || p.includes(ing))
        ).length
      : 0;
  const hasMatches = matchCount > 0;

  return (
    <>
      <Card className="relative overflow-hidden shadow-elevated border-border/50 bg-card/95 backdrop-blur-sm group">
        <div className="absolute top-0 left-0 w-full h-1 gradient-warm" />
        <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full gradient-warm opacity-10 blur-2xl" />
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="shrink-0 p-2.5 sm:p-3 rounded-2xl gradient-warm shadow-warm">
              <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <p className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  {ctx.greeting}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShuffleKey(k => k + 1)}
                  className="h-7 px-2 text-xs text-muted-foreground hover:text-primary"
                  aria-label="Suggest another"
                >
                  <RefreshCw className="h-3.5 w-3.5 sm:mr-1" />
                  <span className="hidden sm:inline">Try another</span>
                </Button>
              </div>
              <h3 className="font-serif text-lg sm:text-2xl font-semibold mb-2 leading-tight">
                {suggestion.title}
              </h3>
              {suggestion.description && (
                <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-3">
                  {suggestion.description}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge variant="outline" className="text-[10px] sm:text-xs">
                  <Clock className="h-3 w-3 mr-1" />
                  {suggestion.cookTime}
                </Badge>
                <Badge variant="outline" className="text-[10px] sm:text-xs">
                  <ChefHat className="h-3 w-3 mr-1" />
                  {suggestion.servings} servings
                </Badge>
                {hasMatches && (
                  <Badge
                    className={cn(
                      "text-[10px] sm:text-xs",
                      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
                    )}
                  >
                    <Sparkles className="h-3 w-3 mr-1" />
                    {matchCount}/{suggestion.ingredients.length} from pantry
                  </Badge>
                )}
              </div>
              <Button
                variant="warm"
                size="sm"
                className="w-full sm:w-auto"
                onClick={() => {
                  setOpenRecipe(suggestion);
                  onViewRecipe?.(suggestion);
                }}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Cook this
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {openRecipe && (
        <RecipeDetailDialog
          recipe={{
            ...openRecipe,
            matchedIngredients: pantryItems.filter(p => openRecipe.ingredients.includes(p)),
            matchedKeyIngredients: [],
          }}
          open={!!openRecipe}
          onOpenChange={(open) => !open && setOpenRecipe(null)}
          isSaved={savedRecipes.includes(openRecipe.id)}
          onSave={() => onSaveRecipe(openRecipe.id)}
          onAddToCalendar={() => onAddToCalendar(openRecipe)}
          onAddToShopping={(ing) => onAddToShopping(ing)}
        />
      )}
    </>
  );
}