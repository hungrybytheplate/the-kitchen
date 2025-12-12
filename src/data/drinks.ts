export interface Drink {
  id: string;
  title: string;
  drinkType: "cocktail" | "mocktail" | "smoothie";
  description: string;
  prepTime: string;
  ingredients: string[];
  instructions: string[];
  matchedIngredients: string[];
  keyIngredients?: string[];
  matchedKeyIngredients?: string[];
  glassType: string;
  garnish?: string;
  isAlcoholic: boolean;
}

export const sampleDrinks: Drink[] = [
  // ============ COCKTAILS ============
  {
    id: "mojito",
    title: "Classic Mojito",
    drinkType: "cocktail",
    description: "Refreshing Cuban cocktail with rum, mint, and lime",
    prepTime: "5 min",
    ingredients: ["rum-white", "lime", "mint", "simple-syrup", "club-soda"],
    instructions: [
      "Muddle mint leaves with simple syrup and lime juice in a glass",
      "Add white rum and stir well",
      "Fill with ice and top with club soda",
      "Garnish with fresh mint sprig and lime wheel"
    ],
    matchedIngredients: [],
    glassType: "Highball",
    garnish: "Mint sprig and lime",
    isAlcoholic: true,
  },
  {
    id: "margarita",
    title: "Classic Margarita",
    drinkType: "cocktail",
    description: "Tangy tequila cocktail with lime and triple sec",
    prepTime: "5 min",
    ingredients: ["tequila", "triple-sec", "lime", "simple-syrup", "salt"],
    instructions: [
      "Rim glass with salt",
      "Shake tequila, triple sec, lime juice, and simple syrup with ice",
      "Strain into glass over fresh ice",
      "Garnish with lime wheel"
    ],
    matchedIngredients: [],
    glassType: "Margarita glass",
    garnish: "Salt rim, lime wheel",
    isAlcoholic: true,
  },
  {
    id: "old-fashioned",
    title: "Old Fashioned",
    drinkType: "cocktail",
    description: "Timeless bourbon cocktail with bitters and orange",
    prepTime: "3 min",
    ingredients: ["bourbon", "angostura", "simple-syrup", "orange"],
    instructions: [
      "Add simple syrup and bitters to glass",
      "Add bourbon and stir",
      "Add large ice cube",
      "Express orange peel over drink and drop in"
    ],
    matchedIngredients: [],
    glassType: "Rocks glass",
    garnish: "Orange peel, cherry",
    isAlcoholic: true,
  },
  {
    id: "cosmopolitan",
    title: "Cosmopolitan",
    drinkType: "cocktail",
    description: "Elegant vodka cocktail with cranberry and lime",
    prepTime: "5 min",
    ingredients: ["vodka", "triple-sec", "cranberry-juice", "lime"],
    instructions: [
      "Shake all ingredients with ice",
      "Strain into chilled martini glass",
      "Garnish with lime wheel or orange twist"
    ],
    matchedIngredients: [],
    glassType: "Martini glass",
    garnish: "Lime wheel",
    isAlcoholic: true,
  },
  {
    id: "whiskey-sour",
    title: "Whiskey Sour",
    drinkType: "cocktail",
    description: "Classic sour cocktail with whiskey, lemon, and egg white",
    prepTime: "5 min",
    ingredients: ["whiskey", "lemon", "simple-syrup", "egg-white", "angostura"],
    instructions: [
      "Dry shake whiskey, lemon juice, simple syrup, and egg white",
      "Add ice and shake again until cold",
      "Strain into rocks glass with ice",
      "Add few drops of bitters on foam"
    ],
    matchedIngredients: [],
    glassType: "Rocks glass",
    garnish: "Angostura drops, cherry",
    isAlcoholic: true,
  },
  {
    id: "gin-tonic",
    title: "Gin & Tonic",
    drinkType: "cocktail",
    description: "Simple and refreshing gin cocktail with tonic water",
    prepTime: "2 min",
    ingredients: ["gin", "tonic-water", "lime", "cucumber"],
    instructions: [
      "Fill highball glass with ice",
      "Add gin and top with tonic water",
      "Gently stir",
      "Garnish with lime and cucumber"
    ],
    matchedIngredients: [],
    glassType: "Highball",
    garnish: "Lime wedge, cucumber",
    isAlcoholic: true,
  },
  {
    id: "moscow-mule",
    title: "Moscow Mule",
    drinkType: "cocktail",
    description: "Spicy vodka cocktail with ginger beer and lime",
    prepTime: "3 min",
    ingredients: ["vodka", "ginger-beer", "lime"],
    instructions: [
      "Fill copper mug with ice",
      "Add vodka and lime juice",
      "Top with ginger beer and stir gently",
      "Garnish with lime wheel"
    ],
    matchedIngredients: [],
    glassType: "Copper mug",
    garnish: "Lime wheel",
    isAlcoholic: true,
  },
  {
    id: "pina-colada",
    title: "Piña Colada",
    drinkType: "cocktail",
    description: "Tropical rum cocktail with pineapple and coconut",
    prepTime: "5 min",
    ingredients: ["rum-white", "coconut-cream", "pineapple-juice", "pineapple"],
    instructions: [
      "Blend rum, coconut cream, and pineapple juice with ice",
      "Pour into hurricane glass",
      "Garnish with pineapple wedge and cherry"
    ],
    matchedIngredients: [],
    glassType: "Hurricane glass",
    garnish: "Pineapple wedge, cherry",
    isAlcoholic: true,
  },
  {
    id: "negroni",
    title: "Negroni",
    drinkType: "cocktail",
    description: "Italian classic with gin, Campari, and vermouth",
    prepTime: "3 min",
    ingredients: ["gin", "campari", "vermouth-sweet", "orange"],
    instructions: [
      "Add gin, Campari, and sweet vermouth to mixing glass with ice",
      "Stir until well chilled",
      "Strain into rocks glass over fresh ice",
      "Garnish with orange peel"
    ],
    matchedIngredients: [],
    glassType: "Rocks glass",
    garnish: "Orange peel",
    isAlcoholic: true,
  },
  {
    id: "espresso-martini",
    title: "Espresso Martini",
    drinkType: "cocktail",
    description: "Coffee-lover's cocktail with vodka and Kahlúa",
    prepTime: "5 min",
    ingredients: ["vodka", "kahlua", "espresso", "simple-syrup"],
    instructions: [
      "Shake vodka, Kahlúa, espresso, and simple syrup with ice",
      "Strain into chilled martini glass",
      "Garnish with three coffee beans"
    ],
    matchedIngredients: [],
    glassType: "Martini glass",
    garnish: "Coffee beans",
    isAlcoholic: true,
  },
  {
    id: "daiquiri",
    title: "Classic Daiquiri",
    drinkType: "cocktail",
    description: "Simple and elegant rum cocktail with lime",
    prepTime: "3 min",
    ingredients: ["rum-white", "lime", "simple-syrup"],
    instructions: [
      "Shake rum, lime juice, and simple syrup with ice",
      "Strain into chilled coupe glass",
      "Garnish with lime wheel"
    ],
    matchedIngredients: [],
    glassType: "Coupe glass",
    garnish: "Lime wheel",
    isAlcoholic: true,
  },
  {
    id: "dark-and-stormy",
    title: "Dark 'n' Stormy",
    drinkType: "cocktail",
    description: "Bermuda classic with dark rum and ginger beer",
    prepTime: "3 min",
    ingredients: ["rum-dark", "ginger-beer", "lime"],
    instructions: [
      "Fill highball glass with ice",
      "Add lime juice and top with ginger beer",
      "Float dark rum on top",
      "Garnish with lime wedge"
    ],
    matchedIngredients: [],
    glassType: "Highball",
    garnish: "Lime wedge",
    isAlcoholic: true,
  },

  // ============ MOCKTAILS ============
  {
    id: "virgin-mojito",
    title: "Virgin Mojito",
    drinkType: "mocktail",
    description: "Refreshing mint and lime mocktail",
    prepTime: "5 min",
    ingredients: ["lime", "mint", "simple-syrup", "club-soda"],
    instructions: [
      "Muddle mint leaves with simple syrup and lime juice",
      "Fill glass with crushed ice",
      "Top with club soda and stir gently",
      "Garnish with mint and lime"
    ],
    matchedIngredients: [],
    glassType: "Highball",
    garnish: "Mint sprig, lime wheel",
    isAlcoholic: false,
  },
  {
    id: "shirley-temple",
    title: "Shirley Temple",
    drinkType: "mocktail",
    description: "Classic sweet mocktail with grenadine and ginger ale",
    prepTime: "2 min",
    ingredients: ["ginger-ale", "grenadine", "cherries", "orange"],
    instructions: [
      "Fill glass with ice",
      "Add ginger ale and grenadine",
      "Stir gently and garnish with cherries and orange"
    ],
    matchedIngredients: [],
    glassType: "Highball",
    garnish: "Cherry, orange slice",
    isAlcoholic: false,
  },
  {
    id: "cucumber-cooler",
    title: "Cucumber Cooler",
    drinkType: "mocktail",
    description: "Refreshing cucumber and mint cooler",
    prepTime: "5 min",
    ingredients: ["cucumber", "mint", "lime", "simple-syrup", "club-soda"],
    instructions: [
      "Muddle cucumber slices with mint and lime juice",
      "Add simple syrup and stir",
      "Fill with ice and top with club soda",
      "Garnish with cucumber ribbon"
    ],
    matchedIngredients: [],
    glassType: "Collins glass",
    garnish: "Cucumber ribbon",
    isAlcoholic: false,
  },
  {
    id: "virgin-pina-colada",
    title: "Virgin Piña Colada",
    drinkType: "mocktail",
    description: "Tropical coconut and pineapple smoothie mocktail",
    prepTime: "5 min",
    ingredients: ["coconut-cream", "pineapple-juice", "pineapple"],
    instructions: [
      "Blend coconut cream and pineapple juice with ice",
      "Pour into hurricane glass",
      "Garnish with pineapple wedge and cherry"
    ],
    matchedIngredients: [],
    glassType: "Hurricane glass",
    garnish: "Pineapple wedge",
    isAlcoholic: false,
  },
  {
    id: "strawberry-lemonade",
    title: "Strawberry Lemonade",
    drinkType: "mocktail",
    description: "Sweet strawberry and citrus refresher",
    prepTime: "5 min",
    ingredients: ["strawberries", "lemon", "simple-syrup", "club-soda"],
    instructions: [
      "Muddle fresh strawberries with simple syrup",
      "Add fresh lemon juice and stir",
      "Fill with ice and top with club soda",
      "Garnish with strawberry and lemon"
    ],
    matchedIngredients: [],
    glassType: "Mason jar",
    garnish: "Strawberry, lemon wheel",
    isAlcoholic: false,
  },
  {
    id: "passion-fruit-spritz",
    title: "Passion Fruit Spritz",
    drinkType: "mocktail",
    description: "Tropical and bubbly passion fruit refresher",
    prepTime: "3 min",
    ingredients: ["passion-fruit", "simple-syrup", "club-soda", "lime"],
    instructions: [
      "Scoop passion fruit pulp into glass",
      "Add simple syrup and lime juice",
      "Fill with ice and top with club soda",
      "Stir gently and serve"
    ],
    matchedIngredients: [],
    glassType: "Wine glass",
    garnish: "Passion fruit half",
    isAlcoholic: false,
  },
  {
    id: "ginger-mint-spritzer",
    title: "Ginger Mint Spritzer",
    drinkType: "mocktail",
    description: "Spicy ginger and cool mint combination",
    prepTime: "5 min",
    ingredients: ["ginger-beer", "mint", "lime", "honey"],
    instructions: [
      "Muddle mint leaves with lime juice and honey",
      "Fill glass with ice",
      "Top with ginger beer and stir gently",
      "Garnish with mint sprig"
    ],
    matchedIngredients: [],
    glassType: "Copper mug",
    garnish: "Mint sprig",
    isAlcoholic: false,
  },
  {
    id: "watermelon-basil-cooler",
    title: "Watermelon Basil Cooler",
    drinkType: "mocktail",
    description: "Fresh watermelon with aromatic basil",
    prepTime: "5 min",
    ingredients: ["watermelon", "basil", "lime", "simple-syrup", "club-soda"],
    instructions: [
      "Blend fresh watermelon until smooth",
      "Muddle basil with lime juice and simple syrup",
      "Add watermelon juice and stir",
      "Top with club soda and garnish"
    ],
    matchedIngredients: [],
    glassType: "Collins glass",
    garnish: "Basil leaf, watermelon cube",
    isAlcoholic: false,
  },

  // ============ SMOOTHIES ============
  {
    id: "berry-blast",
    title: "Berry Blast Smoothie",
    drinkType: "smoothie",
    description: "Mixed berry smoothie packed with antioxidants",
    prepTime: "5 min",
    ingredients: ["strawberries", "blueberries", "raspberries", "banana", "milk"],
    instructions: [
      "Add all berries and banana to blender",
      "Pour in milk",
      "Blend until smooth",
      "Pour into glass and serve immediately"
    ],
    matchedIngredients: [],
    glassType: "Tall glass",
    isAlcoholic: false,
  },
  {
    id: "tropical-paradise",
    title: "Tropical Paradise Smoothie",
    drinkType: "smoothie",
    description: "Pineapple, mango, and coconut tropical blend",
    prepTime: "5 min",
    ingredients: ["pineapple", "mango", "banana", "coconut-water"],
    instructions: [
      "Add pineapple, mango, and banana to blender",
      "Pour in coconut water",
      "Blend until smooth and creamy",
      "Pour and enjoy"
    ],
    matchedIngredients: [],
    glassType: "Tall glass",
    isAlcoholic: false,
  },
  {
    id: "green-machine",
    title: "Green Machine Smoothie",
    drinkType: "smoothie",
    description: "Healthy green smoothie with cucumber and citrus",
    prepTime: "5 min",
    ingredients: ["cucumber", "mint", "lime", "apple-juice", "honey"],
    instructions: [
      "Add cucumber and mint to blender",
      "Add lime juice, apple juice, and honey",
      "Blend until smooth",
      "Strain if desired and serve over ice"
    ],
    matchedIngredients: [],
    glassType: "Tall glass",
    isAlcoholic: false,
  },
  {
    id: "strawberry-banana",
    title: "Classic Strawberry Banana",
    drinkType: "smoothie",
    description: "Timeless strawberry and banana combination",
    prepTime: "3 min",
    ingredients: ["strawberries", "banana", "milk", "honey"],
    instructions: [
      "Add strawberries and banana to blender",
      "Pour in milk and add honey",
      "Blend until creamy smooth",
      "Serve immediately"
    ],
    matchedIngredients: [],
    glassType: "Tall glass",
    isAlcoholic: false,
  },
  {
    id: "mango-lassi",
    title: "Mango Lassi",
    drinkType: "smoothie",
    description: "Indian-style mango yogurt drink",
    prepTime: "5 min",
    ingredients: ["mango", "milk", "honey", "cardamom"],
    instructions: [
      "Add mango chunks to blender",
      "Add milk, honey, and pinch of cardamom",
      "Blend until smooth and frothy",
      "Serve chilled"
    ],
    matchedIngredients: [],
    glassType: "Tall glass",
    isAlcoholic: false,
  },
];

