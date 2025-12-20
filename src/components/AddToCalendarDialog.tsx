import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import type { Recipe } from "@/data/recipes";
import { Calendar as CalendarIcon, ExternalLink, Sparkles, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddToCalendarDialogProps {
  recipe: Recipe | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (date: Date) => void;
}

type CalendarProvider = 'google' | 'outlook' | 'apple';

const CALENDAR_PREFERENCE_KEY = 'preferred-calendar-provider';

function generateCalendarLinks(recipe: Recipe, date: Date) {
  const title = encodeURIComponent(recipe.title);
  const description = encodeURIComponent(`Meal prep: ${recipe.title}\nCook time: ${recipe.cookTime}\nIngredients: ${recipe.ingredients.join(", ")}`);
  const startDate = format(date, "yyyyMMdd");
  const endDate = startDate;

  // Google Calendar
  const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${description}`;

  // Outlook Calendar
  const outlookUrl = `https://outlook.live.com/calendar/0/action/compose?subject=${title}&startdt=${format(date, "yyyy-MM-dd")}&enddt=${format(date, "yyyy-MM-dd")}&body=${description}&allday=true`;

  // Apple Calendar (webcal format - will prompt to add to calendar on iOS/Mac)
  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART;VALUE=DATE:${startDate}
DTEND;VALUE=DATE:${startDate}
SUMMARY:${recipe.title}
DESCRIPTION:Meal prep: ${recipe.title}. Cook time: ${recipe.cookTime}.
END:VEVENT
END:VCALENDAR`;
  const appleUrl = `data:text/calendar;charset=utf-8,${encodeURIComponent(icsContent)}`;

  return { googleUrl, outlookUrl, appleUrl };
}

const calendarProviders = [
  {
    id: 'google' as CalendarProvider,
    name: 'Google Calendar',
    gradient: 'from-blue-500 via-green-500 to-yellow-500',
    urlKey: 'googleUrl' as const,
  },
  {
    id: 'outlook' as CalendarProvider,
    name: 'Outlook Calendar',
    bg: 'bg-[#0078D4]',
    urlKey: 'outlookUrl' as const,
  },
  {
    id: 'apple' as CalendarProvider,
    name: 'Apple Calendar',
    gradient: 'from-red-400 to-red-600',
    urlKey: 'appleUrl' as const,
    isDownload: true,
  },
];

export function AddToCalendarDialog({ recipe, open, onOpenChange, onConfirm }: AddToCalendarDialogProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [showCalendarOptions, setShowCalendarOptions] = useState(false);
  const [rememberChoice, setRememberChoice] = useState(false);
  const [savedPreference, setSavedPreference] = useState<CalendarProvider | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(CALENDAR_PREFERENCE_KEY) as CalendarProvider | null;
    if (saved) {
      setSavedPreference(saved);
    }
  }, []);

  if (!recipe) return null;

  const handleAddToMealPlan = () => {
    if (selectedDate) {
      onConfirm(selectedDate);
      setShowCalendarOptions(true);
    }
  };

  const calendarLinks = selectedDate ? generateCalendarLinks(recipe, selectedDate) : null;

  const handleCalendarSelect = (provider: CalendarProvider) => {
    if (rememberChoice) {
      localStorage.setItem(CALENDAR_PREFERENCE_KEY, provider);
      setSavedPreference(provider);
    }
    
    const providerConfig = calendarProviders.find(p => p.id === provider);
    if (providerConfig && calendarLinks) {
      const url = calendarLinks[providerConfig.urlKey];
      if (providerConfig.isDownload) {
        // For Apple, trigger download
        const link = document.createElement('a');
        link.href = url;
        link.download = `${recipe.title.replace(/\s+/g, "-")}.ics`;
        link.click();
      } else {
        window.open(url, "_blank");
      }
    }
    handleDone();
  };

  const handleDone = () => {
    setShowCalendarOptions(false);
    setRememberChoice(false);
    onOpenChange(false);
  };

  const clearPreference = () => {
    localStorage.removeItem(CALENDAR_PREFERENCE_KEY);
    setSavedPreference(null);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) {
        setShowCalendarOptions(false);
        setRememberChoice(false);
      }
      onOpenChange(isOpen);
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif">
            {showCalendarOptions ? "Sync to Your Calendar" : "Add to Meal Plan"}
          </DialogTitle>
          <DialogDescription>
            {showCalendarOptions 
              ? `"${recipe.title}" has been added to your meal plan!`
              : `Choose a date for "${recipe.title}"`}
          </DialogDescription>
        </DialogHeader>

        {!showCalendarOptions ? (
          <>
            <div className="flex justify-center py-4">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                className="rounded-xl border shadow-sm pointer-events-auto"
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="ghost" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button
                variant="warm"
                onClick={handleAddToMealPlan}
                disabled={!selectedDate}
              >
                Add to {selectedDate ? format(selectedDate, "MMM d") : "Calendar"}
              </Button>
            </div>
          </>
        ) : (
          <div className="space-y-4 py-2">
            {/* Prominent sync prompt */}
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 p-4 border border-primary/20">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
              <div className="relative flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">Never miss a meal!</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Sync to your phone calendar for automatic reminders
                  </p>
                </div>
              </div>
            </div>

            {/* Calendar provider buttons */}
            <div className="grid gap-2">
              {calendarProviders.map((provider) => (
                <Button
                  key={provider.id}
                  variant="outline"
                  className={cn(
                    "w-full justify-start gap-3 h-14 transition-all hover:scale-[1.02] hover:shadow-md",
                    savedPreference === provider.id && "ring-2 ring-primary ring-offset-2"
                  )}
                  onClick={() => handleCalendarSelect(provider.id)}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center",
                    provider.gradient ? `bg-gradient-to-br ${provider.gradient}` : provider.bg
                  )}>
                    <CalendarIcon className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <span className="font-medium">{provider.name}</span>
                    {savedPreference === provider.id && (
                      <span className="ml-2 text-xs text-primary">(Your default)</span>
                    )}
                  </div>
                  {savedPreference === provider.id ? (
                    <Check className="h-4 w-4 text-primary" />
                  ) : (
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              ))}
            </div>

            {/* Remember choice checkbox */}
            <div className="flex items-center space-x-3 px-1 py-2 rounded-lg bg-muted/50">
              <Checkbox 
                id="remember-choice" 
                checked={rememberChoice}
                onCheckedChange={(checked) => setRememberChoice(checked === true)}
              />
              <label 
                htmlFor="remember-choice" 
                className="text-sm text-muted-foreground cursor-pointer select-none"
              >
                Remember my choice for next time
              </label>
            </div>

            {savedPreference && (
              <button 
                onClick={clearPreference}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
              >
                Clear saved preference
              </button>
            )}

            <div className="flex justify-end pt-2 border-t">
              <Button variant="ghost" onClick={handleDone}>
                Skip for now
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
