import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Heart, Check, Key, Wine, GlassWater, Leaf } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Drink } from "@/data/drinks";
import { DrinkDetailDialog } from "./DrinkDetailDialog";

interface DrinkCardProps {
  drink: Drink;
  isSaved: boolean;
  onSave: () => void;
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
};

export function DrinkCard({ drink, isSaved, onSave }: DrinkCardProps) {
  const [showDetail, setShowDetail] = useState(false);

  const config = drinkTypeConfig[drink.drinkType];
  const matchPercentage = Math.round(
    (drink.matchedIngredients.length / drink.ingredients.length) * 100
  );

  return (
    <>
      <Card
        className={cn(
          "group overflow-hidden transition-all duration-500 hover-lift border-border/50",
          "bg-card/80 backdrop-blur-sm",
          "animate-scale-in"
        )}
      >
        <CardHeader className="pb-3 relative">
          {/* Decorative gradient */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-30 pointer-events-none">
            <div className={cn("w-full h-full rounded-full blur-3xl", config.bg)} />
          </div>

          <div className="flex items-start justify-between gap-3 relative">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
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
                    Alcoholic
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
                {matchPercentage >= 80 && (
                  <Badge
                    variant="outline"
                    className="text-xs font-medium px-2 py-0.5 bg-secondary/10 border-secondary/30 text-secondary"
                  >
                    <Check className="h-3 w-3 mr-1" />
                    Great Match
                  </Badge>
                )}
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground leading-tight group-hover:text-primary transition-colors">
                {drink.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {drink.description}
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
              <Heart
                className={cn(
                  "h-5 w-5 transition-all duration-300",
                  isSaved && "fill-current scale-110"
                )}
              />
            </Button>
          </div>

          <div className="flex items-center gap-4 mt-4 text-sm">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{drink.prepTime}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50">
              <GlassWater className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{drink.glassType}</span>
            </div>
          </div>

          {/* Key ingredients matched */}
          {drink.matchedKeyIngredients && drink.matchedKeyIngredients.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4">
              {drink.matchedKeyIngredients.map((ing) => (
                <Badge
                  key={ing}
                  className="text-xs font-semibold px-2.5 py-1 bg-primary/15 border border-primary/30 text-primary"
                >
                  <Key className="h-3 w-3 mr-1" />
                  {ing.replace("-", " ")}
                </Badge>
              ))}
            </div>
          )}

          {/* Matched ingredients */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {drink.matchedIngredients
              .filter((ing) => !drink.matchedKeyIngredients?.includes(ing))
              .slice(0, 4)
              .map((ing) => (
                <Badge
                  key={ing}
                  variant="outline"
                  className="text-xs font-medium bg-secondary/5 border-secondary/20 text-secondary"
                >
                  <Check className="h-3 w-3 mr-1" />
                  {ing.replace("-", " ")}
                </Badge>
              ))}
            {drink.matchedIngredients.filter(
              (ing) => !drink.matchedKeyIngredients?.includes(ing)
            ).length > 4 && (
              <Badge variant="outline" className="text-xs bg-muted/50">
                +
                {drink.matchedIngredients.filter(
                  (ing) => !drink.matchedKeyIngredients?.includes(ing)
                ).length - 4}
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="pt-0 space-y-3">
          <Button
            variant="warm"
            size="default"
            className="w-full"
            onClick={() => setShowDetail(true)}
          >
            <GlassWater className="h-4 w-4 mr-2" />
            View Recipe & Make
          </Button>
        </CardContent>
      </Card>

      <DrinkDetailDialog
        drink={drink}
        open={showDetail}
        onOpenChange={setShowDetail}
        isSaved={isSaved}
        onSave={onSave}
      />
    </>
  );
}
