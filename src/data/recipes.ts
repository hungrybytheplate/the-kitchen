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
  // ============ BREAKFAST ============
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
    matchedIngredients: [],
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
    matchedIngredients: [],
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
    matchedIngredients: [],
  },
  {
    id: "banana-pancakes",
    title: "Fluffy Banana Pancakes",
    mealType: "breakfast",
    description: "Light and fluffy pancakes with mashed banana and maple syrup",
    cookTime: "20 min",
    servings: 4,
    ingredients: ["flour", "eggs", "milk", "banana", "butter", "maple-syrup", "baking-powder"],
    instructions: [
      "Mash banana in a bowl",
      "Mix flour, baking powder, eggs, and milk",
      "Fold in mashed banana",
      "Cook pancakes in buttered pan until golden",
      "Serve with maple syrup"
    ],
    matchedIngredients: [],
  },
  {
    id: "greek-yogurt-bowl",
    title: "Greek Yogurt Parfait",
    mealType: "breakfast",
    description: "Creamy yogurt layered with fresh fruits and honey",
    cookTime: "5 min",
    servings: 1,
    ingredients: ["yogurt", "berries", "honey", "oats", "banana"],
    instructions: [
      "Layer yogurt in a bowl or glass",
      "Add fresh berries and sliced banana",
      "Sprinkle with oats",
      "Drizzle with honey"
    ],
    matchedIngredients: [],
  },
  {
    id: "french-toast",
    title: "Classic French Toast",
    mealType: "breakfast",
    description: "Golden brown French toast with cinnamon and vanilla",
    cookTime: "15 min",
    servings: 2,
    ingredients: ["bread", "eggs", "milk", "butter", "cinnamon", "vanilla", "maple-syrup"],
    instructions: [
      "Whisk eggs, milk, cinnamon, and vanilla",
      "Dip bread slices in egg mixture",
      "Cook in buttered pan until golden on both sides",
      "Serve with maple syrup"
    ],
    matchedIngredients: [],
  },
  {
    id: "veggie-omelette",
    title: "Garden Vegetable Omelette",
    mealType: "breakfast",
    description: "Fluffy omelette stuffed with fresh vegetables and cheese",
    cookTime: "15 min",
    servings: 1,
    ingredients: ["eggs", "bell-pepper", "onion", "mushroom", "cheese", "butter", "salt", "pepper"],
    instructions: [
      "Whisk eggs with salt and pepper",
      "Sauté vegetables in butter",
      "Pour eggs over vegetables",
      "Cook until set, add cheese",
      "Fold and serve"
    ],
    matchedIngredients: [],
  },
  {
    id: "breakfast-burrito",
    title: "Hearty Breakfast Burrito",
    mealType: "breakfast",
    description: "Scrambled eggs with beans, cheese, and salsa wrapped in a tortilla",
    cookTime: "20 min",
    servings: 2,
    ingredients: ["eggs", "beans", "cheese", "onion", "bell-pepper", "flour", "salt", "hot-sauce"],
    instructions: [
      "Scramble eggs with salt",
      "Warm beans in a pan",
      "Sauté onion and bell pepper",
      "Warm tortillas",
      "Fill with eggs, beans, vegetables, and cheese",
      "Add hot sauce and roll up"
    ],
    matchedIngredients: [],
  },
  {
    id: "smoothie-bowl",
    title: "Tropical Smoothie Bowl",
    mealType: "breakfast",
    description: "Thick and creamy smoothie bowl topped with fresh fruits",
    cookTime: "10 min",
    servings: 1,
    ingredients: ["banana", "berries", "yogurt", "honey", "coconut-milk", "oats"],
    instructions: [
      "Blend frozen banana, berries, and coconut milk until thick",
      "Pour into bowl",
      "Top with fresh berries, sliced banana, and oats",
      "Drizzle with honey"
    ],
    matchedIngredients: [],
  },
  {
    id: "egg-muffins",
    title: "Savory Egg Muffins",
    mealType: "breakfast",
    description: "Portable baked egg cups with vegetables and cheese",
    cookTime: "25 min",
    servings: 6,
    ingredients: ["eggs", "spinach", "cheese", "onion", "salt", "pepper", "milk"],
    instructions: [
      "Whisk eggs with milk, salt, and pepper",
      "Divide spinach and onion into muffin tin",
      "Pour egg mixture over vegetables",
      "Top with cheese",
      "Bake at 350°F for 20 minutes"
    ],
    matchedIngredients: [],
  },

  // ============ LUNCH ============
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
    matchedIngredients: [],
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
    matchedIngredients: [],
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
    matchedIngredients: [],
  },
  {
    id: "caesar-salad",
    title: "Classic Caesar Salad",
    mealType: "lunch",
    description: "Crisp romaine with creamy Caesar dressing and croutons",
    cookTime: "15 min",
    servings: 2,
    ingredients: ["lettuce", "cheese", "bread", "garlic", "lemon", "olive-oil", "eggs"],
    instructions: [
      "Tear lettuce into bite-sized pieces",
      "Make croutons by toasting cubed bread with garlic and olive oil",
      "Whisk lemon, olive oil, and egg for dressing",
      "Toss lettuce with dressing",
      "Top with croutons and shaved cheese"
    ],
    matchedIngredients: [],
  },
  {
    id: "grilled-cheese",
    title: "Ultimate Grilled Cheese",
    mealType: "lunch",
    description: "Golden crispy grilled cheese with tomato soup",
    cookTime: "15 min",
    servings: 2,
    ingredients: ["bread", "cheese", "butter", "tomatoes", "garlic", "basil"],
    instructions: [
      "Butter bread slices on one side",
      "Layer cheese between bread slices",
      "Grill in pan until golden and cheese melts",
      "Blend tomatoes, garlic, and basil for soup",
      "Serve sandwich with soup"
    ],
    matchedIngredients: [],
  },
  {
    id: "chicken-wrap",
    title: "Grilled Chicken Caesar Wrap",
    mealType: "lunch",
    description: "Tender chicken with romaine and Caesar dressing in a wrap",
    cookTime: "20 min",
    servings: 2,
    ingredients: ["chicken", "lettuce", "cheese", "flour", "garlic", "lemon", "olive-oil"],
    instructions: [
      "Season and grill chicken",
      "Slice chicken into strips",
      "Toss lettuce with olive oil and lemon",
      "Layer chicken, lettuce, and cheese on tortilla",
      "Roll up and slice in half"
    ],
    matchedIngredients: [],
  },
  {
    id: "quinoa-bowl",
    title: "Mediterranean Quinoa Bowl",
    mealType: "lunch",
    description: "Protein-packed quinoa with vegetables and feta",
    cookTime: "25 min",
    servings: 2,
    ingredients: ["quinoa", "cucumber", "tomato", "olives", "cheese", "lemon", "olive-oil", "parsley"],
    instructions: [
      "Cook quinoa according to package",
      "Dice cucumber, tomatoes, and olives",
      "Mix vegetables with cooled quinoa",
      "Crumble cheese on top",
      "Dress with lemon and olive oil"
    ],
    matchedIngredients: [],
  },
  {
    id: "soup-lentil",
    title: "Hearty Lentil Soup",
    mealType: "lunch",
    description: "Warming soup with lentils, vegetables, and aromatic spices",
    cookTime: "35 min",
    servings: 4,
    ingredients: ["beans", "carrot", "celery", "onion", "garlic", "tomatoes", "cumin", "olive-oil"],
    instructions: [
      "Sauté onion, carrot, and celery in olive oil",
      "Add garlic and cumin",
      "Add lentils and tomatoes with water",
      "Simmer until lentils are tender",
      "Season and serve"
    ],
    matchedIngredients: [],
  },
  {
    id: "caprese-sandwich",
    title: "Fresh Caprese Sandwich",
    mealType: "lunch",
    description: "Mozzarella, tomato, and basil on crusty bread",
    cookTime: "10 min",
    servings: 1,
    ingredients: ["bread", "cheese", "tomato", "basil", "olive-oil", "balsamic", "salt"],
    instructions: [
      "Slice bread and toast lightly",
      "Layer fresh mozzarella and tomato slices",
      "Add fresh basil leaves",
      "Drizzle with olive oil and balsamic",
      "Season with salt"
    ],
    matchedIngredients: [],
  },
  {
    id: "asian-noodle-salad",
    title: "Asian Sesame Noodle Salad",
    mealType: "lunch",
    description: "Cold noodles with crunchy vegetables in sesame dressing",
    cookTime: "20 min",
    servings: 2,
    ingredients: ["pasta", "carrot", "cucumber", "bell-pepper", "soy-sauce", "ginger", "garlic", "vegetable-oil"],
    instructions: [
      "Cook noodles and rinse with cold water",
      "Julienne vegetables",
      "Whisk soy sauce, ginger, garlic, and oil",
      "Toss noodles with vegetables and dressing",
      "Chill before serving"
    ],
    matchedIngredients: [],
  },
  {
    id: "stuffed-avocado",
    title: "Tuna Stuffed Avocado",
    mealType: "lunch",
    description: "Ripe avocado filled with seasoned tuna salad",
    cookTime: "15 min",
    servings: 2,
    ingredients: ["avocado", "tuna", "onion", "lemon", "salt", "pepper", "celery"],
    instructions: [
      "Halve avocados and remove pit",
      "Mix tuna with diced onion and celery",
      "Season with lemon, salt, and pepper",
      "Fill avocado halves with tuna mixture",
      "Serve immediately"
    ],
    matchedIngredients: [],
  },
  {
    id: "chickpea-salad",
    title: "Crunchy Chickpea Salad",
    mealType: "lunch",
    description: "Protein-rich chickpea salad with fresh vegetables",
    cookTime: "10 min",
    servings: 2,
    ingredients: ["chickpeas", "cucumber", "tomato", "onion", "parsley", "lemon", "olive-oil"],
    instructions: [
      "Drain and rinse chickpeas",
      "Dice cucumber, tomato, and onion",
      "Chop fresh parsley",
      "Combine all ingredients",
      "Dress with lemon and olive oil"
    ],
    matchedIngredients: [],
  },

  // ============ DINNER ============
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
    matchedIngredients: [],
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
    matchedIngredients: [],
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
    matchedIngredients: [],
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
    matchedIngredients: [],
  },
  {
    id: "lemon-herb-salmon",
    title: "Lemon Herb Baked Salmon",
    mealType: "dinner",
    description: "Tender salmon fillet with fresh herbs and citrus",
    cookTime: "25 min",
    servings: 2,
    ingredients: ["fish", "lemon", "garlic", "thyme", "rosemary", "olive-oil", "salt", "pepper"],
    instructions: [
      "Preheat oven to 400°F",
      "Place salmon on baking sheet",
      "Top with garlic, herbs, and lemon slices",
      "Drizzle with olive oil",
      "Bake for 15-18 minutes"
    ],
    matchedIngredients: [],
  },
  {
    id: "chicken-curry",
    title: "Creamy Chicken Curry",
    mealType: "dinner",
    description: "Aromatic curry with tender chicken and coconut milk",
    cookTime: "35 min",
    servings: 4,
    ingredients: ["chicken", "coconut-milk", "onion", "garlic", "ginger", "curry-powder", "tomatoes", "rice"],
    instructions: [
      "Sauté onion, garlic, and ginger",
      "Add curry powder and cook until fragrant",
      "Add chicken and brown",
      "Pour in coconut milk and tomatoes",
      "Simmer until chicken is cooked, serve over rice"
    ],
    matchedIngredients: [],
  },
  {
    id: "shrimp-scampi",
    title: "Garlic Shrimp Scampi",
    mealType: "dinner",
    description: "Succulent shrimp in garlic butter wine sauce over pasta",
    cookTime: "20 min",
    servings: 4,
    ingredients: ["shrimp", "pasta", "garlic", "butter", "lemon", "parsley", "olive-oil", "pepper"],
    instructions: [
      "Cook pasta according to package",
      "Sauté garlic in butter and olive oil",
      "Add shrimp and cook until pink",
      "Squeeze in lemon juice",
      "Toss with pasta and parsley"
    ],
    matchedIngredients: [],
  },
  {
    id: "stuffed-peppers",
    title: "Classic Stuffed Bell Peppers",
    mealType: "dinner",
    description: "Bell peppers filled with seasoned beef and rice",
    cookTime: "45 min",
    servings: 4,
    ingredients: ["bell-pepper", "beef", "rice", "tomatoes", "onion", "garlic", "cheese", "italian-seasoning"],
    instructions: [
      "Cut tops off peppers and remove seeds",
      "Cook rice and brown beef with onion and garlic",
      "Mix beef, rice, and tomatoes with seasoning",
      "Fill peppers and top with cheese",
      "Bake at 375°F for 30 minutes"
    ],
    matchedIngredients: [],
  },
  {
    id: "pork-chops",
    title: "Pan-Seared Pork Chops",
    mealType: "dinner",
    description: "Juicy pork chops with apple cider glaze",
    cookTime: "25 min",
    servings: 2,
    ingredients: ["pork", "apple", "butter", "thyme", "garlic", "salt", "pepper", "honey"],
    instructions: [
      "Season pork chops with salt, pepper, and thyme",
      "Sear in hot pan until golden",
      "Add butter, garlic, and apple slices",
      "Drizzle with honey",
      "Baste and finish cooking"
    ],
    matchedIngredients: [],
  },
  {
    id: "vegetable-stir-fry",
    title: "Asian Vegetable Stir-Fry",
    mealType: "dinner",
    description: "Crisp vegetables in savory ginger garlic sauce",
    cookTime: "20 min",
    servings: 4,
    ingredients: ["broccoli", "bell-pepper", "carrot", "mushroom", "garlic", "ginger", "soy-sauce", "vegetable-oil"],
    instructions: [
      "Cut all vegetables into bite-sized pieces",
      "Heat oil in wok until smoking",
      "Stir-fry vegetables in batches",
      "Add garlic and ginger",
      "Season with soy sauce and serve"
    ],
    matchedIngredients: [],
  },
  {
    id: "spaghetti-carbonara",
    title: "Classic Spaghetti Carbonara",
    mealType: "dinner",
    description: "Creamy pasta with crispy pancetta and parmesan",
    cookTime: "25 min",
    servings: 4,
    ingredients: ["pasta", "pork", "eggs", "cheese", "garlic", "pepper", "olive-oil"],
    instructions: [
      "Cook pasta until al dente",
      "Crisp pancetta in pan",
      "Whisk eggs with cheese and pepper",
      "Toss hot pasta with pancetta",
      "Add egg mixture and toss quickly"
    ],
    matchedIngredients: [],
  },
  {
    id: "teriyaki-chicken",
    title: "Teriyaki Chicken Bowl",
    mealType: "dinner",
    description: "Glazed chicken with steamed rice and vegetables",
    cookTime: "30 min",
    servings: 4,
    ingredients: ["chicken", "rice", "soy-sauce", "honey", "garlic", "ginger", "broccoli", "carrot"],
    instructions: [
      "Cook rice according to package",
      "Make teriyaki sauce with soy sauce, honey, garlic, and ginger",
      "Grill chicken and brush with sauce",
      "Steam broccoli and carrots",
      "Serve chicken over rice with vegetables"
    ],
    matchedIngredients: [],
  },
  {
    id: "mushroom-risotto",
    title: "Creamy Mushroom Risotto",
    mealType: "dinner",
    description: "Rich and creamy Italian rice with sautéed mushrooms",
    cookTime: "40 min",
    servings: 4,
    ingredients: ["rice", "mushroom", "onion", "garlic", "butter", "cheese", "thyme", "olive-oil"],
    instructions: [
      "Sauté mushrooms until golden",
      "Toast rice in butter with onion and garlic",
      "Add warm broth gradually, stirring constantly",
      "Stir in cheese and thyme",
      "Top with sautéed mushrooms"
    ],
    matchedIngredients: [],
  },
  {
    id: "beef-tacos",
    title: "Seasoned Beef Tacos",
    mealType: "dinner",
    description: "Spiced ground beef in crispy shells with fresh toppings",
    cookTime: "25 min",
    servings: 4,
    ingredients: ["beef", "taco-seasoning", "lettuce", "tomato", "cheese", "sour-cream", "onion"],
    instructions: [
      "Brown ground beef with onion",
      "Add taco seasoning and water",
      "Simmer until thickened",
      "Warm taco shells",
      "Fill with beef and top with lettuce, tomato, cheese, and sour cream"
    ],
    matchedIngredients: [],
  },
  {
    id: "coconut-shrimp-curry",
    title: "Thai Coconut Shrimp Curry",
    mealType: "dinner",
    description: "Creamy coconut curry with succulent shrimp",
    cookTime: "25 min",
    servings: 4,
    ingredients: ["shrimp", "coconut-milk", "bell-pepper", "garlic", "ginger", "curry-powder", "lime", "rice"],
    instructions: [
      "Sauté garlic and ginger",
      "Add curry powder and bell pepper",
      "Pour in coconut milk and simmer",
      "Add shrimp and cook until pink",
      "Finish with lime juice, serve over rice"
    ],
    matchedIngredients: [],
  },
  {
    id: "baked-ziti",
    title: "Cheesy Baked Ziti",
    mealType: "dinner",
    description: "Pasta baked with marinara, ricotta, and mozzarella",
    cookTime: "45 min",
    servings: 6,
    ingredients: ["pasta", "tomatoes", "cheese", "cream-cheese", "garlic", "basil", "italian-seasoning"],
    instructions: [
      "Cook pasta until slightly underdone",
      "Mix ricotta with egg and basil",
      "Layer pasta, marinara, and cheeses in baking dish",
      "Top with mozzarella",
      "Bake at 375°F until bubbly"
    ],
    matchedIngredients: [],
  },
  {
    id: "honey-garlic-chicken",
    title: "Honey Garlic Chicken Thighs",
    mealType: "dinner",
    description: "Crispy chicken thighs glazed with sweet honey garlic sauce",
    cookTime: "35 min",
    servings: 4,
    ingredients: ["chicken", "honey", "garlic", "soy-sauce", "butter", "thyme", "salt", "pepper"],
    instructions: [
      "Season chicken thighs with salt and pepper",
      "Sear skin-side down until crispy",
      "Flip and add garlic and butter",
      "Mix honey and soy sauce, pour over chicken",
      "Baste until glazed and cooked through"
    ],
    matchedIngredients: [],
  },
  {
    id: "vegetable-lasagna",
    title: "Garden Vegetable Lasagna",
    mealType: "dinner",
    description: "Layers of pasta, vegetables, and creamy cheese sauce",
    cookTime: "60 min",
    servings: 8,
    ingredients: ["pasta", "zucchini", "spinach", "mushroom", "cheese", "cream", "garlic", "basil"],
    instructions: [
      "Sauté vegetables with garlic",
      "Make cheese sauce with cream and cheese",
      "Layer noodles, vegetables, and cheese sauce",
      "Top with more cheese",
      "Bake at 375°F for 45 minutes"
    ],
    matchedIngredients: [],
  },
  {
    id: "beef-and-broccoli",
    title: "Chinese Beef and Broccoli",
    mealType: "dinner",
    description: "Tender beef slices with crisp broccoli in oyster sauce",
    cookTime: "25 min",
    servings: 4,
    ingredients: ["beef", "broccoli", "garlic", "ginger", "soy-sauce", "vegetable-oil", "rice"],
    instructions: [
      "Slice beef thin and marinate in soy sauce",
      "Blanch broccoli until bright green",
      "Stir-fry beef until browned",
      "Add broccoli, garlic, and ginger",
      "Serve over steamed rice"
    ],
    matchedIngredients: [],
  },
  {
    id: "tofu-stir-fry",
    title: "Crispy Tofu Stir-Fry",
    mealType: "dinner",
    description: "Golden crispy tofu with vegetables in savory sauce",
    cookTime: "30 min",
    servings: 4,
    ingredients: ["tofu", "broccoli", "bell-pepper", "carrot", "soy-sauce", "garlic", "ginger", "vegetable-oil"],
    instructions: [
      "Press and cube tofu",
      "Pan-fry tofu until golden and crispy",
      "Stir-fry vegetables with garlic and ginger",
      "Add tofu and soy sauce",
      "Toss and serve over rice"
    ],
    matchedIngredients: [],
  },
];

