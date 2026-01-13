import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame, Drumstick, Wheat, Droplets, Heart, Activity, Sparkles, CircleDot } from "lucide-react";
import { format, addDays, startOfWeek } from "date-fns";
import type { MealPlanEntry } from "@/components/MealCalendar";

interface WeeklyNutritionSummaryProps {
  mealPlan: MealPlanEntry[];
  weekStart?: Date;
}

interface NutritionTotals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sodium: number;
  cholesterol: number;
  mealCount: number;
}

export function WeeklyNutritionSummary({ mealPlan, weekStart }: WeeklyNutritionSummaryProps) {
  const currentWeekStart = weekStart || startOfWeek(new Date(), { weekStartsOn: 1 });
  const weekEnd = addDays(currentWeekStart, 6);

  // Filter meals for the current week
  const weekMeals = mealPlan.filter(entry => {
    const entryDate = new Date(entry.date);
    return entryDate >= currentWeekStart && entryDate <= weekEnd;
  });

  // Calculate nutrition totals
  const totals = weekMeals.reduce<NutritionTotals>(
    (acc, entry) => {
      const nutrition = entry.recipe.nutrition;
      if (nutrition) {
        acc.calories += nutrition.calories || 0;
        acc.protein += nutrition.protein || 0;
        acc.carbs += nutrition.carbs || 0;
        acc.fat += nutrition.fat || 0;
        acc.fiber += nutrition.fiber || 0;
        acc.sodium += nutrition.sodium || 0;
        acc.cholesterol += nutrition.cholesterol || 0;
      }
      acc.mealCount += 1;
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sodium: 0, cholesterol: 0, mealCount: 0 }
  );

  // Calculate daily averages
  const dailyAvg = {
    calories: Math.round(totals.calories / 7),
    protein: Math.round(totals.protein / 7),
    carbs: Math.round(totals.carbs / 7),
    fat: Math.round(totals.fat / 7),
    fiber: Math.round(totals.fiber / 7),
    sodium: Math.round(totals.sodium / 7),
    cholesterol: Math.round(totals.cholesterol / 7),
  };

  const nutritionItems = [
    {
      label: "Calories",
      total: totals.calories,
      daily: dailyAvg.calories,
      unit: "kcal",
      icon: Flame,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      label: "Protein",
      total: totals.protein,
      daily: dailyAvg.protein,
      unit: "g",
      icon: Drumstick,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
    },
    {
      label: "Carbs",
      total: totals.carbs,
      daily: dailyAvg.carbs,
      unit: "g",
      icon: Wheat,
      color: "text-sky-500",
      bgColor: "bg-sky-500/10",
    },
    {
      label: "Fat",
      total: totals.fat,
      daily: dailyAvg.fat,
      unit: "g",
      icon: Droplets,
      color: "text-violet-500",
      bgColor: "bg-violet-500/10",
    },
    {
      label: "Fiber",
      total: totals.fiber,
      daily: dailyAvg.fiber,
      unit: "g",
      icon: Activity,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      label: "Sodium",
      total: totals.sodium,
      daily: dailyAvg.sodium,
      unit: "mg",
      icon: Sparkles,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      label: "Cholesterol",
      total: totals.cholesterol,
      daily: dailyAvg.cholesterol,
      unit: "mg",
      icon: CircleDot,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
  ];

  const isEmpty = weekMeals.length === 0;

  return (
    <Card className="shadow-elevated border-border/50 bg-card/90 backdrop-blur-sm overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-red-400 to-amber-400" />
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-serif text-xl flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              Weekly Nutrition
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {format(currentWeekStart, "MMM d")} - {format(weekEnd, "MMM d")} • {totals.mealCount} meal{totals.mealCount !== 1 ? 's' : ''} planned
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="p-4 rounded-full bg-muted/50 mb-4">
              <Flame className="h-8 w-8 text-muted-foreground/50" />
            </div>
            <h3 className="font-medium text-muted-foreground mb-1">No meals planned yet</h3>
            <p className="text-sm text-muted-foreground/70 max-w-xs">
              Add meals to your calendar to see your weekly nutrition breakdown and macro distribution.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {nutritionItems.map((item) => (
                <div
                  key={item.label}
                  className={`rounded-xl p-3 ${item.bgColor} transition-all hover:scale-[1.02]`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <item.icon className={`h-4 w-4 ${item.color}`} />
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      {item.label}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className={`text-2xl font-bold ${item.color}`}>
                      {item.total.toLocaleString()}
                      <span className="text-xs font-normal text-muted-foreground ml-1">
                        {item.unit}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      ~{item.daily} {item.unit}/day avg
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Macro breakdown bar */}
            {totals.protein + totals.carbs + totals.fat > 0 && (
              <div className="mt-4 pt-4 border-t border-border/50">
                <div className="text-xs text-muted-foreground mb-2 font-medium">Macro Distribution</div>
                <div className="h-3 rounded-full overflow-hidden flex bg-muted/50">
                  {(() => {
                    const total = totals.protein + totals.carbs + totals.fat;
                    const proteinPct = (totals.protein / total) * 100;
                    const carbsPct = (totals.carbs / total) * 100;
                    const fatPct = (totals.fat / total) * 100;
                    
                    return (
                      <>
                        <div 
                          className="bg-red-400 transition-all" 
                          style={{ width: `${proteinPct}%` }}
                          title={`Protein: ${Math.round(proteinPct)}%`}
                        />
                        <div 
                          className="bg-sky-400 transition-all" 
                          style={{ width: `${carbsPct}%` }}
                          title={`Carbs: ${Math.round(carbsPct)}%`}
                        />
                        <div 
                          className="bg-violet-400 transition-all" 
                          style={{ width: `${fatPct}%` }}
                          title={`Fat: ${Math.round(fatPct)}%`}
                        />
                      </>
                    );
                  })()}
                </div>
                <div className="flex justify-between mt-1.5 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-red-400" /> Protein
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-sky-400" /> Carbs
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-violet-400" /> Fat
                  </span>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
