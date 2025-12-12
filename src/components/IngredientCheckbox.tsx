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
        "flex items-center gap-2 px-2.5 py-1.5 rounded-lg cursor-pointer transition-all duration-200",
        "hover:bg-muted/80 border",
        isChecked 
          ? "bg-primary/10 border-primary shadow-sm" 
          : "bg-card border-transparent"
      )}
    >
      <Checkbox
        checked={isChecked}
        onCheckedChange={() => onToggle(ingredient.id)}
        className="h-4 w-4 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
      />
      <span className={cn(
        "text-sm transition-colors truncate",
        isChecked ? "text-foreground font-medium" : "text-muted-foreground"
      )}>
        {ingredient.name}
      </span>
    </label>
  );
}