// Key ingredients that MUST be present for certain recipes (base ingredient names)
const keyIngredients: Record<string, string[]> = {
  "avocado-toast": ["avocado"],
  "oatmeal-berries": ["oats"],
  "tuna-sandwich": ["tuna"],
  "fish-tacos": ["fish", "salmon", "tilapia", "cod", "halibut", "mahi"],
  "beef-stir-fry": ["beef", "ground-beef", "stew-beef"],
  "garlic-butter-chicken": ["chicken"],
  "chicken-salad": ["chicken"],
  "banana-pancakes": ["banana"],
  "greek-yogurt-bowl": ["yogurt"],
  "french-toast": ["bread", "eggs"],
  "veggie-omelette": ["eggs"],
  "breakfast-burrito": ["eggs", "beans"],
  "smoothie-bowl": ["banana"],
  "egg-muffins": ["eggs"],
  "caesar-salad": ["lettuce"],
  "grilled-cheese": ["cheese", "bread"],
  "chicken-wrap": ["chicken"],
  "quinoa-bowl": ["quinoa"],
  "soup-lentil": ["beans"],
  "caprese-sandwich": ["tomato", "cheese"],
  "asian-noodle-salad": ["pasta"],
  "stuffed-avocado": ["avocado", "tuna"],
  "chickpea-salad": ["chickpeas"],
  "lemon-herb-salmon": ["salmon", "fish"],
  "chicken-curry": ["chicken", "coconut"],
  "shrimp-scampi": ["shrimp"],
  "stuffed-peppers": ["bell-pepper", "beef", "ground-beef"],
  "pork-chops": ["pork"],
  "vegetable-stir-fry": ["broccoli"],
  "spaghetti-carbonara": ["pasta", "eggs"],
  "teriyaki-chicken": ["chicken"],
  "mushroom-risotto": ["mushroom", "rice"],
  "beef-tacos": ["beef", "ground-beef"],
  "coconut-shrimp-curry": ["shrimp", "coconut"],
  "baked-ziti": ["pasta", "cheese"],
  "honey-garlic-chicken": ["chicken"],
  "vegetable-lasagna": ["pasta", "zucchini"],
  "beef-and-broccoli": ["beef", "broccoli"],
  "tofu-stir-fry": ["tofu"],
};

