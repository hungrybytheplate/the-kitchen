import { LucideIcon, ChefHat, Lightbulb, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Suggestion {
  text: string;
  icon?: string;
  onClick?: () => void;
}

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  suggestions?: Suggestion[];
  action?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  variant?: "default" | "warm" | "sunset" | "muted";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const gradientVariants = {
  default: "gradient-warm",
  warm: "gradient-warm",
  sunset: "gradient-sunset",
  muted: "bg-muted",
};

const shadowVariants = {
  default: "shadow-warm",
  warm: "shadow-warm",
  sunset: "shadow-warm",
  muted: "shadow-sm",
};

export function EmptyState({
  icon: Icon,
  title,
  description,
  suggestions = [],
  action,
  secondaryAction,
  variant = "default",
  size = "md",
  className,
}: EmptyStateProps) {
  const iconSizes = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  };

  const containerSizes = {
    sm: "p-3 rounded-xl",
    md: "p-4 rounded-2xl",
    lg: "p-5 rounded-3xl",
  };

  const paddingSizes = {
    sm: "py-8",
    md: "py-12",
    lg: "py-16",
  };

  const titleSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <div className={cn("flex flex-col items-center justify-center text-center", paddingSizes[size], className)}>
      {/* Icon with glow effect */}
      <div className="relative mb-4 sm:mb-6">
        <div className={cn("absolute inset-0 blur-2xl opacity-30 animate-pulse-soft", gradientVariants[variant])} />
        <div className={cn("relative", containerSizes[size], gradientVariants[variant], shadowVariants[variant])}>
          <Icon className={cn(iconSizes[size], "text-primary-foreground")} />
        </div>
      </div>

      {/* Title */}
      <h3 className={cn("font-serif font-semibold mb-2 sm:mb-3", titleSizes[size])}>
        {title}
      </h3>

      {/* Description */}
      <p className="text-muted-foreground max-w-sm leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
        {description}
      </p>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="mb-4 sm:mb-6 w-full max-w-md">
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mb-3">
            <Lightbulb className="h-3.5 w-3.5" />
            <span className="font-medium">Try these suggestions</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {suggestions.map((suggestion, index) => (
              <Badge
                key={index}
                variant="outline"
                className={cn(
                  "px-3 py-1.5 text-xs bg-background/80 hover:bg-muted transition-colors",
                  suggestion.onClick && "cursor-pointer hover:border-primary/50"
                )}
                onClick={suggestion.onClick}
              >
                {suggestion.icon && <span className="mr-1.5">{suggestion.icon}</span>}
                {suggestion.text}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
        {action && (
          <Button onClick={action.onClick} variant="warm" size="sm" className="gap-2">
            {action.label}
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
        {secondaryAction && (
          <Button onClick={secondaryAction.onClick} variant="outline" size="sm" className="gap-2">
            {secondaryAction.label}
          </Button>
        )}
      </div>
    </div>
  );
}

// Pre-configured empty states for common scenarios
interface NoResultsProps {
  type: "recipes" | "drinks" | "search";
  suggestions?: string[];
  onClearFilters?: () => void;
  filterCount?: number;
}

export function NoResultsState({ type, suggestions = [], onClearFilters, filterCount = 0 }: NoResultsProps) {
  const config = {
    recipes: {
      title: "No Matching Recipes",
      description: filterCount > 0 
        ? `Your filters are too restrictive. Try removing some filters or selecting different ingredients.`
        : "We couldn't find recipes with your selected ingredients. Try adding more common ingredients.",
      defaultSuggestions: ["🥚 Eggs", "🍗 Chicken", "🧀 Cheese", "🍝 Pasta", "🥬 Vegetables"],
    },
    drinks: {
      title: "No Matching Drinks",
      description: filterCount > 0
        ? `Your filters are too restrictive. Try removing some filters.`
        : "We couldn't find drinks with your selected ingredients. Try adding base spirits or mixers.",
      defaultSuggestions: ["🍋 Citrus", "🧊 Ice", "🥤 Soda", "🍯 Simple Syrup", "🌿 Mint"],
    },
    search: {
      title: "No Results Found",
      description: "We couldn't find what you're looking for. Try a different search term or browse by category.",
      defaultSuggestions: ["Chicken", "Pasta", "Salad", "Quick meals", "Vegetarian"],
    },
  };

  const { title, description, defaultSuggestions } = config[type];
  const displaySuggestions = suggestions.length > 0 ? suggestions : defaultSuggestions;

  return (
    <EmptyState
      icon={ChefHat}
      title={title}
      description={description}
      suggestions={displaySuggestions.map(s => ({ text: s }))}
      action={onClearFilters && filterCount > 0 ? {
        label: `Clear ${filterCount} filter${filterCount > 1 ? 's' : ''}`,
        onClick: onClearFilters,
      } : undefined}
      variant="muted"
      size="md"
    />
  );
}

// Empty state for meal type tabs
interface MealTypeEmptyProps {
  mealType: "breakfast" | "lunch" | "dinner" | "dessert" | "sides";
  onAddIngredient?: (ingredient: string) => void;
}

const mealTypeSuggestions: Record<string, { text: string; icon: string; ingredient: string }[]> = {
  breakfast: [
    { text: "Add eggs", icon: "🥚", ingredient: "eggs" },
    { text: "Add oats", icon: "🥣", ingredient: "oats" },
    { text: "Add bread", icon: "🍞", ingredient: "bread" },
    { text: "Add bacon", icon: "🥓", ingredient: "bacon" },
    { text: "Add berries", icon: "🫐", ingredient: "berries" },
  ],
  lunch: [
    { text: "Add chicken", icon: "🍗", ingredient: "chicken" },
    { text: "Add lettuce", icon: "🥬", ingredient: "lettuce" },
    { text: "Add tomatoes", icon: "🍅", ingredient: "tomatoes" },
    { text: "Add bread", icon: "🥪", ingredient: "bread" },
    { text: "Add cheese", icon: "🧀", ingredient: "cheese" },
  ],
  dinner: [
    { text: "Add chicken", icon: "🍗", ingredient: "chicken" },
    { text: "Add beef", icon: "🥩", ingredient: "beef" },
    { text: "Add pasta", icon: "🍝", ingredient: "pasta" },
    { text: "Add rice", icon: "🍚", ingredient: "rice" },
    { text: "Add garlic", icon: "🧄", ingredient: "garlic" },
  ],
  dessert: [
    { text: "Add flour", icon: "🌾", ingredient: "flour" },
    { text: "Add sugar", icon: "🍬", ingredient: "sugar" },
    { text: "Add chocolate", icon: "🍫", ingredient: "chocolate" },
    { text: "Add butter", icon: "🧈", ingredient: "butter" },
    { text: "Add eggs", icon: "🥚", ingredient: "eggs" },
  ],
  sides: [
    { text: "Add potatoes", icon: "🥔", ingredient: "potatoes" },
    { text: "Add bread", icon: "🍞", ingredient: "bread" },
    { text: "Add butter", icon: "🧈", ingredient: "butter" },
    { text: "Add vegetables", icon: "🥦", ingredient: "vegetables" },
    { text: "Add cheese", icon: "🧀", ingredient: "cheese" },
  ],
};

const mealTypeDescriptions: Record<string, string> = {
  breakfast: "Start your day right! Add breakfast staples like eggs, oats, or bread to see morning recipes.",
  lunch: "Power through your afternoon! Add proteins like chicken or fresh veggies to find lunch ideas.",
  dinner: "Cook up something special! Add chicken, beef, or pasta to discover dinner recipes.",
  dessert: "Satisfy your sweet tooth! Add flour, sugar, or chocolate for dessert recipes.",
  sides: "Complete your meal! Add potatoes, bread, or vegetables for side dish ideas.",
};

export function MealTypeEmptyState({ mealType, onAddIngredient }: MealTypeEmptyProps) {
  const suggestions = mealTypeSuggestions[mealType] || [];
  const description = mealTypeDescriptions[mealType] || "No recipes match your ingredients.";

  return (
    <div className="py-8 px-4 text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-muted mb-4">
        <ChefHat className="h-6 w-6 text-muted-foreground" />
      </div>
      <h4 className="font-medium text-lg mb-2">No {mealType} recipes found</h4>
      <p className="text-muted-foreground text-sm max-w-sm mx-auto mb-4">
        {description}
      </p>
      {suggestions.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2">
          {suggestions.slice(0, 4).map((suggestion) => (
            <Badge
              key={suggestion.ingredient}
              variant="outline"
              className={cn(
                "px-3 py-1.5 text-xs bg-background hover:bg-primary/10 transition-colors",
                onAddIngredient && "cursor-pointer hover:border-primary/50"
              )}
              onClick={() => onAddIngredient?.(suggestion.ingredient)}
            >
              <span className="mr-1.5">{suggestion.icon}</span>
              {suggestion.text}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
