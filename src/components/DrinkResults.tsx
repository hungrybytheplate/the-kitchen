import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Wine, GlassWater, BlendIcon } from "lucide-react";
import { DrinkCard } from "./DrinkCard";
import type { Drink } from "@/data/drinks";

interface DrinkResultsProps {
  drinks: Drink[];
  savedDrinks: string[];
  onSave: (drinkId: string) => void;
}

export function DrinkResults({ drinks, savedDrinks, onSave }: DrinkResultsProps) {
  const cocktails = drinks.filter((d) => d.drinkType === "cocktail");
  const mocktails = drinks.filter((d) => d.drinkType === "mocktail");
  const smoothies = drinks.filter((d) => d.drinkType === "smoothie");

  if (drinks.length === 0) {
    return (
      <Card className="shadow-elevated border-border/50 bg-card/90 backdrop-blur-sm">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <div className="p-4 rounded-full bg-muted/50 mb-4">
            <GlassWater className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="font-serif text-xl font-semibold mb-2">No drinks found</h3>
          <p className="text-muted-foreground max-w-sm">
            Select more ingredients to discover matching drink recipes
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-elevated border-border/50 bg-card/90 backdrop-blur-sm overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-emerald-400 to-pink-400" />
      <CardContent className="p-4">
        <Tabs defaultValue="cocktail" className="space-y-4">
          <TabsList className="w-full grid grid-cols-3 h-12 glass p-1 rounded-xl">
            <TabsTrigger
              value="cocktail"
              className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm flex items-center gap-2"
            >
              <Wine className="h-4 w-4" />
              <span className="hidden sm:inline">Cocktails</span>
              <Badge variant="secondary" className="text-xs">
                {cocktails.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger
              value="mocktail"
              className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm flex items-center gap-2"
            >
              <GlassWater className="h-4 w-4" />
              <span className="hidden sm:inline">Mocktails</span>
              <Badge variant="secondary" className="text-xs">
                {mocktails.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger
              value="smoothie"
              className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm flex items-center gap-2"
            >
              <BlendIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Smoothies</span>
              <Badge variant="secondary" className="text-xs">
                {smoothies.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cocktail" className="mt-4 space-y-4">
            {cocktails.length > 0 ? (
              <div className="grid gap-4">
                {cocktails.map((drink) => (
                  <DrinkCard
                    key={drink.id}
                    drink={drink}
                    isSaved={savedDrinks.includes(drink.id)}
                    onSave={() => onSave(drink.id)}
                  />
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No cocktails match your ingredients. Try adding spirits!
              </p>
            )}
          </TabsContent>

          <TabsContent value="mocktail" className="mt-4 space-y-4">
            {mocktails.length > 0 ? (
              <div className="grid gap-4">
                {mocktails.map((drink) => (
                  <DrinkCard
                    key={drink.id}
                    drink={drink}
                    isSaved={savedDrinks.includes(drink.id)}
                    onSave={() => onSave(drink.id)}
                  />
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No mocktails match your ingredients. Try adding citrus or mint!
              </p>
            )}
          </TabsContent>

          <TabsContent value="smoothie" className="mt-4 space-y-4">
            {smoothies.length > 0 ? (
              <div className="grid gap-4">
                {smoothies.map((drink) => (
                  <DrinkCard
                    key={drink.id}
                    drink={drink}
                    isSaved={savedDrinks.includes(drink.id)}
                    onSave={() => onSave(drink.id)}
                  />
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No smoothies match your ingredients. Try adding fruits!
              </p>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
