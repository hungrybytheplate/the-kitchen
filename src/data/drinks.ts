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
  {
    id: "citrus-sunrise",
    title: "Citrus Sunrise",
    drinkType: "mocktail",
    description: "Layered orange and grenadine sunrise mocktail",
    prepTime: "3 min",
    ingredients: ["orange-juice", "grenadine", "club-soda", "orange"],
    instructions: [
      "Fill glass with ice",
      "Pour orange juice and top with club soda",
      "Slowly pour grenadine down the side",
      "Let it settle at the bottom for sunrise effect"
    ],
    matchedIngredients: [],
    glassType: "Highball",
    garnish: "Orange slice, cherry",
    isAlcoholic: false,
  },
  {
    id: "lavender-lemonade",
    title: "Lavender Lemonade",
    drinkType: "mocktail",
    description: "Floral and refreshing lavender-infused lemonade",
    prepTime: "5 min",
    ingredients: ["lemon", "lavender-syrup", "simple-syrup", "club-soda"],
    instructions: [
      "Combine lemon juice with lavender syrup",
      "Add simple syrup to taste",
      "Fill glass with ice and top with club soda",
      "Stir gently and garnish"
    ],
    matchedIngredients: [],
    glassType: "Collins glass",
    garnish: "Lemon wheel, lavender sprig",
    isAlcoholic: false,
  },
  {
    id: "peach-bellini-mock",
    title: "Virgin Peach Bellini",
    drinkType: "mocktail",
    description: "Sparkling peach mocktail inspired by the Italian classic",
    prepTime: "3 min",
    ingredients: ["peach", "club-soda", "simple-syrup"],
    instructions: [
      "Blend fresh peach until smooth",
      "Add simple syrup and mix",
      "Pour into champagne flute",
      "Top with club soda"
    ],
    matchedIngredients: [],
    glassType: "Champagne flute",
    garnish: "Peach slice",
    isAlcoholic: false,
  },
  {
    id: "pomegranate-sparkler",
    title: "Pomegranate Sparkler",
    drinkType: "mocktail",
    description: "Antioxidant-rich pomegranate spritzer",
    prepTime: "3 min",
    ingredients: ["pomegranate", "lime", "simple-syrup", "club-soda", "mint"],
    instructions: [
      "Add pomegranate juice and lime juice to glass",
      "Add simple syrup and stir",
      "Fill with ice and top with club soda",
      "Garnish with mint"
    ],
    matchedIngredients: [],
    glassType: "Wine glass",
    garnish: "Pomegranate seeds, mint",
    isAlcoholic: false,
  },
  {
    id: "tropical-punch",
    title: "Tropical Fruit Punch",
    drinkType: "mocktail",
    description: "Island-style tropical fruit medley",
    prepTime: "5 min",
    ingredients: ["pineapple-juice", "orange-juice", "cranberry-juice", "grenadine", "lime"],
    instructions: [
      "Combine all juices in a shaker with ice",
      "Shake well and strain into glass",
      "Add a splash of grenadine",
      "Garnish with tropical fruits"
    ],
    matchedIngredients: [],
    glassType: "Hurricane glass",
    garnish: "Pineapple wedge, cherry",
    isAlcoholic: false,
  },
  {
    id: "arnold-palmer",
    title: "Arnold Palmer",
    drinkType: "mocktail",
    description: "Classic half lemonade, half iced tea refresher",
    prepTime: "2 min",
    ingredients: ["lemon", "simple-syrup", "honey"],
    instructions: [
      "Brew tea and let cool (or use prepared)",
      "Mix fresh lemon juice with simple syrup",
      "Combine equal parts tea and lemonade",
      "Serve over ice"
    ],
    matchedIngredients: [],
    glassType: "Tall glass",
    garnish: "Lemon wedge",
    isAlcoholic: false,
  },
  {
    id: "coconut-lime-refresher",
    title: "Coconut Lime Refresher",
    drinkType: "mocktail",
    description: "Tropical coconut with zesty lime",
    prepTime: "3 min",
    ingredients: ["coconut-water", "lime", "simple-syrup", "mint"],
    instructions: [
      "Add coconut water to glass with ice",
      "Squeeze in fresh lime juice",
      "Add simple syrup and stir",
      "Garnish with mint and lime"
    ],
    matchedIngredients: [],
    glassType: "Highball",
    garnish: "Lime wheel, mint",
    isAlcoholic: false,
  },

  // ============ MORE COCKTAILS ============
  {
    id: "mai-tai",
    title: "Mai Tai",
    drinkType: "cocktail",
    description: "Polynesian rum cocktail with orgeat and lime",
    prepTime: "5 min",
    ingredients: ["rum-white", "rum-dark", "triple-sec", "lime", "orgeat", "simple-syrup"],
    instructions: [
      "Shake white rum, triple sec, lime juice, orgeat, and simple syrup with ice",
      "Strain into rocks glass filled with crushed ice",
      "Float dark rum on top",
      "Garnish with mint and lime"
    ],
    matchedIngredients: [],
    glassType: "Rocks glass",
    garnish: "Mint sprig, lime wheel",
    isAlcoholic: true,
  },
  {
    id: "aperol-spritz",
    title: "Aperol Spritz",
    drinkType: "cocktail",
    description: "Italian aperitif with Aperol and prosecco",
    prepTime: "2 min",
    ingredients: ["campari", "club-soda", "orange"],
    instructions: [
      "Fill wine glass with ice",
      "Add Aperol and top with prosecco (use club soda)",
      "Add splash of club soda",
      "Garnish with orange slice"
    ],
    matchedIngredients: [],
    glassType: "Wine glass",
    garnish: "Orange slice",
    isAlcoholic: true,
  },
  {
    id: "tom-collins",
    title: "Tom Collins",
    drinkType: "cocktail",
    description: "Classic gin sour with club soda",
    prepTime: "4 min",
    ingredients: ["gin", "lemon", "simple-syrup", "club-soda"],
    instructions: [
      "Shake gin, lemon juice, and simple syrup with ice",
      "Strain into collins glass with ice",
      "Top with club soda",
      "Garnish with lemon and cherry"
    ],
    matchedIngredients: [],
    glassType: "Collins glass",
    garnish: "Lemon wheel, cherry",
    isAlcoholic: true,
  },
  {
    id: "paloma",
    title: "Paloma",
    drinkType: "cocktail",
    description: "Mexican tequila cocktail with grapefruit",
    prepTime: "3 min",
    ingredients: ["tequila", "grapefruit-juice", "lime", "club-soda", "salt"],
    instructions: [
      "Rim glass with salt",
      "Add tequila, grapefruit juice, and lime juice",
      "Fill with ice and top with club soda",
      "Stir gently"
    ],
    matchedIngredients: [],
    glassType: "Highball",
    garnish: "Grapefruit wedge",
    isAlcoholic: true,
  },
  {
    id: "manhattan",
    title: "Manhattan",
    drinkType: "cocktail",
    description: "Sophisticated whiskey cocktail with sweet vermouth",
    prepTime: "3 min",
    ingredients: ["whiskey", "vermouth-sweet", "angostura", "cherries"],
    instructions: [
      "Stir whiskey, sweet vermouth, and bitters with ice",
      "Strain into chilled coupe glass",
      "Garnish with brandied cherry"
    ],
    matchedIngredients: [],
    glassType: "Coupe glass",
    garnish: "Brandied cherry",
    isAlcoholic: true,
  },
  {
    id: "bloody-mary",
    title: "Bloody Mary",
    drinkType: "cocktail",
    description: "Savory vodka cocktail with tomato juice and spices",
    prepTime: "5 min",
    ingredients: ["vodka", "tomato-juice", "lemon", "salt", "celery"],
    instructions: [
      "Add vodka and tomato juice to glass",
      "Add lemon juice, hot sauce, Worcestershire, salt and pepper",
      "Stir well and fill with ice",
      "Garnish with celery and lemon"
    ],
    matchedIngredients: [],
    glassType: "Highball",
    garnish: "Celery stalk, lemon wedge",
    isAlcoholic: true,
  },
  {
    id: "bramble",
    title: "Bramble",
    drinkType: "cocktail",
    description: "British gin cocktail with blackberry liqueur",
    prepTime: "4 min",
    ingredients: ["gin", "lemon", "simple-syrup", "blackberries"],
    instructions: [
      "Shake gin, lemon juice, and simple syrup with ice",
      "Strain into rocks glass filled with crushed ice",
      "Drizzle blackberry liqueur over top",
      "Garnish with fresh blackberries and lemon"
    ],
    matchedIngredients: [],
    glassType: "Rocks glass",
    garnish: "Blackberries, lemon slice",
    isAlcoholic: true,
  },
  {
    id: "mint-julep",
    title: "Mint Julep",
    drinkType: "cocktail",
    description: "Southern bourbon classic with fresh mint",
    prepTime: "4 min",
    ingredients: ["bourbon", "mint", "simple-syrup"],
    instructions: [
      "Muddle mint leaves with simple syrup in julep cup",
      "Add bourbon and stir",
      "Pack with crushed ice",
      "Garnish with mint bouquet"
    ],
    matchedIngredients: [],
    glassType: "Julep cup",
    garnish: "Mint bouquet",
    isAlcoholic: true,
  },
  {
    id: "french-75",
    title: "French 75",
    drinkType: "cocktail",
    description: "Elegant gin and champagne cocktail",
    prepTime: "4 min",
    ingredients: ["gin", "lemon", "simple-syrup", "club-soda"],
    instructions: [
      "Shake gin, lemon juice, and simple syrup with ice",
      "Strain into champagne flute",
      "Top with champagne (or sparkling wine)",
      "Garnish with lemon twist"
    ],
    matchedIngredients: [],
    glassType: "Champagne flute",
    garnish: "Lemon twist",
    isAlcoholic: true,
  },
  {
    id: "amaretto-sour",
    title: "Amaretto Sour",
    drinkType: "cocktail",
    description: "Sweet almond liqueur with citrus",
    prepTime: "4 min",
    ingredients: ["amaretto", "lemon", "simple-syrup", "egg-white"],
    instructions: [
      "Dry shake amaretto, lemon juice, simple syrup, and egg white",
      "Add ice and shake again",
      "Strain into rocks glass with ice",
      "Garnish with cherry"
    ],
    matchedIngredients: [],
    glassType: "Rocks glass",
    garnish: "Cherry, lemon twist",
    isAlcoholic: true,
  },
  {
    id: "white-russian",
    title: "White Russian",
    drinkType: "cocktail",
    description: "Creamy vodka cocktail with coffee liqueur",
    prepTime: "2 min",
    ingredients: ["vodka", "kahlua", "cream"],
    instructions: [
      "Add vodka and Kahlúa to rocks glass with ice",
      "Float cream on top",
      "Stir gently before drinking"
    ],
    matchedIngredients: [],
    glassType: "Rocks glass",
    garnish: "None",
    isAlcoholic: true,
  },
  {
    id: "long-island",
    title: "Long Island Iced Tea",
    drinkType: "cocktail",
    description: "Potent mix of multiple spirits with cola",
    prepTime: "5 min",
    ingredients: ["vodka", "gin", "rum-white", "tequila", "triple-sec", "lemon", "cola"],
    instructions: [
      "Add all spirits and lemon juice to shaker with ice",
      "Shake and strain into collins glass with ice",
      "Top with cola",
      "Garnish with lemon wedge"
    ],
    matchedIngredients: [],
    glassType: "Collins glass",
    garnish: "Lemon wedge",
    isAlcoholic: true,
  },
  {
    id: "caipirinha",
    title: "Caipirinha",
    drinkType: "cocktail",
    description: "Brazilian cocktail with cachaça and lime",
    prepTime: "3 min",
    ingredients: ["rum-white", "lime", "sugar"],
    instructions: [
      "Cut lime into wedges and muddle with sugar in glass",
      "Add cachaça (or white rum)",
      "Fill with crushed ice and stir",
      "Serve with short straw"
    ],
    matchedIngredients: [],
    glassType: "Rocks glass",
    garnish: "Lime wedge",
    isAlcoholic: true,
  },
  {
    id: "sidecar",
    title: "Sidecar",
    drinkType: "cocktail",
    description: "Classic brandy cocktail with orange and lemon",
    prepTime: "4 min",
    ingredients: ["brandy", "triple-sec", "lemon", "sugar"],
    instructions: [
      "Rim coupe glass with sugar",
      "Shake brandy, triple sec, and lemon juice with ice",
      "Strain into prepared glass"
    ],
    matchedIngredients: [],
    glassType: "Coupe glass",
    garnish: "Sugar rim, orange twist",
    isAlcoholic: true,
  },
  {
    id: "tequila-sunrise",
    title: "Tequila Sunrise",
    drinkType: "cocktail",
    description: "Colorful tequila cocktail with orange and grenadine",
    prepTime: "3 min",
    ingredients: ["tequila", "orange-juice", "grenadine"],
    instructions: [
      "Fill highball glass with ice",
      "Add tequila and orange juice, stir",
      "Slowly pour grenadine down the side",
      "Let it settle for sunrise effect"
    ],
    matchedIngredients: [],
    glassType: "Highball",
    garnish: "Orange slice, cherry",
    isAlcoholic: true,
  },
  {
    id: "hurricane",
    title: "Hurricane",
    drinkType: "cocktail",
    description: "New Orleans rum punch with passion fruit",
    prepTime: "5 min",
    ingredients: ["rum-white", "rum-dark", "passion-fruit", "orange-juice", "lime", "grenadine"],
    instructions: [
      "Shake both rums, passion fruit juice, OJ, lime juice with ice",
      "Strain into hurricane glass with ice",
      "Add splash of grenadine",
      "Garnish with orange and cherry"
    ],
    matchedIngredients: [],
    glassType: "Hurricane glass",
    garnish: "Orange slice, cherry",
    isAlcoholic: true,
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
  {
    id: "peanut-butter-banana",
    title: "Peanut Butter Banana",
    drinkType: "smoothie",
    description: "Protein-rich smoothie with peanut butter",
    prepTime: "3 min",
    ingredients: ["banana", "milk", "honey", "chocolate"],
    instructions: [
      "Add banana and peanut butter to blender",
      "Pour in milk and add honey",
      "Add cocoa powder if desired",
      "Blend until smooth"
    ],
    matchedIngredients: [],
    glassType: "Tall glass",
    isAlcoholic: false,
  },
  {
    id: "acai-bowl-drink",
    title: "Acai Berry Smoothie",
    drinkType: "smoothie",
    description: "Superfood acai berry blend",
    prepTime: "5 min",
    ingredients: ["blueberries", "banana", "milk", "honey"],
    instructions: [
      "Add acai (or blueberries), banana to blender",
      "Pour in milk and honey",
      "Blend until thick and smooth",
      "Serve immediately"
    ],
    matchedIngredients: [],
    glassType: "Tall glass",
    isAlcoholic: false,
  },
];

