export interface IngredientVariant {
  id: string;
  name: string;
  emoji: string;
}

export interface IngredientWithVariants {
  category: string;
  defaultName: string;
  emoji: string;
  variants: IngredientVariant[];
}

export const ingredientVariants: Record<string, IngredientWithVariants> = {
  // Proteins
  chicken: {
    category: "Proteins",
    defaultName: "Chicken",
    emoji: "🍗",
    variants: [
      { id: "chicken-breast", name: "Chicken Breast", emoji: "🍗" },
      { id: "chicken-thighs", name: "Chicken Thighs", emoji: "🍗" },
      { id: "chicken-tenders", name: "Chicken Tenders", emoji: "🍗" },
      { id: "chicken-wings", name: "Chicken Wings", emoji: "🍗" },
      { id: "ground-chicken", name: "Ground Chicken", emoji: "🍗" },
      { id: "whole-chicken", name: "Whole Chicken", emoji: "🍗" },
      { id: "rotisserie-chicken", name: "Rotisserie Chicken", emoji: "🍗" },
    ],
  },
  beef: {
    category: "Proteins",
    defaultName: "Beef",
    emoji: "🥩",
    variants: [
      { id: "ground-beef", name: "Ground Beef", emoji: "🥩" },
      { id: "beef-steak", name: "Beef Steak", emoji: "🥩" },
      { id: "beef-sirloin", name: "Beef Sirloin", emoji: "🥩" },
      { id: "beef-ribeye", name: "Ribeye Steak", emoji: "🥩" },
      { id: "stew-beef", name: "Stew Beef", emoji: "🥩" },
      { id: "beef-roast", name: "Beef Roast", emoji: "🥩" },
    ],
  },
  pork: {
    category: "Proteins",
    defaultName: "Pork",
    emoji: "🥓",
    variants: [
      { id: "pork-chops", name: "Pork Chops", emoji: "🥓" },
      { id: "ground-pork", name: "Ground Pork", emoji: "🥓" },
      { id: "bacon", name: "Bacon", emoji: "🥓" },
      { id: "pork-tenderloin", name: "Pork Tenderloin", emoji: "🥓" },
      { id: "pork-shoulder", name: "Pork Shoulder", emoji: "🥓" },
      { id: "ham", name: "Ham", emoji: "🥓" },
    ],
  },
  fish: {
    category: "Proteins",
    defaultName: "Fish",
    emoji: "🐟",
    variants: [
      { id: "salmon-fillet", name: "Salmon Fillet", emoji: "🐟" },
      { id: "tilapia", name: "Tilapia", emoji: "🐟" },
      { id: "cod", name: "Cod", emoji: "🐟" },
      { id: "tuna-steak", name: "Tuna Steak", emoji: "🐟" },
      { id: "mahi-mahi", name: "Mahi Mahi", emoji: "🐟" },
      { id: "catfish", name: "Catfish", emoji: "🐟" },
    ],
  },
  shrimp: {
    category: "Proteins",
    defaultName: "Shrimp",
    emoji: "🦐",
    variants: [
      { id: "raw-shrimp", name: "Raw Shrimp", emoji: "🦐" },
      { id: "cooked-shrimp", name: "Cooked Shrimp", emoji: "🦐" },
      { id: "jumbo-shrimp", name: "Jumbo Shrimp", emoji: "🦐" },
    ],
  },
  // Dairy
  cheese: {
    category: "Dairy",
    defaultName: "Cheese",
    emoji: "🧀",
    variants: [
      { id: "cheddar-cheese", name: "Cheddar Cheese", emoji: "🧀" },
      { id: "mozzarella", name: "Mozzarella", emoji: "🧀" },
      { id: "parmesan", name: "Parmesan", emoji: "🧀" },
      { id: "feta-cheese", name: "Feta Cheese", emoji: "🧀" },
      { id: "swiss-cheese", name: "Swiss Cheese", emoji: "🧀" },
      { id: "gouda", name: "Gouda", emoji: "🧀" },
      { id: "blue-cheese", name: "Blue Cheese", emoji: "🧀" },
    ],
  },
  milk: {
    category: "Dairy",
    defaultName: "Milk",
    emoji: "🥛",
    variants: [
      { id: "whole-milk", name: "Whole Milk", emoji: "🥛" },
      { id: "2-percent-milk", name: "2% Milk", emoji: "🥛" },
      { id: "skim-milk", name: "Skim Milk", emoji: "🥛" },
      { id: "almond-milk", name: "Almond Milk", emoji: "🥛" },
      { id: "oat-milk", name: "Oat Milk", emoji: "🥛" },
    ],
  },
  cream: {
    category: "Dairy",
    defaultName: "Heavy Cream",
    emoji: "🥛",
    variants: [
      { id: "heavy-cream", name: "Heavy Cream", emoji: "🥛" },
      { id: "whipping-cream", name: "Whipping Cream", emoji: "🥛" },
      { id: "half-and-half", name: "Half and Half", emoji: "🥛" },
    ],
  },
  // Grains
  bread: {
    category: "Grains & Pasta",
    defaultName: "Bread",
    emoji: "🍞",
    variants: [
      { id: "white-bread", name: "White Bread", emoji: "🍞" },
      { id: "whole-wheat-bread", name: "Whole Wheat Bread", emoji: "🍞" },
      { id: "sourdough", name: "Sourdough Bread", emoji: "🍞" },
      { id: "baguette", name: "Baguette", emoji: "🥖" },
      { id: "ciabatta", name: "Ciabatta", emoji: "🍞" },
      { id: "brioche", name: "Brioche", emoji: "🍞" },
    ],
  },
  pasta: {
    category: "Grains & Pasta",
    defaultName: "Pasta",
    emoji: "🍝",
    variants: [
      { id: "spaghetti", name: "Spaghetti", emoji: "🍝" },
      { id: "penne", name: "Penne", emoji: "🍝" },
      { id: "fettuccine", name: "Fettuccine", emoji: "🍝" },
      { id: "rigatoni", name: "Rigatoni", emoji: "🍝" },
      { id: "linguine", name: "Linguine", emoji: "🍝" },
      { id: "macaroni", name: "Macaroni", emoji: "🍝" },
    ],
  },
  rice: {
    category: "Grains & Pasta",
    defaultName: "Rice",
    emoji: "🍚",
    variants: [
      { id: "white-rice", name: "White Rice", emoji: "🍚" },
      { id: "brown-rice", name: "Brown Rice", emoji: "🍚" },
      { id: "jasmine-rice", name: "Jasmine Rice", emoji: "🍚" },
      { id: "basmati-rice", name: "Basmati Rice", emoji: "🍚" },
      { id: "arborio-rice", name: "Arborio Rice", emoji: "🍚" },
    ],
  },
  // Vegetables
  tomato: {
    category: "Vegetables",
    defaultName: "Tomato",
    emoji: "🍅",
    variants: [
      { id: "roma-tomatoes", name: "Roma Tomatoes", emoji: "🍅" },
      { id: "cherry-tomatoes", name: "Cherry Tomatoes", emoji: "🍅" },
      { id: "beefsteak-tomatoes", name: "Beefsteak Tomatoes", emoji: "🍅" },
      { id: "grape-tomatoes", name: "Grape Tomatoes", emoji: "🍅" },
    ],
  },
  lettuce: {
    category: "Vegetables",
    defaultName: "Lettuce",
    emoji: "🥬",
    variants: [
      { id: "romaine-lettuce", name: "Romaine Lettuce", emoji: "🥬" },
      { id: "iceberg-lettuce", name: "Iceberg Lettuce", emoji: "🥬" },
      { id: "butter-lettuce", name: "Butter Lettuce", emoji: "🥬" },
      { id: "mixed-greens", name: "Mixed Greens", emoji: "🥬" },
    ],
  },
  onion: {
    category: "Vegetables",
    defaultName: "Onion",
    emoji: "🧅",
    variants: [
      { id: "yellow-onion", name: "Yellow Onion", emoji: "🧅" },
      { id: "red-onion", name: "Red Onion", emoji: "🧅" },
      { id: "white-onion", name: "White Onion", emoji: "🧅" },
      { id: "green-onion", name: "Green Onion", emoji: "🧅" },
      { id: "shallots", name: "Shallots", emoji: "🧅" },
    ],
  },
  // Fruits
  berries: {
    category: "Fruits",
    defaultName: "Berries",
    emoji: "🍓",
    variants: [
      { id: "strawberries", name: "Strawberries", emoji: "🍓" },
      { id: "blueberries", name: "Blueberries", emoji: "🫐" },
      { id: "raspberries", name: "Raspberries", emoji: "🍇" },
      { id: "blackberries", name: "Blackberries", emoji: "🫐" },
      { id: "mixed-berries", name: "Mixed Berries", emoji: "🍓" },
    ],
  },
  // Canned goods
  tuna: {
    category: "Canned & Jarred",
    defaultName: "Canned Tuna",
    emoji: "🐟",
    variants: [
      { id: "chunk-light-tuna", name: "Chunk Light Tuna", emoji: "🐟" },
      { id: "solid-white-tuna", name: "Solid White Albacore", emoji: "🐟" },
      { id: "tuna-in-oil", name: "Tuna in Oil", emoji: "🐟" },
      { id: "tuna-in-water", name: "Tuna in Water", emoji: "🐟" },
    ],
  },
  tomatoes: {
    category: "Canned & Jarred",
    defaultName: "Canned Tomatoes",
    emoji: "🥫",
    variants: [
      { id: "diced-tomatoes", name: "Diced Tomatoes", emoji: "🥫" },
      { id: "crushed-tomatoes", name: "Crushed Tomatoes", emoji: "🥫" },
      { id: "tomato-paste", name: "Tomato Paste", emoji: "🥫" },
      { id: "tomato-sauce", name: "Tomato Sauce", emoji: "🥫" },
      { id: "whole-peeled-tomatoes", name: "Whole Peeled Tomatoes", emoji: "🥫" },
    ],
  },
  beans: {
    category: "Canned & Jarred",
    defaultName: "Beans",
    emoji: "🫘",
    variants: [
      { id: "black-beans", name: "Black Beans", emoji: "🫘" },
      { id: "kidney-beans", name: "Kidney Beans", emoji: "🫘" },
      { id: "pinto-beans", name: "Pinto Beans", emoji: "🫘" },
      { id: "cannellini-beans", name: "Cannellini Beans", emoji: "🫘" },
    ],
  },
  // Default fallbacks for ingredients without specific variants
  eggs: {
    category: "Dairy",
    defaultName: "Eggs",
    emoji: "🥚",
    variants: [
      { id: "large-eggs", name: "Large Eggs", emoji: "🥚" },
      { id: "egg-whites", name: "Egg Whites", emoji: "🥚" },
    ],
  },
  butter: {
    category: "Dairy",
    defaultName: "Butter",
    emoji: "🧈",
    variants: [
      { id: "salted-butter", name: "Salted Butter", emoji: "🧈" },
      { id: "unsalted-butter", name: "Unsalted Butter", emoji: "🧈" },
    ],
  },
  avocado: {
    category: "Fruits",
    defaultName: "Avocado",
    emoji: "🥑",
    variants: [
      { id: "hass-avocado", name: "Hass Avocado", emoji: "🥑" },
    ],
  },
  oats: {
    category: "Grains & Pasta",
    defaultName: "Oats",
    emoji: "🥣",
    variants: [
      { id: "rolled-oats", name: "Rolled Oats", emoji: "🥣" },
      { id: "steel-cut-oats", name: "Steel Cut Oats", emoji: "🥣" },
      { id: "instant-oats", name: "Instant Oats", emoji: "🥣" },
    ],
  },
  flour: {
    category: "Baking",
    defaultName: "Flour",
    emoji: "🌾",
    variants: [
      { id: "all-purpose-flour", name: "All-Purpose Flour", emoji: "🌾" },
      { id: "bread-flour", name: "Bread Flour", emoji: "🌾" },
      { id: "whole-wheat-flour", name: "Whole Wheat Flour", emoji: "🌾" },
    ],
  },
};

// Helper to get display name for an ingredient
export function getIngredientDisplayName(ingredientId: string): string {
  const variant = ingredientVariants[ingredientId];
  if (variant) {
    return variant.defaultName;
  }
  // Fallback: capitalize and replace hyphens
  return ingredientId.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

// Helper to get category for an ingredient
export function getIngredientCategory(ingredientId: string): string {
  return ingredientVariants[ingredientId]?.category || "Other";
}
