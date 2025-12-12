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
    <div className="space-y-3 animate-fade-in">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          {category.name}
        </h3>
        {selectedCount > 0 && (
          <Badge variant="secondary" className="text-xs px-2 py-0.5">
            {selectedCount} selected
          </Badge>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {category.items.map((item, index) => (
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