// Key ingredients for drinks
const keyDrinkIngredients: Record<string, string[]> = {
  // Original cocktails
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
  // New cocktails
  "mai-tai": ["rum-white", "rum-dark"],
  "aperol-spritz": ["campari"],
  "tom-collins": ["gin", "lemon"],
  "paloma": ["tequila", "grapefruit-juice"],
  "manhattan": ["whiskey", "vermouth-sweet"],
  "bloody-mary": ["vodka", "tomato-juice"],
  "bramble": ["gin", "blackberries"],
  "mint-julep": ["bourbon", "mint"],
  "french-75": ["gin", "lemon"],
  "amaretto-sour": ["amaretto", "lemon"],
  "white-russian": ["vodka", "kahlua"],
  "long-island": ["vodka", "gin", "rum-white", "tequila"],
  "caipirinha": ["rum-white", "lime"],
  "sidecar": ["brandy", "triple-sec"],
  "tequila-sunrise": ["tequila", "orange-juice"],
  "hurricane": ["rum-white", "rum-dark", "passion-fruit"],
  // Original mocktails
  "virgin-mojito": ["mint", "lime"],
  "shirley-temple": ["ginger-ale", "grenadine"],
  "cucumber-cooler": ["cucumber"],
  "virgin-pina-colada": ["coconut-cream", "pineapple-juice"],
  "strawberry-lemonade": ["strawberries", "lemon"],
  "passion-fruit-spritz": ["passion-fruit"],
  "ginger-mint-spritzer": ["ginger-beer", "mint"],
  "watermelon-basil-cooler": ["watermelon", "basil"],
  // New mocktails
  "citrus-sunrise": ["orange-juice", "grenadine"],
  "lavender-lemonade": ["lemon", "lavender-syrup"],
  "peach-bellini-mock": ["peach"],
  "pomegranate-sparkler": ["pomegranate", "lime"],
  "tropical-punch": ["pineapple-juice", "orange-juice"],
  "arnold-palmer": ["lemon"],
  "coconut-lime-refresher": ["coconut-water", "lime"],
  // Smoothies
  "berry-blast": ["strawberries", "blueberries"],
  "tropical-paradise": ["pineapple", "mango"],
  "green-machine": ["cucumber"],
  "strawberry-banana": ["strawberries", "banana"],
  "mango-lassi": ["mango"],
  "peanut-butter-banana": ["banana"],
  "acai-bowl-drink": ["blueberries", "banana"],
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
      (drink) => drink.matchScore === 1 // Require ALL ingredients to be selected
    )
    .sort((a, b) => b.matchScore - a.matchScore);
}
