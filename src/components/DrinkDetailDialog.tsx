import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Clock,
  Wine,
  Heart,
  Check,
  Plus,
  ChevronLeft,
  ChevronRight,
  GlassWater,
  Leaf,
  Repeat,
  ShoppingCart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Drink } from "@/data/drinks";

interface DrinkDetailDialogProps {
  drink: Drink;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isSaved: boolean;
  onSave: () => void;
  onAddToShopping?: (ingredients: string[]) => void;
}

const drinkTypeConfig = {
  cocktail: {
    bg: "bg-gradient-to-r from-amber-400/20 to-orange-400/20",
    border: "border-amber-400/30",
    text: "text-amber-700 dark:text-amber-400",
    emoji: "🍸",
    label: "Cocktail",
  },
  mocktail: {
    bg: "bg-gradient-to-r from-emerald-400/20 to-teal-400/20",
    border: "border-emerald-400/30",
    text: "text-emerald-700 dark:text-emerald-400",
    emoji: "🍹",
    label: "Mocktail",
  },
  smoothie: {
    bg: "bg-gradient-to-r from-pink-400/20 to-rose-400/20",
    border: "border-pink-400/30",
    text: "text-pink-700 dark:text-pink-400",
    emoji: "🥤",
    label: "Smoothie",
  },
  wellness: {
    bg: "bg-gradient-to-r from-green-400/20 to-emerald-400/20",
    border: "border-green-400/30",
    text: "text-green-700 dark:text-green-400",
    emoji: "🌿",
    label: "Wellness",
  },
  hot: {
    bg: "bg-gradient-to-r from-orange-400/20 to-red-400/20",
    border: "border-orange-400/30",
    text: "text-orange-700 dark:text-orange-400",
    emoji: "☕",
    label: "Hot Drink",
  },
};

export function DrinkDetailDialog({
  drink,
  open,
  onOpenChange,
  isSaved,
  onSave,
  onAddToShopping,
}: DrinkDetailDialogProps) {
  const [cookingMode, setCookingMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const config = drinkTypeConfig[drink.drinkType];
  const missingIngredients = drink.ingredients.filter(
    (ing) => !drink.matchedIngredients.includes(ing)
  );

  const handleNextStep = () => {
    if (currentStep < drink.instructions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleClose = () => {
    setCookingMode(false);
    setCurrentStep(0);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge
                  className={cn(
                    "text-xs font-semibold px-3 py-1 rounded-full border",
                    config.bg,
                    config.border,
                    config.text
                  )}
                >
                  <span className="mr-1">{config.emoji}</span>
                  {config.label}
                </Badge>
                {drink.isAlcoholic ? (
                  <Badge variant="outline" className="text-xs">
                    <Wine className="h-3 w-3 mr-1" />
                    Contains Alcohol
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="text-xs text-emerald-600 border-emerald-300"
                  >
                    <Leaf className="h-3 w-3 mr-1" />
                    Non-Alcoholic
                  </Badge>
                )}
              </div>
              <DialogTitle className="font-serif text-2xl">
                {drink.title}
              </DialogTitle>
              <p className="text-muted-foreground">{drink.description}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onSave}
              className={cn(
                "shrink-0 rounded-full",
                isSaved && "text-primary bg-primary/10"
              )}
            >
              <Heart className={cn("h-5 w-5", isSaved && "fill-current")} />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{drink.prepTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <GlassWater className="h-4 w-4" />
            <span>{drink.glassType}</span>
          </div>
        </div>

        <Separator />

        {!cookingMode ? (
          <>
            {/* Ingredients */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Ingredients</h3>
              <div className="grid grid-cols-2 gap-2">
                {drink.ingredients.map((ing) => {
                  const isMatched = drink.matchedIngredients.includes(ing);
                  return (
                    <div
                      key={ing}
                      className={cn(
                        "flex items-center gap-2 p-2 rounded-lg border transition-colors",
                        isMatched
                          ? "bg-secondary/10 border-secondary/30"
                          : "bg-accent/30 border-accent-foreground/20 cursor-pointer hover:bg-primary/10 hover:border-primary/30"
                      )}
                      onClick={() => {
                        if (!isMatched && onAddToShopping) {
                          onAddToShopping([ing]);
                        }
                      }}
                    >
                      {isMatched ? (
                        <Check className="h-4 w-4 text-secondary" />
                      ) : (
                        <Plus className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className="text-sm capitalize">
                        {ing.replace("-", " ")}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <Separator />

            {/* Instructions */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Instructions</h3>
              <ol className="space-y-3">
                {drink.instructions.map((step, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-semibold flex items-center justify-center">
                      {index + 1}
                    </span>
                    <span className="text-sm">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Alcohol Substitutions */}
            {drink.alcoholSubstitutions && drink.alcoholSubstitutions.length > 0 && (
              <>
                <Separator />
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Repeat className="h-4 w-4 text-primary" />
                    Spirit Substitutions
                  </h3>
                  <div className="space-y-2">
                    {drink.alcoholSubstitutions.map((sub, index) => (
                      <div key={index} className="p-3 rounded-lg bg-muted/50 border border-border/50">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium capitalize">{sub.original.replace("-", " ")}</span>
                          <span className="text-muted-foreground">→</span>
                          <span className="text-sm text-primary font-medium">
                            {sub.alternatives.map(a => a.replace("-", " ")).join(", ")}
                          </span>
                        </div>
                        {sub.notes && (
                          <p className="text-xs text-muted-foreground">{sub.notes}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {drink.garnish && (
              <>
                <Separator />
                <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                  <Leaf className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm">
                    <strong>Garnish:</strong> {drink.garnish}
                  </span>
                </div>
              </>
            )}

            <div className="flex gap-3 pt-4">
              {missingIngredients.length > 0 && onAddToShopping && (
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => onAddToShopping(missingIngredients)}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add {missingIngredients.length} Missing
                </Button>
              )}
              <Button
                variant="warm"
                className="flex-1"
                onClick={() => setCookingMode(true)}
              >
                Start Making
              </Button>
            </div>
          </>
        ) : (
          /* Cooking Mode */
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">Step-by-Step Mode</h3>
              <Badge variant="secondary">
                Step {currentStep + 1} of {drink.instructions.length}
              </Badge>
            </div>

            <div className="bg-muted/30 rounded-xl p-6 min-h-[150px] flex items-center justify-center">
              <p className="text-lg text-center">
                {drink.instructions[currentStep]}
              </p>
            </div>

            {/* Progress dots */}
            <div className="flex justify-center gap-2">
              {drink.instructions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    index === currentStep
                      ? "bg-primary w-6"
                      : index < currentStep
                      ? "bg-secondary"
                      : "bg-muted"
                  )}
                />
              ))}
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handlePrevStep}
                disabled={currentStep === 0}
                className="flex-1"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              {currentStep < drink.instructions.length - 1 ? (
                <Button
                  variant="warm"
                  onClick={handleNextStep}
                  className="flex-1"
                >
                  Next Step
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  variant="default"
                  onClick={handleClose}
                  className="flex-1 bg-secondary hover:bg-secondary/90"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Done!
                </Button>
              )}
            </div>

            <Button
              variant="ghost"
              className="w-full"
              onClick={() => setCookingMode(false)}
            >
              Back to Overview
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
