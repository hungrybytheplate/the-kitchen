import type { Recipe } from "@/data/recipes";
import type { Drink } from "@/data/drinks";
import { sampleDrinks } from "@/data/drinks";

// Pairing rules based on meal characteristics
const mealTypePairings: Record<string, string[]> = {
  breakfast: ["smoothie", "mocktail"], // Non-alcoholic for breakfast
  lunch: ["mocktail", "smoothie", "cocktail"],
  dinner: ["cocktail", "mocktail"],
};

// Ingredient-based pairing affinities
const ingredientPairings: Record<string, string[]> = {
  // Proteins
  chicken: ["margarita", "mojito", "virgin-mojito", "cucumber-cooler"],
  beef: ["old-fashioned", "negroni", "dark-and-stormy"],
  pork: ["moscow-mule", "whiskey-sour", "ginger-mint-spritzer"],
  fish: ["gin-tonic", "daiquiri", "cucumber-cooler", "virgin-mojito"],
  salmon: ["gin-tonic", "cosmopolitan", "cucumber-cooler"],
  shrimp: ["margarita", "pina-colada", "virgin-pina-colada", "passion-fruit-spritz"],
  
  // Cuisines/flavors
  mexican: ["margarita", "virgin-mojito", "passion-fruit-spritz"],
  italian: ["negroni", "espresso-martini", "shirley-temple"],
  asian: ["moscow-mule", "ginger-mint-spritzer", "tropical-paradise"],
  tropical: ["pina-colada", "virgin-pina-colada", "tropical-paradise", "mango-lassi"],
  
  // Breakfast items
  eggs: ["berry-blast", "strawberry-banana", "green-machine"],
  oats: ["berry-blast", "mango-lassi", "tropical-paradise"],
  pancakes: ["strawberry-banana", "berry-blast"],
  
  // Vegetables
  salad: ["gin-tonic", "cucumber-cooler", "green-machine"],
  spicy: ["margarita", "moscow-mule", "mango-lassi"],
  
  // General
  light: ["gin-tonic", "mojito", "virgin-mojito", "cucumber-cooler"],
  rich: ["old-fashioned", "espresso-martini", "dark-and-stormy"],
  fresh: ["mojito", "virgin-mojito", "watermelon-basil-cooler", "strawberry-lemonade"],
};

// Recipe ID to flavor profile mapping
const recipeFlavorProfiles: Record<string, string[]> = {
  // Breakfast
  "scrambled-eggs-toast": ["eggs", "light"],
  "oatmeal-berries": ["oats", "fresh"],
  "avocado-toast": ["fresh", "light"],
  "banana-pancakes": ["pancakes"],
  "greek-yogurt-bowl": ["fresh", "light"],
  "french-toast": ["rich"],
  "veggie-omelette": ["eggs", "fresh"],
  "breakfast-burrito": ["mexican", "eggs"],
  "smoothie-bowl": ["tropical", "fresh"],
  "egg-muffins": ["eggs"],
  
  // Lunch
  "caesar-salad": ["salad", "light"],
  "grilled-cheese": ["rich"],
  "chicken-wrap": ["chicken", "light"],
  "tuna-sandwich": ["fish", "light"],
  "quinoa-bowl": ["salad", "fresh"],
  "soup-lentil": ["rich"],
  "caprese-sandwich": ["italian", "fresh"],
  "asian-noodle-salad": ["asian", "fresh"],
  "stuffed-avocado": ["fresh", "fish"],
  "chickpea-salad": ["salad", "fresh"],
  "chicken-salad": ["chicken", "light"],
  
  // Dinner
  "lemon-herb-salmon": ["salmon", "fresh"],
  "garlic-butter-chicken": ["chicken", "rich"],
  "chicken-curry": ["asian", "spicy"],
  "shrimp-scampi": ["shrimp", "italian"],
  "stuffed-peppers": ["beef", "mexican"],
  "pork-chops": ["pork", "rich"],
  "vegetable-stir-fry": ["asian", "fresh"],
  "spaghetti-carbonara": ["italian", "rich"],
  "teriyaki-chicken": ["asian", "chicken"],
  "mushroom-risotto": ["italian", "rich"],
  "beef-tacos": ["beef", "mexican"],
  "fish-tacos": ["fish", "mexican"],
  "beef-stir-fry": ["beef", "asian"],
  "coconut-shrimp-curry": ["shrimp", "tropical", "spicy"],
  "baked-ziti": ["italian", "rich"],
  "honey-garlic-chicken": ["chicken", "asian"],
  "vegetable-lasagna": ["italian", "rich"],
  "beef-and-broccoli": ["beef", "asian"],
  "tofu-stir-fry": ["asian", "light"],
};

