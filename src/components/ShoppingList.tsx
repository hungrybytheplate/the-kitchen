import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingCart, Trash2, Check, Printer } from "lucide-react";
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
            Shopping List
          </h3>
          <p className="text-muted-foreground max-w-sm leading-relaxed mb-6">
            Missing ingredients for a recipe? Add them here to build your shopping list. Check items off as you shop!
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-4 py-2 rounded-full">
            <Check className="h-4 w-4" />
            <span>Items appear when you add missing ingredients</span>
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
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-serif text-2xl flex items-center gap-2">
              <ShoppingCart className="h-6 w-6 text-primary" />
              Shopping List
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {completedCount} of {totalCount} items checked
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handlePrint}
              className="no-print"
            >
              <Printer className="h-4 w-4 mr-1" />
              Print
            </Button>
            <Badge variant="secondary" className="text-sm px-3 py-1 no-print">
              {totalCount - completedCount} remaining
            </Badge>
          </div>
        </div>
        {completedCount > 0 && (
          <div className="flex gap-2 mt-4 pt-4 border-t border-border/50 no-print">
            <Button variant="outline" size="sm" onClick={onClearCompleted} className="flex-1">
              <Check className="h-4 w-4 mr-1" />
              Clear completed
            </Button>
            <Button variant="ghost" size="sm" onClick={onClearAll} className="text-muted-foreground hover:text-destructive">
              <Trash2 className="h-4 w-4 mr-1" />
              Clear all
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {Object.entries(groupedItems).map(([category, categoryItems]) => (
              <div key={category}>
                <h4 className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                  {category}
                </h4>
                <div className="space-y-2">
                  {categoryItems.map((item) => (
                    <div
                      key={item.id}
                      className={`shopping-list-item flex items-center gap-3 p-2 rounded-lg transition-colors print:rounded-none print:border-b print:border-border ${
                        item.checked ? "bg-muted/50" : "bg-card hover:bg-muted/30"
                      }`}
                    >
                      <Checkbox
                        id={item.id}
                        checked={item.checked}
                        onCheckedChange={() => onToggleItem(item.id)}
                        className="print:h-4 print:w-4"
                      />
                      <label
                        htmlFor={item.id}
                        className={`flex-1 cursor-pointer capitalize ${
                          item.checked ? "line-through text-muted-foreground" : ""
                        }`}
                      >
                        {item.variant}
                      </label>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive no-print"
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
