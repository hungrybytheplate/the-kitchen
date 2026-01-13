import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ChefHat, 
  Refrigerator, 
  Sparkles, 
  Calendar, 
  Heart, 
  ShoppingCart,
  ArrowRight,
  X,
  Wine,
  Activity,
  Package,
  Star,
  LucideIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

interface WelcomeTourProps {
  onComplete: () => void;
  onSkip: () => void;
}

interface TourStep {
  icon: LucideIcon;
  title: string;
  description: string;
  highlight: string;
  targetSelector?: string;
  position?: "top" | "bottom" | "left" | "right" | "center";
}

const steps: TourStep[] = [
  {
    icon: ChefHat,
    title: "Welcome to The Kitchen!",
    description: "Your personal meal planning assistant. Let's take a quick tour to help you get started.",
    highlight: "Let's cook something delicious together",
    position: "center",
  },
  {
    icon: Refrigerator,
    title: "Select Your Ingredients",
    description: "Start by checking off ingredients you have in your fridge, pantry, and spice cabinet.",
    highlight: "The more you select, the more recipes you'll discover",
    targetSelector: '[data-tour="ingredients"]',
    position: "right",
  },
  {
    icon: Sparkles,
    title: "Discover Recipes",
    description: "Click 'Find Recipes' and we'll show you delicious ideas that match your ingredients.",
    highlight: "Missing an ingredient? Add it to your shopping list!",
    targetSelector: '[data-tour="find-recipes"]',
    position: "top",
  },
  {
    icon: Wine,
    title: "Mix Drinks Too!",
    description: "Switch to Drink mode to discover cocktails, mocktails, smoothies and wellness drinks.",
    highlight: "From margaritas to matcha lattes",
    targetSelector: '[data-tour="mode-switch"]',
    position: "bottom",
  },
  {
    icon: Calendar,
    title: "Plan Your Week",
    description: "Add recipes to your meal calendar. Drag and drop to rearrange, and sync with your calendar app.",
    highlight: "Meal prep made simple",
    targetSelector: '[data-tour="calendar-tab"]',
    position: "bottom",
  },
  {
    icon: Activity,
    title: "Track Your Nutrition",
    description: "See your weekly nutrition summary with calories, protein, carbs, fat, and more.",
    highlight: "Stay on top of your health goals",
    targetSelector: '[data-tour="calendar-tab"]',
    position: "bottom",
  },
  {
    icon: Package,
    title: "Manage Your Pantry",
    description: "Visit My Pantry to manage your ingredients with bulk actions and category controls.",
    highlight: "Keep your kitchen organized",
    targetSelector: '[data-tour="pantry-link"]',
    position: "bottom",
  },
  {
    icon: Heart,
    title: "Save & Rate Favorites",
    description: "Save recipes and drinks you love. Rate them with stars and add personal notes.",
    highlight: "Build your personal cookbook",
    targetSelector: '[data-tour="saved-tab"]',
    position: "bottom",
  },
  {
    icon: Star,
    title: "Smart Suggestions",
    description: "Get personalized recipe recommendations based on your saved favorites and preferences.",
    highlight: "Discover new dishes you'll love",
    targetSelector: '[data-tour="saved-tab"]',
    position: "bottom",
  },
  {
    icon: ShoppingCart,
    title: "Build Your Shopping List",
    description: "Missing ingredients get added automatically. Choose specific variants and check them off!",
    highlight: "You're all set to start cooking!",
    targetSelector: '[data-tour="shopping-tab"]',
    position: "bottom",
  },
];