// Key ingredients for drinks
const keyDrinkIngredients: Record<string, string[]> = {
  "mojito": ["rum-white", "mint"],
  "margarita": ["tequila", "lime"],
  "old-fashioned": ["bourbon"],
  "cosmopolitan": ["vodka", "cranberry-juice"],
  "whiskey-sour": ["whiskey", "lemon"],
  "gin-tonic": ["gin", "tonic-water"],
  "moscow-mule": ["vodka", "ginger-beer"],
  "pina-colada": ["rum-white", "coconut-cream"],
  "negroni": ["gin", "campari"],
  "espresso-martini": ["vodka", "espresso"],
  "daiquiri": ["rum-white", "lime"],
  "dark-and-stormy": ["rum-dark", "ginger-beer"],
  "virgin-mojito": ["mint", "lime"],
  "shirley-temple": ["ginger-ale", "grenadine"],
  "cucumber-cooler": ["cucumber"],
  "virgin-pina-colada": ["coconut-cream", "pineapple-juice"],
  "strawberry-lemonade": ["strawberries", "lemon"],
  "passion-fruit-spritz": ["passion-fruit"],
  "ginger-mint-spritzer": ["ginger-beer", "mint"],
  "watermelon-basil-cooler": ["watermelon", "basil"],
  "berry-blast": ["strawberries", "blueberries"],
  "tropical-paradise": ["pineapple", "mango"],
  "green-machine": ["cucumber"],
  "strawberry-banana": ["strawberries", "banana"],
  "mango-lassi": ["mango"],
};

export function getDrinksForIngredients(selectedIngredients: string[]): Drink[] {
  if (selectedIngredients.length === 0) return [];

  return sampleDrinks
    .map((drink) => {
      const matchedIngredients = drink.ingredients.filter((ing) =>
        selectedIngredients.includes(ing)
      );

      const requiredKeys = keyDrinkIngredients[drink.id] || [];
      const matchedKeyIngredients = requiredKeys.filter((key) =>
        selectedIngredients.includes(key)
      );
      const hasAllKeyIngredients =
        requiredKeys.length === 0 ||
        matchedKeyIngredients.length === requiredKeys.length;

      return {
        ...drink,
        matchedIngredients,
        matchScore: matchedIngredients.length / drink.ingredients.length,
        hasAllKeyIngredients,
        keyIngredients: requiredKeys,
        matchedKeyIngredients,
      };
    })
    .filter(
      (drink) => drink.matchScore >= 0.4 && drink.hasAllKeyIngredients
    )
    .sort((a, b) => b.matchScore - a.matchScore);
}
