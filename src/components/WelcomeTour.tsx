import { useState, useEffect, useCallback } from "react";
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

interface SpotlightPosition {
  top: number;
  left: number;
  width: number;
  height: number;
}

function Spotlight({ targetSelector, children, position = "bottom" }: { 
  targetSelector?: string; 
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right" | "center";
}) {
  const [spotlightPos, setSpotlightPos] = useState<SpotlightPosition | null>(null);
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});

  const updatePosition = useCallback(() => {
    if (!targetSelector) {
      setSpotlightPos(null);
      return;
    }

    const element = document.querySelector(targetSelector);
    if (element) {
      const rect = element.getBoundingClientRect();
      const padding = 8;
      
      setSpotlightPos({
        top: rect.top - padding,
        left: rect.left - padding,
        width: rect.width + padding * 2,
        height: rect.height + padding * 2,
      });

      // Calculate tooltip position
      const tooltipWidth = Math.min(380, window.innerWidth - 32);
      const tooltipHeight = 280;
      
      let style: React.CSSProperties = {};
      
      switch (position) {
        case "top":
          style = {
            bottom: window.innerHeight - rect.top + 16,
            left: Math.max(16, Math.min(rect.left + rect.width / 2 - tooltipWidth / 2, window.innerWidth - tooltipWidth - 16)),
          };
          break;
        case "bottom":
          style = {
            top: rect.bottom + 16,
            left: Math.max(16, Math.min(rect.left + rect.width / 2 - tooltipWidth / 2, window.innerWidth - tooltipWidth - 16)),
          };
          break;
        case "left":
          style = {
            top: Math.max(16, Math.min(rect.top + rect.height / 2 - tooltipHeight / 2, window.innerHeight - tooltipHeight - 16)),
            right: window.innerWidth - rect.left + 16,
          };
          break;
        case "right":
          style = {
            top: Math.max(16, Math.min(rect.top + rect.height / 2 - tooltipHeight / 2, window.innerHeight - tooltipHeight - 16)),
            left: rect.right + 16,
          };
          break;
        default:
          style = {};
      }
      
      setTooltipStyle(style);
    } else {
      setSpotlightPos(null);
    }
  }, [targetSelector, position]);

  useEffect(() => {
    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    
    // Re-check position after a short delay for dynamic content
    const timeout = setTimeout(updatePosition, 100);
    
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
      clearTimeout(timeout);
    };
  }, [updatePosition]);

  const isCenter = !targetSelector || !spotlightPos;

  return createPortal(
    <div className="fixed inset-0 z-[100]">
      {/* Overlay with spotlight cutout */}
      {spotlightPos ? (
        <>
          {/* Dark overlay with hole */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <mask id="spotlight-mask">
                <rect x="0" y="0" width="100%" height="100%" fill="white" />
                <rect
                  x={spotlightPos.left}
                  y={spotlightPos.top}
                  width={spotlightPos.width}
                  height={spotlightPos.height}
                  rx="12"
                  fill="black"
                />
              </mask>
            </defs>
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="rgba(0, 0, 0, 0.75)"
              mask="url(#spotlight-mask)"
            />
          </svg>
          
          {/* Glowing border around target */}
          <div
            className="absolute rounded-xl pointer-events-none animate-pulse"
            style={{
              top: spotlightPos.top,
              left: spotlightPos.left,
              width: spotlightPos.width,
              height: spotlightPos.height,
              boxShadow: "0 0 0 3px hsl(var(--primary)), 0 0 20px 4px hsl(var(--primary) / 0.4)",
            }}
          />
          
          {/* Tooltip card positioned relative to target */}
          <div 
            className="absolute animate-fade-in"
            style={{ ...tooltipStyle, width: Math.min(380, window.innerWidth - 32) }}
          >
            {children}
          </div>
        </>
      ) : (
        <>
          {/* Center overlay for intro/non-targeted steps */}
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="w-full max-w-md animate-fade-in">
              {children}
            </div>
          </div>
        </>
      )}
    </div>,
    document.body
  );
}

export function WelcomeTour({ onComplete, onSkip }: WelcomeTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const step = steps[currentStep];
  const Icon = step.icon;
  const isLastStep = currentStep === steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      onComplete();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // Handle escape key
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
  }, [currentStep, isLastStep]);

  const cardContent = (
    <Card className="shadow-elevated border-border/50 overflow-hidden bg-card">
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

      <CardContent className="p-4 sm:p-6 pt-8 sm:pt-10">
        {/* Progress dots */}
        <div className="flex justify-center gap-1.5 mb-4 sm:mb-6 flex-wrap" role="tablist" aria-label="Tour progress">
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
                  "block w-2 h-2 rounded-full transition-all duration-300",
                  index === currentStep 
                    ? "w-4 gradient-warm" 
                    : index < currentStep 
                      ? "bg-primary/60" 
                      : "bg-muted-foreground/30"
                )}
              />
            </button>
          ))}
        </div>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="absolute inset-0 gradient-warm blur-xl opacity-40 animate-pulse" />
            <div className="relative p-3 rounded-xl gradient-warm shadow-warm">
              <Icon className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="text-center mb-4" key={currentStep}>
          <h2 className="font-serif text-lg sm:text-xl font-semibold mb-2">{step.title}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">{step.description}</p>
          <Badge variant="secondary" className="px-2 py-0.5 text-xs">
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
            {isLastStep ? "Start" : "Next"}
            <ArrowRight className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Spotlight 
      targetSelector={step.targetSelector} 
      position={step.position}
    >
      {cardContent}
    </Spotlight>
  );
}