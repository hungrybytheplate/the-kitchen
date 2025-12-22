import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Trash2, ChefHat, ArrowRight, Search, Wine, StickyNote, Plus, ExternalLink } from "lucide-react";
import { sampleRecipes, Recipe } from "@/data/recipes";
import { sampleDrinks, Drink } from "@/data/drinks";
import { cn } from "@/lib/utils";
import { RecipeNotesDialog } from "@/components/RecipeNotesDialog";
import { RecipeDetailDialog } from "@/components/RecipeDetailDialog";
import { DrinkDetailDialog } from "@/components/DrinkDetailDialog";
import { ImportRecipeDialog } from "@/components/ImportRecipeDialog";
import { QuickTooltip } from "@/components/Tooltip";
import { useCustomRecipes } from "@/hooks/useCustomRecipes";
import { toast } from "@/hooks/use-toast";

export interface RecipeNotes {
  [recipeId: string]: string;
}

interface SavedRecipesProps {
  savedRecipeIds: string[];
  savedDrinkIds: string[];
  onRemoveRecipe: (id: string) => void;
  onRemoveDrink: (id: string) => void;
  recipeNotes: RecipeNotes;
  onSaveNote: (recipeId: string, note: string) => void;
}

export function SavedRecipes({ savedRecipeIds, savedDrinkIds, onRemoveRecipe, onRemoveDrink, recipeNotes, onSaveNote }: SavedRecipesProps) {
  const [search, setSearch] = useState("");
  const [notesDialogOpen, setNotesDialogOpen] = useState(false);
  const [selectedRecipeForNotes, setSelectedRecipeForNotes] = useState<{ id: string; title: string } | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  
  const { customRecipes, refresh: refreshCustomRecipes, deleteCustomRecipe, getRecipesAsAppFormat } = useCustomRecipes();
  
  const allSavedRecipes = sampleRecipes.filter((r) => savedRecipeIds.includes(r.id));
  const allSavedDrinks = sampleDrinks.filter((d) => savedDrinkIds.includes(d.id));
  const importedRecipes = getRecipesAsAppFormat();
  
  const savedRecipes = allSavedRecipes.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase())
  );
  const filteredImportedRecipes = importedRecipes.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase())
  );
  const savedDrinks = allSavedDrinks.filter((d) =>
    d.title.toLowerCase().includes(search.toLowerCase())
  );

  const totalSaved = allSavedRecipes.length + allSavedDrinks.length + customRecipes.length;

  const handleOpenNotes = (recipeId: string, recipeTitle: string) => {
    setSelectedRecipeForNotes({ id: recipeId, title: recipeTitle });
    setNotesDialogOpen(true);
  };

  const handleDeleteCustomRecipe = async (recipeId: string) => {
    try {
      // Extract the actual UUID from "custom-{uuid}"
      const actualId = recipeId.replace('custom-', '');
      await deleteCustomRecipe(actualId);
      toast({
        title: "Recipe deleted",
        description: "The imported recipe has been removed.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete the recipe.",
        variant: "destructive",
      });
    }
  };


  if (totalSaved === 0) {
    return (
      <>
        <Card className="shadow-elevated border-border/50 bg-card/90 backdrop-blur-sm overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 gradient-sunset" />
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="relative mb-6">
              <div className="absolute inset-0 gradient-sunset blur-2xl opacity-30 animate-pulse-soft" />
              <div className="relative p-4 rounded-2xl gradient-sunset shadow-warm">
                <Heart className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>
            <h3 className="font-serif text-2xl font-semibold mb-3">
              Your Collection
            </h3>
            <p className="text-muted-foreground max-w-sm leading-relaxed mb-6">
              Save your favorite recipes and drinks by clicking the heart icon, or import your own recipes!
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Button onClick={() => setImportDialogOpen(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Import Recipe
              </Button>
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-4 py-2 rounded-full">
                <ChefHat className="h-4 w-4" />
                <span>Find recipes in Cook tab</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </CardContent>
        </Card>
        <ImportRecipeDialog
          open={importDialogOpen}
          onOpenChange={setImportDialogOpen}
          onRecipeImported={refreshCustomRecipes}
        />
      </>
    );
  }

  const mealTypeColors: Record<string, string> = {
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

  return (
    <Card className="shadow-elevated border-border/50 bg-card/90 backdrop-blur-sm overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 gradient-sunset" />
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-serif text-2xl flex items-center gap-2">
              <Heart className="h-6 w-6 text-primary fill-primary" />
              Saved Collection
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {allSavedRecipes.length + customRecipes.length} recipe{(allSavedRecipes.length + customRecipes.length) === 1 ? '' : 's'} · {allSavedDrinks.length} drink{allSavedDrinks.length === 1 ? '' : 's'}
            </p>
          </div>
          <Button onClick={() => setImportDialogOpen(true)} size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Import</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search saved items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <Tabs defaultValue="recipes" className="w-full">
          <TabsList className="w-full grid grid-cols-3 h-10 bg-muted/50 p-1 rounded-lg">
            <TabsTrigger value="recipes" className="rounded-md data-[state=active]:bg-card data-[state=active]:shadow-sm flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm px-1 sm:px-3">
              <ChefHat className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
              <span className="hidden xs:inline sm:hidden">{savedRecipes.length}</span>
              <span className="hidden sm:inline">Saved ({savedRecipes.length})</span>
            </TabsTrigger>
            <TabsTrigger value="imported" className="rounded-md data-[state=active]:bg-card data-[state=active]:shadow-sm flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm px-1 sm:px-3">
              <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
              <span className="hidden xs:inline sm:hidden">{filteredImportedRecipes.length}</span>
              <span className="hidden sm:inline">Imported ({filteredImportedRecipes.length})</span>
            </TabsTrigger>
            <TabsTrigger value="drinks" className="rounded-md data-[state=active]:bg-card data-[state=active]:shadow-sm flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm px-1 sm:px-3">
              <Wine className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
              <span className="hidden xs:inline sm:hidden">{savedDrinks.length}</span>
              <span className="hidden sm:inline">Drinks ({savedDrinks.length})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="recipes" className="mt-4">
            <div className="space-y-2">
              {savedRecipes.length > 0 ? (
                savedRecipes.map((recipe) => (
                  <div
                    key={recipe.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors group cursor-pointer"
                    onClick={() => setSelectedRecipe(recipe)}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <Badge className={cn("text-xs shrink-0", mealTypeColors[recipe.mealType])}>
                        {recipe.mealType}
                      </Badge>
                      <div className="flex flex-col min-w-0">
                        <span className="font-medium truncate">{recipe.title}</span>
                        {recipeNotes[recipe.id] && (
                          <span className="text-xs text-muted-foreground truncate">
                            📝 {recipeNotes[recipe.id].slice(0, 50)}{recipeNotes[recipe.id].length > 50 ? "..." : ""}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                      <QuickTooltip content="Add notes" side="top">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenNotes(recipe.id, recipe.title)}
                          className={cn(
                            "transition-opacity text-muted-foreground hover:text-primary",
                            recipeNotes[recipe.id] ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                          )}
                        >
                          <StickyNote className="h-4 w-4" />
                        </Button>
                      </QuickTooltip>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onRemoveRecipe(recipe.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-4">
                  {search ? `No recipes match "${search}"` : "No recipes saved yet"}
                </p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="imported" className="mt-4">
            <div className="space-y-2">
              {filteredImportedRecipes.length > 0 ? (
                filteredImportedRecipes.map((recipe) => (
                  <div
                    key={recipe.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors group cursor-pointer"
                    onClick={() => setSelectedRecipe(recipe)}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <Badge className={cn("text-xs shrink-0", mealTypeColors[recipe.mealType] || "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-300")}>
                        {recipe.mealType}
                      </Badge>
                      <div className="flex flex-col min-w-0">
                        <span className="font-medium truncate">{recipe.title}</span>
                        <span className="text-xs text-muted-foreground">Imported</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteCustomRecipe(recipe.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-4">
                  {search ? `No imported recipes match "${search}"` : "No imported recipes yet"}
                </p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="drinks" className="mt-4">
            <div className="space-y-2">
              {savedDrinks.length > 0 ? (
                savedDrinks.map((drink) => (
                  <div
                    key={drink.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors group cursor-pointer"
                    onClick={() => setSelectedDrink(drink)}
                  >
                    <div className="flex items-center gap-3">
                      <Badge className={cn("text-xs", drinkTypeColors[drink.drinkType])}>
                        {drink.drinkType}
                      </Badge>
                      <span className="font-medium">{drink.title}</span>
                    </div>
                    <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onRemoveDrink(drink.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-4">
                  {search ? `No drinks match "${search}"` : "No drinks saved yet"}
                </p>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <ImportRecipeDialog
          open={importDialogOpen}
          onOpenChange={setImportDialogOpen}
          onRecipeImported={refreshCustomRecipes}
        />

        {selectedRecipeForNotes && (
          <RecipeNotesDialog
            open={notesDialogOpen}
            onOpenChange={setNotesDialogOpen}
            recipeTitle={selectedRecipeForNotes.title}
            recipeId={selectedRecipeForNotes.id}
            currentNote={recipeNotes[selectedRecipeForNotes.id] || ""}
            onSaveNote={onSaveNote}
          />
        )}

        {selectedRecipe && (
          <RecipeDetailDialog
            recipe={selectedRecipe}
            open={!!selectedRecipe}
            onOpenChange={(open) => !open && setSelectedRecipe(null)}
            isSaved={savedRecipeIds.includes(selectedRecipe.id)}
            onSave={() => onRemoveRecipe(selectedRecipe.id)}
            onAddToCalendar={() => {}}
          />
        )}

        {selectedDrink && (
          <DrinkDetailDialog
            drink={selectedDrink}
            open={!!selectedDrink}
            onOpenChange={(open) => !open && setSelectedDrink(null)}
            isSaved={savedDrinkIds.includes(selectedDrink.id)}
            onSave={() => onRemoveDrink(selectedDrink.id)}
          />
        )}
      </CardContent>
    </Card>
  );
}
