export interface Recipe {
  id: string;
  title: string;
  mealType: "breakfast" | "lunch" | "dinner";
  description: string;
  cookTime: string;
  servings: number;
  ingredients: string[];
  instructions: string[];
  matchedIngredients: string[];
}

export const sampleRecipes: Recipe[] = [
  // Breakfast
  {
    id: "scrambled-eggs-toast",
    title: "Fluffy Scrambled Eggs on Toast",
    mealType: "breakfast",
    description: "Creamy scrambled eggs with herbs served on crispy toast",
    cookTime: "10 min",
    servings: 2,
    ingredients: ["eggs", "butter", "bread", "salt", "pepper", "parsley"],
    instructions: [
      "Whisk eggs with salt and pepper",
      "Melt butter in a pan over low heat",
      "Add eggs and stir gently until fluffy",
      "Toast bread until golden",
      "Serve eggs on toast, garnish with parsley"
    ],
    matchedIngredients: ["eggs", "butter", "bread", "salt", "pepper"],
  },
  {
    id: "oatmeal-berries",
    title: "Warm Oatmeal with Fresh Berries",
    mealType: "breakfast",
    description: "Hearty oatmeal topped with fresh berries and honey",
    cookTime: "15 min",
    servings: 2,
    ingredients: ["oats", "milk", "berries", "honey", "cinnamon"],
    instructions: [
      "Bring milk to a simmer",
      "Add oats and cook for 5 minutes",
      "Stir in cinnamon",
      "Top with fresh berries and honey"
    ],
    matchedIngredients: ["oats", "milk", "honey"],
  },
  {
    id: "avocado-toast",
    title: "Avocado Toast with Egg",
    mealType: "breakfast",
    description: "Creamy avocado on toasted bread with a perfectly cooked egg",
    cookTime: "10 min",
    servings: 1,
    ingredients: ["bread", "avocado", "eggs", "salt", "pepper", "chili-powder"],
    instructions: [
      "Toast bread until golden",
      "Mash avocado with salt and pepper",
      "Fry or poach an egg",
      "Spread avocado on toast, top with egg",
      "Sprinkle with chili powder"
    ],
    matchedIngredients: ["bread", "avocado", "eggs"],
  },
  // Lunch
  {
    id: "chicken-salad",
    title: "Mediterranean Chicken Salad",
    mealType: "lunch",
    description: "Fresh salad with grilled chicken, olives, and feta",
    cookTime: "20 min",
    servings: 2,
    ingredients: ["chicken", "lettuce", "tomato", "cucumber", "olives", "cheese", "olive-oil", "lemon"],
    instructions: [
      "Season and grill chicken until cooked",
      "Chop lettuce, tomatoes, and cucumber",
      "Slice chicken and arrange on salad",
      "Add olives and crumbled cheese",
      "Drizzle with olive oil and lemon juice"
    ],
    matchedIngredients: ["chicken", "lettuce", "tomato", "olive-oil"],
  },
  {
    id: "pasta-primavera",
    title: "Garden Pasta Primavera",
    mealType: "lunch",
    description: "Light pasta tossed with fresh seasonal vegetables",
    cookTime: "25 min",
    servings: 4,
    ingredients: ["pasta", "bell-pepper", "zucchini", "tomato", "garlic", "olive-oil", "basil", "cheese"],
    instructions: [
      "Cook pasta according to package",
      "Sauté garlic in olive oil",
      "Add vegetables and cook until tender",
      "Toss pasta with vegetables",
      "Top with fresh basil and cheese"
    ],
    matchedIngredients: ["pasta", "bell-pepper", "garlic", "olive-oil"],
  },
  {
    id: "tuna-sandwich",
    title: "Classic Tuna Sandwich",
    mealType: "lunch",
    description: "Creamy tuna salad on toasted bread with fresh vegetables",
    cookTime: "10 min",
    servings: 2,
    ingredients: ["tuna", "bread", "lettuce", "tomato", "onion", "sour-cream", "mustard"],
    instructions: [
      "Drain tuna and mix with sour cream and mustard",
      "Add diced onion",
      "Toast bread slices",
      "Layer tuna, lettuce, and tomato",
      "Close sandwich and serve"
    ],
    matchedIngredients: ["tuna", "bread", "lettuce"],
  },
  // Dinner
  {
    id: "garlic-butter-chicken",
    title: "Garlic Butter Chicken",
    mealType: "dinner",
    description: "Juicy pan-seared chicken in a rich garlic butter sauce",
    cookTime: "30 min",
    servings: 4,
    ingredients: ["chicken", "butter", "garlic", "thyme", "lemon", "salt", "pepper"],
    instructions: [
      "Season chicken with salt, pepper, and thyme",
      "Sear chicken in butter until golden",
      "Add minced garlic and baste chicken",
      "Squeeze lemon over finished dish",
      "Let rest before serving"
    ],
    matchedIngredients: ["chicken", "butter", "garlic"],
  },
  {
    id: "beef-stir-fry",
    title: "Quick Beef Stir-Fry",
    mealType: "dinner",
    description: "Tender beef strips with colorful vegetables in savory sauce",
    cookTime: "20 min",
    servings: 4,
    ingredients: ["beef", "bell-pepper", "broccoli", "carrot", "soy-sauce", "garlic", "ginger", "vegetable-oil"],
    instructions: [
      "Slice beef into thin strips",
      "Stir-fry beef in hot oil until browned",
      "Add vegetables and garlic",
      "Pour in soy sauce and ginger",
      "Serve over rice"
    ],
    matchedIngredients: ["beef", "bell-pepper", "soy-sauce"],
  },
  {
    id: "creamy-tomato-pasta",
    title: "Creamy Tomato Pasta",
    mealType: "dinner",
    description: "Rich and creamy tomato sauce over perfectly cooked pasta",
    cookTime: "25 min",
    servings: 4,
    ingredients: ["pasta", "tomatoes", "cream", "garlic", "basil", "cheese", "olive-oil", "onion"],
    instructions: [
      "Cook pasta al dente",
      "Sauté garlic and onion in olive oil",
      "Add tomatoes and simmer",
      "Stir in cream and basil",
      "Toss with pasta and top with cheese"
    ],
    matchedIngredients: ["pasta", "tomatoes", "cream", "garlic"],
  },
  {
    id: "fish-tacos",
    title: "Crispy Fish Tacos",
    mealType: "dinner",
    description: "Seasoned fish with fresh slaw in warm tortillas",
    cookTime: "25 min",
    servings: 4,
    ingredients: ["fish", "flour", "lettuce", "tomato", "lime", "cumin", "chili-powder", "sour-cream"],
    instructions: [
      "Season fish with cumin and chili powder",
      "Coat in flour and pan-fry until crispy",
      "Shred lettuce and dice tomatoes",
      "Warm tortillas",
      "Assemble tacos with fish, slaw, and lime sour cream"
    ],
    matchedIngredients: ["fish", "lettuce", "lime"],
  },
];

