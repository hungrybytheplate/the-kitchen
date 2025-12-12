export type DietaryTag = "vegetarian" | "vegan" | "gluten-free" | "dairy-free" | "keto" | "paleo" | "nut-free";
export type DifficultyLevel = "easy" | "medium" | "hard";

export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface IngredientWithAmount {
  id: string;
  amount: string;
  unit: string;
}

export interface Recipe {
  id: string;
  title: string;
  mealType: "breakfast" | "lunch" | "dinner";
  description: string;
  cookTime: string;
  servings: number;
  ingredients: string[];
  ingredientAmounts?: IngredientWithAmount[];
  instructions: string[];
  matchedIngredients: string[];
  keyIngredients?: string[];
  matchedKeyIngredients?: string[];
  dietaryTags?: DietaryTag[];
  difficulty?: DifficultyLevel;
  nutrition?: NutritionInfo;
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
    ingredientAmounts: [
      { id: "eggs", amount: "4", unit: "large" },
      { id: "butter", amount: "2", unit: "tbsp" },
      { id: "bread", amount: "2", unit: "slices" },
      { id: "salt", amount: "0.5", unit: "tsp" },
      { id: "pepper", amount: "0.25", unit: "tsp" },
      { id: "parsley", amount: "1", unit: "tbsp" },
    ],
  instructions: [
      "Crack 4 eggs into a bowl. Add salt and pepper. Whisk vigorously for 30 seconds until the yolks and whites are fully combined and slightly frothy.",
      "Place a non-stick pan over LOW heat. Add 2 tablespoons of butter and let it melt completely, swirling to coat the pan evenly.",
      "Pour the whisked eggs into the warm (not hot) pan. Wait 20 seconds, then use a silicone spatula to gently push the eggs from the edges toward the center. Continue this motion, letting uncooked egg flow to the pan surface.",
      "When eggs are 80% set but still slightly glossy (about 3-4 minutes), remove pan from heat. The residual heat will finish cooking them. They should be soft and creamy, not dry.",
      "While eggs cook, toast bread slices in a toaster or under the broiler until golden brown, about 2-3 minutes.",
      "Place toast on plates, spoon the fluffy scrambled eggs on top, and garnish with freshly chopped parsley."
    ],
    matchedIngredients: [],
    dietaryTags: ["vegetarian"],
    difficulty: "easy",
    nutrition: { calories: 320, protein: 18, carbs: 22, fat: 18 },
  },
  {
    id: "oatmeal-berries",
    title: "Warm Oatmeal with Fresh Berries",
    mealType: "breakfast",
    description: "Hearty oatmeal topped with fresh berries and honey",
    cookTime: "15 min",
    servings: 2,
    ingredients: ["oats", "milk", "berries", "honey", "cinnamon"],
    ingredientAmounts: [
      { id: "oats", amount: "1", unit: "cup" },
      { id: "milk", amount: "2", unit: "cups" },
      { id: "berries", amount: "1", unit: "cup" },
      { id: "honey", amount: "2", unit: "tbsp" },
      { id: "cinnamon", amount: "0.5", unit: "tsp" },
    ],
  instructions: [
      "Pour 2 cups of milk into a medium saucepan. Place over medium heat and bring to a gentle simmer—you'll see small bubbles around the edges. This takes about 3-4 minutes.",
      "Add 1 cup of rolled oats to the simmering milk. Stir immediately to prevent clumping. Reduce heat to medium-low.",
      "Cook for 5 minutes, stirring occasionally. The oatmeal should thicken and become creamy. If it gets too thick, add a splash more milk.",
      "Remove from heat and stir in ½ teaspoon of cinnamon until evenly distributed throughout the oatmeal.",
      "Divide between two bowls. Top each with ½ cup of fresh berries and drizzle 1 tablespoon of honey over each serving. Serve immediately while warm."
    ],
    matchedIngredients: [],
    dietaryTags: ["vegetarian", "gluten-free"],
    difficulty: "easy",
    nutrition: { calories: 280, protein: 8, carbs: 52, fat: 6 },
  },
  {
    id: "avocado-toast",
    title: "Avocado Toast with Egg",
    mealType: "breakfast",
    description: "Creamy avocado on toasted bread with a perfectly cooked egg",
    cookTime: "10 min",
    servings: 1,
    ingredients: ["bread", "avocado", "eggs", "salt", "pepper", "chili-powder"],
    ingredientAmounts: [
      { id: "bread", amount: "2", unit: "slices" },
      { id: "avocado", amount: "1", unit: "medium" },
      { id: "eggs", amount: "1", unit: "large" },
      { id: "salt", amount: "0.25", unit: "tsp" },
      { id: "pepper", amount: "0.125", unit: "tsp" },
      { id: "chili-powder", amount: "0.25", unit: "tsp" },
    ],
  instructions: [
      "Place 2 slices of bread in a toaster or under the broiler. Toast until golden brown and crispy, about 2-3 minutes. Set aside on a plate.",
      "Cut the avocado in half lengthwise, remove the pit, and scoop the flesh into a bowl. Add ¼ teaspoon salt and a pinch of pepper. Mash with a fork until spreadable but still slightly chunky.",
      "For a fried egg: Heat a non-stick pan over medium heat with a drizzle of oil. Crack the egg into the pan. Cook 2-3 minutes for runny yolk, or 4 minutes for set yolk. For poached: Bring water to a gentle simmer, create a whirlpool, drop egg in center, cook 3 minutes.",
      "Spread the mashed avocado evenly over both pieces of toast, pressing gently to create a thick layer.",
      "Carefully place the cooked egg on top of one avocado toast. Sprinkle ¼ teaspoon chili powder over the egg.",
      "Season with additional salt and pepper to taste. Serve immediately while the toast is still warm and crispy."
    ],
    matchedIngredients: [],
    dietaryTags: ["vegetarian", "dairy-free"],
    difficulty: "easy",
    nutrition: { calories: 380, protein: 14, carbs: 28, fat: 26 },
  },
  {
    id: "banana-pancakes",
    title: "Fluffy Banana Pancakes",
    mealType: "breakfast",
    description: "Light and fluffy pancakes with mashed banana and maple syrup",
    cookTime: "20 min",
    servings: 4,
    ingredients: ["flour", "eggs", "milk", "banana", "butter", "maple-syrup", "baking-powder"],
    ingredientAmounts: [
      { id: "flour", amount: "2", unit: "cups" },
      { id: "eggs", amount: "2", unit: "large" },
      { id: "milk", amount: "1.5", unit: "cups" },
      { id: "banana", amount: "2", unit: "medium" },
      { id: "butter", amount: "3", unit: "tbsp" },
      { id: "maple-syrup", amount: "0.25", unit: "cup" },
      { id: "baking-powder", amount: "2", unit: "tsp" },
    ],
  instructions: [
      "Peel 2 ripe bananas and place in a large mixing bowl. Use a fork to mash until mostly smooth with some small chunks remaining for texture.",
      "In a separate bowl, whisk together 2 cups flour, 2 teaspoons baking powder, and a pinch of salt. In another bowl, beat 2 eggs with 1½ cups milk.",
      "Pour the wet ingredients into the dry ingredients. Stir gently with a wooden spoon until just combined—lumps are okay! Overmixing makes tough pancakes.",
      "Gently fold in the mashed bananas until evenly distributed throughout the batter. Let the batter rest for 5 minutes.",
      "Heat a large non-stick pan or griddle over medium heat. Add 1 tablespoon butter. Pour ¼ cup batter per pancake. Cook until bubbles form on surface and edges look set (about 2 minutes), then flip. Cook another 1-2 minutes until golden.",
      "Stack pancakes on plates, top with a pat of butter, and drizzle generously with maple syrup. Serve immediately while hot."
    ],
    matchedIngredients: [],
    dietaryTags: ["vegetarian"],
    difficulty: "easy",
    nutrition: { calories: 380, protein: 10, carbs: 62, fat: 12 },
  },
  {
    id: "greek-yogurt-bowl",
    title: "Greek Yogurt Parfait",
    mealType: "breakfast",
    description: "Creamy yogurt layered with fresh fruits and honey",
    cookTime: "5 min",
    servings: 1,
    ingredients: ["yogurt", "berries", "honey", "oats", "banana"],
    ingredientAmounts: [
      { id: "yogurt", amount: "1", unit: "cup" },
      { id: "berries", amount: "0.5", unit: "cup" },
      { id: "honey", amount: "1", unit: "tbsp" },
      { id: "oats", amount: "0.25", unit: "cup" },
      { id: "banana", amount: "0.5", unit: "medium" },
    ],
  instructions: [
      "Start with a clear glass or bowl for visual layers. Spoon ½ cup of Greek yogurt into the bottom, spreading it evenly to create the first layer.",
      "Slice half a banana into ¼-inch rounds. Arrange half the banana slices on top of the yogurt in a single layer.",
      "Add ¼ cup of fresh mixed berries (strawberries, blueberries, raspberries) on top of the bananas.",
      "Add another ½ cup layer of Greek yogurt, then top with remaining banana slices and berries.",
      "Sprinkle ¼ cup of rolled oats or granola evenly over the top for crunch.",
      "Drizzle 1 tablespoon of honey in a zigzag pattern over everything. Serve immediately for the best texture contrast."
    ],
    matchedIngredients: [],
    dietaryTags: ["vegetarian", "gluten-free"],
    difficulty: "easy",
    nutrition: { calories: 320, protein: 18, carbs: 52, fat: 6 },
  },
  {
    id: "french-toast",
    title: "Classic French Toast",
    mealType: "breakfast",
    description: "Golden brown French toast with cinnamon and vanilla",
    cookTime: "15 min",
    servings: 2,
    ingredients: ["bread", "eggs", "milk", "butter", "cinnamon", "vanilla", "maple-syrup"],
    ingredientAmounts: [
      { id: "bread", amount: "4", unit: "slices" },
      { id: "eggs", amount: "2", unit: "large" },
      { id: "milk", amount: "0.5", unit: "cup" },
      { id: "butter", amount: "2", unit: "tbsp" },
      { id: "cinnamon", amount: "1", unit: "tsp" },
      { id: "vanilla", amount: "0.5", unit: "tsp" },
      { id: "maple-syrup", amount: "2", unit: "tbsp" },
    ],
  instructions: [
      "In a wide, shallow bowl or baking dish, whisk together 2 eggs, ½ cup milk, 1 teaspoon cinnamon, and ½ teaspoon vanilla extract until completely combined.",
      "Heat a large non-stick pan or griddle over medium heat. Add 1 tablespoon of butter and let it melt, tilting the pan to coat the surface.",
      "Dip one slice of bread into the egg mixture, letting it soak for 10-15 seconds per side. The bread should absorb the liquid but not become soggy.",
      "Place the soaked bread in the hot pan. Cook for 2-3 minutes until the bottom is golden brown. You should hear a gentle sizzle.",
      "Flip using a spatula and cook the other side for another 2-3 minutes until golden. Repeat with remaining bread slices, adding more butter as needed.",
      "Transfer to plates immediately. Top with a pat of butter and drizzle with 2 tablespoons maple syrup per serving. Serve while hot and crispy on the edges."
    ],
    matchedIngredients: [],
    dietaryTags: ["vegetarian"],
    difficulty: "easy",
    nutrition: { calories: 420, protein: 14, carbs: 48, fat: 20 },
  },
  {
    id: "veggie-omelette",
    title: "Garden Vegetable Omelette",
    mealType: "breakfast",
    description: "Fluffy omelette stuffed with fresh vegetables and cheese",
    cookTime: "15 min",
    servings: 1,
    ingredients: ["eggs", "bell-pepper", "onion", "mushroom", "cheese", "butter", "salt", "pepper"],
    ingredientAmounts: [
      { id: "eggs", amount: "3", unit: "large" },
      { id: "bell-pepper", amount: "0.5", unit: "cup" },
      { id: "onion", amount: "0.25", unit: "cup" },
      { id: "mushroom", amount: "0.5", unit: "cup" },
      { id: "cheese", amount: "0.25", unit: "cup" },
      { id: "butter", amount: "1", unit: "tbsp" },
      { id: "salt", amount: "0.25", unit: "tsp" },
      { id: "pepper", amount: "0.125", unit: "tsp" },
    ],
  instructions: [
      "Crack 3 eggs into a bowl, add ¼ teaspoon salt and a pinch of pepper. Whisk vigorously for 30 seconds until fully combined and slightly fluffy.",
      "Dice the bell pepper, onion, and mushrooms into small, uniform pieces (about ¼-inch). This ensures even cooking.",
      "Heat an 8-inch non-stick pan over medium heat. Add 1 tablespoon butter. When it foams, add the vegetables. Sauté for 3-4 minutes until softened and slightly caramelized.",
      "Reduce heat to medium-low. Pour the beaten eggs evenly over the vegetables. Let sit undisturbed for 30 seconds until the edges begin to set.",
      "Using a spatula, gently lift the edges and tilt the pan to let uncooked egg flow underneath. Continue until the top is almost set but still slightly glossy (about 2 minutes).",
      "Sprinkle ¼ cup shredded cheese over one half of the omelette. Using your spatula, fold the other half over the cheese. Let sit 30 seconds for cheese to melt, then slide onto a plate."
    ],
    matchedIngredients: [],
    dietaryTags: ["vegetarian", "gluten-free", "keto"],
    difficulty: "medium",
    nutrition: { calories: 380, protein: 24, carbs: 8, fat: 28 },
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
      "Crack 4 eggs into a bowl, add ½ teaspoon salt. Whisk until combined. Cook in a buttered pan over medium-low heat, stirring gently, until soft curds form (about 3 minutes). Set aside.",
      "In a small saucepan, heat 1 cup of beans over medium heat. Stir occasionally until warmed through, about 3-4 minutes. Keep warm.",
      "Dice ½ onion and ½ bell pepper. Sauté in 1 tablespoon oil over medium-high heat for 4-5 minutes until slightly charred and tender.",
      "Warm flour tortillas in a dry pan for 30 seconds per side, or wrap in a damp paper towel and microwave for 20-30 seconds until pliable.",
      "Lay tortillas flat. Spoon scrambled eggs down the center of each. Top with warm beans, sautéed vegetables, and a generous handful of shredded cheese.",
      "Add hot sauce to taste. Fold the bottom of the tortilla up over the filling, then fold in the sides. Roll tightly away from you into a burrito. Cut in half diagonally and serve."
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
      "Add 2 frozen bananas (peel and freeze ripe bananas overnight), 1 cup frozen berries, and ½ cup coconut milk to a high-speed blender. You want it thick like soft-serve ice cream.",
      "Blend on low, using the tamper to push ingredients down. Increase to high and blend for 30-60 seconds. The mixture should be very thick and creamy—add a splash more coconut milk only if needed.",
      "Pour the thick smoothie into a bowl, spreading it evenly. Work quickly as it will start to melt.",
      "Slice half a fresh banana. Arrange the banana slices in a row along one side of the bowl.",
      "Add ¼ cup fresh berries along another section. Sprinkle ¼ cup of oats or granola for crunch.",
      "Drizzle 1 tablespoon honey in a decorative pattern over the top. Serve immediately with a spoon—this melts quickly!"
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
      "Preheat your oven to 350°F (175°C). Generously grease a 12-cup muffin tin with butter or cooking spray to prevent sticking.",
      "In a large bowl, whisk together 8 eggs, ¼ cup milk, ½ teaspoon salt, and ¼ teaspoon pepper until well combined and slightly frothy.",
      "Finely chop 2 cups of fresh spinach and ¼ cup of onion. Divide the vegetables evenly among the 12 muffin cups—about 1-2 tablespoons per cup.",
      "Carefully pour the egg mixture over the vegetables in each cup, filling each about ¾ full. Stir gently with a fork to distribute.",
      "Sprinkle about 1 tablespoon of shredded cheese on top of each egg muffin.",
      "Bake for 18-22 minutes until the eggs are puffed and set in the center—a toothpick should come out clean. Let cool 2 minutes before removing from tin. Store refrigerated up to 4 days."
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
      "Season 2 chicken breasts with 1 teaspoon salt, ½ teaspoon pepper, and 1 teaspoon dried oregano. Let sit at room temperature for 10 minutes.",
      "Preheat a grill pan or outdoor grill to medium-high heat. Brush with olive oil. Grill chicken for 6-7 minutes per side until internal temperature reaches 165°F. Let rest 5 minutes, then slice into strips.",
      "While chicken rests, chop 1 head of romaine lettuce into bite-sized pieces. Dice 2 tomatoes and 1 cucumber into ½-inch cubes. Place in a large salad bowl.",
      "Add ½ cup of kalamata olives (pitted and halved) to the bowl. Crumble ½ cup feta cheese over the vegetables.",
      "Whisk together 3 tablespoons olive oil, juice of 1 lemon, ½ teaspoon oregano, salt, and pepper for the dressing.",
      "Arrange the sliced chicken on top of the salad. Drizzle the lemon-olive oil dressing over everything. Toss gently if desired, and serve immediately."
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
      "Bring a large pot of salted water to a rolling boil. Add 12 oz pasta and cook according to package directions until al dente (usually 8-10 minutes). Reserve 1 cup pasta water before draining.",
      "While pasta cooks, slice 1 bell pepper, 1 zucchini, and 2 tomatoes into thin strips. Mince 3 cloves of garlic.",
      "Heat a large skillet over medium-high heat. Add 3 tablespoons olive oil. When shimmering, add the garlic and cook for 30 seconds until fragrant—don't let it brown.",
      "Add the sliced vegetables to the pan. Sauté for 5-6 minutes, stirring occasionally, until the vegetables are tender-crisp with slight charring on the edges.",
      "Add the drained pasta directly to the skillet. Toss everything together, adding splashes of pasta water to create a light sauce that coats the pasta.",
      "Remove from heat. Tear fresh basil leaves over the top and sprinkle generously with freshly grated Parmesan cheese. Serve immediately in warm bowls."
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
      "Open 2 cans of tuna and drain well, pressing with a fork to remove excess liquid. Transfer to a medium bowl and flake with a fork.",
      "Add 3 tablespoons of sour cream (or mayonnaise) and 1 tablespoon of mustard to the tuna. Mix until creamy and well combined.",
      "Finely dice ¼ cup of onion and add to the tuna mixture. Season with salt and pepper to taste. Stir everything together.",
      "Toast 4 slices of bread until golden brown and slightly crispy. Let cool for 1 minute so they don't make the sandwich soggy.",
      "On 2 toast slices, layer lettuce leaves first, then add a thick layer of the tuna salad, and top with sliced tomatoes.",
      "Place the remaining toast slices on top. Press gently, cut diagonally, and serve immediately with chips or a pickle on the side."
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
      "Wash and dry 1 head of romaine lettuce thoroughly. Tear into 2-inch pieces and place in a large salad bowl. Refrigerate to keep crisp.",
      "For croutons: Cut 2 slices of bread into ¾-inch cubes. Toss with 2 tablespoons olive oil and 1 minced garlic clove. Spread on a baking sheet and toast at 375°F for 10-12 minutes until golden, stirring halfway.",
      "For the dressing: In a small bowl, whisk together the juice of 1 lemon, 1 egg yolk (or 1 tablespoon mayo for safety), 1 minced garlic clove, and ½ cup olive oil. Drizzle oil slowly while whisking to emulsify.",
      "Add ¼ cup finely grated Parmesan to the dressing. Whisk in salt and pepper to taste. The dressing should be creamy and tangy.",
      "Pour about ¾ of the dressing over the chilled lettuce. Toss gently to coat every leaf evenly.",
      "Transfer to serving plates, top with warm croutons, and shave additional Parmesan over the top using a vegetable peeler. Serve immediately."
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
    ingredientAmounts: [
      { id: "bread", amount: "4", unit: "slices" },
      { id: "cheese", amount: "4", unit: "slices" },
      { id: "butter", amount: "3", unit: "tbsp" },
      { id: "tomatoes", amount: "2", unit: "cups" },
      { id: "garlic", amount: "2", unit: "cloves" },
      { id: "basil", amount: "0.25", unit: "cup" },
    ],
  instructions: [
      "Spread 1 tablespoon of softened butter generously on one side of each bread slice. This is what creates the golden, crispy exterior.",
      "Place one bread slice butter-side down in a cold non-stick pan. Layer 2 slices of cheese (use a mix for best results—cheddar + gruyere works great). Top with second bread slice, butter-side up.",
      "Turn heat to medium-low. Cook slowly for 3-4 minutes. The low heat is crucial—it allows the cheese to melt fully before the bread burns. Press gently with a spatula.",
      "When the bottom is deep golden brown, carefully flip. Cook another 3-4 minutes until the second side is golden and cheese is completely melted and slightly oozing.",
      "While sandwich cooks, blend 2 cups canned tomatoes, 2 cloves garlic, and ¼ cup fresh basil in a blender until smooth. Transfer to a pot and simmer 10 minutes. Season with salt and pepper.",
      "Cut the grilled cheese diagonally. Serve immediately alongside a bowl of warm tomato soup for dipping."
    ],
    matchedIngredients: [],
    dietaryTags: ["vegetarian"],
    difficulty: "easy",
    nutrition: { calories: 520, protein: 18, carbs: 42, fat: 32 },
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
      "Pound 2 chicken breasts to ½-inch thickness for even cooking. Season both sides generously with salt, pepper, and garlic powder. Let rest 10 minutes.",
      "Preheat grill pan over medium-high heat. Brush with olive oil. Grill chicken 5-6 minutes per side until internal temp reaches 165°F. Rest 5 minutes, then slice into ½-inch strips.",
      "In a large bowl, combine 4 cups chopped romaine lettuce with 1 tablespoon olive oil and the juice of half a lemon. Toss to coat evenly.",
      "Warm 2 large flour tortillas in a dry pan for 30 seconds per side, or microwave in a damp towel for 15 seconds until pliable.",
      "Lay tortillas flat. Arrange dressed lettuce down the center of each. Top with sliced chicken and sprinkle with ¼ cup shaved Parmesan cheese per wrap.",
      "Fold the bottom edge up about 2 inches, then fold both sides in tightly. Roll away from you to create a sealed wrap. Slice in half diagonally and serve immediately."
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
    ingredientAmounts: [
      { id: "quinoa", amount: "1", unit: "cup" },
      { id: "cucumber", amount: "1", unit: "medium" },
      { id: "tomato", amount: "1", unit: "cup" },
      { id: "olives", amount: "0.5", unit: "cup" },
      { id: "cheese", amount: "0.5", unit: "cup" },
      { id: "lemon", amount: "2", unit: "tbsp" },
      { id: "olive-oil", amount: "2", unit: "tbsp" },
      { id: "parsley", amount: "0.25", unit: "cup" },
    ],
  instructions: [
      "Rinse 1 cup quinoa under cold water for 30 seconds to remove bitter coating. Add to pot with 2 cups water and ½ teaspoon salt. Bring to boil, reduce heat, cover, and simmer 15 minutes until water is absorbed.",
      "Fluff quinoa with a fork and spread on a baking sheet to cool for 10 minutes. Warm quinoa will make the salad soggy.",
      "While quinoa cools, dice 1 cucumber and 1 cup tomatoes into ½-inch cubes. Halve ½ cup olives. Chop ¼ cup fresh parsley.",
      "In a large bowl, combine the cooled quinoa with all the diced vegetables and parsley. Toss gently to mix.",
      "Crumble ½ cup feta cheese over the top. Whisk together 2 tablespoons lemon juice, 2 tablespoons olive oil, salt, and pepper.",
      "Drizzle the dressing over the bowl and toss gently to combine. Taste and adjust seasoning. Can be served immediately or chilled for up to 2 days."
    ],
    matchedIngredients: [],
    dietaryTags: ["vegetarian", "gluten-free"],
    difficulty: "easy",
    nutrition: { calories: 380, protein: 14, carbs: 42, fat: 18 },
  },
  {
    id: "soup-lentil",
    title: "Hearty Lentil Soup",
    mealType: "lunch",
    description: "Warming soup with lentils, vegetables, and aromatic spices",
    cookTime: "35 min",
    servings: 4,
    ingredients: ["beans", "carrot", "celery", "onion", "garlic", "tomatoes", "cumin", "olive-oil"],
    ingredientAmounts: [
      { id: "beans", amount: "1.5", unit: "cups" },
      { id: "carrot", amount: "2", unit: "medium" },
      { id: "celery", amount: "2", unit: "stalks" },
      { id: "onion", amount: "1", unit: "medium" },
      { id: "garlic", amount: "3", unit: "cloves" },
      { id: "tomatoes", amount: "1", unit: "can" },
      { id: "cumin", amount: "1", unit: "tsp" },
      { id: "olive-oil", amount: "2", unit: "tbsp" },
    ],
  instructions: [
      "Dice 1 medium onion, 2 carrots, and 2 celery stalks into ¼-inch pieces. This is called a mirepoix and forms the flavor base.",
      "Heat 2 tablespoons olive oil in a large pot over medium heat. Add the diced vegetables and cook for 5-6 minutes until softened and slightly golden.",
      "Add 3 minced garlic cloves and 1 teaspoon ground cumin. Stir constantly for 1 minute until very fragrant—the cumin should bloom and become aromatic.",
      "Add 1½ cups rinsed lentils, 1 can diced tomatoes, and 6 cups of water or vegetable broth. Stir to combine.",
      "Bring to a boil, then reduce heat to medium-low. Simmer uncovered for 25-30 minutes, stirring occasionally, until lentils are completely tender but not mushy.",
      "Season with 1 teaspoon salt and ½ teaspoon pepper, adjusting to taste. For a creamier soup, blend half with an immersion blender. Serve hot with crusty bread."
    ],
    matchedIngredients: [],
    dietaryTags: ["vegan", "gluten-free", "dairy-free"],
    difficulty: "easy",
    nutrition: { calories: 280, protein: 16, carbs: 42, fat: 6 },
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
      "Slice a fresh baguette or ciabatta in half lengthwise. Toast cut-side down in a pan with a drizzle of olive oil until light golden, about 2 minutes.",
      "Slice fresh mozzarella into ¼-inch thick rounds. Slice 2 ripe tomatoes to similar thickness. Pat tomatoes dry to prevent soggy bread.",
      "On the bottom half of bread, layer alternating slices of mozzarella and tomato, overlapping slightly. You want roughly equal amounts of each.",
      "Tuck 6-8 fresh basil leaves between the cheese and tomato layers, tearing larger leaves in half.",
      "Drizzle generously with 2 tablespoons extra virgin olive oil and 1 tablespoon balsamic vinegar (or balsamic glaze for a sweeter touch).",
      "Season with flaky sea salt and freshly cracked black pepper. Top with the other bread half if making a sandwich, or serve open-faced. Eat immediately."
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
      "Bring a large pot of water to boil. Cook 8 oz thin rice noodles or spaghetti according to package directions. Drain and immediately rinse under cold running water for 1 minute to stop cooking and remove starch.",
      "While noodles cook, julienne 1 carrot, 1 cucumber, and 1 bell pepper into thin matchstick-sized strips, about 2 inches long.",
      "In a small bowl, whisk together 3 tablespoons soy sauce, 1 tablespoon rice vinegar, 1 teaspoon minced fresh ginger, 2 minced garlic cloves, 2 tablespoons vegetable oil, and 1 teaspoon sesame oil.",
      "Transfer the cold, drained noodles to a large bowl. Add all the julienned vegetables and toss to combine.",
      "Pour the dressing over the noodle mixture. Toss thoroughly with tongs until everything is evenly coated.",
      "Cover and refrigerate for at least 30 minutes to let flavors meld. Serve cold, garnished with sesame seeds and chopped scallions."
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
      "Cut 2 ripe avocados in half lengthwise, running your knife around the pit. Twist to separate halves. Remove pit by carefully tapping it with your knife blade and twisting.",
      "Drain 2 cans of tuna well. Transfer to a bowl and flake with a fork. Finely dice ¼ cup red onion and 1 stalk celery into small pieces.",
      "Add the onion and celery to the tuna. Squeeze in the juice of half a lemon (about 1 tablespoon). Season with ½ teaspoon salt and ¼ teaspoon pepper.",
      "Mix everything together thoroughly. Taste and adjust seasoning as needed.",
      "Scoop out a little extra avocado flesh from each half to create a deeper well if needed. Divide the tuna mixture evenly among the 4 avocado halves, mounding it generously.",
      "Drizzle with a little extra olive oil and additional lemon juice. Serve immediately—avocado browns quickly once cut. Pair with crackers or eat with a fork."
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
      "Open and drain 1 can (15 oz) of chickpeas. Rinse thoroughly under cold water and drain well. Pat dry with paper towels for better texture.",
      "Dice 1 medium cucumber, 2 Roma tomatoes, and ¼ red onion into ½-inch pieces. Keep the pieces uniform for even bites.",
      "Finely chop ¼ cup fresh parsley leaves. You can also add fresh mint if you have it for extra brightness.",
      "In a large bowl, combine the chickpeas, diced vegetables, and chopped parsley. Toss gently to distribute.",
      "Whisk together the juice of 1 lemon, 3 tablespoons olive oil, ½ teaspoon salt, and a pinch of pepper for the dressing.",
      "Pour dressing over the salad and toss until everything is evenly coated. Taste and adjust seasoning. Serve immediately or refrigerate—this salad actually improves after 30 minutes."
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
      "Pat 4 chicken thighs or breasts completely dry with paper towels—this is essential for browning. Season generously on both sides with 1 teaspoon salt, ½ teaspoon pepper, and 1 teaspoon dried thyme.",
      "Heat a large heavy skillet (cast iron is ideal) over medium-high heat. Add 2 tablespoons butter. When it foams and the foam subsides, the pan is ready.",
      "Place chicken skin-side down (or smooth-side for boneless). Don't move it for 5-6 minutes until deep golden brown and releases easily. Flip and cook 5 more minutes.",
      "Reduce heat to medium. Push chicken to one side. Add 4 minced garlic cloves to the butter. Tilt pan and spoon the garlic butter over the chicken continuously for 2-3 minutes.",
      "Check internal temperature—chicken is done at 165°F. Remove to a cutting board and let rest 5 minutes. The juices will redistribute for juicier meat.",
      "Squeeze half a lemon over the resting chicken. Slice against the grain if desired. Serve with pan juices drizzled on top and lemon wedges on the side."
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
      "Slice 1 lb flank steak or sirloin against the grain into very thin strips (⅛-inch). Freezing the meat for 20 minutes makes slicing easier. Toss with 1 tablespoon soy sauce and set aside.",
      "Prep all vegetables: slice 1 bell pepper into strips, cut 2 cups broccoli into small florets, and slice 1 carrot into thin coins. Mince 3 cloves garlic and 1 inch fresh ginger.",
      "Heat a wok or large skillet over HIGH heat until smoking. Add 2 tablespoons vegetable oil. Working in batches to avoid crowding, sear the beef strips for 1-2 minutes until browned. Remove to a plate.",
      "Add another tablespoon of oil. Stir-fry the vegetables for 3-4 minutes until crisp-tender, starting with carrots, then adding broccoli and peppers.",
      "Push vegetables to sides. Add garlic and ginger to center. Stir for 30 seconds until fragrant. Add 3 tablespoons soy sauce and return the beef.",
      "Toss everything together for 1 minute until sauce coats all ingredients. Serve immediately over steamed white or brown rice."
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
      "Bring a large pot of salted water to boil. Cook 1 lb pasta until al dente (1 minute less than package says—it will finish in the sauce). Reserve 1 cup pasta water before draining.",
      "While pasta cooks, mince 4 garlic cloves and dice 1 small onion. Heat 3 tablespoons olive oil in a large pan over medium heat.",
      "Sauté onion for 4-5 minutes until translucent. Add garlic and cook 1 minute until fragrant. Add 1 can (28 oz) crushed tomatoes, ½ teaspoon salt, and a pinch of red pepper flakes.",
      "Simmer sauce for 10 minutes, stirring occasionally, until slightly thickened. Reduce heat to low.",
      "Stir in ½ cup heavy cream and ¼ cup fresh torn basil leaves. The sauce will turn a beautiful pink-orange color. Simmer 2 more minutes.",
      "Add drained pasta directly to the sauce. Toss, adding pasta water as needed to achieve a silky coating. Top with freshly grated Parmesan and more basil. Serve hot."
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
      "Cut 1 lb white fish (cod, tilapia, or mahi-mahi) into 2-inch pieces. Season generously with 1 teaspoon cumin, 1 teaspoon chili powder, ½ teaspoon salt, and ¼ teaspoon pepper.",
      "Place ½ cup flour in a shallow bowl. Dredge each fish piece in flour, shaking off excess. The coating should be light.",
      "Heat ¼ inch of vegetable oil in a skillet over medium-high heat to 350°F. Fry fish pieces for 2-3 minutes per side until golden brown and crispy. Drain on paper towels.",
      "Shred 2 cups of cabbage or lettuce. Dice 2 tomatoes. Mix ½ cup sour cream with juice of 1 lime and a pinch of salt for the crema.",
      "Warm corn or flour tortillas in a dry skillet for 30 seconds per side, or wrap in foil and heat in a 350°F oven for 10 minutes.",
      "Assemble tacos: Place 2-3 pieces of fish in each tortilla. Top with shredded lettuce, diced tomatoes, and a drizzle of lime crema. Serve with lime wedges."
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
      "Preheat your oven to 400°F (200°C). Line a baking sheet with parchment paper or foil for easy cleanup.",
      "Pat 2 salmon fillets (6 oz each) dry with paper towels. Place on the prepared baking sheet. Season with ½ teaspoon salt and ¼ teaspoon pepper.",
      "Mince 2 cloves of garlic. Strip leaves from 2-3 sprigs each of fresh thyme and rosemary. Scatter the garlic and herbs over the salmon.",
      "Slice 1 lemon into thin rounds. Arrange 2-3 lemon slices on top of each fillet, overlapping slightly.",
      "Drizzle 2 tablespoons olive oil generously over the fish, ensuring the herbs and garlic are coated.",
      "Bake for 12-15 minutes for medium (slightly pink center) or 15-18 minutes for well done. Fish should flake easily with a fork. Let rest 2 minutes before serving."
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
      "Dice 1 large onion. Mince 4 garlic cloves and 1 inch of fresh ginger (or use 1 teaspoon ground ginger). Cut 1½ lbs chicken thighs into 2-inch pieces.",
      "Heat 2 tablespoons oil in a large deep pan or Dutch oven over medium heat. Sauté onion for 5 minutes until softened and translucent.",
      "Add garlic and ginger. Cook 1 minute. Add 2 tablespoons curry powder (or curry paste). Stir constantly for 1 minute until very fragrant—this blooms the spices.",
      "Push aromatics to the side. Increase heat to medium-high. Add chicken pieces and brown on all sides, about 4-5 minutes. Don't stir too much—let it develop color.",
      "Add 1 can (14 oz) coconut milk and 1 can diced tomatoes. Stir to combine and scrape up any browned bits. Bring to a simmer.",
      "Reduce heat to medium-low. Simmer uncovered for 20-25 minutes until chicken is cooked through and sauce has thickened. Serve over basmati rice with fresh cilantro."
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
      "Bring a large pot of salted water to boil. Cook 12 oz linguine or spaghetti until al dente. Reserve 1 cup pasta water before draining.",
      "While pasta cooks, mince 6 cloves of garlic. Pat 1 lb large shrimp dry with paper towels and season with salt and pepper.",
      "In a large skillet, heat 2 tablespoons butter and 2 tablespoons olive oil over medium-high heat. Add shrimp in a single layer—don't crowd. Cook 1-2 minutes per side until pink. Remove to a plate.",
      "Reduce heat to medium. Add garlic to the pan and cook 30 seconds until fragrant. Add the juice of 2 lemons and ½ cup pasta water. Simmer 2 minutes.",
      "Add 2 more tablespoons butter and swirl until melted. Return shrimp to the pan. Add drained pasta and toss everything together.",
      "Add ¼ cup fresh chopped parsley and toss again. Season with salt and pepper to taste. Serve immediately with additional lemon wedges."
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
      "Preheat oven to 375°F (190°C). Cut the tops off 4 large bell peppers about ½ inch from the top. Remove the seeds and white membranes. Stand peppers upright in a baking dish.",
      "Cook 1 cup rice according to package directions. Meanwhile, brown 1 lb ground beef in a large skillet over medium-high heat for 6-8 minutes, breaking into crumbles. Drain excess fat.",
      "Add 1 diced onion and 3 minced garlic cloves to the beef. Cook 3-4 minutes until softened. Stir in 1 can diced tomatoes, cooked rice, and 1 teaspoon Italian seasoning. Season with salt and pepper.",
      "Carefully spoon the beef and rice mixture into each pepper, packing firmly and mounding at the top. Each pepper should be generously filled.",
      "Cover the baking dish with foil. Bake for 30 minutes. Remove foil, top each pepper with ¼ cup shredded cheese, and bake uncovered 10 more minutes until cheese is melted and bubbly.",
      "Let rest 5 minutes before serving. The peppers should be tender but still hold their shape. Serve with a side salad or crusty bread."
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
      "Remove 2 bone-in pork chops (1-inch thick) from refrigerator 30 minutes before cooking. Pat completely dry with paper towels. Season generously on both sides with 1 teaspoon salt, ½ teaspoon pepper, and 1 teaspoon dried thyme.",
      "Heat a large cast-iron skillet over medium-high heat until very hot, about 3 minutes. Add 1 tablespoon vegetable oil. Place pork chops in pan—you should hear an immediate sizzle.",
      "Sear without moving for 4 minutes until a deep golden-brown crust forms. Flip and cook another 3 minutes. The internal temperature should reach 145°F.",
      "Reduce heat to medium. Push chops to one side. Add 2 tablespoons butter, 3 sliced garlic cloves, and 1 apple (cored and sliced into ½-inch wedges) to the pan.",
      "Drizzle 2 tablespoons honey over the apples and chops. Tilt pan and use a spoon to continuously baste the pork with the honey-butter mixture for 2-3 minutes until apples are golden.",
      "Remove from heat. Let pork rest on a cutting board for 5 minutes—the temperature will rise to 150°F. Serve with the glazed apples and pan juices spooned over top."
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
      "Prep all vegetables before heating the wok: Cut 2 cups broccoli into small florets. Slice 1 bell pepper into strips. Slice 1 carrot into thin coins. Slice 8 oz mushrooms. Mince 3 garlic cloves and 1 inch fresh ginger.",
      "Heat a wok or large skillet over HIGH heat until smoking, about 2-3 minutes. Add 2 tablespoons vegetable oil and swirl to coat. The oil should shimmer immediately.",
      "Add the carrots first (they take longest). Stir-fry 1 minute. Add broccoli, toss for 2 minutes. Add bell peppers and mushrooms, stir-fry another 2 minutes. Vegetables should be crisp-tender and slightly charred.",
      "Push vegetables to the sides of the wok, creating a well in the center. Add 1 tablespoon oil to the center. Add garlic and ginger, stir for 30 seconds until very fragrant.",
      "Toss everything together. Add 3 tablespoons soy sauce around the edges of the wok (it will sizzle and reduce). Toss again until all vegetables are evenly coated.",
      "Remove from heat immediately to prevent overcooking. Serve over steamed rice. Garnish with sesame seeds and sliced green onions if desired."
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
      "Bring a large pot of salted water to boil. Cook 1 lb spaghetti until al dente (1 minute less than package says). Reserve 1 cup pasta water before draining.",
      "While pasta cooks, cut 6 oz pancetta or guanciale into ½-inch cubes. Place in a cold large skillet, then turn heat to medium. Cook 8-10 minutes, stirring occasionally, until fat renders and meat is crispy. Remove from heat.",
      "In a bowl, whisk 4 egg yolks plus 2 whole eggs with 1 cup finely grated Pecorino Romano or Parmesan. Add 1 teaspoon freshly cracked black pepper. The mixture should be thick and creamy.",
      "Add the hot drained pasta directly to the pan with the pancetta (off heat!). Toss vigorously to coat pasta in the rendered fat.",
      "Working quickly while pasta is still very hot, pour the egg-cheese mixture over the pasta. Toss constantly for 2 minutes—the residual heat will cook the eggs into a creamy sauce. Add splashes of pasta water if it seems dry.",
      "The sauce should be silky and coat each strand. If eggs scramble, the pan was too hot. Serve immediately with more pepper and grated cheese on top."
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
      "Cook 2 cups jasmine rice according to package. Fluff with fork and keep warm. Cut 1½ lbs chicken thighs into 2-inch pieces.",
      "Make teriyaki sauce: In a small saucepan, whisk ½ cup soy sauce, ¼ cup honey, 3 minced garlic cloves, 1 tablespoon grated ginger, and 2 tablespoons water. Simmer 5 minutes until slightly thickened. Reserve half for serving.",
      "Heat a large skillet or grill pan over medium-high heat. Add 1 tablespoon oil. Cook chicken pieces 4-5 minutes per side until cooked through and slightly charred.",
      "Brush chicken generously with teriyaki sauce during the last 2 minutes of cooking. Let it caramelize slightly, turning to glaze all sides.",
      "Meanwhile, steam 2 cups broccoli florets and 1 sliced carrot for 4-5 minutes until bright and tender-crisp. Season with a pinch of salt.",
      "Divide rice among 4 bowls. Arrange teriyaki chicken on one side and steamed vegetables on the other. Drizzle reserved sauce over everything. Garnish with sesame seeds and sliced green onions."
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
      "Heat 6 cups chicken or vegetable broth in a saucepan and keep at a low simmer throughout cooking. Slice 12 oz mixed mushrooms. Dice 1 small onion and mince 3 garlic cloves.",
      "In a large skillet, heat 2 tablespoons olive oil over medium-high heat. Add mushrooms in a single layer—don't crowd. Cook without stirring 3 minutes until browned. Stir, cook 2 more minutes. Season with salt, remove and set aside.",
      "In a large heavy-bottomed pot, melt 2 tablespoons butter over medium heat. Add onion, cook 4 minutes until soft. Add garlic, cook 1 minute. Add 1½ cups Arborio rice, stir 2 minutes until edges look translucent.",
      "Add 1 cup warm broth to the rice. Stir constantly until liquid is almost absorbed. Continue adding broth ½ cup at a time, stirring constantly and waiting until each addition is absorbed before adding more. This takes 18-22 minutes total.",
      "When rice is creamy but still has a slight bite, remove from heat. Stir in 2 tablespoons butter, ¾ cup grated Parmesan, and 1 teaspoon fresh thyme leaves. Season with salt and pepper.",
      "Divide risotto among plates. Top with the sautéed mushrooms. Drizzle with good olive oil and add more Parmesan. Serve immediately—risotto waits for no one!"
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
      "Heat a large skillet over medium-high heat. Add 1 lb ground beef, breaking into crumbles with a wooden spoon. Cook 6-8 minutes until no pink remains. Drain excess fat, leaving about 1 tablespoon in the pan.",
      "Add ½ diced onion to the beef. Cook 3 minutes until softened. Add 2 tablespoons taco seasoning (or 1 teaspoon each cumin, chili powder, paprika, plus ½ teaspoon garlic powder and salt).",
      "Pour in ½ cup water. Stir well to combine seasoning with meat. Reduce heat to medium-low and simmer 5 minutes until liquid reduces and mixture is thick and saucy.",
      "Meanwhile, prep your toppings: Shred 2 cups lettuce. Dice 2 tomatoes. Shred 1 cup cheese. Warm taco shells in a 300°F oven for 5 minutes or according to package directions.",
      "Set up a taco bar with warm shells, seasoned beef, and all toppings in separate bowls. Let everyone build their own tacos.",
      "Assemble tacos: Add a generous spoonful of beef to each shell. Layer with lettuce, tomatoes, cheese, and a dollop of sour cream. Serve immediately with lime wedges and hot sauce on the side."
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
      "Start rice first: Cook 1½ cups jasmine rice according to package. Keep warm. Pat 1 lb large shrimp dry and season with salt and pepper.",
      "Heat 1 tablespoon oil in a large skillet over medium heat. Add 3 minced garlic cloves and 1 tablespoon minced fresh ginger. Stir 30 seconds until fragrant—don't let it brown.",
      "Add 2 tablespoons curry powder and 1 sliced bell pepper. Stir for 2 minutes until curry is aromatic and pepper starts to soften.",
      "Pour in 1 can (14 oz) coconut milk and ½ cup chicken broth. Stir to combine. Bring to a simmer and cook 5 minutes until sauce thickens slightly.",
      "Add the shrimp to the curry. Cook 3-4 minutes, stirring occasionally, until shrimp turn pink and curl into a C-shape. Don't overcook—they'll become rubbery.",
      "Remove from heat. Squeeze in the juice of 1 lime and stir. Taste and adjust salt. Serve immediately over jasmine rice, garnished with fresh cilantro and lime wedges."
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
      "Preheat oven to 375°F (190°C). Bring a large pot of salted water to boil. Cook 1 lb ziti pasta for 2 minutes less than package directions (it will finish in the oven). Drain and set aside.",
      "In a bowl, mix 15 oz ricotta cheese with 1 beaten egg, ¼ cup chopped fresh basil, 2 minced garlic cloves, ½ teaspoon salt, and ¼ teaspoon pepper until smooth.",
      "Spread ½ cup marinara sauce on the bottom of a 9x13 inch baking dish. Add half the pasta, spreading evenly.",
      "Dollop half the ricotta mixture over pasta. Pour 1 cup marinara over ricotta. Sprinkle with 1 cup shredded mozzarella. Repeat layers with remaining pasta, ricotta, and sauce.",
      "Top with remaining 1 cup mozzarella and ¼ cup grated Parmesan. Cover tightly with foil and bake 25 minutes.",
      "Remove foil and bake 15-20 more minutes until cheese is golden and bubbly. Let rest 10 minutes before serving—this helps it set up for easier portioning."
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
      "Pat 4 bone-in, skin-on chicken thighs very dry with paper towels—this is crucial for crispy skin. Season both sides generously with 1 teaspoon salt and ½ teaspoon pepper.",
      "Place thighs skin-side down in a cold large skillet. Turn heat to medium. Cook without moving for 12-15 minutes. The fat will render slowly and skin will become deeply golden and crispy.",
      "Flip thighs. Add 2 tablespoons butter and 6 smashed garlic cloves to the pan. Cook 5 minutes, spooning the melted butter over the chicken.",
      "In a small bowl, whisk together ¼ cup honey, 3 tablespoons soy sauce, and 1 teaspoon fresh thyme leaves. Pour mixture into the pan around the chicken.",
      "Continue cooking 5-7 more minutes, basting constantly with the glaze, until internal temperature reaches 175°F. The sauce will thicken and become sticky.",
      "Let rest 5 minutes before serving. Spoon the pan sauce over each thigh. Serve with rice or mashed potatoes to soak up the delicious glaze."
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
      "Preheat oven to 375°F (190°C). Slice 2 medium zucchini, 8 oz mushrooms. Thaw and squeeze dry 10 oz frozen spinach. Mince 4 garlic cloves. Sauté vegetables in batches in 2 tablespoons olive oil until tender, 4-5 minutes each batch.",
      "Make béchamel sauce: Melt 4 tablespoons butter in a saucepan over medium heat. Whisk in ¼ cup flour, cook 1 minute. Slowly whisk in 3 cups milk. Simmer 5 minutes until thickened. Stir in 1 cup Parmesan and season with salt, pepper, and nutmeg.",
      "Cook 12 lasagna noodles according to package (or use no-boil noodles). Lay flat on oiled parchment to prevent sticking.",
      "Spread ½ cup sauce in a 9x13 inch pan. Layer: 3 noodles, ⅓ vegetables, ⅓ remaining sauce, ½ cup mozzarella. Repeat layers twice, ending with noodles, sauce, and cheese on top.",
      "Cover tightly with foil. Bake 30 minutes. Remove foil and bake 15 more minutes until golden and bubbling around the edges.",
      "Let rest 15 minutes before cutting—this is essential or it will be too runny. Garnish with fresh basil. Can be made a day ahead and refrigerated."
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
      "Slice 1 lb flank steak against the grain into very thin strips (freeze for 20 minutes to make slicing easier). Marinate in 2 tablespoons soy sauce for 15 minutes while you prep other ingredients.",
      "Cut 4 cups broccoli into small florets. Bring a pot of salted water to boil. Blanch broccoli for 2 minutes until bright green and slightly tender. Immediately drain and rinse with cold water to stop cooking.",
      "Heat wok or large skillet over HIGH heat until smoking. Add 2 tablespoons vegetable oil. Add beef in a single layer—work in batches to avoid steaming. Sear 1 minute per side until browned. Remove to a plate.",
      "Add 1 more tablespoon oil. Add 4 minced garlic cloves and 1 tablespoon minced ginger. Stir 30 seconds until fragrant.",
      "Add blanched broccoli. Stir-fry 1 minute. Add ¼ cup soy sauce, 2 tablespoons oyster sauce, and 1 tablespoon brown sugar. Return beef to pan. Toss 1 minute until sauce coats everything.",
      "Serve immediately over steamed white rice. Garnish with sesame seeds. The beef should be tender and the broccoli crisp-tender with a glossy sauce."
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
      "Press 14 oz extra-firm tofu: Wrap in paper towels, place on a plate, and set a heavy pan on top for 15-20 minutes. This removes moisture for crispier tofu. Cut into ¾-inch cubes.",
      "Heat a large non-stick skillet over medium-high heat with 2 tablespoons vegetable oil. Add tofu cubes in a single layer. Don't stir for 3-4 minutes until bottom is golden. Flip and brown other sides. Remove to a plate.",
      "Prep vegetables: Cut 2 cups broccoli into florets, slice 1 bell pepper into strips, and slice 1 carrot into thin coins. Mince 3 garlic cloves and 1 inch fresh ginger.",
      "In the same skillet, add 1 tablespoon oil over high heat. Add vegetables and stir-fry 3-4 minutes until crisp-tender with slight char.",
      "Push vegetables to sides. Add garlic and ginger to the center. Stir 30 seconds. Add crispy tofu back to pan along with 3 tablespoons soy sauce and 1 tablespoon sesame oil.",
      "Toss everything together for 1 minute until sauce coats all ingredients. Serve immediately over steamed rice. Top with sliced green onions and sesame seeds."
    ],
    matchedIngredients: [],
  },
  // ============ ITALIAN CLASSICS ============
  {
    id: "chicken-piccata",
    title: "Chicken Piccata",
    mealType: "dinner",
    description: "Pan-seared chicken cutlets in a bright lemon-caper butter sauce",
    cookTime: "25 min",
    servings: 4,
    ingredients: ["chicken", "flour", "butter", "lemon", "capers", "garlic", "parsley", "salt", "pepper", "olive-oil"],
    ingredientAmounts: [
      { id: "chicken", amount: "4", unit: "breasts" },
      { id: "flour", amount: "0.5", unit: "cup" },
      { id: "butter", amount: "4", unit: "tbsp" },
      { id: "lemon", amount: "2", unit: "medium" },
      { id: "capers", amount: "3", unit: "tbsp" },
      { id: "garlic", amount: "3", unit: "cloves" },
      { id: "parsley", amount: "0.25", unit: "cup" },
      { id: "salt", amount: "1", unit: "tsp" },
      { id: "pepper", amount: "0.5", unit: "tsp" },
      { id: "olive-oil", amount: "3", unit: "tbsp" },
    ],
    instructions: [
      "Place 4 chicken breasts between plastic wrap. Using a meat mallet or rolling pin, pound to an even ½-inch thickness. This ensures even cooking. Season both sides with salt and pepper.",
      "Set up a breading station: Place ½ cup flour on a plate. Dredge each chicken breast in flour, shaking off excess. The coating should be thin and even.",
      "Heat 3 tablespoons olive oil in a large skillet over medium-high heat until shimmering. Add chicken breasts (work in batches if needed). Cook 3-4 minutes per side until golden brown and cooked through. Transfer to a plate and tent with foil.",
      "Reduce heat to medium. Add 3 minced garlic cloves, cook 30 seconds. Add the juice of 2 lemons (about ⅓ cup) and 3 tablespoons brined capers. Simmer 2 minutes, scraping up browned bits from the pan.",
      "Remove from heat. Add 4 tablespoons cold butter, one tablespoon at a time, swirling pan until each piece melts into a silky sauce. Season with salt if needed.",
      "Return chicken to pan and spoon sauce over each piece. Garnish generously with chopped fresh parsley. Serve immediately with pasta or crusty bread to soak up the sauce."
    ],
    matchedIngredients: [],
    dietaryTags: ["dairy-free"],
    difficulty: "medium",
    nutrition: { calories: 420, protein: 38, carbs: 12, fat: 24 },
  },
  {
    id: "chicken-marsala",
    title: "Chicken Marsala",
    mealType: "dinner",
    description: "Tender chicken in a rich mushroom Marsala wine sauce",
    cookTime: "30 min",
    servings: 4,
    ingredients: ["chicken", "mushroom", "flour", "butter", "garlic", "parsley", "salt", "pepper", "olive-oil"],
    ingredientAmounts: [
      { id: "chicken", amount: "4", unit: "breasts" },
      { id: "mushroom", amount: "8", unit: "oz" },
      { id: "flour", amount: "0.5", unit: "cup" },
      { id: "butter", amount: "4", unit: "tbsp" },
      { id: "garlic", amount: "3", unit: "cloves" },
      { id: "parsley", amount: "0.25", unit: "cup" },
      { id: "salt", amount: "1", unit: "tsp" },
      { id: "pepper", amount: "0.5", unit: "tsp" },
      { id: "olive-oil", amount: "3", unit: "tbsp" },
    ],
    instructions: [
      "Pound 4 chicken breasts between plastic wrap to ½-inch thickness. Season generously with 1 teaspoon salt and ½ teaspoon pepper. Dredge in ½ cup flour, shaking off excess.",
      "Heat 3 tablespoons olive oil in a large skillet over medium-high heat. Cook chicken 3-4 minutes per side until golden brown. Internal temp should reach 165°F. Transfer to a plate.",
      "Add 1 tablespoon butter to the pan. Add 8 oz sliced cremini mushrooms in a single layer. Cook without stirring 3 minutes, then stir and cook 3 more minutes until deeply browned.",
      "Add 3 minced garlic cloves. Stir 30 seconds until fragrant. Add ½ cup chicken broth, scraping up browned bits. (Note: Traditional recipe uses Marsala wine—add ½ cup if you have it.)",
      "Simmer 3-4 minutes until sauce reduces by half. Stir in 2 tablespoons cold butter until melted and sauce is glossy. Season with salt and pepper.",
      "Nestle chicken back into the pan. Spoon mushrooms and sauce over each cutlet. Simmer 2 minutes to rewarm chicken. Garnish with ¼ cup fresh chopped parsley. Serve over mashed potatoes or pasta."
    ],
    matchedIngredients: [],
    difficulty: "medium",
    nutrition: { calories: 460, protein: 40, carbs: 14, fat: 28 },
  },
  {
    id: "chicken-parmesan",
    title: "Chicken Parmesan",
    mealType: "dinner",
    description: "Crispy breaded chicken topped with marinara and melted mozzarella",
    cookTime: "35 min",
    servings: 4,
    ingredients: ["chicken", "bread-crumbs", "parmesan", "mozzarella", "eggs", "tomato-sauce", "garlic", "basil", "olive-oil"],
    ingredientAmounts: [
      { id: "chicken", amount: "4", unit: "breasts" },
      { id: "bread-crumbs", amount: "1", unit: "cup" },
      { id: "parmesan", amount: "0.5", unit: "cup" },
      { id: "mozzarella", amount: "1", unit: "cup" },
      { id: "eggs", amount: "2", unit: "large" },
      { id: "tomato-sauce", amount: "2", unit: "cups" },
      { id: "garlic", amount: "3", unit: "cloves" },
      { id: "basil", amount: "0.25", unit: "cup" },
      { id: "olive-oil", amount: "0.25", unit: "cup" },
    ],
    instructions: [
      "Preheat oven to 425°F (220°C). Pound 4 chicken breasts to ½-inch thickness between plastic wrap. Set up a breading station: flour in one dish, 2 beaten eggs in another, and a mixture of 1 cup breadcrumbs + ½ cup grated Parmesan in a third.",
      "Dredge each chicken breast in flour (shake off excess), then dip in egg (let excess drip off), then press firmly into the breadcrumb mixture, coating both sides well.",
      "Heat ¼ cup olive oil in a large oven-safe skillet over medium-high heat. When oil shimmers, add breaded chicken. Fry 3-4 minutes per side until deep golden brown and crispy. Don't move the chicken while it cooks.",
      "Spoon 2 cups warm marinara sauce over each chicken breast. Top each with ¼ cup shredded mozzarella.",
      "Transfer skillet to oven (or transfer chicken to a baking dish). Bake 10-15 minutes until cheese is melted, bubbling, and starting to brown.",
      "Let rest 5 minutes. Garnish with fresh basil leaves and additional Parmesan. Serve over spaghetti tossed with extra marinara sauce."
    ],
    matchedIngredients: [],
    difficulty: "medium",
    nutrition: { calories: 580, protein: 52, carbs: 28, fat: 30 },
  },
  {
    id: "eggplant-parmesan",
    title: "Eggplant Parmesan",
    mealType: "dinner",
    description: "Layers of crispy eggplant with marinara and melted cheese",
    cookTime: "45 min",
    servings: 6,
    ingredients: ["eggplant", "bread-crumbs", "parmesan", "mozzarella", "eggs", "tomato-sauce", "garlic", "basil", "olive-oil"],
    instructions: [
      "Slice 2 large eggplants into ½-inch rounds. Arrange on paper towels and sprinkle both sides with salt. Let sit 30 minutes—this draws out bitter moisture. Pat very dry with paper towels.",
      "Set up breading: flour in one dish, 3 beaten eggs in another, 2 cups breadcrumbs mixed with ½ cup Parmesan in a third. Dredge each slice in flour, dip in egg, then coat in breadcrumbs.",
      "Heat ¼ inch vegetable oil in a large skillet over medium-high heat. Fry eggplant slices in batches, 2-3 minutes per side until deep golden brown. Drain on paper towel-lined rack.",
      "Preheat oven to 375°F. Spread 1 cup marinara in a 9x13 inch baking dish. Layer ⅓ of eggplant, ⅓ remaining sauce, ⅓ of 2 cups mozzarella. Repeat layers twice.",
      "Cover with foil and bake 25 minutes. Remove foil and bake 20 more minutes until cheese is golden and sauce is bubbling vigorously.",
      "Rest 10-15 minutes before serving—this is crucial for the layers to set. Garnish with fresh basil. Serve with crusty bread to soak up the sauce."
    ],
    matchedIngredients: [],
  },
  {
    id: "fettuccine-alfredo",
    title: "Fettuccine Alfredo",
    mealType: "dinner",
    description: "Creamy parmesan pasta with butter and garlic",
    cookTime: "20 min",
    servings: 4,
    ingredients: ["pasta", "butter", "parmesan", "cream", "garlic", "salt", "pepper", "parsley"],
    instructions: [
      "Bring a large pot of generously salted water to boil. Cook 1 lb fettuccine according to package directions until al dente. Reserve 1 cup pasta water before draining.",
      "While pasta cooks, melt 4 tablespoons butter in a large skillet over medium heat. Add 3 minced garlic cloves and cook 1 minute until fragrant but not browned.",
      "Pour in 1½ cups heavy cream. Bring to a gentle simmer and cook 3-4 minutes until slightly thickened. The sauce should coat the back of a spoon.",
      "Remove from heat. Gradually stir in 1½ cups freshly grated Parmesan cheese, stirring constantly until completely melted and smooth. Season with ½ teaspoon salt and ¼ teaspoon pepper.",
      "Add the hot drained pasta directly to the sauce. Toss vigorously with tongs until every strand is coated. Add splashes of pasta water if sauce seems too thick.",
      "Divide among warm bowls. Top with extra Parmesan, freshly cracked black pepper, and chopped fresh parsley. Serve immediately—Alfredo waits for no one!"
    ],
    matchedIngredients: [],
  },
  {
    id: "penne-vodka",
    title: "Penne alla Vodka",
    mealType: "dinner",
    description: "Penne in creamy tomato sauce with a hint of spice",
    cookTime: "25 min",
    servings: 4,
    ingredients: ["pasta", "tomato-sauce", "cream", "garlic", "onion", "parmesan", "basil", "red-pepper-flakes", "olive-oil"],
    instructions: [
      "Bring a large pot of salted water to boil. Cook 1 lb penne until al dente, about 1 minute less than package directions. Reserve 1 cup pasta water, then drain.",
      "Heat 2 tablespoons olive oil in a large skillet over medium heat. Add 1 diced small onion and cook 5 minutes until soft. Add 4 minced garlic cloves, cook 1 minute.",
      "Add 1 can (28 oz) crushed tomatoes and ½ teaspoon red pepper flakes. Simmer 10 minutes, stirring occasionally, until sauce thickens slightly.",
      "Reduce heat to low. Stir in ¾ cup heavy cream. The sauce will turn a beautiful orange-pink color. Simmer 3 more minutes. (Note: Traditional recipe uses vodka—add ½ cup before cream if desired.)",
      "Add drained pasta to the sauce. Toss well, adding pasta water as needed for silky consistency. Remove from heat and stir in ½ cup grated Parmesan.",
      "Divide among plates. Top with more Parmesan, fresh torn basil leaves, and a drizzle of olive oil. Serve immediately while hot."
    ],
    matchedIngredients: [],
  },
  // ============ MEXICAN FAVORITES ============
  {
    id: "chicken-enchiladas",
    title: "Chicken Enchiladas",
    mealType: "dinner",
    description: "Rolled tortillas filled with seasoned chicken and smothered in enchilada sauce",
    cookTime: "40 min",
    servings: 6,
    ingredients: ["chicken", "tortillas", "cheese", "onion", "garlic", "cumin", "tomato-sauce", "sour-cream", "cilantro"],
    instructions: [
      "Preheat oven to 375°F (190°C). Poach 1½ lbs chicken breasts in simmering salted water for 18-20 minutes until cooked through. Let cool slightly, then shred with two forks into bite-sized pieces.",
      "Mix shredded chicken with 1 cup shredded cheese, 1 teaspoon cumin, ½ teaspoon garlic powder, and salt to taste. This is your filling.",
      "Warm 8-10 flour tortillas in the microwave for 30 seconds to make them pliable. Spread 2 cups enchilada sauce in the bottom of a 9x13 inch baking dish.",
      "Place ¼ cup filling down the center of each tortilla. Roll tightly and place seam-side down in the dish. Pack them snugly together.",
      "Pour 2 more cups enchilada sauce over the rolled tortillas, making sure to coat them completely. Top with 1½ cups shredded cheese.",
      "Bake uncovered 25-30 minutes until sauce is bubbling and cheese is melted and lightly browned. Let rest 5 minutes. Serve topped with sour cream, fresh cilantro, and diced onion."
    ],
    matchedIngredients: [],
  },
  {
    id: "carnitas",
    title: "Mexican Carnitas",
    mealType: "dinner",
    description: "Slow-cooked pulled pork with citrus and spices",
    cookTime: "3 hours",
    servings: 8,
    ingredients: ["pork", "orange", "lime", "garlic", "cumin", "oregano", "salt", "pepper", "vegetable-oil"],
    instructions: [
      "Cut 3 lbs pork shoulder (pork butt) into 3-inch chunks. Season generously with 1 tablespoon salt, 2 teaspoons cumin, 1 teaspoon oregano, ½ teaspoon pepper, and 6 minced garlic cloves. Rub spices into all surfaces.",
      "Place pork in a Dutch oven or slow cooker. Add the juice of 2 oranges and 2 limes, plus their spent halves. Add 1 bay leaf and enough water to come halfway up the meat.",
      "For oven: Cover and braise at 300°F for 3-3½ hours. For slow cooker: Cook on low 8-10 hours. Meat is done when it falls apart with a fork.",
      "Remove pork from liquid. Shred with two forks into bite-sized pieces, discarding large pieces of fat. Reserve ½ cup of the cooking liquid.",
      "For crispy carnitas: Spread shredded pork on a sheet pan. Drizzle with reserved cooking liquid. Broil 4-5 minutes until edges are crispy and caramelized. Toss, broil 3 more minutes.",
      "Serve in warm corn tortillas with diced white onion, fresh cilantro, salsa verde, and lime wedges. The crispy-juicy contrast is what makes great carnitas!"
    ],
    matchedIngredients: [],
  },
  {
    id: "burrito-bowl",
    title: "Chicken Burrito Bowl",
    mealType: "lunch",
    description: "Deconstructed burrito with rice, beans, and fresh toppings",
    cookTime: "30 min",
    servings: 4,
    ingredients: ["chicken", "rice", "beans", "corn", "tomato", "avocado", "lettuce", "cheese", "lime", "cilantro"],
    instructions: [
      "Cook 1½ cups long-grain rice according to package. Fluff with fork and stir in juice of 1 lime and ¼ cup chopped cilantro. Cover to keep warm.",
      "Season 1½ lbs chicken breast with 1 teaspoon cumin, 1 teaspoon chili powder, salt, and pepper. Grill over medium-high heat 6-7 minutes per side until internal temp reaches 165°F. Let rest 5 minutes, then slice into strips.",
      "Heat 1 can black beans in a small pot with a pinch of cumin and salt. Keep warm. Prepare toppings: dice 2 tomatoes, shred 2 cups lettuce, slice 1 avocado.",
      "Divide cilantro-lime rice among 4 bowls. Arrange sliced chicken on one section of each bowl.",
      "Add black beans, lettuce, diced tomatoes, corn, and avocado slices in separate sections around the bowl. Sprinkle with ½ cup shredded cheese.",
      "Serve with salsa, sour cream, and extra lime wedges on the side. Let everyone customize their bowl to their liking."
    ],
    matchedIngredients: [],
  },
  {
    id: "quesadilla",
    title: "Chicken Quesadilla",
    mealType: "lunch",
    description: "Crispy tortilla filled with melted cheese and seasoned chicken",
    cookTime: "15 min",
    servings: 2,
    ingredients: ["chicken", "tortillas", "cheese", "bell-pepper", "onion", "cumin", "sour-cream", "salsa"],
    instructions: [
      "Season 8 oz chicken breast with ½ teaspoon cumin, salt, and pepper. Cook in an oiled skillet over medium-high heat for 6-7 minutes per side until internal temp reaches 165°F. Let rest 5 minutes, then slice into thin strips.",
      "In the same pan, add 1 tablespoon oil. Sauté ½ sliced bell pepper and ¼ sliced onion over medium-high heat for 4-5 minutes until slightly charred and tender. Season with salt.",
      "Lay a large flour tortilla flat. Spread 1 cup shredded cheese over half of the tortilla. Top cheese with sliced chicken and sautéed vegetables.",
      "Fold the empty half over the filling to create a half-moon. Press gently.",
      "Heat a clean non-stick pan over medium heat. Place quesadilla in dry pan. Cook 2-3 minutes until bottom is golden brown and crispy. Flip carefully and cook 2-3 more minutes until cheese is fully melted.",
      "Transfer to cutting board. Let rest 1 minute, then cut into 4 triangular wedges. Serve immediately with sour cream and salsa for dipping."
    ],
    matchedIngredients: [],
  },
  // ============ ASIAN CUISINE ============
  {
    id: "pad-thai",
    title: "Pad Thai",
    mealType: "dinner",
    description: "Classic Thai stir-fried rice noodles with shrimp and peanuts",
    cookTime: "25 min",
    servings: 4,
    ingredients: ["shrimp", "eggs", "garlic", "green-onion", "bean-sprouts", "peanuts", "lime", "vegetable-oil"],
    instructions: [
      "Place 8 oz rice noodles in a large bowl. Cover with warm (not boiling) water and soak for 30-40 minutes until soft and pliable but not mushy. Drain well.",
      "Make the sauce: Whisk together 3 tablespoons fish sauce, 2 tablespoons tamarind paste (or lime juice), 2 tablespoons brown sugar, and 1 tablespoon soy sauce. Set aside.",
      "Heat a wok or large skillet over HIGH heat. Add 2 tablespoons oil. Add 8 oz shrimp, stir-fry 2 minutes until pink. Push to the side. Crack 2 eggs into the wok, scramble for 30 seconds.",
      "Add drained noodles and the sauce. Toss vigorously with tongs for 2 minutes, lifting and separating noodles so they cook evenly and absorb the sauce.",
      "Add 1 cup bean sprouts and 3 sliced green onions. Toss 30 more seconds just to warm through—sprouts should stay crunchy.",
      "Transfer to plates. Top with ¼ cup crushed roasted peanuts and fresh lime wedges. Serve immediately. Optional: Add fresh cilantro and chili flakes."
    ],
    matchedIngredients: [],
  },
  {
    id: "fried-rice",
    title: "Classic Fried Rice",
    mealType: "dinner",
    description: "Savory wok-fried rice with vegetables and eggs",
    cookTime: "20 min",
    servings: 4,
    ingredients: ["rice", "eggs", "carrot", "peas", "green-onion", "garlic", "soy-sauce", "vegetable-oil"],
    instructions: [
      "The secret to great fried rice is using DAY-OLD COLD RICE. Cook 3 cups rice a day ahead, spread on a sheet pan, and refrigerate uncovered. Fresh rice will be gummy.",
      "Prep all ingredients before cooking—this goes fast! Dice 1 carrot into small cubes. Thaw ½ cup frozen peas. Mince 3 garlic cloves. Slice 4 green onions (separate white and green parts).",
      "Heat a wok over HIGH heat until smoking. Add 2 tablespoons vegetable oil. Beat 2 eggs and pour into wok. Scramble quickly into small pieces (about 20 seconds). Remove to a plate.",
      "Add 1 more tablespoon oil. Add diced carrots, cook 1 minute. Add peas, garlic, and white parts of green onions. Stir-fry 1 minute.",
      "Break up the cold rice with your hands and add to the wok. Spread into an even layer and let it sit 30 seconds (this creates crispy bits). Toss and repeat. Add 3 tablespoons soy sauce around the edges.",
      "Add back the scrambled eggs. Toss everything together for 1 minute. Taste and add more soy sauce or salt if needed. Garnish with green onion tops and serve immediately."
    ],
    matchedIngredients: [],
  },
  {
    id: "kung-pao-chicken",
    title: "Kung Pao Chicken",
    mealType: "dinner",
    description: "Spicy Sichuan chicken with peanuts and dried chilies",
    cookTime: "25 min",
    servings: 4,
    ingredients: ["chicken", "peanuts", "garlic", "ginger", "soy-sauce", "green-onion", "vegetable-oil", "rice"],
    instructions: [
      "Cut 1½ lbs boneless chicken thighs into 1-inch cubes. Marinate in 2 tablespoons soy sauce, 1 tablespoon rice wine (or dry sherry), and 1 teaspoon cornstarch for 15 minutes.",
      "Make the sauce: Whisk 2 tablespoons soy sauce, 1 tablespoon rice vinegar, 2 teaspoons sugar, 1 teaspoon sesame oil, and 1 tablespoon cornstarch with 3 tablespoons water. Set aside.",
      "Heat wok over HIGH heat. Add 2 tablespoons oil. When smoking, add marinated chicken in a single layer. Don't stir for 1 minute, then stir-fry 3-4 minutes until golden. Remove to a plate.",
      "Add 1 tablespoon oil. Add 4-6 dried red chilies (or 1 teaspoon red pepper flakes), 3 minced garlic cloves, and 1 tablespoon minced ginger. Stir 30 seconds until fragrant.",
      "Return chicken to wok. Give the sauce a stir and pour it in. Toss constantly for 1 minute until sauce thickens and coats the chicken. Add ½ cup roasted peanuts, toss to combine.",
      "Garnish with sliced green onions and serve immediately over steamed jasmine rice. Adjust heat level by using more or fewer dried chilies."
    ],
    matchedIngredients: [],
  },
  {
    id: "orange-chicken",
    title: "Orange Chicken",
    mealType: "dinner",
    description: "Crispy fried chicken in sweet and tangy orange sauce",
    cookTime: "30 min",
    servings: 4,
    ingredients: ["chicken", "orange", "garlic", "ginger", "soy-sauce", "flour", "eggs", "vegetable-oil", "rice"],
    instructions: [
      "Cut 1½ lbs boneless chicken thighs into 1½-inch pieces. Season with ½ teaspoon salt. Set up breading: ½ cup flour in one bowl, 2 beaten eggs in another, ½ cup cornstarch in a third.",
      "Dredge chicken pieces in flour, dip in egg, then coat in cornstarch. Shake off excess. Let sit on a wire rack for 5 minutes (this helps coating adhere).",
      "Heat 2 inches of vegetable oil in a deep pot or wok to 350°F. Fry chicken in batches for 4-5 minutes until golden and cooked through. Drain on paper towels.",
      "Make sauce: In a saucepan, combine the juice of 2 oranges (about ⅔ cup), 3 tablespoons soy sauce, 3 tablespoons sugar, 1 tablespoon rice vinegar, 2 minced garlic cloves, and 1 teaspoon grated ginger. Bring to simmer.",
      "Mix 1 tablespoon cornstarch with 2 tablespoons water. Stir into sauce and cook until thickened, about 2 minutes.",
      "Toss crispy chicken in the sauce until evenly coated. Serve immediately over steamed rice, garnished with orange zest and sliced green onions."
    ],
    matchedIngredients: [],
  },
  {
    id: "general-tso-chicken",
    title: "General Tso's Chicken",
    mealType: "dinner",
    description: "Sweet and spicy crispy chicken with broccoli",
    cookTime: "35 min",
    servings: 4,
    ingredients: ["chicken", "broccoli", "garlic", "ginger", "soy-sauce", "flour", "eggs", "vegetable-oil", "rice"],
    instructions: [
      "Cut 1½ lbs chicken thighs into 1½-inch pieces. Whisk 2 eggs with ½ teaspoon salt. Add chicken and toss to coat. Dredge in ½ cup flour mixed with ½ cup cornstarch.",
      "Heat 2 inches vegetable oil to 350°F. Fry chicken in batches 4-5 minutes until golden and crispy. Drain on paper towels. Cut 3 cups broccoli into florets and steam 4 minutes until bright green.",
      "Make sauce: Whisk ½ cup chicken broth, 3 tablespoons soy sauce, 3 tablespoons sugar, 2 tablespoons rice vinegar, 1 tablespoon hoisin sauce, and 1 teaspoon sesame oil.",
      "Heat 1 tablespoon oil in a wok. Add 3 minced garlic cloves, 1 tablespoon minced ginger, and 4-6 dried red chilies. Stir 30 seconds until fragrant.",
      "Add sauce to wok. Bring to simmer. Mix 1 tablespoon cornstarch with 2 tablespoons water, stir into sauce. Cook until thickened.",
      "Add crispy chicken to the sauce, toss until coated. Serve immediately over steamed rice with steamed broccoli on the side. Garnish with sesame seeds."
    ],
    matchedIngredients: [],
  },
  {
    id: "thai-green-curry",
    title: "Thai Green Curry",
    mealType: "dinner",
    description: "Aromatic coconut curry with chicken and vegetables",
    cookTime: "30 min",
    servings: 4,
    ingredients: ["chicken", "coconut", "bell-pepper", "zucchini", "basil", "garlic", "ginger", "rice"],
    instructions: [
      "Cook 1½ cups jasmine rice according to package. Keep warm. Cut 1 lb chicken thighs into bite-sized pieces. Slice 1 bell pepper and 1 small zucchini into thin strips.",
      "Heat 1 tablespoon oil in a wok or large pan over medium-high heat. Add 2-3 tablespoons green curry paste (adjust to taste), 2 minced garlic cloves, and 1 tablespoon minced ginger. Stir 1 minute until fragrant.",
      "Add 1 can (14 oz) coconut milk and ½ cup chicken broth. Stir to combine with curry paste. Bring to a simmer.",
      "Add chicken pieces. Cook 5-6 minutes, stirring occasionally, until chicken is almost cooked through.",
      "Add sliced bell pepper and zucchini. Simmer 4-5 more minutes until vegetables are tender and chicken is fully cooked. Taste and add fish sauce or salt if needed.",
      "Remove from heat. Stir in 1 cup fresh Thai basil leaves (or regular basil). Serve immediately over jasmine rice with extra basil as garnish."
    ],
    matchedIngredients: [],
  },
  {
    id: "japanese-chicken-katsu",
    title: "Chicken Katsu",
    mealType: "dinner",
    description: "Japanese-style breaded and fried chicken cutlet",
    cookTime: "25 min",
    servings: 4,
    ingredients: ["chicken", "bread-crumbs", "eggs", "flour", "cabbage", "rice", "vegetable-oil"],
    instructions: [
      "Place 4 chicken breasts between plastic wrap. Pound to an even ½-inch thickness. Season both sides with salt and pepper.",
      "Set up breading station: ½ cup flour in one dish, 2 beaten eggs in another, 1 cup panko breadcrumbs in a third. Dredge chicken in flour (shake off excess), dip in egg (let excess drip), then press firmly into panko on both sides.",
      "Heat ½ inch vegetable oil in a large skillet to 350°F (a breadcrumb should sizzle when dropped in). Fry chicken 3-4 minutes per side until deep golden brown and cooked through. Drain on a wire rack.",
      "Let rest 2 minutes. Cut each cutlet crosswise into ½-inch strips—the traditional katsu presentation. Arrange over steamed rice.",
      "Finely shred ¼ head of cabbage. Toss with 1 tablespoon rice vinegar and a pinch of salt. Place alongside the katsu.",
      "Serve with tonkatsu sauce (or mix 2 tablespoons Worcestershire, 1 tablespoon ketchup, ½ teaspoon soy sauce) and hot mustard on the side."
    ],
    matchedIngredients: [],
  },
  // ============ MEDITERRANEAN ============
  {
    id: "greek-chicken",
    title: "Greek Lemon Chicken",
    mealType: "dinner",
    description: "Herb-marinated chicken with lemon and oregano",
    cookTime: "40 min",
    servings: 4,
    ingredients: ["chicken", "lemon", "garlic", "oregano", "olive-oil", "salt", "pepper"],
    instructions: [
      "Make marinade: Whisk juice of 2 lemons, ¼ cup olive oil, 6 minced garlic cloves, 2 tablespoons dried oregano, 1 teaspoon salt, and ½ teaspoon pepper. Pour over 2 lbs chicken pieces (thighs or drumsticks) in a dish. Cover and refrigerate at least 2 hours or overnight.",
      "Preheat oven to 425°F (220°C). Remove chicken from marinade and place skin-side up in a roasting pan. Pour remaining marinade around (not over) the chicken.",
      "Roast 25 minutes. Baste chicken with pan juices. Continue roasting 15-20 more minutes until skin is golden brown and crispy, and internal temp reaches 175°F for dark meat.",
      "Let rest 10 minutes. The juices will redistribute for more tender, juicy meat.",
      "While chicken rests, the pan juices can be spooned over each piece. Serve with a Greek salad, roasted potatoes, or warm pita bread.",
      "Garnish with fresh lemon wedges and oregano. The bright lemon flavor should really shine through."
    ],
    matchedIngredients: [],
  },
  {
    id: "shakshuka",
    title: "Shakshuka",
    mealType: "breakfast",
    description: "Eggs poached in spiced tomato sauce",
    cookTime: "25 min",
    servings: 4,
    ingredients: ["eggs", "tomato", "onion", "bell-pepper", "garlic", "cumin", "paprika", "olive-oil", "parsley"],
    instructions: [
      "Heat 2 tablespoons olive oil in a large oven-safe skillet over medium heat. Add 1 diced onion and 1 diced bell pepper. Sauté 5-6 minutes until softened and slightly caramelized.",
      "Add 4 minced garlic cloves, 1 teaspoon cumin, 1 teaspoon paprika (smoked paprika is best), and ½ teaspoon cayenne (optional). Stir 1 minute until very fragrant.",
      "Add 1 can (28 oz) crushed tomatoes. Stir to combine. Simmer 10 minutes, stirring occasionally, until sauce thickens slightly. Season with 1 teaspoon salt and pepper to taste.",
      "Reduce heat to medium-low. Using a spoon, make 4-6 wells in the sauce. Crack 1 egg into each well. Season eggs with a pinch of salt.",
      "Cover the skillet with a lid. Cook 5-8 minutes until egg whites are set but yolks are still runny (or longer for firmer yolks). Check at 5 minutes.",
      "Remove from heat. Garnish generously with fresh chopped parsley or cilantro, and crumbled feta cheese if desired. Serve immediately with warm pita or crusty bread for dipping."
    ],
    matchedIngredients: [],
  },
  {
    id: "falafel-bowl",
    title: "Falafel Bowl",
    mealType: "lunch",
    description: "Crispy falafel with hummus, vegetables, and tahini",
    cookTime: "30 min",
    servings: 4,
    ingredients: ["chickpeas", "garlic", "onion", "parsley", "cumin", "lettuce", "tomato", "cucumber", "olive-oil"],
    instructions: [
      "Drain 2 cans (15 oz each) chickpeas. Rinse and pat dry. Add to food processor with ½ diced onion, 4 garlic cloves, 1 cup fresh parsley, 1 teaspoon cumin, 1 teaspoon salt, ½ teaspoon cayenne, and 3 tablespoons flour.",
      "Pulse until mixture is finely ground but NOT a paste—you want some texture. It should hold together when pressed. Refrigerate 30 minutes to firm up.",
      "Shape mixture into 12 balls (about 2 tablespoons each), then flatten slightly into patties. They should be about ½-inch thick.",
      "Heat ½ inch vegetable oil in a skillet to 350°F. Fry falafel in batches for 3-4 minutes per side until deep golden brown and crispy. Drain on paper towels.",
      "Prep toppings: Dice 2 tomatoes and 1 cucumber. Shred 2 cups lettuce. Make a quick sauce by mixing ¼ cup tahini with 2 tablespoons lemon juice, 2 tablespoons water, 1 minced garlic clove, and salt.",
      "Build bowls: Add lettuce, arrange 3 falafel per bowl, add tomatoes and cucumber. Drizzle generously with tahini sauce. Serve with warm pita bread on the side."
    ],
    matchedIngredients: [],
  },
  {
    id: "lamb-gyro",
    title: "Lamb Gyro",
    mealType: "dinner",
    description: "Seasoned lamb in warm pita with tzatziki",
    cookTime: "35 min",
    servings: 4,
    ingredients: ["lamb", "garlic", "oregano", "cumin", "yogurt", "cucumber", "tomato", "onion", "bread"],
    instructions: [
      "Season 1 lb ground lamb (or mix of lamb and beef) with 1 teaspoon cumin, 1 teaspoon oregano, 4 minced garlic cloves, 1 teaspoon salt, and ½ teaspoon pepper. Mix well and form into a flat rectangular loaf about 1-inch thick.",
      "Grill or pan-fry the lamb over medium-high heat for 5-6 minutes per side until cooked through and slightly charred on the outside. Let rest 5 minutes, then slice into thin strips.",
      "Make tzatziki: Grate 1 small cucumber and squeeze out excess water with a towel. Mix with 1 cup Greek yogurt, 2 minced garlic cloves, 1 tablespoon lemon juice, 1 tablespoon fresh dill, and salt to taste.",
      "Prep toppings: Slice 1 tomato, thinly slice ½ red onion into rings.",
      "Warm pita bread in a dry skillet for 30 seconds per side or wrap in foil and heat in a 350°F oven for 10 minutes.",
      "Assemble gyros: Spread tzatziki on warm pita. Add sliced lamb, tomato, and onion. Fold pita around filling and serve immediately. Optional: add feta cheese and a drizzle of olive oil."
    ],
    matchedIngredients: [],
  },
  // ============ COMFORT FOOD ============
  {
    id: "mac-and-cheese",
    title: "Creamy Mac and Cheese",
    mealType: "dinner",
    description: "Rich and creamy baked macaroni with multiple cheeses",
    cookTime: "35 min",
    servings: 6,
    ingredients: ["pasta", "cheese", "cheddar", "butter", "milk", "flour", "bread-crumbs", "salt", "pepper"],
    instructions: [
      "Preheat oven to 375°F (190°C). Bring a large pot of salted water to boil. Cook 1 lb elbow macaroni 2 minutes less than package directions (it will finish in oven). Drain and set aside.",
      "Make roux: Melt 4 tablespoons butter in a large pot over medium heat. Whisk in 4 tablespoons flour. Cook 1 minute, whisking constantly—the mixture should bubble but not brown.",
      "Slowly whisk in 3 cups whole milk, adding in a steady stream while whisking to prevent lumps. Continue whisking 5-7 minutes until sauce thickens and coats the back of a spoon.",
      "Remove from heat. Stir in 2 cups shredded sharp cheddar and 1 cup shredded gruyère (or more cheddar) until completely melted. Season with 1 teaspoon salt, ½ teaspoon pepper, and ¼ teaspoon nutmeg.",
      "Fold in the cooked pasta until evenly coated. Pour into a buttered 9x13 inch baking dish. Top with ½ cup breadcrumbs mixed with 2 tablespoons melted butter.",
      "Bake 25-30 minutes until top is golden brown and sauce is bubbling around the edges. Let rest 5 minutes before serving—the sauce will thicken as it cools slightly."
    ],
    matchedIngredients: [],
  },
  {
    id: "meatloaf",
    title: "Classic Meatloaf",
    mealType: "dinner",
    description: "Tender seasoned ground beef with tangy glaze",
    cookTime: "1 hour",
    servings: 6,
    ingredients: ["ground-beef", "onion", "garlic", "bread-crumbs", "eggs", "ketchup", "salt", "pepper"],
    instructions: [
      "Mix ground beef with onion, garlic, and breadcrumbs",
      "Add egg to bind",
      "Shape into loaf and place in pan",
      "Top with ketchup glaze",
      "Bake until cooked through",
      "Rest before slicing"
    ],
    matchedIngredients: [],
  },
  {
    id: "pot-roast",
    title: "Sunday Pot Roast",
    mealType: "dinner",
    description: "Fall-apart tender beef with carrots and potatoes",
    cookTime: "3 hours",
    servings: 6,
    ingredients: ["beef", "carrot", "potato", "onion", "garlic", "rosemary", "thyme", "beef-broth"],
    instructions: [
      "Season and sear beef on all sides",
      "Add vegetables and herbs",
      "Pour in broth",
      "Cover and braise low and slow",
      "Cook until fork-tender"
    ],
    matchedIngredients: [],
  },
  {
    id: "shepherds-pie",
    title: "Shepherd's Pie",
    mealType: "dinner",
    description: "Savory meat filling topped with creamy mashed potatoes",
    cookTime: "45 min",
    servings: 6,
    ingredients: ["ground-beef", "potato", "carrot", "peas", "onion", "garlic", "butter", "milk", "beef-broth"],
    instructions: [
      "Brown ground beef with onion",
      "Add carrots and peas",
      "Make mashed potatoes",
      "Layer meat in baking dish",
      "Top with potatoes and bake until golden"
    ],
    matchedIngredients: [],
  },
  {
    id: "chicken-pot-pie",
    title: "Chicken Pot Pie",
    mealType: "dinner",
    description: "Creamy chicken and vegetable filling under flaky crust",
    cookTime: "50 min",
    servings: 6,
    ingredients: ["chicken", "carrot", "peas", "potato", "onion", "butter", "flour", "milk", "chicken-broth"],
    instructions: [
      "Cook and dice chicken",
      "Sauté vegetables",
      "Make creamy sauce with butter and flour",
      "Combine filling ingredients",
      "Top with pastry and bake"
    ],
    matchedIngredients: [],
  },
  // ============ HEALTHY OPTIONS ============
  {
    id: "grilled-salmon-asparagus",
    title: "Grilled Salmon with Asparagus",
    mealType: "dinner",
    description: "Herb-crusted salmon with roasted asparagus",
    cookTime: "25 min",
    servings: 4,
    ingredients: ["salmon", "asparagus", "lemon", "garlic", "dill", "olive-oil", "salt", "pepper"],
    instructions: [
      "Season salmon with herbs",
      "Grill until flaky",
      "Roast asparagus with garlic",
      "Serve with lemon wedges"
    ],
    matchedIngredients: [],
  },
  {
    id: "cauliflower-rice-bowl",
    title: "Cauliflower Rice Bowl",
    mealType: "lunch",
    description: "Low-carb bowl with cauliflower rice and fresh vegetables",
    cookTime: "20 min",
    servings: 2,
    ingredients: ["cauliflower", "chicken", "avocado", "tomato", "cucumber", "lime", "cilantro", "olive-oil"],
    instructions: [
      "Rice cauliflower in food processor",
      "Sauté cauliflower rice",
      "Grill seasoned chicken",
      "Arrange in bowls with fresh toppings",
      "Drizzle with lime juice"
    ],
    matchedIngredients: [],
  },
  {
    id: "zucchini-noodles",
    title: "Zucchini Noodles with Pesto",
    mealType: "dinner",
    description: "Light and fresh zoodles tossed with basil pesto",
    cookTime: "15 min",
    servings: 2,
    ingredients: ["zucchini", "basil", "garlic", "parmesan", "pine-nuts", "olive-oil", "lemon", "salt"],
    instructions: [
      "Spiralize zucchini",
      "Make pesto with basil, garlic, and pine nuts",
      "Lightly sauté zoodles",
      "Toss with pesto",
      "Top with parmesan"
    ],
    matchedIngredients: [],
  },
  {
    id: "turkey-lettuce-wraps",
    title: "Asian Turkey Lettuce Wraps",
    mealType: "lunch",
    description: "Savory ground turkey in crisp lettuce cups",
    cookTime: "15 min",
    servings: 4,
    ingredients: ["turkey", "lettuce", "garlic", "ginger", "soy-sauce", "green-onion", "carrot", "vegetable-oil"],
    instructions: [
      "Brown ground turkey",
      "Add garlic, ginger, and soy sauce",
      "Stir in diced vegetables",
      "Spoon into lettuce cups",
      "Top with green onions"
    ],
    matchedIngredients: [],
  },
  // ============ VEGETARIAN ============
  {
    id: "vegetable-curry",
    title: "Vegetable Coconut Curry",
    mealType: "dinner",
    description: "Creamy coconut curry loaded with vegetables",
    cookTime: "30 min",
    servings: 4,
    ingredients: ["coconut", "potato", "carrot", "bell-pepper", "onion", "garlic", "ginger", "rice"],
    instructions: [
      "Sauté onion, garlic, and ginger",
      "Add curry paste",
      "Pour in coconut milk",
      "Add vegetables and simmer",
      "Serve over rice"
    ],
    matchedIngredients: [],
  },
  {
    id: "black-bean-tacos",
    title: "Black Bean Tacos",
    mealType: "dinner",
    description: "Spiced black beans with fresh toppings in corn tortillas",
    cookTime: "20 min",
    servings: 4,
    ingredients: ["beans", "tortillas", "avocado", "tomato", "onion", "lime", "cilantro", "cumin", "cheese"],
    instructions: [
      "Season and heat black beans",
      "Warm tortillas",
      "Dice fresh toppings",
      "Assemble tacos",
      "Squeeze lime on top"
    ],
    matchedIngredients: [],
  },
  {
    id: "caprese-salad",
    title: "Classic Caprese Salad",
    mealType: "lunch",
    description: "Fresh mozzarella, tomatoes, and basil with balsamic",
    cookTime: "10 min",
    servings: 4,
    ingredients: ["mozzarella", "tomato", "basil", "olive-oil", "salt", "pepper"],
    instructions: [
      "Slice mozzarella and tomatoes",
      "Arrange alternating on plate",
      "Tuck in fresh basil leaves",
      "Drizzle with olive oil",
      "Season with salt and pepper"
    ],
    matchedIngredients: [],
  },
  {
    id: "spinach-ricotta-stuffed-shells",
    title: "Spinach Ricotta Stuffed Shells",
    mealType: "dinner",
    description: "Jumbo pasta shells filled with creamy ricotta and spinach",
    cookTime: "45 min",
    servings: 6,
    ingredients: ["pasta", "ricotta", "spinach", "mozzarella", "parmesan", "eggs", "garlic", "tomato-sauce"],
    instructions: [
      "Cook jumbo shells",
      "Mix ricotta with spinach and egg",
      "Fill shells with mixture",
      "Arrange in baking dish with sauce",
      "Top with mozzarella and bake"
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
  // Italian classics
  "chicken-piccata": ["chicken", "lemon"],
  "chicken-marsala": ["chicken", "mushroom"],
  "chicken-parmesan": ["chicken", "cheese"],
  "eggplant-parmesan": ["eggplant"],
  "fettuccine-alfredo": ["pasta", "cream"],
  "penne-vodka": ["pasta", "tomato-sauce"],
  // Mexican favorites
  "chicken-enchiladas": ["chicken", "tortillas"],
  "carnitas": ["pork"],
  "burrito-bowl": ["chicken", "rice", "beans"],
  "quesadilla": ["chicken", "cheese", "tortillas"],
  // Asian cuisine
  "pad-thai": ["shrimp"],
  "fried-rice": ["rice", "eggs"],
  "kung-pao-chicken": ["chicken", "peanuts"],
  "orange-chicken": ["chicken", "orange"],
  "general-tso-chicken": ["chicken"],
  "thai-green-curry": ["chicken", "coconut"],
  "japanese-chicken-katsu": ["chicken"],
  // Mediterranean
  "greek-chicken": ["chicken", "lemon"],
  "shakshuka": ["eggs", "tomato"],
  "falafel-bowl": ["chickpeas"],
  "lamb-gyro": ["lamb"],
  // Comfort food
  "mac-and-cheese": ["pasta", "cheese"],
  "meatloaf": ["ground-beef"],
  "pot-roast": ["beef"],
  "shepherds-pie": ["ground-beef", "potato"],
  "chicken-pot-pie": ["chicken"],
  // Healthy options
  "grilled-salmon-asparagus": ["salmon", "asparagus"],
  "cauliflower-rice-bowl": ["cauliflower", "chicken"],
  "zucchini-noodles": ["zucchini", "basil"],
  "turkey-lettuce-wraps": ["turkey", "lettuce"],
  // Vegetarian
  "vegetable-curry": ["coconut"],
  "black-bean-tacos": ["beans", "tortillas"],
  "caprese-salad": ["mozzarella", "tomato"],
  "spinach-ricotta-stuffed-shells": ["pasta", "ricotta", "spinach"],
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
      const matchedKeyIngredients = requiredKeys.filter(key => 
        selectedIngredients.some(selected => ingredientMatches(selected, key))
      );
      const hasAllKeyIngredients = requiredKeys.length === 0 || matchedKeyIngredients.length === requiredKeys.length;
      
      return {
        ...recipe,
        matchedIngredients,
        matchScore: matchedIngredients.length / recipe.ingredients.length,
        hasAllKeyIngredients,
        keyIngredients: requiredKeys,
        matchedKeyIngredients
      };
    })
    .filter(recipe => recipe.matchScore >= 0.4 && recipe.hasAllKeyIngredients) // At least 40% match AND has key ingredients
    .sort((a, b) => b.matchScore - a.matchScore);
}
