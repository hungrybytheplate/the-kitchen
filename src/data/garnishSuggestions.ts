// Garnish suggestions based on selected drink ingredients
export interface GarnishSuggestion {
  name: string;
  description: string;
  pairsWith: string[]; // ingredient IDs that pair well
  category: "citrus" | "herb" | "fruit" | "spice" | "decorative" | "edible-flower";
  tips?: string;
}

export const garnishSuggestions: GarnishSuggestion[] = [
  // Citrus garnishes
  {
    name: "Lime Wheel",
    description: "Classic citrus slice for tropical and tart drinks",
    pairsWith: ["rum-white", "rum-dark", "tequila", "vodka", "gin", "lime", "ginger-beer", "club-soda", "coconut-cream", "pineapple-juice"],
    category: "citrus",
    tips: "Cut thin wheels and make a small slit to rest on glass rim",
  },
  {
    name: "Lime Wedge",
    description: "Squeeze-able citrus for extra tartness",
    pairsWith: ["tequila", "rum-white", "vodka", "ginger-beer", "club-soda", "lime", "agave"],
    category: "citrus",
    tips: "Cut into 8 wedges per lime for the perfect size",
  },
  {
    name: "Lemon Twist",
    description: "Elegant spiral releasing citrus oils",
    pairsWith: ["vodka", "gin", "whiskey", "bourbon", "vermouth-dry", "lemon", "simple-syrup"],
    category: "citrus",
    tips: "Express the oils over the drink by twisting above the glass",
  },
  {
    name: "Lemon Wheel",
    description: "Bright citrus disc for visual appeal",
    pairsWith: ["vodka", "gin", "lemon", "club-soda", "honey", "simple-syrup"],
    category: "citrus",
    tips: "Use a sharp knife for clean, thin slices",
  },
  {
    name: "Orange Peel",
    description: "Aromatic citrus expression for complex drinks",
    pairsWith: ["bourbon", "whiskey", "brandy", "campari", "vermouth-sweet", "angostura", "orange-juice"],
    category: "citrus",
    tips: "Flame the peel over the drink for extra aroma",
  },
  {
    name: "Orange Slice",
    description: "Sweet citrus for tropical and fruity drinks",
    pairsWith: ["rum-white", "rum-dark", "vodka", "orange-juice", "grenadine", "cranberry-juice"],
    category: "citrus",
    tips: "Cut into half-moons for easier placement",
  },
  {
    name: "Grapefruit Wedge",
    description: "Bittersweet citrus for sophisticated drinks",
    pairsWith: ["tequila", "vodka", "gin", "grapefruit-juice", "campari", "club-soda"],
    category: "citrus",
    tips: "Pink grapefruit adds beautiful color",
  },

  // Herb garnishes
  {
    name: "Mint Sprig",
    description: "Fresh aromatic herb for mojitos and juleps",
    pairsWith: ["rum-white", "bourbon", "vodka", "lime", "simple-syrup", "club-soda", "mint", "cucumber"],
    category: "herb",
    tips: "Slap the mint between your palms to release oils before garnishing",
  },
  {
    name: "Mint Bouquet",
    description: "Generous bundle of fresh mint",
    pairsWith: ["bourbon", "mint", "simple-syrup", "rum-white"],
    category: "herb",
    tips: "Use 6-8 stems bundled together for a dramatic presentation",
  },
  {
    name: "Rosemary Sprig",
    description: "Woody herb adding earthy aroma",
    pairsWith: ["gin", "vodka", "whiskey", "lemon", "grapefruit-juice", "cranberry-juice", "honey"],
    category: "herb",
    tips: "Lightly toast with a kitchen torch for a smoky note",
  },
  {
    name: "Basil Leaf",
    description: "Fresh herb for summer drinks",
    pairsWith: ["vodka", "gin", "strawberries", "watermelon", "lime", "simple-syrup", "basil"],
    category: "herb",
    tips: "Float a whole leaf on top or tuck alongside ice",
  },
  {
    name: "Thyme Sprig",
    description: "Delicate herb for refined cocktails",
    pairsWith: ["gin", "vodka", "lemon", "honey", "grapefruit-juice", "club-soda"],
    category: "herb",
    tips: "Works beautifully with citrus-forward drinks",
  },
  {
    name: "Sage Leaf",
    description: "Earthy herb for fall-inspired drinks",
    pairsWith: ["bourbon", "whiskey", "apple-juice", "blackberries", "honey", "lemon"],
    category: "herb",
    tips: "Fry in butter briefly for a crispy garnish",
  },
  {
    name: "Lavender Sprig",
    description: "Floral herb for elegant drinks",
    pairsWith: ["gin", "vodka", "lemon", "lavender-syrup", "honey", "club-soda"],
    category: "herb",
    tips: "Use sparingly - lavender can be overpowering",
  },

  // Fruit garnishes
  {
    name: "Maraschino Cherry",
    description: "Classic cocktail cherry",
    pairsWith: ["bourbon", "whiskey", "vodka", "rum-white", "grenadine", "simple-syrup", "cherries"],
    category: "fruit",
    tips: "Luxardo cherries are worth the splurge",
  },
  {
    name: "Pineapple Wedge",
    description: "Tropical fruit for tiki drinks",
    pairsWith: ["rum-white", "rum-dark", "vodka", "coconut-cream", "pineapple-juice", "pineapple"],
    category: "fruit",
    tips: "Add a cocktail umbrella for extra flair",
  },
  {
    name: "Pineapple Leaf",
    description: "Dramatic tropical crown garnish",
    pairsWith: ["rum-white", "rum-dark", "pineapple-juice", "coconut-cream", "pineapple"],
    category: "fruit",
    tips: "Use the crown leaves from a fresh pineapple",
  },
  {
    name: "Strawberry",
    description: "Sweet berry for fruity drinks",
    pairsWith: ["vodka", "rum-white", "champagne", "strawberries", "lemon", "simple-syrup"],
    category: "fruit",
    tips: "Slice and fan for elegant presentation",
  },
  {
    name: "Raspberry Skewer",
    description: "Fresh berries on a pick",
    pairsWith: ["vodka", "gin", "champagne", "raspberries", "lemon", "lime"],
    category: "fruit",
    tips: "Thread 3 raspberries on a cocktail pick",
  },
  {
    name: "Blackberry",
    description: "Dark berry for gin and whiskey drinks",
    pairsWith: ["gin", "bourbon", "vodka", "blackberries", "lemon", "simple-syrup"],
    category: "fruit",
    tips: "Float on foam or balance on rim",
  },
  {
    name: "Apple Slice",
    description: "Crisp fruit for fall drinks",
    pairsWith: ["bourbon", "whiskey", "apple-juice", "apple", "cinnamon", "vodka"],
    category: "fruit",
    tips: "Fan thin slices or use an apple chip",
  },
  {
    name: "Peach Slice",
    description: "Sweet stone fruit for summer drinks",
    pairsWith: ["bourbon", "vodka", "champagne", "peach", "lemon"],
    category: "fruit",
    tips: "Grill briefly for caramelized edges",
  },
  {
    name: "Cucumber Ribbon",
    description: "Elegant veggie garnish",
    pairsWith: ["gin", "vodka", "lime", "mint", "tonic-water", "club-soda", "cucumber"],
    category: "fruit",
    tips: "Use a vegetable peeler for long, thin ribbons",
  },
  {
    name: "Watermelon Cube",
    description: "Refreshing summer garnish",
    pairsWith: ["vodka", "rum-white", "tequila", "watermelon", "lime", "mint"],
    category: "fruit",
    tips: "Cut into uniform cubes and skewer",
  },
  {
    name: "Mango Slice",
    description: "Tropical fruit for exotic drinks",
    pairsWith: ["rum-white", "tequila", "vodka", "mango", "lime", "coconut-cream"],
    category: "fruit",
    tips: "Cut cheeks and slice for a fan presentation",
  },
  {
    name: "Banana Slice",
    description: "Creamy fruit for tropical and smoothie drinks",
    pairsWith: ["rum-dark", "rum-white", "banana", "coconut-cream", "pineapple-juice", "chocolate"],
    category: "fruit",
    tips: "Dehydrate slices for a crispy garnish",
  },

  // Spice garnishes
  {
    name: "Cinnamon Stick",
    description: "Warming spice for fall and winter drinks",
    pairsWith: ["bourbon", "rum-dark", "whiskey", "apple-juice", "cinnamon", "honey", "milk"],
    category: "spice",
    tips: "Use as a stirrer for extra aroma",
  },
  {
    name: "Star Anise",
    description: "Beautiful spice for Asian-inspired drinks",
    pairsWith: ["vodka", "gin", "whiskey", "honey", "ginger-fresh", "chai"],
    category: "spice",
    tips: "Float on surface for visual impact",
  },
  {
    name: "Nutmeg Dusting",
    description: "Warm spice finish for creamy drinks",
    pairsWith: ["rum-dark", "brandy", "bourbon", "cream", "milk", "egg-white", "nutmeg"],
    category: "spice",
    tips: "Freshly grated is best - use a microplane",
  },
  {
    name: "Candied Ginger",
    description: "Sweet and spicy crystallized ginger",
    pairsWith: ["vodka", "whiskey", "rum-dark", "ginger-beer", "ginger-fresh", "lime"],
    category: "spice",
    tips: "Skewer on a cocktail pick",
  },
  {
    name: "Ginger Slice",
    description: "Fresh ginger for spicy drinks",
    pairsWith: ["vodka", "whiskey", "ginger-beer", "ginger-fresh", "lime", "honey"],
    category: "spice",
    tips: "Cut coin-shaped slices",
  },
  {
    name: "Salt Rim",
    description: "Classic savory rim for margaritas",
    pairsWith: ["tequila", "lime", "grapefruit-juice", "salt", "agave"],
    category: "spice",
    tips: "Use flaky sea salt or flavored salts",
  },
  {
    name: "Sugar Rim",
    description: "Sweet rim for dessert cocktails",
    pairsWith: ["vodka", "rum-white", "champagne", "lemon", "cream", "chocolate"],
    category: "spice",
    tips: "Color with food coloring to match your drink",
  },
  {
    name: "Chili-Salt Rim",
    description: "Spicy-savory rim for Mexican drinks",
    pairsWith: ["tequila", "mezcal", "lime", "grapefruit-juice", "mango", "jalapeno"],
    category: "spice",
    tips: "Mix Tajín or chili powder with salt",
  },
  {
    name: "Cocoa Powder Dusting",
    description: "Chocolatey finish for dessert drinks",
    pairsWith: ["vodka", "kahlua", "baileys", "cream", "espresso", "chocolate", "milk"],
    category: "spice",
    tips: "Use a small sifter for even distribution",
  },

  // Decorative garnishes
  {
    name: "Cocktail Umbrella",
    description: "Fun tropical decoration",
    pairsWith: ["rum-white", "rum-dark", "coconut-cream", "pineapple-juice", "orange-juice"],
    category: "decorative",
    tips: "Essential for tiki drinks!",
  },
  {
    name: "Coffee Beans (3)",
    description: "Classic espresso martini garnish",
    pairsWith: ["vodka", "kahlua", "espresso", "coffee", "baileys"],
    category: "decorative",
    tips: "Traditionally 3 beans represent health, wealth, and happiness",
  },
  {
    name: "Chocolate Shavings",
    description: "Decadent garnish for creamy drinks",
    pairsWith: ["vodka", "kahlua", "cream", "chocolate", "baileys", "milk"],
    category: "decorative",
    tips: "Use a vegetable peeler on a chocolate bar",
  },
  {
    name: "Whipped Cream",
    description: "Indulgent topping for dessert drinks",
    pairsWith: ["vodka", "kahlua", "cream", "chocolate", "coffee", "milk", "peppermint-syrup"],
    category: "decorative",
    tips: "Pipe from a pastry bag for height",
  },
  {
    name: "Angostura Drops",
    description: "Aromatic bitters pattern on foam",
    pairsWith: ["whiskey", "bourbon", "egg-white", "lemon", "simple-syrup", "angostura"],
    category: "decorative",
    tips: "Use a toothpick to draw through the drops",
  },

  // Edible flowers
  {
    name: "Edible Orchid",
    description: "Elegant tropical flower",
    pairsWith: ["vodka", "gin", "rum-white", "champagne", "lemon", "simple-syrup"],
    category: "edible-flower",
    tips: "Float on the drink surface",
  },
  {
    name: "Rose Petals",
    description: "Romantic floral garnish",
    pairsWith: ["gin", "vodka", "champagne", "rose-syrup", "lemon", "honey"],
    category: "edible-flower",
    tips: "Use food-safe roses only",
  },
  {
    name: "Hibiscus Flower",
    description: "Vibrant magenta flower",
    pairsWith: ["tequila", "rum-white", "vodka", "hibiscus", "lime", "simple-syrup"],
    category: "edible-flower",
    tips: "Use flowers preserved in syrup",
  },
  {
    name: "Dried Citrus Wheel",
    description: "Long-lasting decorative garnish",
    pairsWith: ["gin", "vodka", "bourbon", "whiskey", "lemon", "orange-juice", "grapefruit-juice"],
    category: "decorative",
    tips: "Dehydrate at 200°F for 3-4 hours",
  },
];

