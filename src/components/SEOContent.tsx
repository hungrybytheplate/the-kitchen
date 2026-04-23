import { ChefHat, Clock, Heart, Calendar, ShoppingCart, Sparkles } from "lucide-react";

interface SEOContentProps {
  /** Which mode to surface popular searches for. Defaults to "cook". */
  mode?: "cook" | "drink";
}

/**
 * SEO-focused content section with semantic HTML for search engines
 * This provides crawlable, keyword-rich content that improves rankings
 */
export function SEOContent({ mode = "cook" }: SEOContentProps = {}) {
  const popularSearches = mode === "drink"
    ? [
        "cocktail",
        "mocktail",
        "smoothie",
        "green smoothie",
        "iced coffee",
        "matcha",
        "wellness",
        "detox",
        "immune",
        "hot toddy",
        "margarita",
        "non-alcoholic",
      ]
    : [
        "chicken",
        "pasta",
        "easy",
        "vegetarian",
        "vegan",
        "keto",
        "gluten-free",
        "breakfast",
        "dessert",
        "soup",
        "salad",
        "copycat",
      ];

  const sectionTitle = mode === "drink"
    ? "Popular Drink Searches"
    : "Popular Recipe Searches";

  return (
    <section 
      className="mt-16 border-t border-border/50 pt-12"
      aria-labelledby="seo-heading"
    >
      {/* Hidden but crawlable heading for SEO */}
      <h2 
        id="seo-heading" 
        className="font-serif text-2xl font-bold text-center mb-8 text-foreground"
      >
        Your Personal Recipe Finder & Meal Planner
      </h2>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto px-4">
        {/* Feature 1: Ingredient-Based Search */}
        <article className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10">
              <ChefHat className="h-5 w-5 text-primary" aria-hidden="true" />
            </div>
            <h3 className="font-semibold text-foreground">
              What Can I Make With What I Have?
            </h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Stop wondering what to cook for dinner. Select ingredients from your pantry, 
            fridge, and spice cabinet, and instantly discover recipes you can make right now. 
            Perfect for using up leftovers and reducing food waste.
          </p>
        </article>

        {/* Feature 2: Easy Recipes */}
        <article className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10">
              <Clock className="h-5 w-5 text-primary" aria-hidden="true" />
            </div>
            <h3 className="font-semibold text-foreground">
              Quick & Easy Dinner Ideas
            </h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Find 30-minute meals for busy weeknights. Our collection includes easy recipes 
            for beginners, one-pot dinners, and simple family-friendly dishes that anyone 
            can make with basic cooking skills.
          </p>
        </article>

        {/* Feature 3: Meal Planning */}
        <article className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10">
              <Calendar className="h-5 w-5 text-primary" aria-hidden="true" />
            </div>
            <h3 className="font-semibold text-foreground">
              Weekly Meal Prep & Planning
            </h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Plan your breakfast, lunch, and dinner for the entire week. Drag and drop 
            recipes onto your calendar, track nutritional goals, and streamline your 
            cooking routine with organized meal prep.
          </p>
        </article>

        {/* Feature 4: Shopping List */}
        <article className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10">
              <ShoppingCart className="h-5 w-5 text-primary" aria-hidden="true" />
            </div>
            <h3 className="font-semibold text-foreground">
              Smart Grocery Shopping List
            </h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Automatically generate shopping lists from your meal plan. Check off items 
            as you shop, and never forget an ingredient again. Perfect for budget-friendly 
            meal planning and reducing grocery store trips.
          </p>
        </article>

        {/* Feature 5: Recipe Saving */}
        <article className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10">
              <Heart className="h-5 w-5 text-primary" aria-hidden="true" />
            </div>
            <h3 className="font-semibold text-foreground">
              Save Your Favorite Recipes
            </h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Build your personal cookbook by saving recipes you love. Rate dishes, add 
            personal notes, and quickly access your go-to meals. Share recipe links 
            with family and friends.
          </p>
        </article>

        {/* Feature 6: Recipe Variety */}
        <article className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10">
              <Sparkles className="h-5 w-5 text-primary" aria-hidden="true" />
            </div>
            <h3 className="font-semibold text-foreground">
              Diverse Recipe Collection
            </h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Explore recipes for every occasion: healthy meals, comfort food, vegetarian 
            options, keto-friendly dishes, international cuisines, and copycat restaurant 
            favorites. New recipes added regularly.
          </p>
        </article>
      </div>

      {/* Popular Searches - Keyword-rich content */}
      <div className="mt-12 text-center">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">
          {sectionTitle}
        </h3>
        <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto px-4">
          {popularSearches.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => {
                window.dispatchEvent(
                  new CustomEvent("popular-search", { detail: { term, mode } }),
                );
              }}
              className="text-xs px-3 py-1.5 rounded-full bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label={`Search ${mode === "drink" ? "drinks" : "recipes"} for ${term}`}
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Schema-friendly FAQ content */}
      <div className="mt-12 max-w-3xl mx-auto px-4">
        <h3 className="font-semibold text-center mb-6 text-foreground">
          Frequently Asked Questions
        </h3>
        <dl className="space-y-4">
          <div>
            <dt className="font-medium text-foreground">
              How does The Kitchen find recipes based on my ingredients?
            </dt>
            <dd className="mt-1 text-sm text-muted-foreground">
              Simply select the ingredients you have available from our organized checklist. 
              Our smart matching algorithm instantly shows you recipes where you have most 
              or all of the required ingredients, prioritizing "Perfect Matches" at the top.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Is The Kitchen free to use?
            </dt>
            <dd className="mt-1 text-sm text-muted-foreground">
              Yes! The Kitchen is completely free. Browse recipes, plan meals, create shopping 
              lists, and save your favorites without any subscription or payment required.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">
              Can I access The Kitchen on my phone?
            </dt>
            <dd className="mt-1 text-sm text-muted-foreground">
              Absolutely! The Kitchen works on any device and can be installed as an app 
              on your phone for quick access. Use it in the kitchen while cooking with 
              our hands-free cooking mode.
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
