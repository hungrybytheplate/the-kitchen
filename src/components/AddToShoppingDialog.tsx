import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { ingredientVariants, getIngredientDisplayName } from "@/data/ingredientVariants";
import { ShoppingCart } from "lucide-react";

interface AddToShoppingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ingredientId: string;
  onConfirm: (ingredientId: string, variant: string) => void;
}

export function AddToShoppingDialog({
  open,
  onOpenChange,
  ingredientId,
  onConfirm,
}: AddToShoppingDialogProps) {
  const variantData = ingredientVariants[ingredientId];
  const variants = variantData?.variants || [];
  const defaultName = getIngredientDisplayName(ingredientId);
  
  const [selectedVariant, setSelectedVariant] = useState(
    variants.length > 0 ? variants[0].name : defaultName
  );

  const handleConfirm = () => {
    onConfirm(ingredientId, selectedVariant);
    onOpenChange(false);
  };

  // If no variants, just use the default name
  if (variants.length === 0) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Add to Shopping List
            </DialogTitle>
            <DialogDescription>
              Add {defaultName} to your shopping list?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={() => { onConfirm(ingredientId, defaultName); onOpenChange(false); }}>
              Add to List
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Select {defaultName} Type
          </DialogTitle>
          <DialogDescription>
            Choose the specific type you need for your shopping list.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[300px] pr-4">
          <RadioGroup
            value={selectedVariant}
            onValueChange={setSelectedVariant}
            className="space-y-2"
          >
            {variants.map((variant) => (
              <div
                key={variant.id}
                className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              >
                <RadioGroupItem value={variant.name} id={variant.id} />
                <Label
                  htmlFor={variant.id}
                  className="flex-1 cursor-pointer flex items-center gap-2"
                >
                  <span>{variant.emoji}</span>
                  <span>{variant.name}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </ScrollArea>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>
            Add to List
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
