import { IngredientCheckbox } from "./IngredientCheckbox";
import type { IngredientCategory as CategoryType } from "@/data/ingredients";
import { Badge } from "@/components/ui/badge";

interface IngredientCategoryProps {
  category: CategoryType;
  selectedIngredients: string[];
  onToggle: (id: string) => void;
}

export function IngredientCategory({ category, selectedIngredients, onToggle }: IngredientCategoryProps) {
  const selectedCount = category.items.filter(item => selectedIngredients.includes(item.id)).length;
  
  return (
    <div className="space-y-2 animate-fade-in">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          {category.name}
        </h3>
        {selectedCount > 0 && (
          <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
            {selectedCount}
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