// Get garnish suggestions based on selected ingredients
export function getGarnishSuggestions(selectedIngredients: string[]): GarnishSuggestion[] {
  if (selectedIngredients.length === 0) return [];

  // Score each garnish based on how many of its pairsWith ingredients are selected
  const scoredGarnishes = garnishSuggestions.map((garnish) => {
    const matchCount = garnish.pairsWith.filter((ing) =>
      selectedIngredients.includes(ing)
    ).length;
    
    return {
      ...garnish,
      matchScore: matchCount,
      matchPercentage: matchCount / garnish.pairsWith.length,
    };
  });

  // Filter to only garnishes with at least 1 match and sort by score
  return scoredGarnishes
    .filter((g) => g.matchScore >= 1)
    .sort((a, b) => {
      // Primary sort by match count, secondary by percentage
      if (b.matchScore !== a.matchScore) {
        return b.matchScore - a.matchScore;
      }
      return b.matchPercentage - a.matchPercentage;
    })
    .slice(0, 8); // Return top 8 suggestions
}

// Get category icon/color config
export const garnishCategoryConfig = {
  citrus: { emoji: "🍋", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300" },
  herb: { emoji: "🌿", color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" },
  fruit: { emoji: "🍓", color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" },
  spice: { emoji: "✨", color: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300" },
  decorative: { emoji: "🎨", color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300" },
  "edible-flower": { emoji: "🌸", color: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300" },
};
