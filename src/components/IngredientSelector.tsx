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
      <TabsList className="w-full grid grid-cols-3 h-14 bg-muted/50 p-1 rounded-xl">
        <TabsTrigger 
          value="fridge" 
          className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm flex items-center gap-2 font-medium"
        >
          <Refrigerator className="h-4 w-4" />
          <span className="hidden sm:inline">Fridge</span>
        </TabsTrigger>
        <TabsTrigger 
          value="pantry" 
          className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm flex items-center gap-2 font-medium"
        >
          <ShoppingBasket className="h-4 w-4" />
          <span className="hidden sm:inline">Pantry</span>
        </TabsTrigger>
        <TabsTrigger 
          value="spices" 
          className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm flex items-center gap-2 font-medium"
        >
          <Flame className="h-4 w-4" />
          <span className="hidden sm:inline">Spices</span>
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
