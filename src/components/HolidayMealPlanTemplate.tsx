import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { sampleRecipes, type Recipe } from "@/data/recipes";
import { sampleDrinks, type Drink } from "@/data/drinks";
import { RecipeDetailDialog } from "./RecipeDetailDialog";
import { DrinkDetailDialog } from "./DrinkDetailDialog";
import { 
  Snowflake, 
  Utensils, 
  ChefHat, 
  Wine, 
  Cake, 
  Salad,
  Plus,
  Calendar,
  Sparkles,
  RefreshCw
} from "lucide-react";
import { cn } from "@/lib/utils";

interface HolidayMealPlanTemplateProps {
  onAddToCalendar: (recipe: Recipe) => void;
  onAddToShopping: (ingredientId: string) => void;
  savedRecipes: string[];
  onSaveRecipe: (recipeId: string) => void;
  savedDrinks: string[];
  onSaveDrink: (drinkId: string) => void;
}

interface MenuCategory {
  title: string;
  icon: typeof Utensils;
  color: string;
  bgColor: string;
  type: "recipe" | "drink";
  filter: (item: Recipe | Drink) => boolean;
}

const menuCategories: MenuCategory[] = [
  {
    title: "Main Course",
    icon: ChefHat,
    color: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-500/10 border-red-500/20",
    type: "recipe",
    filter: (r) => (r as Recipe).mealType === "dinner" && (r as Recipe).isHoliday === true,
  },
  {
    title: "Sides & Stuffing",
    icon: Salad,
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-500/10 border-green-500/20",
    type: "recipe",
    filter: (r) => (r as Recipe).mealType === "sides" && (r as Recipe).isHoliday === true,
  },
  {
    title: "Breakfast",
    icon: Utensils,
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-500/10 border-amber-500/20",
    type: "recipe",
    filter: (r) => (r as Recipe).mealType === "breakfast" && (r as Recipe).isHoliday === true,
  },
  {
    title: "Desserts",
    icon: Cake,
    color: "text-pink-600 dark:text-pink-400",
    bgColor: "bg-pink-500/10 border-pink-500/20",
    type: "recipe",
    filter: (r) => (r as Recipe).mealType === "dessert" && (r as Recipe).isHoliday === true,
  },
  {
    title: "Holiday Drinks",
    icon: Wine,
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-500/10 border-purple-500/20",
    type: "drink",
    filter: (d) => (d as Drink).isHoliday === true,
  },
];

export function HolidayMealPlanTemplate({
  onAddToCalendar,
  onAddToShopping,
  savedRecipes,
  onSaveRecipe,
  savedDrinks,
  onSaveDrink,
}: HolidayMealPlanTemplateProps) {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // Get random items from each category
  const getRandomItems = <T,>(items: T[], count: number): T[] => {
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  // Generate menu suggestions
  const menuSuggestions = menuCategories.map((category) => {
    if (category.type === "recipe") {
      const filtered = sampleRecipes.filter(category.filter as (r: Recipe) => boolean);
      return {
        ...category,
        items: getRandomItems(filtered, category.title === "Main Course" ? 1 : 2),
      };
    } else {
      const filtered = sampleDrinks.filter(category.filter as (d: Drink) => boolean);
      return {
        ...category,
        items: getRandomItems(filtered, 3),
      };
    }
  });

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleAddAllToCalendar = () => {
    menuSuggestions
      .filter((cat) => cat.type === "recipe")
      .flatMap((cat) => cat.items as Recipe[])
      .forEach((recipe) => {
        onAddToCalendar(recipe);
      });
  };

  return (
    <div className="space-y-6" key={refreshKey}>
      {/* Header */}
      <Card className="overflow-hidden border-2 border-red-500/20 bg-gradient-to-br from-red-500/5 via-card to-green-500/5">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-red-500 to-green-500 shadow-lg">
                <Snowflake className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl font-serif flex items-center gap-2">
                  Holiday Feast Planner
                  <Sparkles className="h-5 w-5 text-amber-500" />
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  A complete holiday menu suggestion for your celebration
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              className="gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Shuffle Menu
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={handleAddAllToCalendar}
              className="bg-gradient-to-r from-red-500 to-green-600 hover:from-red-600 hover:to-green-700 text-white gap-2"
            >
              <Calendar className="h-4 w-4" />
              Add All to Meal Plan
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Menu Categories */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {menuSuggestions.map((category) => {
          const Icon = category.icon;
          return (
            <Card
              key={category.title}
              className={cn(
                "border-2 transition-all hover:shadow-md",
                category.bgColor
              )}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Icon className={cn("h-5 w-5", category.color)} />
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {category.items.length > 0 ? (
                  category.items.map((item) => {
                    const isRecipe = category.type === "recipe";
                    const recipe = item as Recipe;
                    const drink = item as Drink;
                    const isSaved = isRecipe
                      ? savedRecipes.includes(recipe.id)
                      : savedDrinks.includes(drink.id);

                    return (
                      <div
                        key={isRecipe ? recipe.id : drink.id}
                        className="p-3 rounded-lg bg-card border border-border/50 hover:border-border transition-all cursor-pointer group"
                        onClick={() =>
                          isRecipe
                            ? setSelectedRecipe(recipe)
                            : setSelectedDrink(drink)
                        }
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                              {isRecipe ? recipe.title : drink.title}
                            </h4>
                            <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                              {isRecipe ? recipe.description : drink.description}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline" className="text-[10px]">
                                {isRecipe ? recipe.cookTime : drink.prepTime}
                              </Badge>
                              {isRecipe && (
                                <Badge variant="outline" className="text-[10px]">
                                  {recipe.servings} servings
                                </Badge>
                              )}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 shrink-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (isRecipe) {
                                onAddToCalendar(recipe);
                              }
                            }}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No items in this category
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recipe Detail Dialog */}
      {selectedRecipe && (
        <RecipeDetailDialog
          recipe={selectedRecipe}
          open={!!selectedRecipe}
          onOpenChange={(open) => !open && setSelectedRecipe(null)}
          isSaved={savedRecipes.includes(selectedRecipe.id)}
          onSave={() => onSaveRecipe(selectedRecipe.id)}
          onAddToCalendar={() => onAddToCalendar(selectedRecipe)}
          onAddToShopping={onAddToShopping}
        />
      )}

      {/* Drink Detail Dialog */}
      {selectedDrink && (
        <DrinkDetailDialog
          drink={selectedDrink}
          open={!!selectedDrink}
          onOpenChange={(open) => !open && setSelectedDrink(null)}
          isSaved={savedDrinks.includes(selectedDrink.id)}
          onSave={() => onSaveDrink(selectedDrink.id)}
        />
      )}
    </div>
  );
}
