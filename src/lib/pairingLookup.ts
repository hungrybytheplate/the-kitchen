import { sampleRecipes, type Recipe } from "@/data/recipes";
import { sampleDrinks, type Drink } from "@/data/drinks";

function normalizeTitle(str: string): string {
  return str.replace(/[^a-z0-9]/gi, "").toLowerCase();
}

export type PairingMatch =
  | { type: "recipe"; data: Recipe }
  | { type: "drink"; data: Drink };

const recipeTitleMap = new Map<string, Recipe>();
sampleRecipes.forEach((r) => {
  recipeTitleMap.set(normalizeTitle(r.title), r);
});

const drinkTitleMap = new Map<string, Drink>();
sampleDrinks.forEach((d) => {
  drinkTitleMap.set(normalizeTitle(d.title), d);
});

export function findPairingByName(name: string): PairingMatch | null {
  const normalized = normalizeTitle(name);

  // Exact recipe match
  if (recipeTitleMap.has(normalized)) {
    return { type: "recipe", data: recipeTitleMap.get(normalized)! };
  }

  // Exact drink match
  if (drinkTitleMap.has(normalized)) {
    return { type: "drink", data: drinkTitleMap.get(normalized)! };
  }

  // Partial recipe match
  for (const [key, recipe] of recipeTitleMap) {
    if (key.includes(normalized) || normalized.includes(key)) {
      return { type: "recipe", data: recipe };
    }
  }

  // Partial drink match
  for (const [key, drink] of drinkTitleMap) {
    if (key.includes(normalized) || normalized.includes(key)) {
      return { type: "drink", data: drink };
    }
  }

  return null;
}