// Key ingredients that MUST be present for certain recipes
const keyIngredients: Record<string, string[]> = {
  "avocado-toast": ["avocado"],
  "oatmeal-berries": ["oats"],
  "tuna-sandwich": ["tuna"],
  "fish-tacos": ["fish"],
  "beef-stir-fry": ["beef"],
  "garlic-butter-chicken": ["chicken"],
  "chicken-salad": ["chicken"],
};

export function getRecipesForIngredients(selectedIngredients: string[]): Recipe[] {
  if (selectedIngredients.length === 0) return [];
  
  return sampleRecipes
    .map(recipe => {
      const matchedIngredients = recipe.ingredients.filter(ing => 
        selectedIngredients.includes(ing)
      );
      
      // Check if recipe has key ingredients that must be present
      const requiredKeys = keyIngredients[recipe.id] || [];
      const hasAllKeyIngredients = requiredKeys.every(key => 
        selectedIngredients.includes(key)
      );
      
      return {
        ...recipe,
        matchedIngredients,
        matchScore: matchedIngredients.length / recipe.ingredients.length,
        hasAllKeyIngredients
      };
    })
    .filter(recipe => recipe.matchScore >= 0.4 && recipe.hasAllKeyIngredients) // At least 40% match AND has key ingredients
    .sort((a, b) => b.matchScore - a.matchScore);
}
