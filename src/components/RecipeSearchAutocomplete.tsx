import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { Search, X, Clock, ChefHat, Flame, HeartPulse, Leaf, Wheat, Droplets, Shield, Sparkles, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { sampleRecipes, type Recipe } from "@/data/recipes";
import { sampleDrinks, type Drink } from "@/data/drinks";
import { cn } from "@/lib/utils";

interface RecipeSearchAutocompleteProps {
  mode: "cook" | "drink";
  onSelectRecipe: (recipe: Recipe) => void;
  onSelectDrink: (drink: Drink) => void;
  savedRecipes: string[];
  savedDrinks: string[];
}

const mealTypeColors: Record<string, string> = {
  breakfast: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  lunch: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  dinner: "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300",
  dessert: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
  sides: "bg-stone-100 text-stone-800 dark:bg-stone-900/30 dark:text-stone-300",
};

const drinkTypeColors: Record<string, string> = {
  cocktail: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  mocktail: "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300",
  smoothie: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  wellness: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  hot: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
};

const difficultyConfig: Record<string, { icon: typeof Flame; color: string; label: string }> = {
  easy: { icon: Flame, color: "text-green-500", label: "Easy" },
  medium: { icon: Flame, color: "text-amber-500", label: "Medium" },
  hard: { icon: Flame, color: "text-red-500", label: "Hard" },
};

interface QuickFilter {
  label: string;
  searchTerm: string;
  icon: typeof Leaf;
  activeClass: string;
}

const cookQuickFilters: QuickFilter[] = [
  { label: "Vegan", searchTerm: "vegan", icon: Leaf, activeClass: "bg-green-600 text-white border-green-600" },
  { label: "Keto", searchTerm: "keto", icon: Zap, activeClass: "bg-orange-600 text-white border-orange-600" },
  { label: "Heart Healthy", searchTerm: "heart healthy", icon: HeartPulse, activeClass: "bg-red-600 text-white border-red-600" },
  { label: "Low Sodium", searchTerm: "low sodium", icon: Droplets, activeClass: "bg-blue-600 text-white border-blue-600" },
  { label: "Gluten-Free", searchTerm: "gluten-free", icon: Wheat, activeClass: "bg-amber-600 text-white border-amber-600" },
  { label: "Anti-Inflammatory", searchTerm: "anti-inflammatory", icon: Sparkles, activeClass: "bg-orange-500 text-white border-orange-500" },
];

const drinkQuickFilters: QuickFilter[] = [
  { label: "Immune Support", searchTerm: "immune", icon: Shield, activeClass: "bg-emerald-600 text-white border-emerald-600" },
  { label: "Heart Healthy", searchTerm: "heart healthy", icon: HeartPulse, activeClass: "bg-red-600 text-white border-red-600" },
  { label: "Detox", searchTerm: "detox", icon: Sparkles, activeClass: "bg-green-600 text-white border-green-600" },
  { label: "Non-Alcoholic", searchTerm: "non-alcoholic", icon: Droplets, activeClass: "bg-teal-600 text-white border-teal-600" },
  { label: "Energy Boost", searchTerm: "energy", icon: Zap, activeClass: "bg-amber-600 text-white border-amber-600" },
];

// Helper to get matched tags for highlighting
function getMatchedRecipeTags(recipe: Recipe, expandedTerms: Set<string>): string[] {
  const matched: string[] = [];
  recipe.dietaryTags?.forEach((t) => {
    const tLower = t.toLowerCase();
    if ([...expandedTerms].some((term) => tLower.includes(term) || term.includes(tLower))) {
      matched.push(t);
    }
  });
  if (recipe.heartHealthy && [...expandedTerms].some((t) =>
    ["heart healthy", "heart-healthy"].some((h) => h.includes(t) || t.includes(h))
  )) matched.push("Heart Healthy");
  if (recipe.antiInflammatory && [...expandedTerms].some((t) =>
    ["anti-inflammatory", "antiinflammatory"].some((h) => h.includes(t) || t.includes(h))
  )) matched.push("Anti-Inflammatory");
  if (recipe.cuisine && [...expandedTerms].some((t) => recipe.cuisine!.toLowerCase().includes(t))) {
    matched.push(recipe.cuisine);
  }
  return matched;
}

function getMatchedDrinkTags(drink: Drink, expandedTerms: Set<string>): string[] {
  const matched: string[] = [];
  drink.healthTags?.forEach((t) => {
    const tLower = t.toLowerCase();
    if ([...expandedTerms].some((term) => tLower.includes(term) || term.includes(tLower))) {
      matched.push(t);
    }
  });
  if (!drink.isAlcoholic && [...expandedTerms].some((t) =>
    ["non-alcoholic", "non alcoholic", "virgin"].includes(t)
  )) matched.push("Non-Alcoholic");
  if (drink.occasion && [...expandedTerms].some((t) => drink.occasion!.toLowerCase().includes(t))) {
    matched.push(drink.occasion);
  }
  return matched;
}

export function RecipeSearchAutocomplete({
  mode,
  onSelectRecipe,
  onSelectDrink,
  savedRecipes,
  savedDrinks,
}: RecipeSearchAutocompleteProps) {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Diet/health keyword aliases for smarter matching
  const dietKeywordAliases: Record<string, string[]> = useMemo(() => ({
    "heart healthy": ["heart healthy", "heart-healthy"],
    "kidney": ["kidney healthy", "kidney-healthy"],
    "kidney healthy": ["kidney healthy", "kidney-healthy"],
    "anti-inflammatory": ["anti-inflammatory", "antiinflammatory"],
    "antiinflammatory": ["anti-inflammatory", "antiinflammatory"],
    "low carb": ["low-carb", "keto"],
    "high protein": ["high-protein", "protein rich"],
    "protein": ["high-protein", "protein rich"],
    "high fiber": ["high-fiber", "high fiber"],
    "fiber": ["high-fiber", "high fiber"],
    "no sodium": ["no-sodium"],
    "low sodium": ["low-sodium"],
    "sodium": ["no-sodium", "low-sodium"],
    "sugar free": ["diabetes friendly", "keto"],
    "diabetic": ["diabetes friendly"],
    "diabetes": ["diabetes friendly"],
    "plant based": ["vegan", "vegetarian"],
    "plant-based": ["vegan", "vegetarian"],
    "immune": ["immune support"],
    "detox": ["detox"],
    "energy": ["energy boost"],
    "antioxidant": ["antioxidant"],
    "hydrating": ["hydrating"],
    "omega": ["omega-3"],
  }), []);

  // Compute expanded terms (used by both suggestions and render)
  const expandedTerms = useMemo(() => {
    const query = search.toLowerCase().trim();
    const terms = new Set<string>([query]);
    if (query.length < 2) return terms;
    for (const [keyword, aliases] of Object.entries(dietKeywordAliases)) {
      if (query.includes(keyword) || keyword.includes(query)) {
        aliases.forEach((a) => terms.add(a));
      }
    }
    return terms;
  }, [search, dietKeywordAliases]);

  // Get suggestions based on search
  const suggestions = useMemo(() => {
    const query = search.toLowerCase().trim();
    if (query.length < 2) return [];

    if (mode === "cook") {
      return sampleRecipes
        .filter((r) => {
          const titleMatch = r.title.toLowerCase().includes(query);
          const descMatch = r.description?.toLowerCase().includes(query);
          const ingredientMatch = r.ingredients.some((i) =>
            i.toLowerCase().includes(query)
          );
          const tagMatch = r.dietaryTags?.some((t) => {
            const tLower = t.toLowerCase();
            return [...expandedTerms].some((term) => tLower.includes(term) || term.includes(tLower));
          });
          const cuisineMatch = r.cuisine?.toLowerCase().includes(query);
          const difficultyMatch = r.difficulty?.toLowerCase().includes(query);
          const heartMatch = r.heartHealthy && [...expandedTerms].some((t) =>
            ["heart healthy", "heart-healthy"].some((h) => h.includes(t) || t.includes(h))
          );
          const antiInflamMatch = r.antiInflammatory && [...expandedTerms].some((t) =>
            ["anti-inflammatory", "antiinflammatory"].some((h) => h.includes(t) || t.includes(h))
          );
          const methodMatch = (r.isSlowCooker && query.includes("slow cooker")) ||
            (r.isInstantPot && query.includes("instant pot")) ||
            (r.isOnePan && (query.includes("one pan") || query.includes("one-pan")));
          const seasonMatch = r.season?.toLowerCase().includes(query);
          return titleMatch || descMatch || ingredientMatch || tagMatch || cuisineMatch || difficultyMatch || heartMatch || antiInflamMatch || methodMatch || seasonMatch;
        })
        .sort((a, b) => {
          const aTitle = a.title.toLowerCase().includes(query) ? 0 : 1;
          const bTitle = b.title.toLowerCase().includes(query) ? 0 : 1;
          if (aTitle !== bTitle) return aTitle - bTitle;
          
          const aDiet = a.dietaryTags?.some((t) => [...expandedTerms].some((q) => t.toLowerCase().includes(q))) ? 0 : 1;
          const bDiet = b.dietaryTags?.some((t) => [...expandedTerms].some((q) => t.toLowerCase().includes(q))) ? 0 : 1;
          if (aDiet !== bDiet) return aDiet - bDiet;

          const aSaved = savedRecipes.includes(a.id) ? 0 : 1;
          const bSaved = savedRecipes.includes(b.id) ? 0 : 1;
          return aSaved - bSaved;
        })
        .slice(0, 8);
    } else {
      return sampleDrinks
        .filter((d) => {
          const titleMatch = d.title.toLowerCase().includes(query);
          const descMatch = d.description?.toLowerCase().includes(query);
          const ingredientMatch = d.ingredients.some((i) =>
            i.toLowerCase().includes(query)
          );
          const healthTagMatch = d.healthTags?.some((t) => {
            const tLower = t.toLowerCase();
            return [...expandedTerms].some((term) => tLower.includes(term) || term.includes(tLower));
          });
          const typeMatch = d.drinkType?.toLowerCase().includes(query);
          const occasionMatch = d.occasion?.toLowerCase().includes(query);
          const seasonMatch = d.season?.toLowerCase().includes(query);
          const alcoholMatch = (query === "non-alcoholic" || query === "non alcoholic" || query === "virgin") && !d.isAlcoholic;
          return titleMatch || descMatch || ingredientMatch || healthTagMatch || typeMatch || occasionMatch || seasonMatch || alcoholMatch;
        })
        .sort((a, b) => {
          const aTitle = a.title.toLowerCase().includes(query) ? 0 : 1;
          const bTitle = b.title.toLowerCase().includes(query) ? 0 : 1;
          if (aTitle !== bTitle) return aTitle - bTitle;

          const aHealth = a.healthTags?.some((t) => [...expandedTerms].some((q) => t.toLowerCase().includes(q))) ? 0 : 1;
          const bHealth = b.healthTags?.some((t) => [...expandedTerms].some((q) => t.toLowerCase().includes(q))) ? 0 : 1;
          if (aHealth !== bHealth) return aHealth - bHealth;
          
          const aSaved = savedDrinks.includes(a.id) ? 0 : 1;
          const bSaved = savedDrinks.includes(b.id) ? 0 : 1;
          return aSaved - bSaved;
        })
        .slice(0, 8);
    }
  }, [search, mode, savedRecipes, savedDrinks, expandedTerms]);

  // Quick filter chip toggle
  const handleChipToggle = useCallback((searchTerm: string) => {
    setSearch((prev) => {
      if (prev.toLowerCase().trim() === searchTerm.toLowerCase()) {
        return "";
      }
      return searchTerm;
    });
    setIsOpen(true);
    setHighlightedIndex(-1);
    inputRef.current?.focus();
  }, []);

  // Popular/trending items when no search
  const popularItems = useMemo(() => {
    if (mode === "cook") {
      // Show saved recipes first, then some popular ones
      const saved = sampleRecipes.filter((r) => savedRecipes.includes(r.id)).slice(0, 3);
      const popular = sampleRecipes
        .filter((r) => !savedRecipes.includes(r.id) && r.difficulty === "easy")
        .slice(0, 5 - saved.length);
      return [...saved, ...popular];
    } else {
      const saved = sampleDrinks.filter((d) => savedDrinks.includes(d.id)).slice(0, 3);
      const popular = sampleDrinks
        .filter((d) => !savedDrinks.includes(d.id))
        .slice(0, 5 - saved.length);
      return [...saved, ...popular];
    }
  }, [mode, savedRecipes, savedDrinks]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const items = search.length >= 2 ? suggestions : popularItems;
    
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < items.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      e.preventDefault();
      const item = items[highlightedIndex];
      if (item) {
        handleSelect(item);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setHighlightedIndex(-1);
    }
  };

  const handleSelect = (item: Recipe | Drink) => {
    if (mode === "cook") {
      onSelectRecipe(item as Recipe);
    } else {
      onSelectDrink(item as Drink);
    }
    setSearch("");
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll("[data-item]");
      items[highlightedIndex]?.scrollIntoView({ block: "nearest" });
    }
  }, [highlightedIndex]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target as Node) &&
        listRef.current &&
        !listRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayItems = search.length >= 2 ? suggestions : popularItems;
  const showDropdown = isOpen && (search.length >= 2 || (search.length === 0 && popularItems.length > 0));

  return (
    <div className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          placeholder={
            mode === "cook"
              ? "Search by name, ingredient, diet, or health tag..."
              : "Search by name, ingredient, health tag, or occasion..."
          }
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setIsOpen(true);
            setHighlightedIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="pl-9 pr-9 bg-card/90 border-border/50 rounded-xl h-11"
        />
        {search && (
          <button
            onClick={() => {
              setSearch("");
              inputRef.current?.focus();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Quick-filter chips */}
      <div className="flex flex-wrap gap-1.5 mt-2">
        {(mode === "cook" ? cookQuickFilters : drinkQuickFilters).map((filter) => {
          const isActive = search.toLowerCase().trim() === filter.searchTerm.toLowerCase();
          const FilterIcon = filter.icon;
          return (
            <button
              key={filter.searchTerm}
              onClick={() => handleChipToggle(filter.searchTerm)}
              className={cn(
                "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium border transition-all",
                isActive
                  ? filter.activeClass
                  : "border-border/60 text-muted-foreground hover:border-foreground/30 hover:text-foreground bg-card/60"
              )}
            >
              <FilterIcon className="h-3 w-3" />
              {filter.label}
            </button>
          );
        })}
      </div>

      {showDropdown && (
        <div
          ref={listRef}
          className="absolute z-50 w-full mt-2 rounded-xl bg-card border border-border shadow-elevated overflow-hidden"
          
        >
          {search.length < 2 && popularItems.length > 0 && (
            <div className="px-3 py-2 text-xs font-medium text-muted-foreground bg-muted/30 border-b border-border/50">
              {savedRecipes.length > 0 || savedDrinks.length > 0
                ? "Your Favorites & Quick Picks"
                : "Quick Picks"}
            </div>
          )}
          
          {displayItems.length === 0 && search.length >= 2 && (
            <div className="p-4 text-center">
              <p className="text-muted-foreground text-sm">
                No {mode === "cook" ? "recipes" : "drinks"} found for &ldquo;{search}&rdquo;
              </p>
              <p className="text-muted-foreground text-xs mt-1">
                Try searching by name, ingredient, or dietary tag
              </p>
            </div>
          )}

          <div className="max-h-[360px] overflow-y-auto">
            {mode === "cook"
              ? (displayItems as Recipe[]).map((recipe, index) => {
                  const isSaved = savedRecipes.includes(recipe.id);
                  const difficulty = recipe.difficulty
                    ? difficultyConfig[recipe.difficulty]
                    : null;
                  const matchedTags = search.length >= 2 ? getMatchedRecipeTags(recipe, expandedTerms) : [];

                  return (
                    <div
                      key={recipe.id}
                      data-item
                      onClick={() => handleSelect(recipe)}
                      className={cn(
                        "p-3 cursor-pointer transition-colors border-b border-border/30 last:border-0",
                        highlightedIndex === index
                          ? "bg-accent"
                          : "hover:bg-muted/50"
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap mb-1">
                            <Badge
                              className={cn(
                                "text-[10px] shrink-0",
                                mealTypeColors[recipe.mealType]
                              )}
                            >
                              {recipe.mealType}
                            </Badge>
                            {isSaved && (
                              <Badge
                                variant="outline"
                                className="text-[10px] shrink-0 border-primary/50 text-primary"
                              >
                                ★ Saved
                              </Badge>
                            )}
                            {matchedTags.length > 0
                              ? matchedTags.slice(0, 3).map((tag) => (
                                  <Badge
                                    key={tag}
                                    className="text-[10px] capitalize bg-primary/15 text-primary border border-primary/30"
                                  >
                                    ✓ {tag}
                                  </Badge>
                                ))
                              : recipe.dietaryTags?.slice(0, 2).map((tag) => (
                                  <Badge
                                    key={tag}
                                    variant="outline"
                                    className="text-[10px] capitalize"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                          </div>
                          <p className="font-medium text-sm truncate">
                            {recipe.title}
                          </p>
                          <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                            {recipe.description}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-1 shrink-0">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {recipe.cookTime}
                          </div>
                          {difficulty && (
                            <div
                              className={cn(
                                "flex items-center gap-1 text-[10px]",
                                difficulty.color
                              )}
                            >
                              <difficulty.icon className="h-3 w-3" />
                              {difficulty.label}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              : (displayItems as Drink[]).map((drink, index) => {
                  const isSaved = savedDrinks.includes(drink.id);
                  const drinkType = drink.drinkType || "cocktail";
                  const matchedTags = search.length >= 2 ? getMatchedDrinkTags(drink, expandedTerms) : [];

                  return (
                    <div
                      key={drink.id}
                      data-item
                      onClick={() => handleSelect(drink)}
                      className={cn(
                        "p-3 cursor-pointer transition-colors border-b border-border/30 last:border-0",
                        highlightedIndex === index
                          ? "bg-accent"
                          : "hover:bg-muted/50"
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap mb-1">
                            <Badge
                              className={cn(
                                "text-[10px] shrink-0 capitalize",
                                drinkTypeColors[drinkType] ||
                                  drinkTypeColors.cocktail
                              )}
                            >
                              {drinkType}
                            </Badge>
                            {isSaved && (
                              <Badge
                                variant="outline"
                                className="text-[10px] shrink-0 border-primary/50 text-primary"
                              >
                                ★ Saved
                              </Badge>
                            )}
                            {matchedTags.length > 0
                              ? matchedTags.slice(0, 3).map((tag) => (
                                  <Badge
                                    key={tag}
                                    className="text-[10px] capitalize bg-primary/15 text-primary border border-primary/30"
                                  >
                                    ✓ {tag}
                                  </Badge>
                                ))
                              : drink.isAlcoholic === false && (
                                  <Badge
                                    variant="outline"
                                    className="text-[10px] text-green-600 border-green-600/50"
                                  >
                                    Non-alcoholic
                                  </Badge>
                                )}
                          </div>
                          <p className="font-medium text-sm truncate">
                            {drink.title}
                          </p>
                          <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                            {drink.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                          <ChefHat className="h-3 w-3" />
                          {drink.ingredients.length} ingredients
                        </div>
                      </div>
                    </div>
                  );
                })}
          </div>

          {search.length >= 2 && displayItems.length > 0 && (
            <div className="px-3 py-2 text-[10px] text-muted-foreground bg-muted/30 border-t border-border/50 flex items-center justify-between">
              <span>
                {displayItems.length} result{displayItems.length !== 1 && "s"}{" "}
                found
              </span>
              <span className="hidden sm:inline">
                ↑↓ to navigate • Enter to select • Esc to close
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
