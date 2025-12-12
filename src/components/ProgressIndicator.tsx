import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface ProgressStep {
  label: string;
  description?: string;
  completed: boolean;
  active: boolean;
}

interface ProgressIndicatorProps {
  steps: ProgressStep[];
  className?: string;
}

export function ProgressIndicator({ steps, className }: ProgressIndicatorProps) {
  return (
    <div className={cn("flex items-center justify-between w-full", className)}>
      {steps.map((step, index) => (
        <div key={index} className="flex items-center flex-1 last:flex-none">
          {/* Step circle */}
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300",
                step.completed
                  ? "gradient-warm text-primary-foreground shadow-warm"
                  : step.active
                    ? "border-2 border-primary bg-primary/10 text-primary"
                    : "border-2 border-muted-foreground/30 text-muted-foreground"
              )}
            >
              {step.completed ? (
                <Check className="h-4 w-4" />
              ) : (
                index + 1
              )}
            </div>
            <span
              className={cn(
                "text-xs mt-1.5 font-medium transition-colors",
                step.active || step.completed
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {step.label}
            </span>
          </div>
          
          {/* Connector line */}
          {index < steps.length - 1 && (
            <div className="flex-1 h-0.5 mx-2 mb-5">
              <div
                className={cn(
                  "h-full transition-all duration-500",
                  step.completed ? "gradient-warm" : "bg-muted-foreground/20"
                )}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
