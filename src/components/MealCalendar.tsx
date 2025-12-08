import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { format, addDays, startOfWeek, isSameDay } from "date-fns";
import { cn } from "@/lib/utils";
import type { Recipe } from "@/data/recipes";

export interface MealPlanEntry {
  date: string;
  recipe: Recipe;
}

interface MealCalendarProps {
  mealPlan: MealPlanEntry[];
  onRemove: (date: string, recipeId: string) => void;
}

export function MealCalendar({ mealPlan, onRemove }: MealCalendarProps) {
  const [weekStart, setWeekStart] = useState(() => startOfWeek(new Date(), { weekStartsOn: 1 }));

  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const getMealsForDay = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    return mealPlan.filter((entry) => entry.date === dateStr);
  };

  const mealTypeIcons = {
    breakfast: "🌅",
    lunch: "☀️",
    dinner: "🌙",
  };

  return (
    <Card className="shadow-card">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="font-serif text-xl">Meal Plan</CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setWeekStart(addDays(weekStart, -7))}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium min-w-[140px] text-center">
              {format(weekStart, "MMM d")} - {format(addDays(weekStart, 6), "MMM d")}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setWeekStart(addDays(weekStart, 7))}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2">
          {days.map((day) => {
            const meals = getMealsForDay(day);
            const isToday = isSameDay(day, new Date());

            return (
              <div
                key={day.toISOString()}
                className={cn(
                  "min-h-[120px] rounded-xl p-2 transition-colors",
                  isToday ? "bg-primary/10 ring-2 ring-primary/20" : "bg-muted/30"
                )}
              >
                <div className={cn(
                  "text-center mb-2 pb-2 border-b border-border/50",
                  isToday && "text-primary font-semibold"
                )}>
                  <div className="text-xs text-muted-foreground uppercase">
                    {format(day, "EEE")}
                  </div>
                  <div className="text-lg font-medium">
                    {format(day, "d")}
                  </div>
                </div>
                <div className="space-y-1.5">
                  {meals.map((entry) => (
                    <div
                      key={entry.recipe.id}
                      className="group relative bg-card rounded-lg p-1.5 shadow-sm text-xs"
                    >
                      <div className="flex items-start gap-1">
                        <span>{mealTypeIcons[entry.recipe.mealType]}</span>
                        <span className="line-clamp-2 leading-tight font-medium">
                          {entry.recipe.title}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute -top-1 -right-1 h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-full"
                        onClick={() => onRemove(entry.date, entry.recipe.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
