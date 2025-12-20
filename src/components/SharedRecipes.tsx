import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Search, Heart, UserPlus, Share2, ChefHat, Wine } from "lucide-react";
import { useFamilyGroup } from "@/hooks/useFamilyGroup";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { RecipeDetailDialog } from "@/components/RecipeDetailDialog";
import { DrinkDetailDialog } from "@/components/DrinkDetailDialog";
import { FamilyGroupDialog } from "@/components/FamilyGroupDialog";
import { toast } from "@/hooks/use-toast";
import type { Recipe } from "@/data/recipes";
import type { Drink } from "@/data/drinks";

interface SharedRecipesProps {
  savedRecipes: string[];
  savedDrinks: string[];
  onSaveRecipe: (recipeId: string) => void;
  onSaveDrink: (drinkId: string) => void;
  onAddToCalendar: (recipe: Recipe) => void;
}

export function SharedRecipes({ savedRecipes, savedDrinks, onSaveRecipe, onSaveDrink, onAddToCalendar }: SharedRecipesProps) {
  const { user } = useAuth();
  const { familyGroup, members, sharedRecipes, sharedDrinks, loading } = useFamilyGroup();
  const [search, setSearch] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null);
  const [showFamilyDialog, setShowFamilyDialog] = useState(false);

  const filteredRecipes = sharedRecipes.filter((r) =>
    r.recipeData.title.toLowerCase().includes(search.toLowerCase())
  );

  const filteredDrinks = sharedDrinks.filter((d) =>
    d.drinkData.title.toLowerCase().includes(search.toLowerCase())
  );

  const getMemberName = (userId: string) => {
    const member = members.find((m) => m.userId === userId);
    return member?.displayName || "Family Member";
  };

  const mealTypeColors = {
    breakfast: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
    lunch: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
    dinner: "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300",
    dessert: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
    sides: "bg-stone-100 text-stone-800 dark:bg-stone-900/30 dark:text-stone-300",
  };

  const drinkTypeColors = {
    smoothie: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
    wellness: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    mocktail: "bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300",
    cocktail: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  };

  const totalShared = sharedRecipes.length + sharedDrinks.length;

  if (!user) {
    return (
      <Card className="shadow-elevated border-border/50 bg-card/90 backdrop-blur-sm overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 gradient-sage" />
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <div className="relative mb-6">
            <div className="absolute inset-0 gradient-sage blur-2xl opacity-30 animate-pulse-soft" />
            <div className="relative p-4 rounded-2xl gradient-sage shadow-warm">
              <Users className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h3 className="font-serif text-2xl font-semibold mb-3">
            Family Sharing
          </h3>
          <p className="text-muted-foreground max-w-sm leading-relaxed">
            Sign in to share recipes and drinks with your family.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card className="shadow-elevated border-border/50 bg-card/90 backdrop-blur-sm overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 gradient-sage" />
        <CardContent className="flex items-center justify-center py-16">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
        </CardContent>
      </Card>
    );
  }

  if (!familyGroup) {
    return (
      <>
        <Card className="shadow-elevated border-border/50 bg-card/90 backdrop-blur-sm overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 gradient-sage" />
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="relative mb-6">
              <div className="absolute inset-0 gradient-sage blur-2xl opacity-30 animate-pulse-soft" />
              <div className="relative p-4 rounded-2xl gradient-sage shadow-warm">
                <Users className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>
            <h3 className="font-serif text-2xl font-semibold mb-3">
              Family Sharing
            </h3>
            <p className="text-muted-foreground max-w-sm leading-relaxed mb-6">
              Create or join a family group to share recipes and drinks with your loved ones!
            </p>
            <Button onClick={() => setShowFamilyDialog(true)}>
              <UserPlus className="h-4 w-4 mr-2" />
              Get Started
            </Button>
          </CardContent>
        </Card>
        
        <FamilyGroupDialog
          open={showFamilyDialog}
          onOpenChange={setShowFamilyDialog}
        />
      </>
    );
  }

  return (
    <>
      <Card className="shadow-elevated border-border/50 bg-card/90 backdrop-blur-sm overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 gradient-sage" />
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-serif text-2xl flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              {familyGroup.name}
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFamilyDialog(true)}
            >
              <Users className="h-4 w-4 mr-2" />
              Manage
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            {sharedRecipes.length} recipe{sharedRecipes.length !== 1 ? 's' : ''} · {sharedDrinks.length} drink{sharedDrinks.length !== 1 ? 's' : ''} · {members.length} member{members.length !== 1 ? 's' : ''}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {totalShared > 0 && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search shared items..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          )}

          <Tabs defaultValue="recipes" className="w-full">
            <TabsList className="w-full grid grid-cols-2 h-10 bg-muted/50 p-1 rounded-lg">
              <TabsTrigger value="recipes" className="rounded-md data-[state=active]:bg-card data-[state=active]:shadow-sm flex items-center gap-2">
                <ChefHat className="h-4 w-4" />
                Recipes ({filteredRecipes.length})
              </TabsTrigger>
              <TabsTrigger value="drinks" className="rounded-md data-[state=active]:bg-card data-[state=active]:shadow-sm flex items-center gap-2">
                <Wine className="h-4 w-4" />
                Drinks ({filteredDrinks.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="recipes" className="mt-4">
              {filteredRecipes.length > 0 ? (
                <div className="space-y-2">
                  {filteredRecipes.map((sharedRecipe) => {
                    const recipe = sharedRecipe.recipeData;
                    const isSaved = savedRecipes.includes(recipe.id);
                    
                    return (
                      <div
                        key={sharedRecipe.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors group cursor-pointer"
                        onClick={() => setSelectedRecipe(recipe)}
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <Badge className={cn("text-xs shrink-0", mealTypeColors[recipe.mealType])}>
                            {recipe.mealType}
                          </Badge>
                          <div className="flex flex-col min-w-0">
                            <span className="font-medium truncate">{recipe.title}</span>
                            <span className="text-xs text-muted-foreground">
                              Shared by {getMemberName(sharedRecipe.sharedBy)}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              onSaveRecipe(recipe.id);
                              toast({
                                title: isSaved ? "Removed from collection" : "Added to collection",
                                description: isSaved 
                                  ? "Recipe removed from your saved recipes."
                                  : "Recipe saved to your collection!",
                              });
                            }}
                            className={cn(
                              "transition-all",
                              isSaved 
                                ? "text-primary" 
                                : "text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-primary"
                            )}
                          >
                            <Heart className={cn("h-4 w-4", isSaved && "fill-current")} />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : sharedRecipes.length === 0 ? (
                <div className="text-center py-8">
                  <Share2 className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    No recipes shared yet. Share recipes from your saved collection!
                  </p>
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-4">
                  No recipes match "{search}"
                </p>
              )}
            </TabsContent>

            <TabsContent value="drinks" className="mt-4">
              {filteredDrinks.length > 0 ? (
                <div className="space-y-2">
                  {filteredDrinks.map((sharedDrink) => {
                    const drink = sharedDrink.drinkData;
                    const isSaved = savedDrinks.includes(drink.id);
                    
                    return (
                      <div
                        key={sharedDrink.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors group cursor-pointer"
                        onClick={() => setSelectedDrink(drink)}
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <Badge className={cn("text-xs shrink-0", drinkTypeColors[drink.drinkType])}>
                            {drink.drinkType}
                          </Badge>
                          <div className="flex flex-col min-w-0">
                            <span className="font-medium truncate">{drink.title}</span>
                            <span className="text-xs text-muted-foreground">
                              Shared by {getMemberName(sharedDrink.sharedBy)}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              onSaveDrink(drink.id);
                              toast({
                                title: isSaved ? "Removed from collection" : "Added to collection",
                                description: isSaved 
                                  ? "Drink removed from your saved drinks."
                                  : "Drink saved to your collection!",
                              });
                            }}
                            className={cn(
                              "transition-all",
                              isSaved 
                                ? "text-primary" 
                                : "text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-primary"
                            )}
                          >
                            <Heart className={cn("h-4 w-4", isSaved && "fill-current")} />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : sharedDrinks.length === 0 ? (
                <div className="text-center py-8">
                  <Share2 className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    No drinks shared yet. Share drinks from your saved collection!
                  </p>
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-4">
                  No drinks match "{search}"
                </p>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <FamilyGroupDialog
        open={showFamilyDialog}
        onOpenChange={setShowFamilyDialog}
      />

      {selectedRecipe && (
        <RecipeDetailDialog
          recipe={selectedRecipe}
          open={!!selectedRecipe}
          onOpenChange={(open) => !open && setSelectedRecipe(null)}
          isSaved={savedRecipes.includes(selectedRecipe.id)}
          onSave={() => onSaveRecipe(selectedRecipe.id)}
          onAddToCalendar={() => onAddToCalendar(selectedRecipe)}
        />
      )}

      {selectedDrink && (
        <DrinkDetailDialog
          drink={selectedDrink}
          open={!!selectedDrink}
          onOpenChange={(open) => !open && setSelectedDrink(null)}
          isSaved={savedDrinks.includes(selectedDrink.id)}
          onSave={() => onSaveDrink(selectedDrink.id)}
        />
      )}
    </>
  );
}
