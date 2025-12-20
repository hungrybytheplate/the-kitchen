import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight, Calendar, CalendarPlus } from "lucide-react";
import { useState } from "react";
import { format, addDays, startOfWeek, isSameDay } from "date-fns";
import { cn } from "@/lib/utils";
import type { Recipe } from "@/data/recipes";
import { RecipeDetailDialog } from "@/components/RecipeDetailDialog";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface MealPlanEntry {
  date: string;
  recipe: Recipe;
}

interface MealCalendarProps {
  mealPlan: MealPlanEntry[];
  onRemove: (date: string, recipeId: string) => void;
  onAddToShopping?: (ingredientId: string) => void;
  savedRecipes?: string[];
  onSaveRecipe?: (recipeId: string) => void;
  onAddToCalendar?: (recipe: Recipe) => void;
}

const CALENDAR_PREFERENCE_KEY = 'preferred-calendar-provider';

type CalendarProvider = 'google' | 'outlook' | 'apple';

const calendarProviders: { id: CalendarProvider; name: string; icon: string }[] = [
  { id: 'google', name: 'Google Calendar', icon: '📅' },
  { id: 'outlook', name: 'Outlook', icon: '📧' },
  { id: 'apple', name: 'Apple Calendar', icon: '🍎' },
];

export function MealCalendar({ 
  mealPlan, 
  onRemove, 
  onAddToShopping,
  savedRecipes = [],
  onSaveRecipe,
  onAddToCalendar
}: MealCalendarProps) {
  const [weekStart, setWeekStart] = useState(() => startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const { toast } = useToast();

  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const getMealsForDay = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    return mealPlan.filter((entry) => entry.date === dateStr);
  };

  const mealTypeIcons: Record<string, string> = {
    breakfast: "🌅",
    lunch: "☀️",
    dinner: "🌙",
    dessert: "🍰",
    sides: "🥐",
  };

  const isEmpty = mealPlan.length === 0;

  const generateCalendarLink = (entry: MealPlanEntry, type: CalendarProvider) => {
    const startDate = new Date(entry.date);
    const endDate = new Date(entry.date);
    
    // Set meal times based on meal type
    const mealTimes: Record<string, { start: number; end: number }> = {
      breakfast: { start: 8, end: 9 },
      lunch: { start: 12, end: 13 },
      dinner: { start: 18, end: 19 },
      dessert: { start: 19, end: 20 },
      sides: { start: 18, end: 19 },
    };
    
    const times = mealTimes[entry.recipe.mealType] || { start: 12, end: 13 };
    startDate.setHours(times.start, 0, 0);
    endDate.setHours(times.end, 0, 0);
    
    const title = encodeURIComponent(entry.recipe.title);
    const details = encodeURIComponent(`Recipe: ${entry.recipe.title}\n\nIngredients:\n${entry.recipe.ingredients.join(', ')}\n\nInstructions:\n${entry.recipe.instructions.join('\n')}`);
    
    if (type === 'google') {
      const start = format(startDate, "yyyyMMdd'T'HHmmss");
      const end = format(endDate, "yyyyMMdd'T'HHmmss");
      return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}`;
    }
    
    if (type === 'outlook') {
      const start = startDate.toISOString();
      const end = endDate.toISOString();
      return `https://outlook.live.com/calendar/0/deeplink/compose?subject=${title}&startdt=${start}&enddt=${end}&body=${details}`;
    }
    
    // Apple Calendar (ICS file)
    const start = format(startDate, "yyyyMMdd'T'HHmmss");
    const end = format(endDate, "yyyyMMdd'T'HHmmss");
    const ics = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${start}
DTEND:${end}
SUMMARY:${entry.recipe.title}
DESCRIPTION:${entry.recipe.instructions.join(' ')}
END:VEVENT
END:VCALENDAR`;
    return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
  };

  const handleCalendarSync = (entry: MealPlanEntry, provider: CalendarProvider) => {
    const url = generateCalendarLink(entry, provider);
    
    if (provider === 'apple') {
      const link = document.createElement('a');
      link.href = url;
      link.download = `${entry.recipe.title.replace(/\s+/g, '-')}.ics`;
      link.click();
    } else {
      window.open(url, '_blank');
    }
    
    const providerName = calendarProviders.find(p => p.id === provider)?.name || 'Calendar';
    toast({
      title: "Added to calendar!",
      description: `"${entry.recipe.title}" synced to ${providerName}`,
    });
  };

  const handleQuickCalendarSync = (entry: MealPlanEntry, e: React.MouseEvent) => {
    e.stopPropagation();
    const savedPreference = localStorage.getItem(CALENDAR_PREFERENCE_KEY) as CalendarProvider | null;
    
    if (savedPreference) {
      handleCalendarSync(entry, savedPreference);
    }
    // If no preference, the dropdown will show options
  };

  const savedPreference = localStorage.getItem(CALENDAR_PREFERENCE_KEY) as CalendarProvider | null;

  return (
    <>
      <Card className="shadow-elevated border-border/50 bg-card/90 backdrop-blur-sm overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 gradient-sage" />
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-serif text-2xl flex items-center gap-2">
                <Calendar className="h-6 w-6 text-secondary" />
                Meal Plan
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {isEmpty ? "Plan your meals for the week ahead" : `${mealPlan.length} meal${mealPlan.length === 1 ? '' : 's'} planned`}
              </p>
            </div>
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
                        className="group relative bg-card rounded-lg p-1.5 shadow-sm text-xs cursor-pointer hover:bg-accent/50 transition-colors"
                        onClick={() => setSelectedRecipe(entry.recipe)}
                      >
                        <div className="flex items-start gap-1">
                          <span>{mealTypeIcons[entry.recipe.mealType] || "🍽️"}</span>
                          <span className="line-clamp-2 leading-tight font-medium flex-1">
                            {entry.recipe.title}
                          </span>
                        </div>
                        
                        {/* Quick calendar sync button */}
                        <div className="flex gap-1 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          {savedPreference ? (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-5 px-1.5 text-[10px] bg-primary/10 hover:bg-primary/20 text-primary"
                              onClick={(e) => handleQuickCalendarSync(entry, e)}
                            >
                              <CalendarPlus className="h-3 w-3 mr-0.5" />
                              Sync
                            </Button>
                          ) : (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-5 px-1.5 text-[10px] bg-primary/10 hover:bg-primary/20 text-primary"
                                >
                                  <CalendarPlus className="h-3 w-3 mr-0.5" />
                                  Sync
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent 
                                align="start" 
                                className="w-40 bg-popover z-50"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {calendarProviders.map((provider) => (
                                  <DropdownMenuItem
                                    key={provider.id}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleCalendarSync(entry, provider.id);
                                    }}
                                    className="cursor-pointer"
                                  >
                                    <span className="mr-2">{provider.icon}</span>
                                    {provider.name}
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute -top-1 -right-1 h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            onRemove(entry.date, entry.recipe.id);
                          }}
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

      {selectedRecipe && (
        <RecipeDetailDialog
          recipe={selectedRecipe}
          open={!!selectedRecipe}
          onOpenChange={(open) => !open && setSelectedRecipe(null)}
          onAddToShopping={onAddToShopping || (() => {})}
          isSaved={savedRecipes.includes(selectedRecipe.id)}
          onSave={onSaveRecipe ? () => onSaveRecipe(selectedRecipe.id) : () => {}}
          onAddToCalendar={onAddToCalendar ? () => onAddToCalendar(selectedRecipe) : () => {}}
        />
      )}
    </>
  );
}
