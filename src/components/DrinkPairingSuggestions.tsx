import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Wine, GlassWater, Sparkles, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Recipe } from "@/data/recipes";
import type { Drink } from "@/data/drinks";
import { getDrinkPairings, getPairingReason } from "@/lib/drinkPairings";
import { useState } from "react";
import { DrinkDetailDialog } from "./DrinkDetailDialog";

interface DrinkPairingSuggestionsProps {
  recipes: Recipe[];
  savedDrinks: string[];
  onSaveDrink: (drinkId: string) => void;
}

const drinkTypeConfig = {
  cocktail: {
    bg: "bg-gradient-to-r from-amber-400/20 to-orange-400/20",
    border: "border-amber-400/30",
    text: "text-amber-700 dark:text-amber-400",
    emoji: "🍸",
  },
  mocktail: {
    bg: "bg-gradient-to-r from-emerald-400/20 to-teal-400/20",
    border: "border-emerald-400/30",
    text: "text-emerald-700 dark:text-emerald-400",
    emoji: "🍹",
  },
  smoothie: {
    bg: "bg-gradient-to-r from-pink-400/20 to-rose-400/20",
    border: "border-pink-400/30",
    text: "text-pink-700 dark:text-pink-400",
    emoji: "🥤",
  },
};

export function DrinkPairingSuggestions({ 
  recipes, 
  savedDrinks, 
  onSaveDrink 
}: DrinkPairingSuggestionsProps) {
  const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null);

  if (recipes.length === 0) {
    return null;
  }

  // Get unique pairings across all planned meals
  const allPairings = new Map<string, { drink: Drink; recipes: Recipe[]; reason: string }>();
  
  recipes.forEach(recipe => {
    const pairings = getDrinkPairings(recipe, 2);
    pairings.forEach(drink => {
      if (allPairings.has(drink.id)) {
        allPairings.get(drink.id)!.recipes.push(recipe);
      } else {
        allPairings.set(drink.id, {
          drink,
          recipes: [recipe],
          reason: getPairingReason(recipe, drink),
        });
      }
    });
  });

  // Sort by number of recipes they pair with
  const sortedPairings = Array.from(allPairings.values())
    .sort((a, b) => b.recipes.length - a.recipes.length)
    .slice(0, 4);

  if (sortedPairings.length === 0) {
    return null;
  }

  return (
    <>
      <Card className="shadow-elevated border-border/50 bg-card/90 backdrop-blur-sm overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-emerald-400 to-pink-400" />
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-r from-amber-400/20 to-pink-400/20">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="font-serif text-xl">Drink Pairings</CardTitle>
              <p className="text-sm text-muted-foreground">
                Recommended drinks for your planned meals
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {sortedPairings.map(({ drink, recipes: pairedRecipes, reason }) => {
            const config = drinkTypeConfig[drink.drinkType];
            const isSaved = savedDrinks.includes(drink.id);
            
            return (
              <div
                key={drink.id}
                className={cn(
                  "p-3 rounded-xl border transition-all duration-200 cursor-pointer",
                  "hover:shadow-md hover:scale-[1.01]",
                  config.bg,
                  config.border
                )}
                onClick={() => setSelectedDrink(drink)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{config.emoji}</span>
                      <span className="font-semibold">{drink.title}</span>
                      {drink.isAlcoholic ? (
                        <Wine className="h-3.5 w-3.5 text-muted-foreground" />
                      ) : (
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0 text-emerald-600 border-emerald-300">
                          NA
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{reason}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {pairedRecipes.slice(0, 2).map(recipe => (
                        <Badge
                          key={recipe.id}
                          variant="secondary"
                          className="text-[10px] px-2 py-0.5"
                        >
                          {recipe.title}
                        </Badge>
                      ))}
                      {pairedRecipes.length > 2 && (
                        <Badge variant="outline" className="text-[10px] px-2 py-0.5">
                          +{pairedRecipes.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {selectedDrink && (
        <DrinkDetailDialog
          drink={selectedDrink}
          open={!!selectedDrink}
          onOpenChange={(open) => !open && setSelectedDrink(null)}
          isSaved={savedDrinks.includes(selectedDrink.id)}
          onSave={() => onSaveDrink(selectedDrink.id)}
        />
      )}
    </>
  );
}
