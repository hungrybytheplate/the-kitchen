import { useState, useMemo, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { sampleRecipes, type Recipe, type DietaryTag, type CuisineType } from "@/data/recipes";
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
  Users,
  Printer,
  Grape,
  Egg,
  Coffee,
  Filter,
  X,
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
  type: "recipe" | "drink" | "static";
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

// Shared exclusion list for non-dish items
const nonDishKeywords = ["sauce", "dressing", "syrup", "butter", "condiment", "marinade", "jam", "jelly", "vinaigrette", "aioli", "glaze", "rub", "seasoning", "mayo", "mayonnaise", "gochujang", "ketchup", "mustard", "salsa", "pesto", "chutney", "relish", "gravy", "compound butter", "alfredo", "mole", "zhug", "teriyaki", "tikka masala", "romesco", "tahini sauce", "hot sauce", "worcestershire", "chimichurri", "tzatziki", "sriracha", "harissa", "curry paste", "spice mix", "spice blend", "extract", "simple syrup", "cream sauce", "pasta sauce", "pizza dough", "pasta dough", "pie crust", "crouton"];

const isNonDish = (title: string) => nonDishKeywords.some(k => title.includes(k));

// Category filters
const isSpringAppetizer = (r: Recipe) => {
  const title = r.title.toLowerCase();
  const desc = (r.description || "").toLowerCase();
  const combined = title + " " + desc;
  const appetizerKeywords = ["bruschetta", "dip", "hummus", "crostini", "caprese", "spring roll", "deviled", "stuffed mushroom", "artichoke dip", "cheese ball", "brie", "goat cheese", "shrimp cocktail", "ceviche", "tartare", "pâté", "pate", "appetizer", "starter", "bite", "skewer", "wrap", "flatbread", "pinwheel", "croquette", "fritter", "prosciutto bundle"];
  if (isNonDish(title)) return false;
  return (
    (r.mealType === "sides" || r.mealType === "lunch") &&
    appetizerKeywords.some(k => combined.includes(k))
  );
};

const isSpringEntree = (r: Recipe) => {
  const title = r.title.toLowerCase();
  const desc = (r.description || "").toLowerCase();
  const isPastaSauce = (title.includes("sauce") || title.includes("alfredo") || title.includes("mole")) &&
    (title.includes("pasta") || desc.includes("pasta") || desc.includes("noodle") || desc.includes("spaghetti") || desc.includes("fettuccine") || desc.includes("linguine"));
  if (isPastaSauce) return true;
  if (isNonDish(title)) return false;
  const springEntreeKeywords = ["lamb", "salmon", "ham", "chicken", "roast", "grilled", "herb", "lemon", "asparagus", "pork tenderloin", "sea bass", "halibut", "shrimp", "scallop", "risotto"];
  return (
    r.mealType === "dinner" &&
    (r.season === "spring" || springEntreeKeywords.some(k => title.includes(k)))
  );
};

const isSpringDessert = (r: Recipe) => {
  const title = r.title.toLowerCase();
  const excludeDessertKeywords = ["buttercream", "frosting", "icing", "glaze"];
  if (excludeDessertKeywords.some(k => title.includes(k)) && !title.includes("cake") && !title.includes("cupcake")) return false;
  if (isNonDish(title)) return false;
  const springDessertKeywords = ["lemon", "berry", "strawberry", "raspberry", "blueberry", "lavender", "vanilla", "cream", "tart", "cake", "pavlova", "mousse", "cheesecake", "shortcake", "meringue", "sorbet", "panna cotta", "fruit"];
  return r.mealType === "dessert" && springDessertKeywords.some(k => title.includes(k));
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
  if (title.includes("spring roll") || title.includes("egg roll") || title.includes("cinnamon roll")) return false;
  return (
    (r.mealType === "sides" || r.mealType === "breakfast") &&
    breadKeywords.some(k => title.includes(k))
  );
};

const isBrunchItem = (r: Recipe) => {
  const title = r.title.toLowerCase();
  if (isNonDish(title)) return false;
  const brunchKeywords = ["eggs benedict", "eggs florentine", "quiche", "french toast", "pancake", "waffle", "frittata", "omelette", "omelet", "mimosa", "crepe", "scone", "hot cross bun"];
  return r.mealType === "breakfast" && brunchKeywords.some(k => title.includes(k));
};

// Wine pairing data
interface WinePairing {
  type: string;
  name: string;
  description: string;
  emoji: string;
  pairsWith: string;
}

const springWinePairings: WinePairing[] = [
  { type: "White", name: "Sauvignon Blanc", description: "Crisp, herbaceous — perfect with asparagus, salads, and seafood", emoji: "🥂", pairsWith: "Appetizers, veggie sides, seafood entrées" },
  { type: "Rosé", name: "Provence Rosé", description: "Dry, fruity — the ultimate spring wine for outdoor entertaining", emoji: "🌸", pairsWith: "Everything! Especially charcuterie, chicken, and light pasta" },
  { type: "Red", name: "Pinot Noir", description: "Light-bodied, earthy — elegant with lamb, ham, and mushrooms", emoji: "🍷", pairsWith: "Lamb, ham, risotto, roasted vegetables" },
  { type: "Sparkling", name: "Prosecco or Champagne", description: "Festive bubbles for toasts, mimosas, and aperitifs", emoji: "🍾", pairsWith: "Appetizers, brunch, desserts, celebrations" },
];

// Charcuterie board suggestions
interface BoardItem {
  category: string;
  suggestions: string[];
}

const charcuterieBoard: BoardItem[] = [
  { category: "Cheeses", suggestions: ["Brie", "Aged Gouda", "Goat Cheese with Honey", "Manchego"] },
  { category: "Cured Meats", suggestions: ["Prosciutto", "Sopressata", "Coppa", "Salami"] },
  { category: "Crackers & Bread", suggestions: ["Water Crackers", "Grissini", "Sliced Baguette", "Flatbread Crisps"] },
  { category: "Fresh & Dried Fruit", suggestions: ["Grapes", "Figs", "Dried Apricots", "Strawberries"] },
  { category: "Accompaniments", suggestions: ["Fig Jam", "Honeycomb", "Marcona Almonds", "Cornichons", "Dijon Mustard"] },
];

const guestPresets = [
  { value: "4", label: "4 guests" },
  { value: "8", label: "8 guests" },
  { value: "12", label: "12 guests" },
  { value: "16", label: "16 guests" },
  { value: "20", label: "20 guests" },
];

const menuCategories: MenuCategory[] = [
  {
    title: "Brunch",
    icon: Coffee,
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-500/10 border-orange-500/20",
    type: "recipe",
    count: 2,
    filter: (r) => isBrunchItem(r as Recipe),
  },
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
    title: "Flavored Waters",
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
        (title.includes("water") || title.includes("infused") || drink.healthTags?.includes("Hydrating"))
      ) && !title.includes("coconut");
    },
  },
];