interface SpotlightRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export function WelcomeTour({ onComplete, onSkip }: WelcomeTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [spotlightRect, setSpotlightRect] = useState<SpotlightRect | null>(null);
  const [mounted, setMounted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const step = steps[currentStep];
  const Icon = step.icon;
  const isLastStep = currentStep === steps.length - 1;
  const isCenter = !step.targetSelector || step.position === "center";

  // Wait for mount before rendering portal
  useEffect(() => {
    setMounted(true);
  }, []);

  // Update spotlight position when step changes
  useEffect(() => {
    const updatePosition = () => {
      if (!step.targetSelector) {
        setSpotlightRect(null);
        return;
      }

      const element = document.querySelector(step.targetSelector);
      if (element) {
        const rect = element.getBoundingClientRect();
        const padding = 8;
        setSpotlightRect({
          top: rect.top - padding,
          left: rect.left - padding,
          width: rect.width + padding * 2,
          height: rect.height + padding * 2,
        });
      } else {
        setSpotlightRect(null);
      }
    };

    // Initial update + delayed update for dynamic content
    updatePosition();
    const timer = setTimeout(updatePosition, 150);
    
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [step.targetSelector, currentStep]);

  const handleNext = useCallback(() => {
    if (isLastStep) {
      onComplete();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  }, [isLastStep, onComplete]);

  const handlePrev = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onSkip();
      } else if (e.key === "ArrowRight" || e.key === "Enter") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev, onSkip]);

  // Calculate card position based on spotlight
  const getCardStyle = (): React.CSSProperties => {
    if (!spotlightRect || isCenter) {
      return {};
    }

    const cardWidth = 360;
    const cardHeight = 320;
    const gap = 16;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let top: number | undefined;
    let left: number | undefined;
    let bottom: number | undefined;
    let right: number | undefined;

    switch (step.position) {
      case "bottom":
        top = spotlightRect.top + spotlightRect.height + gap;
        left = Math.max(16, Math.min(
          spotlightRect.left + spotlightRect.width / 2 - cardWidth / 2,
          viewportWidth - cardWidth - 16
        ));
        break;
      case "top":
        bottom = viewportHeight - spotlightRect.top + gap;
        left = Math.max(16, Math.min(
          spotlightRect.left + spotlightRect.width / 2 - cardWidth / 2,
          viewportWidth - cardWidth - 16
        ));
        break;
      case "right":
        top = Math.max(16, Math.min(
          spotlightRect.top + spotlightRect.height / 2 - cardHeight / 2,
          viewportHeight - cardHeight - 16
        ));
        left = spotlightRect.left + spotlightRect.width + gap;
        break;
      case "left":
        top = Math.max(16, Math.min(
          spotlightRect.top + spotlightRect.height / 2 - cardHeight / 2,
          viewportHeight - cardHeight - 16
        ));
        right = viewportWidth - spotlightRect.left + gap;
        break;
    }

    return { top, left, bottom, right, width: cardWidth };
  };

  if (!mounted) return null;

  const content = (
    <div className="fixed inset-0 z-[100]" onClick={(e) => e.target === e.currentTarget && onSkip()}>
      {/* Overlay */}
      {isCenter || !spotlightRect ? (
        // Center mode: simple overlay
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      ) : (
        // Spotlight mode: four boxes around the target
        <>
          {/* Top overlay */}
          <div 
            className="absolute left-0 right-0 top-0 bg-black/70"
            style={{ height: spotlightRect.top }}
          />
          {/* Bottom overlay */}
          <div 
            className="absolute left-0 right-0 bottom-0 bg-black/70"
            style={{ top: spotlightRect.top + spotlightRect.height }}
          />
          {/* Left overlay */}
          <div 
            className="absolute left-0 bg-black/70"
            style={{ 
              top: spotlightRect.top,
              width: spotlightRect.left,
              height: spotlightRect.height
            }}
          />
          {/* Right overlay */}
          <div 
            className="absolute right-0 bg-black/70"
            style={{ 
              top: spotlightRect.top,
              left: spotlightRect.left + spotlightRect.width,
              height: spotlightRect.height
            }}
          />
          {/* Spotlight ring */}
          <div
            className="absolute rounded-xl pointer-events-none ring-4 ring-primary ring-offset-2 ring-offset-transparent"
            style={{
              top: spotlightRect.top,
              left: spotlightRect.left,
              width: spotlightRect.width,
              height: spotlightRect.height,
              boxShadow: "0 0 30px 8px hsl(var(--primary) / 0.3)",
              animation: "pulse 2s ease-in-out infinite",
            }}
          />
        </>
      )}

      {/* Card */}
      <div
        ref={cardRef}
        className={cn(
          "absolute",
          isCenter || !spotlightRect ? "inset-0 flex items-center justify-center p-4" : ""
        )}
        style={!isCenter && spotlightRect ? getCardStyle() : undefined}
      >
        <Card className={cn(
          "shadow-2xl border-border/50 overflow-hidden bg-card relative",
          isCenter || !spotlightRect ? "w-full max-w-md" : ""
        )}>
          <div className="absolute top-0 left-0 w-full h-1 gradient-warm" />
          
          {/* Skip button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 h-8 w-8 text-muted-foreground hover:text-foreground z-10"
            onClick={onSkip}
            aria-label="Skip tour"
          >
            <X className="h-4 w-4" />
          </Button>

          <CardContent className="p-5 pt-10">
            {/* Progress dots */}
            <div className="flex justify-center gap-1.5 mb-5 flex-wrap" role="tablist" aria-label="Tour progress">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  aria-label={`Go to step ${index + 1} of ${steps.length}`}
                  role="tab"
                  aria-selected={index === currentStep}
                  className={cn(
                    "relative p-1.5 -m-1.5 rounded-full transition-all duration-300",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  )}
                >
                  <span
                    className={cn(
                      "block h-2 rounded-full transition-all duration-300",
                      index === currentStep 
                        ? "w-5 gradient-warm" 
                        : index < currentStep 
                          ? "w-2 bg-primary/60" 
                          : "w-2 bg-muted-foreground/30"
                    )}
                  />
                </button>
              ))}
            </div>

            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 gradient-warm blur-xl opacity-40" />
                <div className="relative p-3 rounded-xl gradient-warm shadow-warm">
                  <Icon className="h-6 w-6 text-primary-foreground" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="text-center mb-5" key={currentStep}>
              <h2 className="font-serif text-xl font-semibold mb-2">{step.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">{step.description}</p>
              <Badge variant="secondary" className="px-3 py-1 text-xs">
                {step.highlight}
              </Badge>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePrev}
                disabled={currentStep === 0}
                className="text-muted-foreground"
              >
                Back
              </Button>
              
              <span className="text-xs text-muted-foreground">
                {currentStep + 1} of {steps.length}
              </span>

              <Button
                variant="warm"
                size="sm"
                onClick={handleNext}
                className="min-w-[80px]"
              >
                {isLastStep ? "Get Started" : "Next"}
                <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}