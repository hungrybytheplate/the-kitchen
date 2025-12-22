import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart, Wine, Heart } from "lucide-react";
import { sampleDrinks, type Drink } from "@/data/drinks";
import { cn } from "@/lib/utils";
import { DrinkDetailDialog } from "./DrinkDetailDialog";

interface DrinkLookupProps {
  onAddToShopping: (ingredients: string[]) => void;
  savedDrinks?: string[];
  onSave?: (drinkId: string) => void;
}

export function DrinkLookup({ onAddToShopping, savedDrinks = [], onSave }: DrinkLookupProps) {
  const [search, setSearch] = useState("");
  const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null);
  
  const matchingDrinks = search.trim().length >= 2
    ? sampleDrinks.filter(d => 
        d.title.toLowerCase().includes(search.toLowerCase())
      ).slice(0, 6)
    : [];

  const drinkTypeColors: Record<string, string> = {
    smoothie: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
    mocktail: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300",
    cocktail: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
    wellness: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  };

  const handleAddAllToShopping = (e: React.MouseEvent, drink: Drink) => {
    e.stopPropagation();
    onAddToShopping(drink.ingredients);
  };

  return (
    <>
      <Card className="shadow-elevated border-border/50 bg-card/90 backdrop-blur-sm overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500" />
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-purple-500/10">
              <Wine className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-semibold">Drink Lookup</h3>
              <p className="text-sm text-muted-foreground">Search any drink to see ingredients needed</p>
            </div>
          </div>
          
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Type a drink name (e.g., margarita, mojito)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-background/50"
            />
          </div>

          {search.trim().length >= 2 && (
            <div className="space-y-3">
              {matchingDrinks.length > 0 ? (
                matchingDrinks.map((drink) => {
                  const isSaved = savedDrinks.includes(drink.id);
                  return (
                    <div
                      key={drink.id}
                      className="p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group"
                      onClick={() => setSelectedDrink(drink)}
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className={cn("text-xs", drinkTypeColors[drink.drinkType])}>
                              {drink.drinkType}
                            </Badge>
                            {drink.healthTags && drink.healthTags.length > 0 && (
                              <Badge variant="outline" className="text-xs">
                                {drink.healthTags[0]}
                              </Badge>
                            )}
                          </div>
                          <h4 className="font-semibold group-hover:text-primary transition-colors">{drink.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{drink.description}</p>
                        </div>
                        {onSave && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => { e.stopPropagation(); onSave(drink.id); }}
                            className={cn(
                              "shrink-0 rounded-full transition-all duration-300",
                              isSaved 
                                ? "text-primary bg-primary/10 hover:bg-primary/20" 
                                : "hover:bg-accent/60"
                            )}
                          >
                            <Heart className={cn(
                              "h-5 w-5 transition-all duration-300",
                              isSaved && "fill-current scale-110"
                            )} />
                          </Button>
                        )}
                      </div>
                      
                      <div className="mb-3">
                        <p className="text-xs font-medium text-muted-foreground mb-2">
                          Ingredients needed ({drink.ingredients.length}):
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {drink.ingredients.map((ing) => (
                            <Badge 
                              key={ing} 
                              variant="outline" 
                              className="text-xs capitalize bg-background/50"
                            >
                              {ing.replace(/-/g, " ")}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <Button
                        size="sm"
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                        onClick={(e) => handleAddAllToShopping(e, drink)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add All Ingredients to Shopping List
                      </Button>
                    </div>
                  );
                })
              ) : (
                <p className="text-center text-muted-foreground py-4">
                  No drinks found for "{search}". Try a different name!
                </p>
              )}
            </div>
          )}

          {search.trim().length < 2 && (
            <p className="text-center text-muted-foreground text-sm py-4">
              Start typing to search drinks...
            </p>
          )}
        </CardContent>
      </Card>

      {selectedDrink && (
        <DrinkDetailDialog
          drink={{
            ...selectedDrink,
            matchedIngredients: [],
            matchedKeyIngredients: []
          }}
          open={!!selectedDrink}
          onOpenChange={(open) => !open && setSelectedDrink(null)}
          isSaved={savedDrinks.includes(selectedDrink.id)}
          onSave={() => onSave?.(selectedDrink.id)}
        />
      )}
    </>
  );
}
