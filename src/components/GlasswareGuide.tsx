import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { GlassWater, Lightbulb, ChevronRight, Sparkles } from "lucide-react";
import { glasswareGuide, type Glassware } from "@/data/glassware";
import { cn } from "@/lib/utils";

export function GlasswareGuide() {
  const [selectedGlass, setSelectedGlass] = useState<Glassware | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const displayedGlasses = isExpanded ? glasswareGuide : glasswareGuide.slice(0, 6);

  return (
    <>
      <Card className="shadow-elevated border-border/50 bg-card/90 backdrop-blur-sm overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500" />
        <CardHeader className="pb-3">
          <CardTitle className="font-serif text-xl flex items-center gap-2">
            <GlassWater className="h-5 w-5 text-sky-500" />
            Glassware Guide
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            The right glass enhances your drink's presentation and taste
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {displayedGlasses.map((glass) => (
              <button
                key={glass.id}
                onClick={() => setSelectedGlass(glass)}
                className={cn(
                  "group p-3 rounded-xl border border-border/50 bg-muted/30",
                  "hover:bg-muted/60 hover:border-primary/30 hover:shadow-md",
                  "transition-all duration-200 text-left"
                )}
              >
                <div className="flex flex-col items-center text-center gap-2">
                  <span className="text-3xl group-hover:scale-110 transition-transform">
                    {glass.icon}
                  </span>
                  <span className="text-xs font-medium line-clamp-2">
                    {glass.name}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {!isExpanded && glasswareGuide.length > 6 && (
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-muted-foreground hover:text-foreground"
              onClick={() => setIsExpanded(true)}
            >
              Show {glasswareGuide.length - 6} more glasses
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          )}

          {isExpanded && (
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-muted-foreground hover:text-foreground"
              onClick={() => setIsExpanded(false)}
            >
              Show less
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Glass Detail Dialog */}
      <Dialog open={!!selectedGlass} onOpenChange={(open) => !open && setSelectedGlass(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <span className="text-5xl">{selectedGlass?.icon}</span>
              <div>
                <DialogTitle className="font-serif text-xl">
                  {selectedGlass?.name}
                </DialogTitle>
                <DialogDescription className="text-sm">
                  {selectedGlass?.capacity}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {selectedGlass && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {selectedGlass.description}
              </p>

              <div className="space-y-2">
                <h4 className="text-sm font-semibold flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Best For
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedGlass.bestFor.map((drink) => (
                    <Badge
                      key={drink}
                      variant="secondary"
                      className="text-xs"
                    >
                      {drink}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
                <h4 className="text-sm font-semibold flex items-center gap-2 text-amber-700 dark:text-amber-400 mb-1">
                  <Lightbulb className="h-4 w-4" />
                  Pro Tip
                </h4>
                <p className="text-xs text-amber-700/80 dark:text-amber-400/80">
                  {selectedGlass.tips}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
