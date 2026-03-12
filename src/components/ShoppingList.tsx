import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingCart, Trash2, Check, Printer, Lightbulb, ChefHat, ListChecks, Store, LayoutList } from "lucide-react";
import { ingredientVariants } from "@/data/ingredientVariants";
import { cn } from "@/lib/utils";

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

// Map ingredient categories to grocery store aisles/sections
// Ordered by typical grocery store layout: produce → deli/meat → dairy → center aisles → frozen → bakery
interface StoreAisle {
  label: string;
  emoji: string;
  order: number;
}

const categoryToAisle: Record<string, StoreAisle> = {
  "Fruits":           { label: "Produce",              emoji: "🥬", order: 1 },
  "Vegetables":       { label: "Produce",              emoji: "🥬", order: 1 },
  "Herbs":            { label: "Produce / Fresh Herbs", emoji: "🌿", order: 2 },
  "Proteins":         { label: "Meat & Seafood",       emoji: "🥩", order: 3 },
  "Dairy":            { label: "Dairy & Eggs",         emoji: "🥛", order: 4 },
  "Grains & Pasta":   { label: "Bread & Bakery",       emoji: "🍞", order: 5 },
  "Canned & Jarred":  { label: "Canned & Jarred",      emoji: "🥫", order: 6 },
  "Condiments":       { label: "Condiments & Sauces",   emoji: "🫙", order: 7 },
  "Oils & Vinegars":  { label: "Oils & Vinegars",       emoji: "🫒", order: 8 },
  "Spices":           { label: "Spices & Seasonings",    emoji: "🧂", order: 9 },
  "Baking":           { label: "Baking Aisle",          emoji: "🧁", order: 10 },
  "Nuts & Seeds":     { label: "Nuts & Snacks",         emoji: "🥜", order: 11 },
  "Beverages":        { label: "Beverages & Alcohol",   emoji: "🍷", order: 12 },
  "Frozen":           { label: "Frozen",                emoji: "🧊", order: 13 },
  "Other":            { label: "Other",                 emoji: "📦", order: 14 },
};

function getAisle(category: string): StoreAisle {
  return categoryToAisle[category] || categoryToAisle["Other"];
}

export function ShoppingList({ 
  items, 
  onToggleItem, 
  onRemoveItem, 
  onClearCompleted,
  onClearAll 
}: ShoppingListProps) {
  const [viewMode, setViewMode] = useState<"aisle" | "category">("aisle");
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

  // Group items by ingredient category first
  const itemsWithMeta = items.map(item => {
    const category = ingredientVariants[item.ingredientId]?.category || "Other";
    const aisle = getAisle(category);
    return { ...item, category, aisle };
  });

  // Group by mode
  const grouped = viewMode === "aisle"
    ? itemsWithMeta.reduce((acc, item) => {
        const key = item.aisle.label;
        if (!acc[key]) acc[key] = { items: [], aisle: item.aisle };
        acc[key].items.push(item);
        return acc;
      }, {} as Record<string, { items: typeof itemsWithMeta; aisle: StoreAisle }>)
    : itemsWithMeta.reduce((acc, item) => {
        const key = item.category;
        if (!acc[key]) acc[key] = { items: [], aisle: getAisle(key) };
        acc[key].items.push(item);
        return acc;
      }, {} as Record<string, { items: typeof itemsWithMeta; aisle: StoreAisle }>);

  // Sort sections by aisle order
  const sortedSections = Object.entries(grouped).sort(
    ([, a], [, b]) => a.aisle.order - b.aisle.order
  );

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
            {/* View mode toggle */}
            <div className="flex items-center rounded-lg border border-border/50 overflow-hidden no-print">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode("aisle")}
                className={cn(
                  "h-8 px-2 sm:px-3 rounded-none text-xs gap-1",
                  viewMode === "aisle" && "bg-primary/10 text-primary"
                )}
              >
                <Store className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">By Aisle</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode("category")}
                className={cn(
                  "h-8 px-2 sm:px-3 rounded-none text-xs gap-1",
                  viewMode === "category" && "bg-primary/10 text-primary"
                )}
              >
                <LayoutList className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">By Type</span>
              </Button>
            </div>
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
          <div className="space-y-4 sm:space-y-5">
            {sortedSections.map(([sectionLabel, { items: sectionItems, aisle }]) => {
              const uncheckedCount = sectionItems.filter(i => !i.checked).length;
              return (
                <div key={sectionLabel}>
                  <div className="flex items-center gap-2 mb-1.5 sm:mb-2 px-1">
                    <span className="text-base">{aisle.emoji}</span>
                    <h4 className="text-xs sm:text-sm font-semibold text-foreground uppercase tracking-wide">
                      {sectionLabel}
                    </h4>
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0 ml-auto">
                      {uncheckedCount} left
                    </Badge>
                  </div>
                  <div className="space-y-1 sm:space-y-1.5">
                    {sectionItems
                      .sort((a, b) => Number(a.checked) - Number(b.checked))
                      .map((item) => (
                      <div
                        key={item.id}
                        className={cn(
                          "shopping-list-item flex items-center gap-2 sm:gap-3 p-2.5 sm:p-2 rounded-lg transition-colors print:rounded-none print:border-b print:border-border",
                          item.checked ? "bg-muted/50" : "bg-card hover:bg-muted/30"
                        )}
                      >
                        <Checkbox
                          id={item.id}
                          checked={item.checked}
                          onCheckedChange={() => onToggleItem(item.id)}
                          className="h-5 w-5 sm:h-4 sm:w-4 print:h-4 print:w-4"
                        />
                        <label
                          htmlFor={item.id}
                          className={cn(
                            "flex-1 cursor-pointer capitalize text-sm sm:text-base",
                            item.checked && "line-through text-muted-foreground"
                          )}
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
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
