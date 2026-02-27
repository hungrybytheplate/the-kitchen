import type { SuggestedSide, Recipe } from "./recipes";
import { sampleDrinks } from "./drinks";

// Curated pairing pools by cuisine/style - all names must match existing recipe or drink titles (or aliases in pairingLookup)
const pairingPools: Record<string, SuggestedSide[]> = {
  italian: [
    { name: "Garlic Bread", description: "Warm garlic bread is a classic Italian pairing" },
    { name: "Classic Caesar Salad", description: "Crisp Caesar salad rounds out the meal" },
    { name: "Classic Tomato Bruschetta", description: "Fresh bruschetta for a bright appetizer" },
    { name: "Negroni", description: "Bitter Italian cocktail pairs beautifully" },
    { name: "Fettuccine Alfredo", description: "Creamy pasta for an Italian feast" },
    { name: "Antipasto Platter", description: "Italian appetizer board to start the meal" },
    { name: "Roasted Vegetables", description: "Mediterranean roasted vegetables on the side" },
  ],
  mexican: [
    { name: "Fresh Guacamole", description: "Creamy guacamole is essential for Mexican fare" },
    { name: "Rice & Beans", description: "Classic Mexican rice and beans on the side" },
    { name: "Mexican Street Corn Salad", description: "Sweet charred corn salad complements the meal" },
    { name: "Classic Margarita", description: "Lime and tequila are a natural Mexican pairing" },
    { name: "Seasoned Beef Tacos", description: "Tacos round out the Mexican spread" },
  ],
  asian: [
    { name: "Steamed Rice", description: "Fluffy rice to accompany the dish" },
    { name: "Crispy Egg Rolls", description: "Golden egg rolls on the side" },
    { name: "Asian Cucumber Salad", description: "Cool cucumber salad for contrast" },
    { name: "Asian Slaw", description: "Crunchy sesame-ginger slaw" },
    { name: "Moscow Mule", description: "Ginger beer pairs well with Asian flavors" },
    { name: "Soba Noodles", description: "Nutty buckwheat noodles on the side" },
  ],
  mediterranean: [
    { name: "Classic Hummus", description: "Creamy hummus with warm pita" },
    { name: "Mezze Platter", description: "Mediterranean sharing platter" },
    { name: "Basmati Rice", description: "Fragrant rice as a bed for the dish" },
    { name: "Roasted Vegetables", description: "Herb-roasted Mediterranean vegetables" },
    { name: "Classic Balsamic Vinaigrette", description: "Bright vinaigrette for a side salad" },
    { name: "Tom Collins", description: "Citrusy gin cocktail for a refreshing pairing" },
    { name: "Crudité Platter", description: "Fresh vegetables with dip" },
  ],
  indian: [
    { name: "Basmati Rice", description: "Fragrant basmati rice for the curry" },
    { name: "Classic Hummus", description: "Creamy hummus as a starter" },
    { name: "Mango Lassi", description: "Traditional Indian yogurt drink to cool the palate" },
    { name: "Roasted Vegetables", description: "Spiced roasted vegetables on the side" },
  ],
  comfort: [
    { name: "Creamy Mashed Potatoes", description: "Buttery mashed potatoes for comfort" },
    { name: "Honey Butter Cornbread", description: "Sweet cornbread alongside the meal" },
    { name: "Classic Creamy Coleslaw", description: "Creamy slaw for a homestyle touch" },
    { name: "Garlic Bread", description: "Warm garlic bread on the side" },
    { name: "Roasted Vegetables", description: "Simple roasted vegetables" },
    { name: "Old Fashioned", description: "Classic whiskey cocktail for a cozy evening" },
    { name: "Classic Balsamic Vinaigrette", description: "Light side salad with balsamic" },
  ],
  american: [
    { name: "French Fries", description: "Classic fries alongside the meal" },
    { name: "Classic Creamy Coleslaw", description: "Creamy coleslaw on the side" },
    { name: "Creamy Mashed Potatoes", description: "Buttery mashed potatoes" },
    { name: "Classic American Potato Salad", description: "Picnic-style potato salad" },
    { name: "Garlic Bread", description: "Warm garlic bread" },
    { name: "Old Fashioned", description: "Timeless whiskey cocktail" },
  ],
  french: [
    { name: "Crusty Bread", description: "Warm French bread" },
    { name: "Roasted Vegetables", description: "Elegant roasted vegetables" },
    { name: "Classic Caesar Salad", description: "Crisp salad to start" },
    { name: "Classic Balsamic Vinaigrette", description: "Bright vinaigrette for greens" },
    { name: "Cosmopolitan", description: "Sophisticated cocktail pairing" },
  ],
  "middle-eastern": [
    { name: "Classic Hummus", description: "Essential hummus with warm pita" },
    { name: "Mezze Platter", description: "Traditional Middle Eastern appetizer spread" },
    { name: "Basmati Rice", description: "Fragrant rice alongside" },
    { name: "Crudité Platter", description: "Fresh vegetables with dip" },
    { name: "Classic Balsamic Vinaigrette", description: "Light salad dressing" },
  ],
  healthy: [
    { name: "Roasted Vegetables", description: "Light roasted vegetables" },
    { name: "Grain Bowls", description: "Nutritious grain bowl on the side" },
    { name: "Classic Balsamic Vinaigrette", description: "Healthy dressing for a side salad" },
    { name: "Crudité Platter", description: "Raw veggie platter for a healthy side" },
    { name: "Berry Blast Smoothie", description: "Antioxidant-rich berry smoothie" },
  ],
};

