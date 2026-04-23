import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sparkles, Pencil, X, ChefHat } from "lucide-react";
import type { Recipe } from "@/data/recipes";
import { formatIngredientLabel } from "@/components/CustomIngredientInput";
import { cn } from "@/lib/utils";

type MealType = "breakfast" | "lunch" | "dinner" | "dessert" | "sides";

interface RecipePreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recipes: Recipe[];
  selectedIngredients: string[];
  onConfirm: () => void;
  onRemoveIngredient: (id: string) => void;
}

const MEAL_TYPE_ORDER: MealType[] = ["breakfast", "lunch", "dinner", "sides", "dessert"];

const MEAL_LABELS: Record<MealType, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
  sides: "Sides",
  dessert: "Dessert",
};

const MEAL_EMOJI: Record<MealType, string> = {
  breakfast: "🍳",
  lunch: "🥗",
  dinner: "🍽️",
  sides: "🥖",
  dessert: "🍰",
};

const MEAL_ACCENT: Record<MealType, string> = {
  breakfast: "bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-200",
  lunch: "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-200",
  dinner: "bg-rose-100 text-rose-900 dark:bg-rose-900/30 dark:text-rose-200",
  sides: "bg-sky-100 text-sky-900 dark:bg-sky-900/30 dark:text-sky-200",
  dessert: "bg-pink-100 text-pink-900 dark:bg-pink-900/30 dark:text-pink-200",
};

export function RecipePreviewDialog({
  open,
  onOpenChange,
  recipes,
  selectedIngredients,
  onConfirm,
  onRemoveIngredient,
}: RecipePreviewDialogProps) {
  // Group recipes by meal type
  const grouped = MEAL_TYPE_ORDER.reduce((acc, type) => {
    acc[type] = recipes.filter((r) => r.mealType === type);
    return acc;
  }, {} as Record<MealType, Recipe[]>);

  const totalRecipes = recipes.length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] flex flex-col p-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 gradient-warm" />

        <DialogHeader className="px-5 sm:px-6 pt-6 sm:pt-7 pb-3">
          <DialogTitle className="font-serif text-xl sm:text-2xl flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Recipe Preview
          </DialogTitle>
          <DialogDescription>
            We found <strong className="text-foreground">{totalRecipes}</strong>{" "}
            {totalRecipes === 1 ? "recipe" : "recipes"} from your{" "}
            <strong className="text-foreground">{selectedIngredients.length}</strong>{" "}
            {selectedIngredients.length === 1 ? "ingredient" : "ingredients"}. Review the breakdown below or edit your selection before generating.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 px-5 sm:px-6">
          <div className="space-y-4 pb-4">
            {/* Meal type breakdown */}
            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                By meal type
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {MEAL_TYPE_ORDER.map((type) => {
                  const list = grouped[type];
                  if (list.length === 0) return null;
                  return (
                    <div
                      key={type}
                      className="rounded-lg border border-border/60 bg-card/60 p-3"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <span className="text-base leading-none">
                            {MEAL_EMOJI[type]}
                          </span>
                          <span className="text-sm font-semibold">
                            {MEAL_LABELS[type]}
                          </span>
                        </div>
                        <Badge
                          variant="secondary"
                          className={cn("text-[10px] px-1.5 py-0", MEAL_ACCENT[type])}
                        >
                          {list.length}
                        </Badge>
                      </div>
                      <ul className="space-y-0.5">
                        {list.slice(0, 3).map((r) => (
                          <li
                            key={r.id}
                            className="text-xs text-muted-foreground truncate"
                          >
                            • {r.title}
                          </li>
                        ))}
                        {list.length > 3 && (
                          <li className="text-[11px] italic text-muted-foreground/80">
                            + {list.length - 3} more
                          </li>
                        )}
                      </ul>
                    </div>
                  );
                })}
              </div>

              {totalRecipes === 0 && (
                <div className="rounded-lg border border-dashed border-border bg-muted/30 p-6 text-center">
                  <ChefHat className="h-7 w-7 mx-auto mb-2 text-muted-foreground/60" />
                  <p className="text-sm text-muted-foreground">
                    No recipes match this combination yet. Try editing your ingredients below.
                  </p>
                </div>
              )}
            </div>

            {/* Selected ingredients - editable */}
            <div className="space-y-2 pt-2 border-t border-border/40">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-1.5">
                  <Pencil className="h-3 w-3" />
                  Selected ingredients
                </h3>
                <span className="text-[11px] text-muted-foreground">
                  Tap × to remove
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedIngredients.map((id) => (
                  <Badge
                    key={id}
                    variant="outline"
                    className="cursor-pointer capitalize text-xs gap-1 group hover:bg-destructive/10 hover:border-destructive/40 hover:text-destructive transition-colors"
                    onClick={() => onRemoveIngredient(id)}
                  >
                    {formatIngredientLabel(id)}
                    <X className="h-3 w-3 opacity-50 group-hover:opacity-100" />
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="flex items-center justify-between gap-2 px-5 sm:px-6 py-3 border-t border-border/40 bg-muted/20">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange(false)}
          >
            Edit ingredients
          </Button>
          <Button
            variant="warm"
            size="sm"
            onClick={onConfirm}
            disabled={totalRecipes === 0}
            className="min-w-[140px]"
          >
            <Sparkles className="h-4 w-4 mr-1.5" />
            Generate recipes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
