import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { sampleRecipes, type Recipe } from "@/data/recipes";
import { sampleDrinks, type Drink } from "@/data/drinks";
import { RecipeDetailDialog } from "./RecipeDetailDialog";
import { DrinkDetailDialog } from "./DrinkDetailDialog";
import {
  Flower2,
  Utensils,
  ChefHat,
  Wine,
  Cake,
  Salad,
  Wheat,
  GlassWater,
  Plus,
  Calendar,
  Sparkles,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Martini,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SpringHostingPlannerProps {
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
  count: number;
  filter: (item: Recipe | Drink) => boolean;
}

// Helper: deterministic shuffle with seed
function seededShuffle<T>(arr: T[], seed: number): T[] {
  const result = [...arr];
  let s = seed;
  for (let i = result.length - 1; i > 0; i--) {
    s = (s * 16807) % 2147483647;
    const j = s % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Shared exclusion list for non-dish items (sauces, dressings, condiments, etc.)
const nonDishKeywords = ["sauce", "dressing", "syrup", "butter", "condiment", "marinade", "jam", "jelly", "vinaigrette", "aioli", "glaze", "rub", "seasoning", "mayo", "mayonnaise", "gochujang", "ketchup", "mustard", "salsa", "pesto", "chutney", "relish", "gravy", "compound butter", "alfredo", "mole", "zhug", "teriyaki", "tikka masala", "romesco", "tahini sauce", "hot sauce", "worcestershire", "chimichurri", "tzatziki", "sriracha", "harissa", "curry paste", "spice mix", "spice blend", "extract", "simple syrup", "cream sauce", "pasta sauce", "pizza dough", "pasta dough", "pie crust", "crouton"];

const isNonDish = (title: string) => nonDishKeywords.some(k => title.includes(k));

// Spring-appropriate recipe filters
const isSpringAppetizer = (r: Recipe) => {
  const title = r.title.toLowerCase();
  const desc = (r.description || "").toLowerCase();
  const combined = title + " " + desc;
  const appetizerKeywords = ["bruschetta", "dip", "hummus", "crostini", "caprese", "spring roll", "deviled", "stuffed mushroom", "artichoke dip", "cheese ball", "brie", "goat cheese", "shrimp cocktail", "ceviche", "tartare", "pâté", "pate", "appetizer", "starter", "bite", "skewer", "wrap", "flatbread", "pinwheel", "croquette", "fritter"];
  if (isNonDish(title)) return false;
  return (
    (r.mealType === "sides" || r.mealType === "lunch") &&
    appetizerKeywords.some(k => combined.includes(k))
  );
};

const isSpringEntree = (r: Recipe) => {
  const title = r.title.toLowerCase();
  const desc = (r.description || "").toLowerCase();
  
  // Allow pasta sauces as entrées (they ARE the dish when paired with pasta)
  const isPastaSauce = (title.includes("sauce") || title.includes("alfredo") || title.includes("mole")) &&
    (title.includes("pasta") || desc.includes("pasta") || desc.includes("noodle") || desc.includes("spaghetti") || desc.includes("fettuccine") || desc.includes("linguine"));
  if (isPastaSauce) return true;
  
  if (isNonDish(title)) return false;
  const springEntreeKeywords = ["lamb", "salmon", "ham", "chicken", "roast", "grilled", "herb", "lemon", "asparagus", "pork tenderloin", "sea bass", "halibut", "shrimp", "scallop"];
  return (
    r.mealType === "dinner" &&
    (r.season === "spring" || springEntreeKeywords.some(k => title.includes(k)))
  );
};

const isSpringDessert = (r: Recipe) => {
  const title = r.title.toLowerCase();
  // Exclude standalone frostings/buttercreams — they're components, not desserts
  const excludeDessertKeywords = ["buttercream", "frosting", "icing", "glaze"];
  if (excludeDessertKeywords.some(k => title.includes(k)) && !title.includes("cake") && !title.includes("cupcake")) {
    return false;
  }
  if (isNonDish(title)) return false;
  const springDessertKeywords = ["lemon", "berry", "strawberry", "raspberry", "blueberry", "lavender", "vanilla", "cream", "tart", "cake", "pavlova", "mousse", "cheesecake", "shortcake", "meringue", "sorbet", "panna cotta", "fruit"];
  return (
    r.mealType === "dessert" &&
    springDessertKeywords.some(k => title.includes(k))
  );
};

const isVeggieSide = (r: Recipe) => {
  const title = r.title.toLowerCase();
  if (isNonDish(title)) return false;
  const veggieKeywords = ["asparagus", "salad", "green bean", "pea", "roasted vegetable", "grilled vegetable", "slaw", "carrot", "beet", "radish", "cucumber", "zucchini", "artichoke", "brussels", "broccoli", "spinach", "kale", "corn"];
  return (
    (r.mealType === "sides" || r.mealType === "lunch") &&
    veggieKeywords.some(k => title.includes(k)) &&
    !isSpringAppetizer(r)
  );
};

const isBreadSide = (r: Recipe) => {
  const title = r.title.toLowerCase();
  if (isNonDish(title)) return false;
  const breadKeywords = ["bread", "roll", "biscuit", "cornbread", "focaccia", "sourdough", "baguette", "brioche", "pretzel", "dinner roll"];
  // Exclude non-bread items that happen to have "roll" in them (e.g. "spring roll")
  if (title.includes("spring roll") || title.includes("egg roll") || title.includes("cinnamon roll")) return false;
  return (
    (r.mealType === "sides" || r.mealType === "breakfast") &&
    breadKeywords.some(k => title.includes(k))
  );
};

const menuCategories: MenuCategory[] = [
  {
    title: "Appetizers",
    icon: Utensils,
    color: "text-rose-600 dark:text-rose-400",
    bgColor: "bg-rose-500/10 border-rose-500/20",
    type: "recipe",
    count: 3,
    filter: (r) => isSpringAppetizer(r as Recipe),
  },
  {
    title: "Entrées",
    icon: ChefHat,
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-500/10 border-emerald-500/20",
    type: "recipe",
    count: 2,
    filter: (r) => isSpringEntree(r as Recipe),
  },
  {
    title: "Veggie Sides",
    icon: Salad,
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-500/10 border-green-500/20",
    type: "recipe",
    count: 3,
    filter: (r) => isVeggieSide(r as Recipe),
  },
  {
    title: "Bread & Rolls",
    icon: Wheat,
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-500/10 border-amber-500/20",
    type: "recipe",
    count: 2,
    filter: (r) => isBreadSide(r as Recipe),
  },
  {
    title: "Desserts",
    icon: Cake,
    color: "text-pink-600 dark:text-pink-400",
    bgColor: "bg-pink-500/10 border-pink-500/20",
    type: "recipe",
    count: 2,
    filter: (r) => isSpringDessert(r as Recipe),
  },
  {
    title: "Wine & Cocktails",
    icon: Wine,
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-500/10 border-purple-500/20",
    type: "drink",
    count: 3,
    filter: (d) => {
      const drink = d as Drink;
      return drink.isAlcoholic && (drink.season === "spring" || drink.season === "all-season" || drink.occasion === "brunch" || drink.occasion === "party");
    },
  },
  {
    title: "Mocktails",
    icon: Martini,
    color: "text-teal-600 dark:text-teal-400",
    bgColor: "bg-teal-500/10 border-teal-500/20",
    type: "drink",
    count: 2,
    filter: (d) => {
      const drink = d as Drink;
      return drink.drinkType === "mocktail" && (drink.season === "spring" || drink.season === "all-season" || drink.occasion === "brunch" || drink.occasion === "party");
    },
  },
  {
    title: "Flavored Waters & Refreshers",
    icon: GlassWater,
    color: "text-sky-600 dark:text-sky-400",
    bgColor: "bg-sky-500/10 border-sky-500/20",
    type: "drink",
    count: 2,
    filter: (d) => {
      const drink = d as Drink;
      const title = drink.title.toLowerCase();
      return (
        !drink.isAlcoholic &&
        (title.includes("water") || title.includes("lemonade") || title.includes("refresher") || title.includes("infused") || title.includes("spritz") || title.includes("cooler") || title.includes("iced tea") || drink.healthTags?.includes("Hydrating"))
      );
    },
  },
];

export function SpringHostingPlanner({
  onAddToCalendar,
  onAddToShopping,
  savedRecipes,
  onSaveRecipe,
  savedDrinks,
  onSaveDrink,
}: SpringHostingPlannerProps) {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const menuSuggestions = useMemo(() => {
    return menuCategories.map((category) => {
      if (category.type === "recipe") {
        const filtered = sampleRecipes.filter(category.filter as (r: Recipe) => boolean);
        const shuffled = seededShuffle(filtered, refreshKey + category.title.length * 31);
        return { ...category, items: shuffled.slice(0, category.count) };
      } else {
        const filtered = sampleDrinks.filter(category.filter as (d: Drink) => boolean);
        const shuffled = seededShuffle(filtered, refreshKey + category.title.length * 37);
        return { ...category, items: shuffled.slice(0, category.count) };
      }
    });
  }, [refreshKey]);

  const handleRefresh = () => setRefreshKey((prev) => prev + 1);

  const handleAddAllToCalendar = () => {
    menuSuggestions
      .filter((cat) => cat.type === "recipe")
      .flatMap((cat) => cat.items as Recipe[])
      .forEach((recipe) => onAddToCalendar(recipe));
  };

  const totalRecipes = menuSuggestions
    .filter(c => c.type === "recipe")
    .reduce((sum, c) => sum + c.items.length, 0);

  return (
    <>
      <Card className="overflow-hidden border-2 border-emerald-500/20 bg-gradient-to-br from-pink-500/5 via-card to-emerald-500/5">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-3 text-left group"
            >
              <div className="p-3 rounded-xl bg-gradient-to-br from-pink-400 to-emerald-500 shadow-lg">
                <Flower2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl sm:text-2xl font-serif flex items-center gap-2">
                  Spring Hosting Planner
                  <Sparkles className="h-5 w-5 text-amber-500" />
                </CardTitle>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Complete menu for Easter, Mother's Day, or any spring gathering
                </p>
              </div>
              {isExpanded ? (
                <ChevronUp className="h-5 w-5 text-muted-foreground ml-auto shrink-0" />
              ) : (
                <ChevronDown className="h-5 w-5 text-muted-foreground ml-auto shrink-0" />
              )}
            </button>
          </div>
        </CardHeader>

        {isExpanded && (
          <CardContent className="pt-0 space-y-5">
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={handleAddAllToCalendar}
                className="bg-gradient-to-r from-pink-500 to-emerald-500 hover:from-pink-600 hover:to-emerald-600 text-white gap-2"
              >
                <Calendar className="h-4 w-4" />
                Add All {totalRecipes} Recipes to Plan
              </Button>
              <Button variant="outline" size="sm" onClick={handleRefresh} className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Shuffle Menu
              </Button>
            </div>

            {/* Menu Categories Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {menuSuggestions.map((category) => {
                const Icon = category.icon;
                return (
                  <Card
                    key={category.title}
                    className={cn("border-2 transition-all hover:shadow-md", category.bgColor)}
                  >
                    <CardHeader className="pb-2 pt-4 px-4">
                      <div className="flex items-center gap-2">
                        <Icon className={cn("h-5 w-5", category.color)} />
                        <CardTitle className="text-base">{category.title}</CardTitle>
                        <Badge variant="outline" className="ml-auto text-[10px]">
                          {category.items.length}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2 px-4 pb-4">
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
                              className="p-2.5 rounded-lg bg-card border border-border/50 hover:border-border transition-all cursor-pointer group"
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
                                  <div className="flex items-center gap-1.5 mt-1.5">
                                    <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                                      {isRecipe ? recipe.cookTime : drink.prepTime}
                                    </Badge>
                                    {isRecipe && recipe.servings && (
                                      <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                                        {recipe.servings} srv
                                      </Badge>
                                    )}
                                    {!isRecipe && drink.isAlcoholic && drink.virginVersion && (
                                      <Badge variant="outline" className="text-[10px] px-1.5 py-0 text-teal-600 dark:text-teal-400">
                                        Virgin avail
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                                {isRecipe && (
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7 shrink-0"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onAddToCalendar(recipe);
                                    }}
                                  >
                                    <Plus className="h-3.5 w-3.5" />
                                  </Button>
                                )}
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <p className="text-xs text-muted-foreground text-center py-3 italic">
                          No items found
                        </p>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        )}
      </Card>

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

      {selectedDrink && (
        <DrinkDetailDialog
          drink={selectedDrink}
          open={!!selectedDrink}
          onOpenChange={(open) => !open && setSelectedDrink(null)}
          isSaved={savedDrinks.includes(selectedDrink.id)}
          onSave={() => onSaveDrink(selectedDrink.id)}
          onAddToShopping={(ings) => ings.forEach((ing) => onAddToShopping(ing))}
        />
      )}
    </>
  );
}
