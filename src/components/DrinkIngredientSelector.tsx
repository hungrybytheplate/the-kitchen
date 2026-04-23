import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Wine, CupSoda, Citrus, Droplet, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";
import { drinkIngredientCategories, type DrinkIngredientCategory } from "@/data/drinkIngredients";
import type { LucideIcon } from "lucide-react";
import { CustomIngredientInput } from "./CustomIngredientInput";

interface DrinkIngredientSelectorProps {
  selectedIngredients: string[];
  onToggle: (id: string) => void;
  onAddCustomIngredient?: (id: string) => void;
}

// Color and icon mapping for drink categories
const categoryConfig: Record<string, { bg: string; border: string; badge: string; icon: LucideIcon }> = {
  spirits: { bg: "bg-amber-100 dark:bg-amber-900/20", border: "border-amber-300 dark:border-amber-700", badge: "bg-amber-200 text-amber-800 dark:bg-amber-800 dark:text-amber-200", icon: Wine },
  mixers: { bg: "bg-sky-100 dark:bg-sky-900/20", border: "border-sky-300 dark:border-sky-700", badge: "bg-sky-200 text-sky-800 dark:bg-sky-800 dark:text-sky-200", icon: CupSoda },
  citrus: { bg: "bg-yellow-100 dark:bg-yellow-900/20", border: "border-yellow-300 dark:border-yellow-700", badge: "bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200", icon: Citrus },
  syrups: { bg: "bg-rose-100 dark:bg-rose-900/20", border: "border-rose-300 dark:border-rose-700", badge: "bg-rose-200 text-rose-800 dark:bg-rose-800 dark:text-rose-200", icon: Droplet },
  garnishes: { bg: "bg-emerald-100 dark:bg-emerald-900/20", border: "border-emerald-300 dark:border-emerald-700", badge: "bg-emerald-200 text-emerald-800 dark:bg-emerald-800 dark:text-emerald-200", icon: Leaf },
};

const defaultConfig = { bg: "bg-muted/30", border: "border-border/50", badge: "bg-secondary text-secondary-foreground", icon: Wine };

function DrinkCategoryCard({
  category,
  selectedIngredients,
  onToggle,
}: {
  category: DrinkIngredientCategory;
  selectedIngredients: string[];
  onToggle: (id: string) => void;
}) {
  const selectedCount = category.ingredients.filter((ing) =>
    selectedIngredients.includes(ing.id)
  ).length;
  const config = categoryConfig[category.id] || defaultConfig;
  const Icon = config.icon;

  return (
    <div className={cn(
      "rounded-xl p-3 border animate-fade-in",
      config.bg,
      config.border
    )}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-foreground/70" />
          <h3 className="text-sm font-bold text-foreground">
            {category.name}
          </h3>
        </div>
        {selectedCount > 0 && (
          <Badge className={cn("text-[10px] px-1.5 py-0 border-0", config.badge)}>
            {selectedCount} selected
          </Badge>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1">
        {category.ingredients.map((ingredient) => {
          const isSelected = selectedIngredients.includes(ingredient.id);
          return (
            <label
              key={ingredient.id}
              className={cn(
                "flex items-center gap-2 px-2.5 py-1.5 rounded-lg cursor-pointer transition-all duration-200",
                "hover:bg-muted/80 border",
                isSelected 
                  ? "bg-primary/10 border-primary shadow-sm" 
                  : "bg-card border-transparent"
              )}
            >
              <Checkbox
                checked={isSelected}
                onCheckedChange={() => onToggle(ingredient.id)}
                className="h-4 w-4 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <span className={cn(
                "text-xs transition-colors leading-tight",
                isSelected ? "text-foreground font-medium" : "text-muted-foreground"
              )}>
                {ingredient.name}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

// Group categories for tabs
const spiritsCategories = ["spirits"];
const mixersCategories = ["mixers", "citrus"];
const extrasCategories = ["syrups", "garnishes"];

export function DrinkIngredientSelector({
  selectedIngredients,
  onToggle,
}: DrinkIngredientSelectorProps) {
  const spiritItems = drinkIngredientCategories.filter(c => spiritsCategories.includes(c.id));
  const mixerItems = drinkIngredientCategories.filter(c => mixersCategories.includes(c.id));
  const extraItems = drinkIngredientCategories.filter(c => extrasCategories.includes(c.id));

  return (
    <Tabs defaultValue="mixers" className="w-full">
      <TabsList className="w-full grid grid-cols-3 h-11 sm:h-14 bg-muted/50 p-1 rounded-lg sm:rounded-xl">
        <TabsTrigger 
          value="mixers" 
          className="rounded-md sm:rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm flex items-center justify-center gap-1 sm:gap-2 font-medium text-xs sm:text-sm"
          aria-label="Mixers and citrus ingredients"
        >
          <CupSoda className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
          <span className="hidden xs:inline sm:inline">Mixers</span>
        </TabsTrigger>
        <TabsTrigger 
          value="spirits" 
          className="rounded-md sm:rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm flex items-center justify-center gap-1 sm:gap-2 font-medium text-xs sm:text-sm"
          aria-label="Spirits and liquors"
        >
          <Wine className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
          <span className="hidden xs:inline sm:inline">Spirits</span>
        </TabsTrigger>
        <TabsTrigger 
          value="extras" 
          className="rounded-md sm:rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm flex items-center justify-center gap-1 sm:gap-2 font-medium text-xs sm:text-sm"
          aria-label="Syrups and garnishes"
        >
          <Leaf className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
          <span className="hidden xs:inline sm:inline">Extras</span>
        </TabsTrigger>
      </TabsList>

      <ScrollArea className="h-[400px] mt-4 pr-4">
        <TabsContent value="mixers" className="space-y-6 mt-0">
          {mixerItems.map((category) => (
            <DrinkCategoryCard
              key={category.id}
              category={category}
              selectedIngredients={selectedIngredients}
              onToggle={onToggle}
            />
          ))}
        </TabsContent>

        <TabsContent value="spirits" className="space-y-6 mt-0">
          {spiritItems.map((category) => (
            <DrinkCategoryCard
              key={category.id}
              category={category}
              selectedIngredients={selectedIngredients}
              onToggle={onToggle}
            />
          ))}
        </TabsContent>

        <TabsContent value="extras" className="space-y-6 mt-0">
          {extraItems.map((category) => (
            <DrinkCategoryCard
              key={category.id}
              category={category}
              selectedIngredients={selectedIngredients}
              onToggle={onToggle}
            />
          ))}
        </TabsContent>
      </ScrollArea>
    </Tabs>
  );
}