const dietaryFilters: { tag: DietaryTag; label: string; icon: string }[] = [
  { tag: "vegetarian", label: "Vegetarian", icon: "🥬" },
  { tag: "vegan", label: "Vegan", icon: "🌱" },
  { tag: "gluten-free", label: "Gluten-Free", icon: "🌾" },
  { tag: "dairy-free", label: "Dairy-Free", icon: "🥛" },
  { tag: "keto", label: "Keto", icon: "🥑" },
  { tag: "paleo", label: "Paleo", icon: "🍖" },
  { tag: "high-protein", label: "High Protein", icon: "💪" },
  { tag: "low-carb", label: "Low Carb", icon: "🥗" },
  { tag: "no-sodium", label: "No Sodium", icon: "🚫" },
  { tag: "low-sodium", label: "Low Sodium", icon: "🧂" },
];

const cuisineFilters: { cuisine: CuisineType; label: string; icon: string }[] = [
  { cuisine: "italian", label: "Italian", icon: "🇮🇹" },
  { cuisine: "mexican", label: "Mexican", icon: "🇲🇽" },
  { cuisine: "asian", label: "Asian", icon: "🥢" },
  { cuisine: "mediterranean", label: "Mediterranean", icon: "🫒" },
  { cuisine: "american", label: "American", icon: "🇺🇸" },
  { cuisine: "french", label: "French", icon: "🇫🇷" },
  { cuisine: "indian", label: "Indian", icon: "🇮🇳" },
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
  const [guestCount, setGuestCount] = useState("8");
  const [activeDietaryFilters, setActiveDietaryFilters] = useState<DietaryTag[]>([]);
  const [activeCuisineFilters, setActiveCuisineFilters] = useState<CuisineType[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const hasActiveFilters = activeDietaryFilters.length > 0 || activeCuisineFilters.length > 0;

  const toggleDietary = (tag: DietaryTag) => {
    setActiveDietaryFilters(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const toggleCuisine = (cuisine: CuisineType) => {
    setActiveCuisineFilters(prev =>
      prev.includes(cuisine) ? prev.filter(c => c !== cuisine) : [...prev, cuisine]
    );
  };

  const clearFilters = () => {
    setActiveDietaryFilters([]);
    setActiveCuisineFilters([]);
  };

  // Filter recipes/drinks based on active filters
  const filteredRecipes = useMemo(() => {
    return sampleRecipes.filter(r => {
      if (activeDietaryFilters.length > 0) {
        if (!activeDietaryFilters.every(tag => r.dietaryTags?.includes(tag))) return false;
      }
      if (activeCuisineFilters.length > 0) {
        if (!r.cuisine || !activeCuisineFilters.includes(r.cuisine)) return false;
      }
      return true;
    });
  }, [activeDietaryFilters, activeCuisineFilters]);

  const filteredDrinks = useMemo(() => {
    return sampleDrinks.filter(d => {
      if (activeDietaryFilters.length > 0) {
        // For drinks, check healthTags for dietary compatibility
        const drinkTags = (d.healthTags || []).map(t => t.toLowerCase());
        for (const tag of activeDietaryFilters) {
          if (tag === "vegan" && !drinkTags.some(t => t.includes("vegan"))) return false;
          if (tag === "gluten-free" && !drinkTags.some(t => t.includes("gluten"))) return false;
          if (tag === "dairy-free" && !drinkTags.some(t => t.includes("dairy"))) return false;
        }
      }
      return true;
    });
  }, [activeDietaryFilters]);

  const menuSuggestions = useMemo(() => {
    return menuCategories.map((category) => {
      if (category.type === "recipe") {
        const filtered = filteredRecipes.filter(category.filter as (r: Recipe) => boolean);
        const shuffled = seededShuffle(filtered, refreshKey + category.title.length * 31);
        return { ...category, items: shuffled.slice(0, category.count) };
      } else {
        const filtered = filteredDrinks.filter(category.filter as (d: Drink) => boolean);
        const shuffled = seededShuffle(filtered, refreshKey + category.title.length * 37);
        return { ...category, items: shuffled.slice(0, category.count) };
      }
    });
  }, [refreshKey, filteredRecipes, filteredDrinks]);

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

  const guestMultiplier = parseInt(guestCount) / 4; // Base recipes serve ~4

  const scaleServings = (servings: number) => {
    const scaled = Math.round(servings * guestMultiplier);
    return scaled;
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Card className="overflow-hidden border-2 border-emerald-500/20 bg-gradient-to-br from-pink-500/5 via-card to-emerald-500/5 print:border print:border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-3 text-left group"
            >
              <div className="p-3 rounded-xl bg-gradient-to-br from-pink-400 to-emerald-500 shadow-lg print:shadow-none">
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
              <span className="no-print">
                {isExpanded ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground ml-auto shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground ml-auto shrink-0" />
                )}
              </span>
            </button>
          </div>
        </CardHeader>

        {isExpanded && (
          <CardContent className="pt-0 space-y-6" ref={printRef}>
            {/* Action bar */}
            <div className="flex flex-wrap items-center gap-2 no-print">
              <Button
                onClick={handleAddAllToCalendar}
                className="bg-gradient-to-r from-pink-500 to-emerald-500 hover:from-pink-600 hover:to-emerald-600 text-white gap-2"
              >
                <Calendar className="h-4 w-4" />
                Add All {totalRecipes} to Plan
              </Button>
              <Button variant="outline" size="sm" onClick={handleRefresh} className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Shuffle
              </Button>
              <Button variant="outline" size="sm" onClick={handlePrint} className="gap-2">
                <Printer className="h-4 w-4" />
                Print Menu
              </Button>
              <div className="flex items-center gap-2 ml-auto">
                <Users className="h-4 w-4 text-muted-foreground" />
                <Select value={guestCount} onValueChange={setGuestCount}>
                  <SelectTrigger className="w-[130px] h-8 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {guestPresets.map(p => (
                      <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Filters */}
            <div className="space-y-3 no-print">
              <div className="flex items-center gap-2">
                <Button
                  variant={showFilters ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="gap-2"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                  {hasActiveFilters && (
                    <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-[10px]">
                      {activeDietaryFilters.length + activeCuisineFilters.length}
                    </Badge>
                  )}
                </Button>
                {hasActiveFilters && (
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1 text-muted-foreground">
                    <X className="h-3 w-3" />
                    Clear
                  </Button>
                )}
              </div>

              {showFilters && (
                <Card className="border border-border/60">
                  <CardContent className="p-4 space-y-4">
                    {/* Dietary Filters */}
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Dietary</p>
                      <div className="flex flex-wrap gap-1.5">
                        {dietaryFilters.map(({ tag, label, icon }) => (
                          <Badge
                            key={tag}
                            variant={activeDietaryFilters.includes(tag) ? "default" : "outline"}
                            className={cn(
                              "cursor-pointer transition-all text-xs",
                              activeDietaryFilters.includes(tag)
                                ? "bg-primary text-primary-foreground"
                                : "hover:bg-accent"
                            )}
                            onClick={() => toggleDietary(tag)}
                          >
                            <span className="mr-1">{icon}</span>
                            {label}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Cuisine Filters */}
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Cuisine</p>
                      <div className="flex flex-wrap gap-1.5">
                        {cuisineFilters.map(({ cuisine, label, icon }) => (
                          <Badge
                            key={cuisine}
                            variant={activeCuisineFilters.includes(cuisine) ? "default" : "outline"}
                            className={cn(
                              "cursor-pointer transition-all text-xs",
                              activeCuisineFilters.includes(cuisine)
                                ? "bg-primary text-primary-foreground"
                                : "hover:bg-accent"
                            )}
                            onClick={() => toggleCuisine(cuisine)}
                          >
                            <span className="mr-1">{icon}</span>
                            {label}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Print-only guest count header */}
            <div className="hidden print:block text-sm text-muted-foreground mb-4">
              Planning for <strong>{guestCount} guests</strong> · Servings scaled accordingly
            </div>

            {/* Menu Categories Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 print:grid-cols-3 print:gap-3">
              {menuSuggestions.map((category) => {
                const Icon = category.icon;
                return (
                  <Card
                    key={category.title}
                    className={cn("border-2 transition-all hover:shadow-md print:shadow-none print:break-inside-avoid", category.bgColor)}
                  >
                    <CardHeader className="pb-2 pt-4 px-4">
                      <div className="flex items-center gap-2">
                        <Icon className={cn("h-5 w-5", category.color)} />
                        <CardTitle className="text-base">{category.title}</CardTitle>
                        <Badge variant="outline" className="ml-auto text-[10px] no-print">
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

                          return (
                            <div
                              key={isRecipe ? recipe.id : drink.id}
                              className="p-2.5 rounded-lg bg-card border border-border/50 hover:border-border transition-all cursor-pointer group print:p-2 print:rounded"
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
                                    {isRecipe && (
                                      <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                                        {scaleServings(recipe.servings)} srv
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
                                    className="h-7 w-7 shrink-0 no-print"
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

              {/* Cheese & Charcuterie Board - static */}
              <Card className="border-2 transition-all hover:shadow-md bg-amber-500/10 border-amber-500/20 print:shadow-none print:break-inside-avoid">
                <CardHeader className="pb-2 pt-4 px-4">
                  <div className="flex items-center gap-2">
                    <Grape className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    <CardTitle className="text-base">Charcuterie Board</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <div className="space-y-2.5">
                    {charcuterieBoard.map((section) => (
                      <div key={section.category}>
                        <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-1">{section.category}</p>
                        <p className="text-xs leading-relaxed">{section.suggestions.join(" · ")}</p>
                      </div>
                    ))}
                    <p className="text-[10px] text-muted-foreground italic mt-2">
                      Tip: Plan ~2 oz cheese + 1.5 oz meat per guest for {guestCount} guests = {Math.round(parseInt(guestCount) * 2 / 16 * 10) / 10} lbs cheese
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Wine Pairing Guide - static */}
              <Card className="border-2 transition-all hover:shadow-md bg-purple-500/10 border-purple-500/20 print:shadow-none print:break-inside-avoid">
                <CardHeader className="pb-2 pt-4 px-4">
                  <div className="flex items-center gap-2">
                    <Wine className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    <CardTitle className="text-base">Wine Guide</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <div className="space-y-2.5">
                    {springWinePairings.map((wine) => (
                      <div key={wine.name} className="p-2 rounded-lg bg-card border border-border/50">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm">{wine.emoji}</span>
                          <span className="font-medium text-sm">{wine.name}</span>
                          <Badge variant="outline" className="text-[9px] ml-auto">{wine.type}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{wine.description}</p>
                        <p className="text-[10px] text-muted-foreground/70 mt-0.5">Pairs with: {wine.pairsWith}</p>
                      </div>
                    ))}
                    <p className="text-[10px] text-muted-foreground italic">
                      Tip: Plan ~1 bottle per 2-3 guests. For {guestCount} guests ≈ {Math.ceil(parseInt(guestCount) / 2.5)} bottles
                    </p>
                  </div>
                </CardContent>
              </Card>
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
