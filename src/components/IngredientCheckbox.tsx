import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import type { Ingredient } from "@/data/ingredients";

interface IngredientCheckboxProps {
  ingredient: Ingredient;
  isChecked: boolean;
  onToggle: (id: string) => void;
}

export function IngredientCheckbox({ ingredient, isChecked, onToggle }: IngredientCheckboxProps) {
  return (
    <label
      className={cn(
        "flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200",
        "hover:bg-muted/80 border-2",
        isChecked 
          ? "bg-primary/10 border-primary shadow-sm" 
          : "bg-card border-transparent"
      )}
    >
      <Checkbox
        checked={isChecked}
        onCheckedChange={() => onToggle(ingredient.id)}
        className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
      />
      <span className="text-xl">{ingredient.emoji}</span>
      <span className={cn(
        "text-sm font-medium transition-colors",
        isChecked ? "text-foreground" : "text-muted-foreground"
      )}>
        {ingredient.name}
      </span>
    </label>
  );
}
