import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import type { Ingredient } from "@/data/ingredients";
import { Package } from "lucide-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

interface IngredientCheckboxProps {
  ingredient: Ingredient;
  isChecked: boolean;
  onToggle: (id: string) => void;
  isInPantry?: boolean;
  onTogglePantry?: (id: string) => void;
}

export function IngredientCheckbox({ 
  ingredient, 
  isChecked, 
  onToggle,
  isInPantry = false,
  onTogglePantry 
}: IngredientCheckboxProps) {
  const content = (
    <label
      className={cn(
        "flex items-center gap-2 px-2.5 py-2 sm:py-1.5 rounded-lg cursor-pointer transition-all duration-200",
        "hover:bg-muted/80 border relative group min-h-[40px] sm:min-h-0",
        isChecked 
          ? "bg-primary/10 border-primary shadow-sm" 
          : isInPantry
            ? "bg-amber-50 dark:bg-amber-900/20 border-amber-300 dark:border-amber-700"
            : "bg-card border-transparent"
      )}
    >
      <Checkbox
        checked={isChecked}
        onCheckedChange={() => onToggle(ingredient.id)}
        className="h-5 w-5 sm:h-4 sm:w-4 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
      />
      <span className={cn(
        "text-sm transition-colors leading-tight flex-1",
        isChecked ? "text-foreground font-medium" : "text-muted-foreground"
      )}>
        {ingredient.name}
      </span>
      {isInPantry && (
        <Package className="h-3 w-3 text-amber-600 dark:text-amber-400 shrink-0" />
      )}
    </label>
  );

  if (!onTogglePantry) {
    return content;
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        {content}
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={() => onTogglePantry(ingredient.id)}>
          <Package className="h-4 w-4 mr-2" />
          {isInPantry ? "Remove from Pantry" : "Always Have (Pantry)"}
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
