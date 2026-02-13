import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingCart, Trash2, Check, Printer, Lightbulb, ChefHat, ArrowRight, ListChecks } from "lucide-react";
import { ingredientVariants } from "@/data/ingredientVariants";

export interface ShoppingItem {
  id: string;
  ingredientId: string;
  variant: string;
  checked: boolean;
}

interface ShoppingListProps {
  items: ShoppingItem[];
  onToggleItem: (id: string) => void;
  onRemoveItem: (id: string) => void;
  onClearCompleted: () => void;
  onClearAll: () => void;
}

export function ShoppingList({ 
  items, 
  onToggleItem, 
  onRemoveItem, 
  onClearCompleted,
  onClearAll 
}: ShoppingListProps) {
  const completedCount = items.filter(item => item.checked).length;
  const totalCount = items.length;

  if (items.length === 0) {
    return (
      <Card className="shadow-elevated border-border/50 bg-card/90 backdrop-blur-sm overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 gradient-warm" />
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <div className="relative mb-6">
            <div className="absolute inset-0 gradient-warm blur-2xl opacity-30 animate-pulse-soft" />
            <div className="relative p-4 rounded-2xl gradient-warm shadow-warm">
              <ShoppingCart className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h3 className="font-serif text-2xl font-semibold mb-3">
            Your Shopping List
          </h3>
          <p className="text-muted-foreground max-w-sm leading-relaxed mb-6">
            Keep track of ingredients you need to buy. Add missing items from any recipe to build your grocery list.
          </p>
          
          {/* How to add items */}
          <div className="grid gap-3 max-w-md w-full mb-6">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 text-left">
              <div className="p-1.5 rounded-md bg-primary/10">
                <ChefHat className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">From recipe cards</p>
                <p className="text-xs text-muted-foreground">Click "Add missing ingredients" on any recipe</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 text-left">
              <div className="p-1.5 rounded-md bg-primary/10">
                <ListChecks className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">From recipe details</p>
                <p className="text-xs text-muted-foreground">Open any recipe and add individual ingredients</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-4 py-2 rounded-full">
            <Lightbulb className="h-4 w-4" />
            <span>Check off items as you shop</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Group items by ingredient category
  const groupedItems = items.reduce((acc, item) => {
    const category = ingredientVariants[item.ingredientId]?.category || "Other";
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {} as Record<string, ShoppingItem[]>);

  const handlePrint = () => {
    window.print();
  };

  return (
    <Card className="shadow-elevated border-border/50 bg-card/90 backdrop-blur-sm overflow-hidden print:shadow-none print:border print:border-border">
      <div className="absolute top-0 left-0 w-full h-1 gradient-warm no-print" />
      <CardHeader className="pb-2 sm:pb-3 px-3 sm:px-6">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <CardTitle className="font-serif text-lg sm:text-2xl flex items-center gap-1.5 sm:gap-2">
              <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6 text-primary shrink-0" />
              Shopping List
            </CardTitle>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">
              {completedCount} of {totalCount} checked
            </p>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handlePrint}
              className="no-print h-8 w-8 sm:h-auto sm:w-auto p-1.5 sm:px-3"
            >
              <Printer className="h-4 w-4 sm:mr-1" />
              <span className="hidden sm:inline">Print</span>
            </Button>
            <Badge variant="secondary" className="text-xs sm:text-sm px-2 sm:px-3 py-0.5 sm:py-1 no-print">
              {totalCount - completedCount}
            </Badge>
          </div>
        </div>
        {completedCount > 0 && (
          <div className="flex gap-1.5 sm:gap-2 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-border/50 no-print">
            <Button variant="outline" size="sm" onClick={onClearCompleted} className="flex-1 h-9 text-xs sm:text-sm">
              <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1" />
              Clear done
            </Button>
            <Button variant="ghost" size="sm" onClick={onClearAll} className="text-muted-foreground hover:text-destructive h-9 text-xs sm:text-sm">
              <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1" />
              Clear all
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent className="px-2 sm:px-6">
        <ScrollArea className="h-[350px] sm:h-[400px] pr-2 sm:pr-4">
          <div className="space-y-3 sm:space-y-4">
            {Object.entries(groupedItems).map(([category, categoryItems]) => (
              <div key={category}>
                <h4 className="text-xs sm:text-sm font-medium text-muted-foreground mb-1.5 sm:mb-2 uppercase tracking-wide px-1">
                  {category}
                </h4>
                <div className="space-y-1 sm:space-y-2">
                  {categoryItems.map((item) => (
                    <div
                      key={item.id}
                      className={`shopping-list-item flex items-center gap-2 sm:gap-3 p-2.5 sm:p-2 rounded-lg transition-colors print:rounded-none print:border-b print:border-border ${
                        item.checked ? "bg-muted/50" : "bg-card hover:bg-muted/30"
                      }`}
                    >
                      <Checkbox
                        id={item.id}
                        checked={item.checked}
                        onCheckedChange={() => onToggleItem(item.id)}
                        className="h-5 w-5 sm:h-4 sm:w-4 print:h-4 print:w-4"
                      />
                      <label
                        htmlFor={item.id}
                        className={`flex-1 cursor-pointer capitalize text-sm sm:text-base ${
                          item.checked ? "line-through text-muted-foreground" : ""
                        }`}
                      >
                        {item.variant}
                      </label>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 sm:h-8 sm:w-8 text-muted-foreground hover:text-destructive no-print shrink-0"
                        onClick={() => onRemoveItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