export function getDrinkPairings(recipe: Recipe, limit: number = 3): Drink[] {
  const scores: Map<string, number> = new Map();
  
  // Get flavor profiles for this recipe
  const profiles = recipeFlavorProfiles[recipe.id] || [];
  
  // Score drinks based on meal type
  const mealTypeDrinks = mealTypePairings[recipe.mealType] || [];
  sampleDrinks.forEach(drink => {
    if (mealTypeDrinks.includes(drink.drinkType)) {
      scores.set(drink.id, (scores.get(drink.id) || 0) + 1);
    }
  });
  
  // Score drinks based on flavor profile matches
  profiles.forEach(profile => {
    const pairedDrinkIds = ingredientPairings[profile] || [];
    pairedDrinkIds.forEach(drinkId => {
      scores.set(drinkId, (scores.get(drinkId) || 0) + 2);
    });
  });
  
  // Also check recipe ingredients for additional matches
  recipe.ingredients.forEach(ingredient => {
    const baseIngredient = ingredient.split("-")[0];
    const pairedDrinkIds = ingredientPairings[baseIngredient] || [];
    pairedDrinkIds.forEach(drinkId => {
      scores.set(drinkId, (scores.get(drinkId) || 0) + 1);
    });
  });
  
  // Sort by score and get top matches
  const sortedDrinkIds = Array.from(scores.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([id]) => id);
  
  // If no matches, provide defaults based on meal type
  if (sortedDrinkIds.length === 0) {
    const defaults: Record<string, string[]> = {
      breakfast: ["berry-blast", "tropical-paradise", "green-machine"],
      lunch: ["virgin-mojito", "cucumber-cooler", "strawberry-lemonade"],
      dinner: ["mojito", "margarita", "gin-tonic"],
    };
    sortedDrinkIds.push(...(defaults[recipe.mealType] || defaults.dinner).slice(0, limit));
  }
  
  return sortedDrinkIds
    .map(id => sampleDrinks.find(d => d.id === id))
    .filter((d): d is Drink => d !== undefined);
}

export function getPairingReason(recipe: Recipe, drink: Drink): string {
  const profiles = recipeFlavorProfiles[recipe.id] || [];
  
  // Find matching reason
  for (const profile of profiles) {
    const pairedDrinks = ingredientPairings[profile] || [];
    if (pairedDrinks.includes(drink.id)) {
      const reasons: Record<string, string> = {
        chicken: "Complements the savory chicken",
        beef: "Balances the rich beef flavors",
        pork: "Pairs well with pork",
        fish: "Light and fresh for seafood",
        salmon: "Enhances the salmon",
        shrimp: "Perfect match for shrimp",
        mexican: "Classic pairing for Mexican cuisine",
        italian: "Traditional Italian pairing",
        asian: "Complements Asian flavors",
        tropical: "Matches the tropical vibes",
        eggs: "Refreshing with breakfast",
        oats: "Fruity complement to oatmeal",
        salad: "Light and refreshing",
        spicy: "Cools down the spice",
        light: "Keeps the meal light",
        rich: "Balances rich flavors",
        fresh: "Adds a fresh note",
      };
      return reasons[profile] || "Great pairing";
    }
  }
  
  // Default reasons by drink type
  const typeReasons: Record<string, string> = {
    cocktail: "Classic dinner pairing",
    mocktail: "Refreshing non-alcoholic option",
    smoothie: "Healthy complement",
  };
  
  return typeReasons[drink.drinkType] || "Recommended pairing";
}
