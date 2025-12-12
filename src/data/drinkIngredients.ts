export interface DrinkIngredientCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  ingredients: DrinkIngredient[];
}

export interface DrinkIngredient {
  id: string;
  name: string;
}

export const drinkIngredientCategories: DrinkIngredientCategory[] = [
  {
    id: "spirits",
    name: "Spirits",
    icon: "wine",
    color: "amber",
    ingredients: [
      { id: "vodka", name: "Vodka" },
      { id: "gin", name: "Gin" },
      { id: "rum-white", name: "White Rum" },
      { id: "rum-dark", name: "Dark Rum" },
      { id: "tequila", name: "Tequila" },
      { id: "whiskey", name: "Whiskey" },
      { id: "bourbon", name: "Bourbon" },
      { id: "scotch", name: "Scotch" },
      { id: "brandy", name: "Brandy" },
      { id: "triple-sec", name: "Triple Sec" },
      { id: "kahlua", name: "Kahlúa" },
      { id: "baileys", name: "Baileys" },
      { id: "amaretto", name: "Amaretto" },
      { id: "campari", name: "Campari" },
      { id: "vermouth-sweet", name: "Sweet Vermouth" },
      { id: "vermouth-dry", name: "Dry Vermouth" },
    ],
  },
  {
    id: "mixers",
    name: "Mixers",
    icon: "cup-soda",
    color: "sky",
    ingredients: [
      { id: "club-soda", name: "Club Soda" },
      { id: "tonic-water", name: "Tonic Water" },
      { id: "ginger-beer", name: "Ginger Beer" },
      { id: "ginger-ale", name: "Ginger Ale" },
      { id: "cola", name: "Cola" },
      { id: "lemon-lime-soda", name: "Lemon-Lime Soda" },
      { id: "cranberry-juice", name: "Cranberry Juice" },
      { id: "orange-juice", name: "Orange Juice" },
      { id: "pineapple-juice", name: "Pineapple Juice" },
      { id: "grapefruit-juice", name: "Grapefruit Juice" },
      { id: "tomato-juice", name: "Tomato Juice" },
      { id: "apple-juice", name: "Apple Juice" },
      { id: "coconut-cream", name: "Coconut Cream" },
      { id: "coconut-water", name: "Coconut Water" },
      { id: "cream", name: "Heavy Cream" },
      { id: "milk", name: "Milk" },
      { id: "coffee", name: "Coffee" },
      { id: "espresso", name: "Espresso" },
    ],
  },
  {
    id: "citrus",
    name: "Citrus & Fruits",
    icon: "citrus",
    color: "yellow",
    ingredients: [
      { id: "lemon", name: "Lemon" },
      { id: "lime", name: "Lime" },
      { id: "orange", name: "Orange" },
      { id: "grapefruit", name: "Grapefruit" },
      { id: "strawberries", name: "Strawberries" },
      { id: "raspberries", name: "Raspberries" },
      { id: "blueberries", name: "Blueberries" },
      { id: "mango", name: "Mango" },
      { id: "pineapple", name: "Pineapple" },
      { id: "watermelon", name: "Watermelon" },
      { id: "peach", name: "Peach" },
      { id: "banana", name: "Banana" },
      { id: "passion-fruit", name: "Passion Fruit" },
      { id: "pomegranate", name: "Pomegranate" },
    ],
  },
  {
    id: "syrups",
    name: "Syrups & Sweeteners",
    icon: "droplet",
    color: "rose",
    ingredients: [
      { id: "simple-syrup", name: "Simple Syrup" },
      { id: "grenadine", name: "Grenadine" },
      { id: "agave", name: "Agave Nectar" },
      { id: "honey", name: "Honey" },
      { id: "maple-syrup", name: "Maple Syrup" },
      { id: "orgeat", name: "Orgeat Syrup" },
      { id: "elderflower", name: "Elderflower Syrup" },
      { id: "lavender-syrup", name: "Lavender Syrup" },
      { id: "vanilla-syrup", name: "Vanilla Syrup" },
      { id: "ginger-syrup", name: "Ginger Syrup" },
    ],
  },
  {
    id: "garnishes",
    name: "Garnishes & Extras",
    icon: "leaf",
    color: "emerald",
    ingredients: [
      { id: "mint", name: "Fresh Mint" },
      { id: "basil", name: "Fresh Basil" },
      { id: "rosemary", name: "Rosemary" },
      { id: "thyme", name: "Thyme" },
      { id: "cucumber", name: "Cucumber" },
      { id: "celery", name: "Celery" },
      { id: "olives", name: "Olives" },
      { id: "cherries", name: "Maraschino Cherries" },
      { id: "angostura", name: "Angostura Bitters" },
      { id: "orange-bitters", name: "Orange Bitters" },
      { id: "egg-white", name: "Egg White" },
      { id: "salt", name: "Salt" },
      { id: "sugar", name: "Sugar" },
      { id: "cinnamon", name: "Cinnamon" },
      { id: "nutmeg", name: "Nutmeg" },
      { id: "chocolate", name: "Chocolate" },
    ],
  },
];

export const allDrinkIngredients = drinkIngredientCategories.flatMap(
  (category) => category.ingredients
);
