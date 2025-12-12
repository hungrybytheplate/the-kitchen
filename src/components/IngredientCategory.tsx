import { IngredientCheckbox } from "./IngredientCheckbox";
import type { IngredientCategory as CategoryType } from "@/data/ingredients";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface IngredientCategoryProps {
  category: CategoryType;
  selectedIngredients: string[];
  onToggle: (id: string) => void;
}

// Color mapping for different category types - more vibrant colors
const categoryColors: Record<string, { bg: string; border: string; badge: string }> = {
  // Fridge categories
  proteins: { bg: "bg-rose-100", border: "border-rose-300", badge: "bg-rose-200 text-rose-800" },
  dairy: { bg: "bg-amber-100", border: "border-amber-300", badge: "bg-amber-200 text-amber-800" },
  vegetables: { bg: "bg-emerald-100", border: "border-emerald-300", badge: "bg-emerald-200 text-emerald-800" },
  fruits: { bg: "bg-purple-100", border: "border-purple-300", badge: "bg-purple-200 text-purple-800" },
  // Pantry categories
  grains: { bg: "bg-orange-100", border: "border-orange-300", badge: "bg-orange-200 text-orange-800" },
  canned: { bg: "bg-slate-100", border: "border-slate-300", badge: "bg-slate-200 text-slate-800" },
  oils: { bg: "bg-yellow-100", border: "border-yellow-300", badge: "bg-yellow-200 text-yellow-800" },
  baking: { bg: "bg-pink-100", border: "border-pink-300", badge: "bg-pink-200 text-pink-800" },
  // Spice categories
  "dried-herbs": { bg: "bg-green-100", border: "border-green-300", badge: "bg-green-200 text-green-800" },
  spices: { bg: "bg-red-100", border: "border-red-300", badge: "bg-red-200 text-red-800" },
  seasonings: { bg: "bg-teal-100", border: "border-teal-300", badge: "bg-teal-200 text-teal-800" },
};

const defaultColors = { bg: "bg-muted/30", border: "border-border/50", badge: "bg-secondary text-secondary-foreground" };

export function IngredientCategory({ category, selectedIngredients, onToggle }: IngredientCategoryProps) {
  const selectedCount = category.items.filter(item => selectedIngredients.includes(item.id)).length;
  const colors = categoryColors[category.id] || defaultColors;
  
  return (
    <div className={cn(
      "rounded-xl p-3 border animate-fade-in",
      colors.bg,
      colors.border
    )}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-semibold text-foreground/70 uppercase tracking-wide">
          {category.name}
        </h3>
        {selectedCount > 0 && (
          <Badge className={cn("text-[10px] px-1.5 py-0 border-0", colors.badge)}>
            {selectedCount} selected
          </Badge>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1">
        {category.items.map((item) => (
          <IngredientCheckbox
            key={item.id}
            ingredient={item}
            isChecked={selectedIngredients.includes(item.id)}
            onToggle={onToggle}
          />
        ))}
      </div>
    </div>
  );
}

