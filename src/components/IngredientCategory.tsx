import { IngredientCheckbox } from "./IngredientCheckbox";
import type { IngredientCategory as CategoryType } from "@/data/ingredients";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface IngredientCategoryProps {
  category: CategoryType;
  selectedIngredients: string[];
  onToggle: (id: string) => void;
}

// Color mapping for different category types
const categoryColors: Record<string, { bg: string; border: string; badge: string }> = {
  // Fridge categories
  proteins: { bg: "bg-rose-50/50", border: "border-rose-200/50", badge: "bg-rose-100 text-rose-700" },
  dairy: { bg: "bg-amber-50/50", border: "border-amber-200/50", badge: "bg-amber-100 text-amber-700" },
  vegetables: { bg: "bg-emerald-50/50", border: "border-emerald-200/50", badge: "bg-emerald-100 text-emerald-700" },
  fruits: { bg: "bg-purple-50/50", border: "border-purple-200/50", badge: "bg-purple-100 text-purple-700" },
  // Pantry categories
  grains: { bg: "bg-orange-50/50", border: "border-orange-200/50", badge: "bg-orange-100 text-orange-700" },
  canned: { bg: "bg-slate-50/50", border: "border-slate-200/50", badge: "bg-slate-100 text-slate-700" },
  oils: { bg: "bg-yellow-50/50", border: "border-yellow-200/50", badge: "bg-yellow-100 text-yellow-700" },
  baking: { bg: "bg-pink-50/50", border: "border-pink-200/50", badge: "bg-pink-100 text-pink-700" },
  // Spice categories
  "dried-herbs": { bg: "bg-green-50/50", border: "border-green-200/50", badge: "bg-green-100 text-green-700" },
  spices: { bg: "bg-red-50/50", border: "border-red-200/50", badge: "bg-red-100 text-red-700" },
  seasonings: { bg: "bg-teal-50/50", border: "border-teal-200/50", badge: "bg-teal-100 text-teal-700" },
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