// Helper function to check if a selected ingredient matches a recipe ingredient
function ingredientMatches(selectedId: string, recipeIngredient: string): boolean {
  // Direct match
  if (selectedId === recipeIngredient) return true;
  
  // Check if selected variant matches base ingredient
  // e.g., "chicken-breast" matches "chicken", "beef-sirloin" matches "beef"
  const selectedBase = selectedId.split('-')[0];
  const recipeBase = recipeIngredient.split('-')[0];
  
  // Match if bases are the same
  if (selectedBase === recipeBase) return true;
  if (selectedBase === recipeIngredient) return true;
  if (selectedId.startsWith(recipeIngredient)) return true;
  
  // Special mappings for common ingredient groups
  const ingredientGroups: Record<string, string[]> = {
    chicken: ['chicken-breast', 'chicken-thighs', 'chicken-tenders', 'chicken-wings', 'chicken-drumsticks', 'ground-chicken', 'rotisserie-chicken'],
    beef: ['ground-beef', 'ground-beef-lean', 'beef-sirloin', 'beef-ribeye', 'beef-filet', 'beef-flank', 'stew-beef', 'beef-roast', 'beef-short-ribs'],
    pork: ['pork-chops', 'pork-loin', 'ground-pork', 'bacon', 'turkey-bacon', 'pork-tenderloin', 'ham', 'ham-sliced', 'sausage-italian', 'sausage-breakfast', 'chorizo'],
    fish: ['salmon-fillet', 'salmon-smoked', 'tilapia', 'cod', 'tuna-steak', 'mahi-mahi', 'halibut', 'sea-bass'],
    shrimp: ['shrimp-raw', 'shrimp-cooked', 'shrimp-jumbo'],
    tofu: ['tofu-firm', 'tofu-extra-firm', 'tofu-silken'],
    eggs: ['eggs-large', 'eggs-extra-large', 'egg-whites', 'eggs-organic'],
    milk: ['milk-whole', 'milk-2-percent', 'milk-skim', 'milk-almond', 'milk-oat', 'milk-coconut'],
    butter: ['butter-salted', 'butter-unsalted'],
    cheese: ['cheese-cheddar', 'cheese-sharp-cheddar', 'cheese-mozzarella', 'cheese-fresh-mozzarella', 'cheese-parmesan', 'cheese-feta', 'cheese-swiss', 'cheese-gouda', 'cheese-brie', 'cheese-provolone', 'cheese-pepper-jack', 'cheese-ricotta', 'cheese-goat', 'cheese-mexican-blend'],
    yogurt: ['yogurt-greek-plain', 'yogurt-greek-vanilla', 'yogurt-regular'],
    cream: ['cream-heavy', 'cream-light', 'half-and-half'],
    onion: ['onion-yellow', 'onion-white', 'onion-red', 'onion-sweet', 'shallots', 'green-onions'],
    garlic: ['garlic-fresh', 'garlic-minced', 'garlic-roasted'],
    tomato: ['tomato-roma', 'tomato-cherry', 'tomato-grape', 'tomato-beefsteak', 'tomato-heirloom'],
    lettuce: ['lettuce-romaine', 'lettuce-iceberg', 'lettuce-butter', 'mixed-greens', 'arugula'],
    spinach: ['spinach-baby', 'spinach-bunch', 'spinach-frozen'],
    carrot: ['carrots-whole', 'carrots-baby', 'carrots-shredded'],
    'bell-pepper': ['bell-pepper-red', 'bell-pepper-green', 'bell-pepper-yellow', 'bell-pepper-orange'],
    broccoli: ['broccoli-crowns', 'broccoli-florets', 'broccoli-frozen', 'broccolini'],
    zucchini: ['zucchini-green', 'zucchini-yellow'],
    mushroom: ['mushroom-white', 'mushroom-cremini', 'mushroom-portobello', 'mushroom-shiitake'],
    celery: ['celery-stalks', 'celery-hearts'],
    cucumber: ['cucumber-english', 'cucumber-persian', 'cucumber-regular'],
    lemon: ['lemon', 'lemon-meyer'],
    lime: ['lime', 'lime-key'],
    apple: ['apple-gala', 'apple-fuji', 'apple-granny-smith', 'apple-honeycrisp'],
    banana: ['banana-regular', 'banana-organic', 'plantain'],
    berries: ['strawberries', 'blueberries', 'raspberries', 'blackberries', 'mixed-berries'],
    avocado: ['avocado-hass', 'avocado-florida'],
    orange: ['orange-navel', 'orange-blood', 'mandarin', 'clementine'],
    rice: ['rice-white', 'rice-brown', 'rice-jasmine', 'rice-basmati'],
    pasta: ['pasta-spaghetti', 'pasta-penne', 'pasta-fettuccine', 'pasta-linguine', 'pasta-rigatoni', 'pasta-lasagna'],
    bread: ['bread-white', 'bread-wheat', 'bread-sourdough', 'bread-baguette'],
    oats: ['oats-rolled', 'oats-steel-cut', 'oats-instant'],
    flour: ['flour-all-purpose', 'flour-bread', 'flour-whole-wheat'],
    quinoa: ['quinoa-white', 'quinoa-red'],
    beans: ['beans-black', 'beans-pinto', 'beans-kidney', 'beans-cannellini', 'beans-refried'],
    tomatoes: ['tomatoes-diced', 'tomatoes-crushed', 'tomatoes-sauce', 'tomatoes-paste'],
    tuna: ['tuna-white', 'tuna-chunk'],
    'coconut-milk': ['coconut-milk-full', 'coconut-milk-light'],
    olives: ['olives-black', 'olives-kalamata', 'olives-green'],
    'olive-oil': ['olive-oil-evoo', 'olive-oil-light'],
    'vegetable-oil': ['vegetable-oil', 'canola-oil'],
    salt: ['salt-kosher', 'salt-sea', 'salt-table'],
    pepper: ['pepper-ground', 'pepper-whole', 'pepper-white'],
    paprika: ['paprika-sweet', 'paprika-smoked', 'paprika-hot'],
    cumin: ['cumin-ground', 'cumin-seeds'],
    cinnamon: ['cinnamon-ground', 'cinnamon-sticks'],
    ginger: ['ginger-ground', 'ginger-fresh'],
    basil: ['basil-dried', 'basil-fresh'],
    oregano: ['oregano-dried', 'oregano-fresh'],
    thyme: ['thyme-dried', 'thyme-fresh'],
    rosemary: ['rosemary-dried', 'rosemary-fresh'],
    parsley: ['parsley-dried', 'parsley-fresh'],
    'soy-sauce': ['soy-sauce', 'soy-sauce-low-sodium'],
    mustard: ['mustard-yellow', 'mustard-dijon', 'mustard-whole-grain'],
  };
  
  // Check if selected ingredient belongs to a group that matches the recipe ingredient
  for (const [group, variants] of Object.entries(ingredientGroups)) {
    if (variants.includes(selectedId) && (group === recipeIngredient || recipeIngredient.startsWith(group))) {
      return true;
    }
  }
  
  return false;
}

export function getRecipesForIngredients(selectedIngredients: string[]): Recipe[] {
  if (selectedIngredients.length === 0) return [];
  
  return sampleRecipes
    .map(recipe => {
      const matchedIngredients = recipe.ingredients.filter(ing => 
        selectedIngredients.some(selected => ingredientMatches(selected, ing))
      );
      
      // Check if recipe has key ingredients that must be present
      const requiredKeys = keyIngredients[recipe.id] || [];
      const hasAllKeyIngredients = requiredKeys.length === 0 || requiredKeys.some(key => 
        selectedIngredients.some(selected => ingredientMatches(selected, key))
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
