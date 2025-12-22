import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IngredientCategory } from "./IngredientCategory";
import { pantryItems, fridgeItems, spiceItems } from "@/data/ingredients";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingBasket, Refrigerator, Flame } from "lucide-react";

interface IngredientSelectorProps {
  selectedIngredients: string[];
  onToggle: (id: string) => void;
}

export function IngredientSelector({ selectedIngredients, onToggle }: IngredientSelectorProps) {
  return (
    <Tabs defaultValue="fridge" className="w-full">
      <TabsList className="w-full grid grid-cols-3 h-11 sm:h-14 bg-muted/50 p-1 rounded-lg sm:rounded-xl">
        <TabsTrigger 
          value="fridge" 
          className="rounded-md sm:rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm flex items-center justify-center gap-1 sm:gap-2 font-medium text-xs sm:text-sm"
        >
          <Refrigerator className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
          <span className="hidden xs:inline sm:inline">Fridge</span>
        </TabsTrigger>
        <TabsTrigger 
          value="pantry" 
          className="rounded-md sm:rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm flex items-center justify-center gap-1 sm:gap-2 font-medium text-xs sm:text-sm"
        >
          <ShoppingBasket className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
          <span className="hidden xs:inline sm:inline">Pantry</span>
        </TabsTrigger>
        <TabsTrigger 
          value="spices" 
          className="rounded-md sm:rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm flex items-center justify-center gap-1 sm:gap-2 font-medium text-xs sm:text-sm"
        >
          <Flame className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
          <span className="hidden xs:inline sm:inline">Spices</span>
        </TabsTrigger>
      </TabsList>

      <ScrollArea className="h-[400px] mt-4 pr-4">
        <TabsContent value="fridge" className="space-y-6 mt-0">
          {fridgeItems.map((category) => (
            <IngredientCategory
              key={category.id}
              category={category}
              selectedIngredients={selectedIngredients}
              onToggle={onToggle}
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
            />
          ))}
        </TabsContent>
      </ScrollArea>
    </Tabs>
  );
}
