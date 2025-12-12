import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Wine, GlassWater, BlendIcon, Sparkles } from "lucide-react";
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
  const wellness = drinks.filter((d) => d.drinkType === "wellness");

  if (drinks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Select all ingredients needed for a drink recipe to see it here!</p>
      </div>
    );
  }

  return (
    <Tabs defaultValue="smoothie" className="w-full">
      <TabsList className="w-full grid grid-cols-4 h-12 bg-muted/50 p-1 rounded-xl mb-6">
        <TabsTrigger
          value="smoothie"
          className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm flex items-center gap-2"
        >
          <BlendIcon className="h-4 w-4" />
          <span className="hidden sm:inline">Smoothies</span>
          <span className="text-xs text-muted-foreground">({smoothies.length})</span>
        </TabsTrigger>
        <TabsTrigger
          value="wellness"
          className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm flex items-center gap-2"
        >
          <Sparkles className="h-4 w-4" />
          <span className="hidden sm:inline">Wellness</span>
          <span className="text-xs text-muted-foreground">({wellness.length})</span>
        </TabsTrigger>
        <TabsTrigger
          value="mocktail"
          className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm flex items-center gap-2"
        >
          <GlassWater className="h-4 w-4" />
          <span className="hidden sm:inline">Mocktails</span>
          <span className="text-xs text-muted-foreground">({mocktails.length})</span>
        </TabsTrigger>
        <TabsTrigger
          value="cocktail"
          className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm flex items-center gap-2"
        >
          <Wine className="h-4 w-4" />
          <span className="hidden sm:inline">Cocktails</span>
          <span className="text-xs text-muted-foreground">({cocktails.length})</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="smoothie" className="mt-0">
        <div className="grid gap-4 md:grid-cols-2">
          {smoothies.length > 0 ? (
            smoothies.map((drink) => (
              <DrinkCard
                key={drink.id}
                drink={drink}
                isSaved={savedDrinks.includes(drink.id)}
                onSave={() => onSave(drink.id)}
              />
            ))
          ) : (
            <p className="text-muted-foreground col-span-2 text-center py-8">
              No smoothies match. Select all ingredients for a smoothie recipe!
            </p>
          )}
        </div>
      </TabsContent>

      <TabsContent value="wellness" className="mt-0">
        <div className="grid gap-4 md:grid-cols-2">
          {wellness.length > 0 ? (
            wellness.map((drink) => (
              <DrinkCard
                key={drink.id}
                drink={drink}
                isSaved={savedDrinks.includes(drink.id)}
                onSave={() => onSave(drink.id)}
              />
            ))
          ) : (
            <p className="text-muted-foreground col-span-2 text-center py-8">
              No wellness drinks match. Select all ingredients for a wellness recipe!
            </p>
          )}
        </div>
      </TabsContent>

      <TabsContent value="mocktail" className="mt-0">
        <div className="grid gap-4 md:grid-cols-2">
          {mocktails.length > 0 ? (
            mocktails.map((drink) => (
              <DrinkCard
                key={drink.id}
                drink={drink}
                isSaved={savedDrinks.includes(drink.id)}
                onSave={() => onSave(drink.id)}
              />
            ))
          ) : (
            <p className="text-muted-foreground col-span-2 text-center py-8">
              No mocktails match. Select all ingredients for a mocktail recipe!
            </p>
          )}
        </div>
      </TabsContent>

      <TabsContent value="cocktail" className="mt-0">
        <div className="grid gap-4 md:grid-cols-2">
          {cocktails.length > 0 ? (
            cocktails.map((drink) => (
              <DrinkCard
                key={drink.id}
                drink={drink}
                isSaved={savedDrinks.includes(drink.id)}
                onSave={() => onSave(drink.id)}
              />
            ))
          ) : (
            <p className="text-muted-foreground col-span-2 text-center py-8">
              No cocktails match. Select all ingredients for a cocktail recipe!
            </p>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}
