import { IngredientCheckbox } from "./IngredientCheckbox";
import type { IngredientCategory as CategoryType } from "@/data/ingredients";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { 
  Drumstick, 
  Milk, 
  Carrot, 
  Apple, 
  Wheat, 
  Package, 
  Droplets, 
  CakeSlice,
  Leaf,
  Flame,
  ChefHat,
  type LucideIcon
} from "lucide-react";

interface IngredientCategoryProps {
  category: CategoryType;
  selectedIngredients: string[];
  onToggle: (id: string) => void;
}

// Color and icon mapping for different category types
const categoryConfig: Record<string, { bg: string; border: string; badge: string; icon: LucideIcon }> = {
  // Fridge categories
  proteins: { bg: "bg-rose-100 dark:bg-rose-900/20", border: "border-rose-300 dark:border-rose-700", badge: "bg-rose-200 text-rose-800 dark:bg-rose-800 dark:text-rose-200", icon: Drumstick },
  dairy: { bg: "bg-amber-100 dark:bg-amber-900/20", border: "border-amber-300 dark:border-amber-700", badge: "bg-amber-200 text-amber-800 dark:bg-amber-800 dark:text-amber-200", icon: Milk },
  vegetables: { bg: "bg-emerald-100 dark:bg-emerald-900/20", border: "border-emerald-300 dark:border-emerald-700", badge: "bg-emerald-200 text-emerald-800 dark:bg-emerald-800 dark:text-emerald-200", icon: Carrot },
  fruits: { bg: "bg-purple-100 dark:bg-purple-900/20", border: "border-purple-300 dark:border-purple-700", badge: "bg-purple-200 text-purple-800 dark:bg-purple-800 dark:text-purple-200", icon: Apple },
  // Pantry categories
  grains: { bg: "bg-orange-100 dark:bg-orange-900/20", border: "border-orange-300 dark:border-orange-700", badge: "bg-orange-200 text-orange-800 dark:bg-orange-800 dark:text-orange-200", icon: Wheat },
  canned: { bg: "bg-slate-100 dark:bg-slate-900/20", border: "border-slate-300 dark:border-slate-700", badge: "bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-200", icon: Package },
  oils: { bg: "bg-yellow-100 dark:bg-yellow-900/20", border: "border-yellow-300 dark:border-yellow-700", badge: "bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200", icon: Droplets },
  baking: { bg: "bg-pink-100 dark:bg-pink-900/20", border: "border-pink-300 dark:border-pink-700", badge: "bg-pink-200 text-pink-800 dark:bg-pink-800 dark:text-pink-200", icon: CakeSlice },
  // Spice categories
  "dried-herbs": { bg: "bg-green-100 dark:bg-green-900/20", border: "border-green-300 dark:border-green-700", badge: "bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200", icon: Leaf },
  spices: { bg: "bg-red-100 dark:bg-red-900/20", border: "border-red-300 dark:border-red-700", badge: "bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200", icon: Flame },
  seasonings: { bg: "bg-teal-100 dark:bg-teal-900/20", border: "border-teal-300 dark:border-teal-700", badge: "bg-teal-200 text-teal-800 dark:bg-teal-800 dark:text-teal-200", icon: ChefHat },
};

const defaultConfig = { bg: "bg-muted/30", border: "border-border/50", badge: "bg-secondary text-secondary-foreground", icon: ChefHat };

export function IngredientCategory({ category, selectedIngredients, onToggle }: IngredientCategoryProps) {
  const selectedCount = category.items.filter(item => selectedIngredients.includes(item.id)).length;
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