// Meal-type specific pools for when cuisine isn't set
const mealTypePools: Record<string, SuggestedSide[]> = {
  breakfast: [
    { name: "Berry Blast Smoothie", description: "Fresh berry smoothie to start the day" },
    { name: "Greek Yogurt Parfait", description: "Creamy yogurt parfait with granola" },
    { name: "Fluffy Scrambled Eggs on Toast", description: "Simple eggs on the side" },
    { name: "Warm Oatmeal with Fresh Berries", description: "Hearty oatmeal alongside" },
    { name: "Classic Café Latte", description: "Hot coffee to complement breakfast" },
    { name: "Avocado Toast with Egg", description: "Avocado toast for extra protein" },
  ],
  lunch: [
    { name: "Classic Caesar Salad", description: "Crisp Caesar salad alongside" },
    { name: "Hearty Lentil Soup", description: "Warm soup rounds out lunch" },
    { name: "Classic Balsamic Vinaigrette", description: "Dress a side salad" },
    { name: "French Fries", description: "Classic fries on the side" },
    { name: "Crudité Platter", description: "Fresh vegetables with dip" },
    { name: "Classic Café Latte", description: "Coffee to finish the meal" },
  ],
  dinner: [
    { name: "Roasted Vegetables", description: "Seasonal roasted vegetables" },
    { name: "Creamy Mashed Potatoes", description: "Buttery mashed potatoes" },
    { name: "Garlic Bread", description: "Warm garlic bread" },
    { name: "Classic Caesar Salad", description: "Crisp salad to start dinner" },
    { name: "Classic Balsamic Vinaigrette", description: "Side salad with balsamic" },
    { name: "Old Fashioned", description: "Classic cocktail for dinner" },
  ],
  dessert: [
    { name: "Classic Café Latte", description: "Hot coffee alongside dessert" },
    { name: "Greek Yogurt Parfait", description: "Light yogurt as a lighter option" },
    { name: "Berry Blast Smoothie", description: "Fresh berries complement the sweetness" },
    { name: "Espresso Martini", description: "Coffee cocktail to pair with dessert" },
  ],
  sides: [
    { name: "Crudité Platter", description: "Fresh vegetables as an extra side" },
    { name: "Classic Balsamic Vinaigrette", description: "Dress a simple green salad" },
    { name: "Crusty Bread", description: "Warm bread to round things out" },
  ],
};

