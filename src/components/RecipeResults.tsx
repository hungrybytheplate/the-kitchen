import { RecipeCard } from "./RecipeCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Recipe } from "@/data/recipes";
import { Sunrise, Sun, Moon } from "lucide-react";

interface RecipeResultsProps {
  recipes: Recipe[];
  savedRecipes: string[];
  onSave: (recipeId: string) => void;
  onAddToCalendar: (recipe: Recipe) => void;
}

export function RecipeResults({ recipes, savedRecipes, onSave, onAddToCalendar }: RecipeResultsProps) {
  const breakfastRecipes = recipes.filter(r => r.mealType === "breakfast");
  const lunchRecipes = recipes.filter(r => r.mealType === "lunch");
  const dinnerRecipes = recipes.filter(r => r.mealType === "dinner");

  if (recipes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Select some ingredients to see recipe suggestions!</p>
      </div>
    );
  }

  return (
    <Tabs defaultValue="breakfast" className="w-full">
      <TabsList className="w-full grid grid-cols-3 h-12 bg-muted/50 p-1 rounded-xl mb-6">
        <TabsTrigger 
          value="breakfast" 
          className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm flex items-center gap-2"
        >
          <Sunrise className="h-4 w-4" />
          <span>Breakfast</span>
          <span className="text-xs text-muted-foreground">({breakfastRecipes.length})</span>
        </TabsTrigger>
        <TabsTrigger 
          value="lunch" 
          className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm flex items-center gap-2"
        >
          <Sun className="h-4 w-4" />
          <span>Lunch</span>
          <span className="text-xs text-muted-foreground">({lunchRecipes.length})</span>
        </TabsTrigger>
        <TabsTrigger 
          value="dinner" 
          className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm flex items-center gap-2"
        >
          <Moon className="h-4 w-4" />
          <span>Dinner</span>
          <span className="text-xs text-muted-foreground">({dinnerRecipes.length})</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="breakfast" className="mt-0">
        <div className="grid gap-4 md:grid-cols-2">
          {breakfastRecipes.length > 0 ? (
            breakfastRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                isSaved={savedRecipes.includes(recipe.id)}
                onSave={() => onSave(recipe.id)}
                onAddToCalendar={() => onAddToCalendar(recipe)}
              />
            ))
          ) : (
            <p className="text-muted-foreground col-span-2 text-center py-8">
              No breakfast recipes match your ingredients. Try adding eggs, oats, or bread!
            </p>
          )}
        </div>
      </TabsContent>

      <TabsContent value="lunch" className="mt-0">
        <div className="grid gap-4 md:grid-cols-2">
          {lunchRecipes.length > 0 ? (
            lunchRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                isSaved={savedRecipes.includes(recipe.id)}
                onSave={() => onSave(recipe.id)}
                onAddToCalendar={() => onAddToCalendar(recipe)}
              />
            ))
          ) : (
            <p className="text-muted-foreground col-span-2 text-center py-8">
              No lunch recipes match your ingredients. Try adding chicken, lettuce, or pasta!
            </p>
          )}
        </div>
      </TabsContent>

      <TabsContent value="dinner" className="mt-0">
        <div className="grid gap-4 md:grid-cols-2">
          {dinnerRecipes.length > 0 ? (
            dinnerRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                isSaved={savedRecipes.includes(recipe.id)}
                onSave={() => onSave(recipe.id)}
                onAddToCalendar={() => onAddToCalendar(recipe)}
              />
            ))
          ) : (
            <p className="text-muted-foreground col-span-2 text-center py-8">
              No dinner recipes match your ingredients. Try adding chicken, beef, or pasta!
            </p>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}
