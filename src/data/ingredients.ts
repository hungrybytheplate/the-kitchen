export interface Ingredient {
  id: string;
  name: string;
  emoji: string;
}

export interface IngredientCategory {
  id: string;
  name: string;
  items: Ingredient[];
}

export const pantryItems: IngredientCategory[] = [
  {
    id: "grains",
    name: "Grains & Pasta",
    items: [
      { id: "rice", name: "Rice", emoji: "🍚" },
      { id: "pasta", name: "Pasta", emoji: "🍝" },
      { id: "bread", name: "Bread", emoji: "🍞" },
      { id: "oats", name: "Oats", emoji: "🥣" },
      { id: "flour", name: "Flour", emoji: "🌾" },
      { id: "quinoa", name: "Quinoa", emoji: "🌾" },
      { id: "couscous", name: "Couscous", emoji: "🌾" },
      { id: "crackers", name: "Crackers", emoji: "🥠" },
    ],
  },
  {
    id: "canned",
    name: "Canned & Jarred",
    items: [
      { id: "beans", name: "Beans", emoji: "🫘" },
      { id: "tomatoes", name: "Canned Tomatoes", emoji: "🥫" },
      { id: "chickpeas", name: "Chickpeas", emoji: "🫘" },
      { id: "tuna", name: "Canned Tuna", emoji: "🐟" },
      { id: "coconut-milk", name: "Coconut Milk", emoji: "🥥" },
      { id: "olives", name: "Olives", emoji: "🫒" },
      { id: "pickles", name: "Pickles", emoji: "🥒" },
    ],
  },
  {
    id: "oils",
    name: "Oils & Vinegars",
    items: [
      { id: "olive-oil", name: "Olive Oil", emoji: "🫒" },
      { id: "vegetable-oil", name: "Vegetable Oil", emoji: "🛢️" },
      { id: "balsamic", name: "Balsamic Vinegar", emoji: "🍶" },
      { id: "soy-sauce", name: "Soy Sauce", emoji: "🥢" },
      { id: "honey", name: "Honey", emoji: "🍯" },
      { id: "maple-syrup", name: "Maple Syrup", emoji: "🍁" },
    ],
  },
  {
    id: "baking",
    name: "Baking",
    items: [
      { id: "sugar", name: "Sugar", emoji: "🍬" },
      { id: "brown-sugar", name: "Brown Sugar", emoji: "🍬" },
      { id: "baking-powder", name: "Baking Powder", emoji: "🧂" },
      { id: "vanilla", name: "Vanilla Extract", emoji: "🌿" },
      { id: "chocolate-chips", name: "Chocolate Chips", emoji: "🍫" },
      { id: "cocoa", name: "Cocoa Powder", emoji: "🍫" },
    ],
  },
];

export const fridgeItems: IngredientCategory[] = [
  {
    id: "proteins",
    name: "Proteins",
    items: [
      { id: "chicken", name: "Chicken", emoji: "🍗" },
      { id: "beef", name: "Beef", emoji: "🥩" },
      { id: "pork", name: "Pork", emoji: "🥓" },
      { id: "fish", name: "Fish", emoji: "🐟" },
      { id: "shrimp", name: "Shrimp", emoji: "🦐" },
      { id: "tofu", name: "Tofu", emoji: "🧈" },
      { id: "eggs", name: "Eggs", emoji: "🥚" },
    ],
  },
  {
    id: "dairy",
    name: "Dairy",
    items: [
      { id: "milk", name: "Milk", emoji: "🥛" },
      { id: "butter", name: "Butter", emoji: "🧈" },
      { id: "cheese", name: "Cheese", emoji: "🧀" },
      { id: "yogurt", name: "Yogurt", emoji: "🥛" },
      { id: "cream", name: "Heavy Cream", emoji: "🥛" },
      { id: "sour-cream", name: "Sour Cream", emoji: "🥛" },
      { id: "cream-cheese", name: "Cream Cheese", emoji: "🧀" },
    ],
  },
  {
    id: "vegetables",
    name: "Vegetables",
    items: [
      { id: "onion", name: "Onion", emoji: "🧅" },
      { id: "garlic", name: "Garlic", emoji: "🧄" },
      { id: "tomato", name: "Tomato", emoji: "🍅" },
      { id: "lettuce", name: "Lettuce", emoji: "🥬" },
      { id: "spinach", name: "Spinach", emoji: "🥬" },
      { id: "carrot", name: "Carrot", emoji: "🥕" },
      { id: "bell-pepper", name: "Bell Pepper", emoji: "🫑" },
      { id: "broccoli", name: "Broccoli", emoji: "🥦" },
      { id: "zucchini", name: "Zucchini", emoji: "🥒" },
      { id: "mushroom", name: "Mushrooms", emoji: "🍄" },
      { id: "celery", name: "Celery", emoji: "🥬" },
      { id: "cucumber", name: "Cucumber", emoji: "🥒" },
    ],
  },
  {
    id: "fruits",
    name: "Fruits",
    items: [
      { id: "lemon", name: "Lemon", emoji: "🍋" },
      { id: "lime", name: "Lime", emoji: "🍈" },
      { id: "apple", name: "Apple", emoji: "🍎" },
      { id: "banana", name: "Banana", emoji: "🍌" },
      { id: "berries", name: "Berries", emoji: "🍓" },
      { id: "avocado", name: "Avocado", emoji: "🥑" },
      { id: "orange", name: "Orange", emoji: "🍊" },
    ],
  },
];

export const spiceItems: IngredientCategory[] = [
  {
    id: "dried-herbs",
    name: "Dried Herbs",
    items: [
      { id: "basil", name: "Basil", emoji: "🌿" },
      { id: "oregano", name: "Oregano", emoji: "🌿" },
      { id: "thyme", name: "Thyme", emoji: "🌿" },
      { id: "rosemary", name: "Rosemary", emoji: "🌿" },
      { id: "parsley", name: "Parsley", emoji: "🌿" },
      { id: "bay-leaves", name: "Bay Leaves", emoji: "🍃" },
      { id: "cilantro", name: "Cilantro", emoji: "🌿" },
    ],
  },
  {
    id: "spices",
    name: "Spices",
    items: [
      { id: "salt", name: "Salt", emoji: "🧂" },
      { id: "pepper", name: "Black Pepper", emoji: "🌶️" },
      { id: "paprika", name: "Paprika", emoji: "🌶️" },
      { id: "cumin", name: "Cumin", emoji: "🌰" },
      { id: "cinnamon", name: "Cinnamon", emoji: "🌰" },
      { id: "nutmeg", name: "Nutmeg", emoji: "🌰" },
      { id: "ginger", name: "Ground Ginger", emoji: "🫚" },
      { id: "turmeric", name: "Turmeric", emoji: "🌰" },
      { id: "chili-powder", name: "Chili Powder", emoji: "🌶️" },
      { id: "cayenne", name: "Cayenne", emoji: "🌶️" },
      { id: "curry-powder", name: "Curry Powder", emoji: "🍛" },
    ],
  },
  {
    id: "seasonings",
    name: "Seasonings & Blends",
    items: [
      { id: "italian-seasoning", name: "Italian Seasoning", emoji: "🇮🇹" },
      { id: "taco-seasoning", name: "Taco Seasoning", emoji: "🌮" },
      { id: "garlic-powder", name: "Garlic Powder", emoji: "🧄" },
      { id: "onion-powder", name: "Onion Powder", emoji: "🧅" },
      { id: "mustard", name: "Mustard", emoji: "🟡" },
      { id: "hot-sauce", name: "Hot Sauce", emoji: "🌶️" },
    ],
  },
];