// Ingredient-based pairing hints
function getIngredientPairings(recipe: Recipe): SuggestedSide[] {
  const ings = recipe.ingredients.join(" ").toLowerCase();
  const title = recipe.title.toLowerCase();
  const extras: SuggestedSide[] = [];

  if (ings.includes("shrimp") || ings.includes("salmon") || ings.includes("fish") || ings.includes("cod") || ings.includes("tuna")) {
    extras.push({ name: "Roasted Vegetables", description: "Light vegetables alongside the seafood" });
  }
  if (ings.includes("beef") || ings.includes("steak") || title.includes("burger")) {
    extras.push({ name: "French Fries", description: "Classic fries with beef" });
    extras.push({ name: "Crispy Smashed Potatoes", description: "Crispy potatoes on the side" });
  }
  if (ings.includes("chicken") && !title.includes("salad")) {
    extras.push({ name: "Creamy Mashed Potatoes", description: "Buttery mashed potatoes with chicken" });
  }
  if (ings.includes("pork") || title.includes("pork")) {
    extras.push({ name: "Applesauce", description: "Classic applesauce alongside pork" });
    extras.push({ name: "Classic Creamy Coleslaw", description: "Creamy slaw with pork" });
  }
  if (ings.includes("tortilla") || title.includes("taco") || title.includes("burrito")) {
    extras.push({ name: "Fresh Guacamole", description: "Creamy guac is essential" });
  }
  if (title.includes("soup") || title.includes("chili") || title.includes("stew")) {
    extras.push({ name: "Crusty Bread", description: "Warm crusty bread for dipping" });
    extras.push({ name: "Honey Butter Cornbread", description: "Sweet cornbread alongside" });
  }
  if (title.includes("curry") || ings.includes("coconut")) {
    extras.push({ name: "Basmati Rice", description: "Fragrant rice to soak up the sauce" });
  }
  if (title.includes("pizza")) {
    extras.push({ name: "Classic Caesar Salad", description: "Caesar salad with pizza night" });
    extras.push({ name: "Garlic Bread", description: "Extra garlic bread for the feast" });
  }
  if (title.includes("bbq") || title.includes("grilled")) {
    extras.push({ name: "Classic Creamy Coleslaw", description: "Creamy slaw for BBQ" });
    extras.push({ name: "Honey Butter Cornbread", description: "Sweet cornbread for the cookout" });
  }

  return extras;
}

// Deterministic hash for consistent pairing selection
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

export function generatePairings(recipe: Recipe): SuggestedSide[] {
  // Already has pairings
  if (recipe.suggestedSides && recipe.suggestedSides.length > 0) {
    return recipe.suggestedSides;
  }

  const cuisine = recipe.cuisine || "";
  const mealType = recipe.mealType;
  const hash = simpleHash(recipe.id);

  // Gather candidate pairings from cuisine, meal type, and ingredients
  const cuisinePool = pairingPools[cuisine] || [];
  const mealPool = mealTypePools[mealType] || [];
  const ingredientPairings = getIngredientPairings(recipe);

  // Combine all candidates, prioritize: cuisine > ingredients > meal type
  const allCandidates = [...cuisinePool, ...ingredientPairings, ...mealPool];

  // Deduplicate by name
  const seen = new Set<string>();
  // Also filter out self-references
  const titleLower = recipe.title.toLowerCase();
  const unique = allCandidates.filter(p => {
    const key = p.name.toLowerCase();
    if (seen.has(key) || key === titleLower) return false;
    seen.add(key);
    return true;
  });

  // Select 3-4 pairings deterministically based on recipe id hash
  const count = 3 + (hash % 2); // 3 or 4
  const selected: SuggestedSide[] = [];
  
  if (unique.length <= count) {
    return unique.slice(0, Math.max(3, unique.length));
  }

  // Spread selection across the pool using hash
  for (let i = 0; i < count && i < unique.length; i++) {
    const idx = (hash + i * 7) % unique.length;
    if (!selected.find(s => s.name === unique[idx].name)) {
      selected.push(unique[idx]);
    }
  }

  // Fill if we didn't get enough due to collisions
  for (const p of unique) {
    if (selected.length >= count) break;
    if (!selected.find(s => s.name === p.name)) {
      selected.push(p);
    }
  }

  return selected;
}
