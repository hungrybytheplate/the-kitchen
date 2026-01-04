import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, Sparkles, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getGarnishSuggestions,
  garnishCategoryConfig,
  type GarnishSuggestion,
} from "@/data/garnishSuggestions";

interface GarnishSuggestionsProps {
  selectedIngredients: string[];
}

export function GarnishSuggestions({ selectedIngredients }: GarnishSuggestionsProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [expandedTip, setExpandedTip] = useState<string | null>(null);

  const suggestions = getGarnishSuggestions(selectedIngredients);

  if (suggestions.length === 0) {
    return null;
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <div className="rounded-xl border border-border/50 bg-gradient-to-br from-card via-card to-muted/20 shadow-sm overflow-hidden">
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
          >
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-primary/10">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <span className="font-semibold text-sm">Garnish Suggestions</span>
              <Badge variant="secondary" className="text-xs">
                {suggestions.length} ideas
              </Badge>
            </div>
            {isOpen ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="px-4 pb-4 space-y-3">
            <p className="text-xs text-muted-foreground">
              Based on your selected ingredients, these garnishes would pair beautifully:
            </p>

            <div className="grid gap-2 sm:grid-cols-2">
              {suggestions.map((garnish) => (
                <GarnishCard
                  key={garnish.name}
                  garnish={garnish}
                  isExpanded={expandedTip === garnish.name}
                  onToggleTip={() =>
                    setExpandedTip(
                      expandedTip === garnish.name ? null : garnish.name
                    )
                  }
                />
              ))}
            </div>

            {/* Category Legend */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-border/50">
              {Object.entries(garnishCategoryConfig).map(([category, config]) => (
                <Badge
                  key={category}
                  variant="outline"
                  className={cn(
                    "text-[10px] capitalize",
                    config.color
                  )}
                >
                  <span className="mr-1">{config.emoji}</span>
                  {category.replace("-", " ")}
                </Badge>
              ))}
            </div>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}

interface GarnishCardProps {
  garnish: GarnishSuggestion;
  isExpanded: boolean;
  onToggleTip: () => void;
}

function GarnishCard({ garnish, isExpanded, onToggleTip }: GarnishCardProps) {
  const categoryConfig = garnishCategoryConfig[garnish.category];

  return (
    <div
      className={cn(
        "p-3 rounded-lg border border-border/50 bg-card/50 hover:bg-card transition-colors",
        isExpanded && "ring-1 ring-primary/20"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">{categoryConfig.emoji}</span>
            <span className="font-medium text-sm truncate">{garnish.name}</span>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {garnish.description}
          </p>
        </div>

        {garnish.tips && (
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-6 w-6 shrink-0",
              isExpanded && "text-primary bg-primary/10"
            )}
            onClick={onToggleTip}
            aria-label={isExpanded ? "Hide tip" : "Show tip"}
          >
            <Info className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>

      {isExpanded && garnish.tips && (
        <div className="mt-2 pt-2 border-t border-border/50">
          <p className="text-xs text-primary/90 flex items-start gap-1.5">
            <Sparkles className="h-3 w-3 mt-0.5 shrink-0" />
            <span>{garnish.tips}</span>
          </p>
        </div>
      )}

      <Badge
        variant="outline"
        className={cn("mt-2 text-[10px]", categoryConfig.color)}
      >
        {garnish.category.replace("-", " ")}
      </Badge>
    </div>
  );
}
