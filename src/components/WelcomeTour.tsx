import { useState } from "react";
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
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

interface WelcomeTourProps {
  onComplete: () => void;
  onSkip: () => void;
}

const steps = [
  {
    icon: ChefHat,
    title: "Welcome to The Kitchen!",
    description: "Your personal meal planning assistant. Let's take a quick tour to help you get started.",
    highlight: "Let's cook something delicious together",
  },
  {
    icon: Refrigerator,
    title: "Select Your Ingredients",
    description: "Start by checking off ingredients you have in your fridge, pantry, and spice cabinet.",
    highlight: "The more you select, the more recipes you'll discover",
  },
  {
    icon: Sparkles,
    title: "Discover Recipes",
    description: "Click 'Find Recipes' and we'll show you breakfast, lunch, and dinner ideas that match your ingredients.",
    highlight: "Missing an ingredient? Add it to your shopping list!",
  },
  {
    icon: Calendar,
    title: "Plan Your Week",
    description: "Add recipes to your meal calendar to plan ahead. Stay organized and never wonder 'what's for dinner?' again.",
    highlight: "Meal prep made simple",
  },
  {
    icon: Heart,
    title: "Save Your Favorites",
    description: "Love a recipe? Save it for later! Build your personal cookbook of go-to meals.",
    highlight: "Your recipes, always at hand",
  },
  {
    icon: ShoppingCart,
    title: "Build Your Shopping List",
    description: "Missing ingredients get added to your shopping list automatically. Check them off as you shop!",
    highlight: "You're all set to start cooking!",
  },
];

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-background/80 backdrop-blur-sm animate-fade-in">
      <Card className="w-full max-w-md shadow-elevated border-border/50 overflow-hidden mx-2 sm:mx-0">
        <div className="absolute top-0 left-0 w-full h-1 gradient-warm" />
        
        {/* Skip button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 h-8 w-8 text-muted-foreground hover:text-foreground z-10"
          onClick={onSkip}
        >
          <X className="h-4 w-4" />
        </Button>

        <CardContent className="p-4 sm:p-6 pt-8 sm:pt-10">
          {/* Progress dots */}
          <div className="flex justify-center gap-1.5 mb-4 sm:mb-6">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === currentStep 
                    ? "w-5 sm:w-6 gradient-warm" 
                    : index < currentStep 
                      ? "bg-primary/60" 
                      : "bg-muted-foreground/30"
                )}
              />
            ))}
          </div>

          {/* Icon */}
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="relative">
              <div className="absolute inset-0 gradient-warm blur-2xl opacity-30 animate-pulse-soft" />
              <div className="relative p-3 sm:p-4 rounded-xl sm:rounded-2xl gradient-warm shadow-warm">
                <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary-foreground" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="text-center mb-4 sm:mb-6 animate-fade-in" key={currentStep}>
            <h2 className="font-serif text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">{step.title}</h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3 sm:mb-4">{step.description}</p>
            <Badge variant="secondary" className="px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm">
              {step.highlight}
            </Badge>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between gap-3">
            <Button
              variant="ghost"
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="text-muted-foreground"
            >
              Back
            </Button>
            
            <span className="text-sm text-muted-foreground">
              {currentStep + 1} of {steps.length}
            </span>

            <Button
              variant="warm"
              onClick={handleNext}
              className="min-w-[100px]"
            >
              {isLastStep ? "Get Started" : "Next"}
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
