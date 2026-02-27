import { sampleRecipes, type Recipe } from "@/data/recipes";
import { sampleDrinks, type Drink } from "@/data/drinks";

function normalizeTitle(str: string): string {
  return str.replace(/[^a-z0-9]/gi, "").toLowerCase();
}

export type PairingMatch =
  | { type: "recipe"; data: Recipe }
  | { type: "drink"; data: Drink };

// Alias map: maps variant pairing names to canonical recipe/drink titles
const pairingAliases: Record<string, string> = {
  "Celery Sticks": "Crudité Platter",
  "Celery & Carrots": "Crudité Platter",
  "Veggie Sticks": "Crudité Platter",
  "Veggie Crudités": "Crudité Platter",
  "Veggie Platter": "Crudité Platter",
  "Mediterranean Veggie Platter": "Crudité Platter",
  "Roasted Vegetable Platter": "Roasted Vegetables",
  "Steamed White Rice": "Steamed Rice",
  "Fresh-Cut Fries": "French Fries",
  "Crispy Potato Chips": "Potato Chips",
  "Rice Bowls": "Grain Bowls",
  "Mediterranean Grain Bowls": "Grain Bowls",
  "Rice Noodles": "Soba Noodles",
  "Grilled Lamb": "Grilled Lamb Chops",
  "Grilled Meats": "Grilled Lamb Chops",
  "Ham Sandwich": "Ham & Cheese Sandwich",
  "Bread Bowl": "Crusty Bread",
  "Salad Greens": "Classic Caesar Salad",
  "Sandwich Spread": "Classic Hummus",
  "Garden Side Salad": "Classic Caesar Salad",
  "Shawarma": "Grilled Chicken Shawarma",
  "Sweet Potatoes": "Roasted Sweet Potatoes",
  "Stir-Fry Vegetables": "Grilled Vegetables",
  "Breakfast Eggs": "Fluffy Scrambled Eggs on Toast",
  "Fresh Fruit Parfait": "Greek Yogurt Parfait",
  "Fruit Cup": "Greek Yogurt Parfait",
  "Apple Slices": "Applesauce",
  "Chicken Strips": "Chicken Satay",
  "Salmon Fillets": "Smoked Salmon",
};

const recipeTitleMap = new Map<string, Recipe>();
sampleRecipes.forEach((r) => {
  recipeTitleMap.set(normalizeTitle(r.title), r);
});

const drinkTitleMap = new Map<string, Drink>();
sampleDrinks.forEach((d) => {
  drinkTitleMap.set(normalizeTitle(d.title), d);
});

export function findPairingByName(name: string): PairingMatch | null {
  const resolvedName = pairingAliases[name] || name;
  const normalized = normalizeTitle(resolvedName);

  if (recipeTitleMap.has(normalized)) {
    return { type: "recipe", data: recipeTitleMap.get(normalized)! };
  }
  if (drinkTitleMap.has(normalized)) {
    return { type: "drink", data: drinkTitleMap.get(normalized)! };
  }
  for (const [key, recipe] of recipeTitleMap) {
    if (key.includes(normalized) || normalized.includes(key)) {
      return { type: "recipe", data: recipe };
    }
  }
  for (const [key, drink] of drinkTitleMap) {
    if (key.includes(normalized) || normalized.includes(key)) {
      return { type: "drink", data: drink };
    }
  }
  return null;
}
