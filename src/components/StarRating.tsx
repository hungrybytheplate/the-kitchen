import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number | undefined;
  onRate?: (rating: number) => void;
  size?: "sm" | "md" | "lg";
  readOnly?: boolean;
}

export function StarRating({ rating = 0, onRate, size = "md", readOnly = false }: StarRatingProps) {
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  const gapClasses = {
    sm: "gap-0.5",
    md: "gap-0.5",
    lg: "gap-1",
  };

  return (
    <div className={cn("flex items-center", gapClasses[size])}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readOnly}
          onClick={(e) => {
            e.stopPropagation();
            if (onRate) {
              // If clicking the same star, remove rating
              if (star === rating) {
                onRate(0);
              } else {
                onRate(star);
              }
            }
          }}
          className={cn(
            "transition-all duration-150",
            !readOnly && "hover:scale-110 cursor-pointer",
            readOnly && "cursor-default"
          )}
        >
          <Star
            className={cn(
              sizeClasses[size],
              star <= rating
                ? "fill-amber-400 text-amber-400"
                : "fill-transparent text-muted-foreground/40"
            )}
          />
        </button>
      ))}
    </div>
  );
}
