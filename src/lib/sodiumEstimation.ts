/**
 * Estimates sodium (mg per serving) for recipes missing explicit sodium data.
 * Uses ingredient keywords and meal type as heuristics.
 */
export function estimateSodium(recipe: {
  nutrition?: { sodium?: number };
  ingredients: string[];
  mealType: string;
  title: string;
}): number {
  // If sodium is explicitly provided, use it
  if (recipe.nutrition?.sodium !== undefined) {
    return recipe.nutrition.sodium;
  }

  const title = recipe.title.toLowerCase();
  const allIngredients = recipe.ingredients.join(" ").toLowerCase();

  // High-sodium ingredient indicators
  const highSodiumKeywords = [
    "soy-sauce", "soy sauce", "bacon", "ham", "prosciutto", "salami",
    "parmesan", "feta", "cheddar", "cheese", "olives", "capers",
    "pickled", "miso", "anchovy", "worcestershire", "bouillon",
    "broth", "stock", "canned", "tortilla-chips", "salted",
  ];

  const moderateSodiumKeywords = [
    "baking-soda", "baking-powder", "buttermilk", "salt",
    "bread", "tortilla", "cracker",
  ];

  const highCount = highSodiumKeywords.filter(k => allIngredients.includes(k) || title.includes(k)).length;
  const modCount = moderateSodiumKeywords.filter(k => allIngredients.includes(k) || title.includes(k)).length;

  // Base estimates by meal type
  const baseByMealType: Record<string, number> = {
    breakfast: 350,
    lunch: 500,
    dinner: 550,
    sides: 300,
    dessert: 120, // Desserts are naturally low-sodium
  };

  let estimate = baseByMealType[recipe.mealType] ?? 400;

  // Adjust based on ingredient signals
  estimate += highCount * 150;
  estimate += modCount * 50;

  // Dessert-specific: chocolate/fruit-only desserts are very low
  if (recipe.mealType === "dessert") {
    const lowSodiumDessertKeywords = ["chocolate", "fruit", "berry", "sorbet", "mousse", "panna cotta", "pudding", "ice cream", "gelato", "meringue"];
    if (lowSodiumDessertKeywords.some(k => title.includes(k)) && highCount === 0) {
      estimate = Math.min(estimate, 80);
    }
    // Frosting/icing items are very low sodium
    if (title.includes("frosting") || title.includes("icing") || title.includes("ganache") || title.includes("buttercream")) {
      estimate = Math.min(estimate, 50);
    }
  }

  return estimate;
}
