import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IngredientCategory } from "./IngredientCategory";
import { pantryItems, fridgeItems, spiceItems } from "@/data/ingredients";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingBasket, Refrigerator, Flame, Package } from "lucide-react";

interface IngredientSelectorProps {
  selectedIngredients: string[];
  onToggle: (id: string) => void;
  userPantryItems?: string[];
  onTogglePantry?: (id: string) => void;
}

export function IngredientSelector({ 
  selectedIngredients, 
  onToggle,
  userPantryItems = [],
  onTogglePantry
}: IngredientSelectorProps) {
  return (
    <Tabs defaultValue="fridge" className="w-full">
      <TabsList className="w-full grid grid-cols-3 h-11 sm:h-14 bg-muted/50 p-1 rounded-lg sm:rounded-xl">
        <TabsTrigger 
          value="fridge" 
          className="rounded-md sm:rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm flex items-center justify-center gap-1 sm:gap-2 font-medium text-xs sm:text-sm"
          aria-label="Fridge ingredients"
        >
          <Refrigerator className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
          <span className="hidden xs:inline sm:inline">Fridge</span>
        </TabsTrigger>
        <TabsTrigger 
          value="pantry" 
          className="rounded-md sm:rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm flex items-center justify-center gap-1 sm:gap-2 font-medium text-xs sm:text-sm"
          aria-label="Pantry ingredients"
        >
          <ShoppingBasket className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
          <span className="hidden xs:inline sm:inline">Pantry</span>
        </TabsTrigger>
        <TabsTrigger 
          value="spices" 
          className="rounded-md sm:rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm flex items-center justify-center gap-1 sm:gap-2 font-medium text-xs sm:text-sm"
          aria-label="Spices and seasonings"
        >
          <Flame className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
          <span className="hidden xs:inline sm:inline">Spices</span>
        </TabsTrigger>
      </TabsList>

      {userPantryItems.length > 0 && (
        <div className="mt-3 px-1 flex items-center gap-2 text-xs text-muted-foreground">
          <Package className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
          <span>{userPantryItems.length} pantry staples auto-selected</span>
          <span className="text-muted-foreground/60">• Right-click to manage</span>
        </div>
      )}

      <ScrollArea className="h-[300px] sm:h-[400px] mt-4 pr-4">
        <TabsContent value="fridge" className="space-y-6 mt-0">
          {fridgeItems.map((category) => (
            <IngredientCategory
              key={category.id}
              category={category}
              selectedIngredients={selectedIngredients}
              onToggle={onToggle}
              pantryItems={userPantryItems}
              onTogglePantry={onTogglePantry}
            />
          ))}
        </TabsContent>

        <TabsContent value="pantry" className="space-y-6 mt-0">
          {pantryItems.map((category) => (
            <IngredientCategory
              key={category.id}
              category={category}
              selectedIngredients={selectedIngredients}
              onToggle={onToggle}
              pantryItems={userPantryItems}
              onTogglePantry={onTogglePantry}
            />
          ))}
        </TabsContent>

        <TabsContent value="spices" className="space-y-6 mt-0">
          {spiceItems.map((category) => (
            <IngredientCategory
              key={category.id}
              category={category}
              selectedIngredients={selectedIngredients}
              onToggle={onToggle}
              pantryItems={userPantryItems}
              onTogglePantry={onTogglePantry}
            />
          ))}
        </TabsContent>
      </ScrollArea>
    </Tabs>
  );
}
