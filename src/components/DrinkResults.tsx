import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Wine, GlassWater, BlendIcon, Sparkles, Snowflake, X, Zap, Shield, Beef, Heart, Leaf, Flame, Fish, Citrus, Droplets, Apple } from "lucide-react";
import { DrinkCard } from "./DrinkCard";
import type { Drink, HealthTag } from "@/data/drinks";
import { cn } from "@/lib/utils";

interface DrinkResultsProps {
  drinks: Drink[];
  savedDrinks: string[];
  onSave: (drinkId: string) => void;
}

const healthTagConfig: Record<HealthTag, { icon: React.ElementType; color: string }> = {
  "Energy Boost": { icon: Zap, color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800" },
  "Immune Support": { icon: Shield, color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800" },
  "Protein Rich": { icon: Beef, color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800" },
  "Antioxidant": { icon: Sparkles, color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-800" },
  "Digestive": { icon: Apple, color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800" },
  "Detox": { icon: Leaf, color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800" },
  "Anti-Inflammatory": { icon: Flame, color: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 border-orange-200 dark:border-orange-800" },
  "Omega-3": { icon: Fish, color: "bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300 border-sky-200 dark:border-sky-800" },
  "Vitamin C": { icon: Citrus, color: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800" },
  "Heart Healthy": { icon: Heart, color: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300 border-pink-200 dark:border-pink-800" },
  "Low Calorie": { icon: Droplets, color: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800" },
  "Hydrating": { icon: Droplets, color: "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300 border-teal-200 dark:border-teal-800" },
  "High Fiber": { icon: Leaf, color: "bg-lime-100 text-lime-800 dark:bg-lime-900/30 dark:text-lime-300 border-lime-200 dark:border-lime-800" },
};

export function DrinkResults({ drinks, savedDrinks, onSave }: DrinkResultsProps) {
  const [showHolidayOnly, setShowHolidayOnly] = useState(false);
  const [selectedHealthTags, setSelectedHealthTags] = useState<HealthTag[]>([]);

  // Get all available health tags from the drinks
  const availableHealthTags = Array.from(
    new Set(drinks.flatMap(d => d.healthTags || []))
  ).sort() as HealthTag[];

  // Toggle a health tag filter
  const toggleHealthTag = (tag: HealthTag) => {
    setSelectedHealthTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // Clear all health tag filters
  const clearHealthTags = () => {
    setSelectedHealthTags([]);
  };

  // Filter by holiday if enabled
  let filteredDrinks = showHolidayOnly 
    ? drinks.filter(d => d.isHoliday) 
    : drinks;

  // Filter by health tags if any selected
  if (selectedHealthTags.length > 0) {
    filteredDrinks = filteredDrinks.filter(d => 
      d.healthTags && selectedHealthTags.some(tag => d.healthTags?.includes(tag))
    );
  }

  const cocktails = filteredDrinks.filter((d) => d.drinkType === "cocktail");
  const mocktails = filteredDrinks.filter((d) => d.drinkType === "mocktail");
  const smoothies = filteredDrinks.filter((d) => d.drinkType === "smoothie");
  const wellness = filteredDrinks.filter((d) => d.drinkType === "wellness");

  const holidayCount = drinks.filter(d => d.isHoliday).length;

  if (drinks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Select all ingredients needed for a drink recipe to see it here!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters Section */}
      <div className="space-y-3">
        {/* Holiday Filter */}
        {holidayCount > 0 && (
          <div className="flex items-center gap-2">
            <Badge
              variant={showHolidayOnly ? "default" : "outline"}
              className={cn(
                "cursor-pointer transition-all hover:scale-105 px-3 py-1.5",
                showHolidayOnly 
                  ? "bg-red-500 hover:bg-red-600 text-white shadow-md" 
                  : "bg-background hover:bg-muted border-border"
              )}
              onClick={() => setShowHolidayOnly(!showHolidayOnly)}
            >
              <Snowflake className="h-4 w-4 mr-1.5" />
              Holiday Favorites
              <span className="ml-1.5 text-xs opacity-80">({holidayCount})</span>
            </Badge>
            {showHolidayOnly && (
              <span className="text-xs text-muted-foreground">
                Showing {filteredDrinks.length} holiday drinks
              </span>
            )}
          </div>
        )}

        {/* Health Tag Filters */}
        {availableHealthTags.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Filter by health benefits:</span>
              {selectedHealthTags.length > 0 && (
                <button 
                  onClick={clearHealthTags}
                  className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                  aria-label="Clear all health tag filters"
                >
                  <X className="h-3 w-3" />
                  Clear filters
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {availableHealthTags.map((tag) => {
                const config = healthTagConfig[tag];
                const Icon = config?.icon || Sparkles;
                const isSelected = selectedHealthTags.includes(tag);
                const tagCount = drinks.filter(d => d.healthTags?.includes(tag)).length;
                
                return (
                  <Badge
                    key={tag}
                    variant="outline"
                    className={cn(
                      "cursor-pointer transition-all hover:scale-105 px-2.5 py-1",
                      isSelected 
                        ? cn(config?.color, "shadow-sm ring-1 ring-offset-1 ring-primary/20") 
                        : "bg-background hover:bg-muted border-border"
                    )}
                    onClick={() => toggleHealthTag(tag)}
                  >
                    <Icon className="h-3 w-3 mr-1" />
                    {tag}
                    <span className="ml-1 text-xs opacity-70">({tagCount})</span>
                  </Badge>
                );
              })}
            </div>
            {selectedHealthTags.length > 0 && (
              <p className="text-xs text-muted-foreground">
                Showing {filteredDrinks.length} drinks with selected health benefits
              </p>
            )}
          </div>
        )}
      </div>

      <Tabs defaultValue="smoothie" className="w-full">
        <TabsList className="w-full grid grid-cols-4 h-12 bg-muted/50 p-1 rounded-xl mb-6">
          <TabsTrigger
            value="smoothie"
            className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm flex items-center gap-2"
            aria-label={`Smoothies tab, ${smoothies.length} drinks`}
          >
            <BlendIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Smoothies</span>
            <span className="text-xs text-muted-foreground">({smoothies.length})</span>
          </TabsTrigger>
          <TabsTrigger
            value="wellness"
            className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm flex items-center gap-2"
            aria-label={`Wellness tab, ${wellness.length} drinks`}
          >
            <Sparkles className="h-4 w-4" />
            <span className="hidden sm:inline">Wellness</span>
            <span className="text-xs text-muted-foreground">({wellness.length})</span>
          </TabsTrigger>
          <TabsTrigger
            value="mocktail"
            className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm flex items-center gap-2"
            aria-label={`Mocktails tab, ${mocktails.length} drinks`}
          >
            <GlassWater className="h-4 w-4" />
            <span className="hidden sm:inline">Mocktails</span>
            <span className="text-xs text-muted-foreground">({mocktails.length})</span>
          </TabsTrigger>
          <TabsTrigger
            value="cocktail"
            className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm flex items-center gap-2"
            aria-label={`Cocktails tab, ${cocktails.length} drinks`}
          >
            <Wine className="h-4 w-4" />
            <span className="hidden sm:inline">Cocktails</span>
            <span className="text-xs text-muted-foreground">({cocktails.length})</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="smoothie" className="mt-0">
          <div className="grid gap-3 md:grid-cols-2">
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
                {selectedHealthTags.length > 0
                  ? "No smoothies match the selected health filters. Try different filters!"
                  : showHolidayOnly 
                    ? "No holiday smoothies available. Try turning off the filter!"
                    : "No smoothies match. Select all ingredients for a smoothie recipe!"}
              </p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="wellness" className="mt-0">
          <div className="grid gap-3 md:grid-cols-2">
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
                {selectedHealthTags.length > 0
                  ? "No wellness drinks match the selected health filters. Try different filters!"
                  : showHolidayOnly 
                    ? "No holiday wellness drinks available. Try turning off the filter!"
                    : "No wellness drinks match. Select all ingredients for a wellness recipe!"}
              </p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="mocktail" className="mt-0">
          <div className="grid gap-3 md:grid-cols-2">
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
                {selectedHealthTags.length > 0
                  ? "No mocktails match the selected health filters. Try different filters!"
                  : showHolidayOnly 
                    ? "No holiday mocktails available. Try turning off the filter!"
                    : "No mocktails match. Select all ingredients for a mocktail recipe!"}
              </p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="cocktail" className="mt-0">
          <div className="grid gap-3 md:grid-cols-2">
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
                {selectedHealthTags.length > 0
                  ? "No cocktails match the selected health filters. Try different filters!"
                  : showHolidayOnly 
                    ? "No holiday cocktails available. Try turning off the filter!"
                    : "No cocktails match. Select all ingredients for a cocktail recipe!"}
              </p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
