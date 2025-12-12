import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Heart, Check, Key, Wine, GlassWater, Leaf, Sparkles, Zap, Shield, Dumbbell, HeartPulse, Droplets } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Drink, HealthTag } from "@/data/drinks";
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
  wellness: {
    bg: "bg-gradient-to-r from-violet-400/20 to-purple-400/20",
    border: "border-violet-400/30",
    text: "text-violet-700 dark:text-violet-400",
    emoji: "✨",
    label: "Wellness",
  },
};

const healthTagConfig: Record<HealthTag, { icon: typeof Zap; color: string }> = {
  "Energy Boost": { icon: Zap, color: "bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-700" },
  "Immune Support": { icon: Shield, color: "bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-700" },
  "Protein Rich": { icon: Dumbbell, color: "bg-orange-100 text-orange-700 border-orange-300 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-700" },
  "Antioxidant": { icon: Sparkles, color: "bg-purple-100 text-purple-700 border-purple-300 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-700" },
  "Digestive": { icon: HeartPulse, color: "bg-green-100 text-green-700 border-green-300 dark:bg-green-900/30 dark:text-green-400 dark:border-green-700" },
  "Detox": { icon: Leaf, color: "bg-emerald-100 text-emerald-700 border-emerald-300 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-700" },
  "Anti-Inflammatory": { icon: Shield, color: "bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-700" },
  "Omega-3": { icon: HeartPulse, color: "bg-cyan-100 text-cyan-700 border-cyan-300 dark:bg-cyan-900/30 dark:text-cyan-400 dark:border-cyan-700" },
  "Vitamin C": { icon: Zap, color: "bg-orange-100 text-orange-700 border-orange-300 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-700" },
  "Heart Healthy": { icon: HeartPulse, color: "bg-red-100 text-red-700 border-red-300 dark:bg-red-900/30 dark:text-red-400 dark:border-red-700" },
  "Low Calorie": { icon: Leaf, color: "bg-lime-100 text-lime-700 border-lime-300 dark:bg-lime-900/30 dark:text-lime-400 dark:border-lime-700" },
  "Hydrating": { icon: Droplets, color: "bg-sky-100 text-sky-700 border-sky-300 dark:bg-sky-900/30 dark:text-sky-400 dark:border-sky-700" },
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

          {/* Health benefit tags */}
          {drink.healthTags && drink.healthTags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {drink.healthTags.map((tag) => {
                const tagConfig = healthTagConfig[tag];
                const TagIcon = tagConfig.icon;
                return (
                  <Badge
                    key={tag}
                    variant="outline"
                    className={cn("text-xs font-medium px-2 py-0.5 border", tagConfig.color)}
                  >
                    <TagIcon className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                );
              })}
            </div>
          )}

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
