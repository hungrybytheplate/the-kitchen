import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, Wine, CupSoda, Citrus, Droplet, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";
import { drinkIngredientCategories, type DrinkIngredientCategory } from "@/data/drinkIngredients";

interface DrinkIngredientSelectorProps {
  selectedIngredients: string[];
  onToggle: (id: string) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  wine: <Wine className="h-4 w-4" />,
  "cup-soda": <CupSoda className="h-4 w-4" />,
  citrus: <Citrus className="h-4 w-4" />,
  droplet: <Droplet className="h-4 w-4" />,
  leaf: <Leaf className="h-4 w-4" />,
};

const colorMap: Record<string, { bg: string; border: string; badge: string; text: string }> = {
  amber: {
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    badge: "bg-amber-500/20 text-amber-700 dark:text-amber-400",
    text: "text-amber-700 dark:text-amber-400",
  },
  sky: {
    bg: "bg-sky-500/10",
    border: "border-sky-500/30",
    badge: "bg-sky-500/20 text-sky-700 dark:text-sky-400",
    text: "text-sky-700 dark:text-sky-400",
  },
  yellow: {
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/30",
    badge: "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400",
    text: "text-yellow-700 dark:text-yellow-400",
  },
  rose: {
    bg: "bg-rose-500/10",
    border: "border-rose-500/30",
    badge: "bg-rose-500/20 text-rose-700 dark:text-rose-400",
    text: "text-rose-700 dark:text-rose-400",
  },
  emerald: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    badge: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-400",
    text: "text-emerald-700 dark:text-emerald-400",
  },
};

function DrinkIngredientCategory({
  category,
  selectedIngredients,
  onToggle,
}: {
  category: DrinkIngredientCategory;
  selectedIngredients: string[];
  onToggle: (id: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const selectedCount = category.ingredients.filter((ing) =>
    selectedIngredients.includes(ing.id)
  ).length;

  const colors = colorMap[category.color] || colorMap.amber;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger
        className={cn(
          "w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200",
          "hover:bg-muted/50",
          colors.bg,
          colors.border,
          "border"
        )}
      >
        <div className="flex items-center gap-3">
          <div className={cn("p-1.5 rounded-lg", colors.badge)}>
            {iconMap[category.icon]}
          </div>
          <span className="font-semibold text-sm">{category.name}</span>
          {selectedCount > 0 && (
            <Badge className={cn("text-xs", colors.badge)}>
              {selectedCount}
            </Badge>
          )}
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </CollapsibleTrigger>

      <CollapsibleContent className="pt-3 pb-1 px-1">
        <div className="grid grid-cols-2 gap-2">
          {category.ingredients.map((ingredient) => {
            const isSelected = selectedIngredients.includes(ingredient.id);
            return (
              <label
                key={ingredient.id}
                className={cn(
                  "flex items-center gap-2 p-2.5 rounded-lg cursor-pointer transition-all duration-200",
                  "hover:bg-muted/50 border",
                  isSelected
                    ? "bg-primary/10 border-primary/30"
                    : "border-transparent"
                )}
              >
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={() => onToggle(ingredient.id)}
                  className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <span className="text-sm capitalize">{ingredient.name}</span>
              </label>
            );
          })}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export function DrinkIngredientSelector({
  selectedIngredients,
  onToggle,
}: DrinkIngredientSelectorProps) {
  return (
    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
      {drinkIngredientCategories.map((category) => (
        <DrinkIngredientCategory
          key={category.id}
          category={category}
          selectedIngredients={selectedIngredients}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}
