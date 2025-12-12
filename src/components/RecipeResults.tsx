import { useState } from "react";
import { RecipeCard } from "./RecipeCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import type { Recipe, DietaryTag } from "@/data/recipes";
import { Sunrise, Sun, Moon, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

interface RecipeResultsProps {
  recipes: Recipe[];
  savedRecipes: string[];
  onSave: (recipeId: string) => void;
  onAddToCalendar: (recipe: Recipe) => void;
  onAddToShopping: (ingredientId: string) => void;
}

const dietaryFilters: { tag: DietaryTag; label: string; icon: string }[] = [
  { tag: "vegetarian", label: "Vegetarian", icon: "🥬" },
  { tag: "vegan", label: "Vegan", icon: "🌱" },
  { tag: "gluten-free", label: "Gluten-Free", icon: "🌾" },
  { tag: "dairy-free", label: "Dairy-Free", icon: "🥛" },
  { tag: "keto", label: "Keto", icon: "🥑" },
  { tag: "paleo", label: "Paleo", icon: "🍖" },
];

export function RecipeResults({ recipes, savedRecipes, onSave, onAddToCalendar, onAddToShopping }: RecipeResultsProps) {
  const [activeFilters, setActiveFilters] = useState<DietaryTag[]>([]);

  const toggleFilter = (tag: DietaryTag) => {
    setActiveFilters(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => setActiveFilters([]);

  // Filter recipes by dietary tags
  const filteredRecipes = activeFilters.length === 0 
    ? recipes 
    : recipes.filter(recipe => 
        activeFilters.every(filter => recipe.dietaryTags?.includes(filter))
      );

  const breakfastRecipes = filteredRecipes.filter(r => r.mealType === "breakfast");
  const lunchRecipes = filteredRecipes.filter(r => r.mealType === "lunch");
  const dinnerRecipes = filteredRecipes.filter(r => r.mealType === "dinner");

  if (recipes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Select some ingredients to see recipe suggestions!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Dietary Filters */}
      <div className="flex flex-wrap items-center gap-2 p-3 bg-muted/30 rounded-xl border border-border/50">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mr-1">
          <Filter className="h-4 w-4" />
          <span className="hidden sm:inline">Diet:</span>
        </div>
        {dietaryFilters.map(({ tag, label, icon }) => (
          <Badge
            key={tag}
            variant={activeFilters.includes(tag) ? "default" : "outline"}
            className={cn(
              "cursor-pointer transition-all hover:scale-105",
              activeFilters.includes(tag) 
                ? "bg-primary text-primary-foreground" 
                : "bg-background hover:bg-muted"
            )}
            onClick={() => toggleFilter(tag)}
          >
            <span className="mr-1">{icon}</span>
            {label}
          </Badge>
        ))}
        {activeFilters.length > 0 && (
          <Badge
            variant="outline"
            className="cursor-pointer text-muted-foreground hover:text-destructive hover:border-destructive"
            onClick={clearFilters}
          >
            Clear all
          </Badge>
        )}
      </div>

      {/* Filtered Results Count */}
      {activeFilters.length > 0 && (
        <p className="text-sm text-muted-foreground">
          Showing {filteredRecipes.length} of {recipes.length} recipes
        </p>
      )}

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
          <div className="grid gap-3 md:grid-cols-2">
            {breakfastRecipes.length > 0 ? (
              breakfastRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  isSaved={savedRecipes.includes(recipe.id)}
                  onSave={() => onSave(recipe.id)}
                  onAddToCalendar={() => onAddToCalendar(recipe)}
                  onAddToShopping={onAddToShopping}
                />
              ))
            ) : (
              <p className="text-muted-foreground col-span-2 text-center py-8">
                {activeFilters.length > 0 
                  ? "No breakfast recipes match your dietary filters. Try removing some filters!"
                  : "No breakfast recipes match your ingredients. Try adding eggs, oats, or bread!"}
              </p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="lunch" className="mt-0">
          <div className="grid gap-3 md:grid-cols-2">
            {lunchRecipes.length > 0 ? (
              lunchRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  isSaved={savedRecipes.includes(recipe.id)}
                  onSave={() => onSave(recipe.id)}
                  onAddToCalendar={() => onAddToCalendar(recipe)}
                  onAddToShopping={onAddToShopping}
                />
              ))
            ) : (
              <p className="text-muted-foreground col-span-2 text-center py-8">
                {activeFilters.length > 0 
                  ? "No lunch recipes match your dietary filters. Try removing some filters!"
                  : "No lunch recipes match your ingredients. Try adding chicken, lettuce, or pasta!"}
              </p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="dinner" className="mt-0">
          <div className="grid gap-3 md:grid-cols-2">
            {dinnerRecipes.length > 0 ? (
              dinnerRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  isSaved={savedRecipes.includes(recipe.id)}
                  onSave={() => onSave(recipe.id)}
                  onAddToCalendar={() => onAddToCalendar(recipe)}
                  onAddToShopping={onAddToShopping}
                />
              ))
            ) : (
              <p className="text-muted-foreground col-span-2 text-center py-8">
                {activeFilters.length > 0 
                  ? "No dinner recipes match your dietary filters. Try removing some filters!"
                  : "No dinner recipes match your ingredients. Try adding chicken, beef, or pasta!"}
              </p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
