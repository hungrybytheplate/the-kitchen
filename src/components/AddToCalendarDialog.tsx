import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { format } from "date-fns";
import type { Recipe } from "@/data/recipes";
import { Calendar as CalendarIcon, ExternalLink } from "lucide-react";

interface AddToCalendarDialogProps {
  recipe: Recipe | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (date: Date) => void;
}

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

export function AddToCalendarDialog({ recipe, open, onOpenChange, onConfirm }: AddToCalendarDialogProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [showCalendarOptions, setShowCalendarOptions] = useState(false);

  if (!recipe) return null;

  const handleAddToMealPlan = () => {
    if (selectedDate) {
      onConfirm(selectedDate);
      setShowCalendarOptions(true);
    }
  };

  const calendarLinks = selectedDate ? generateCalendarLinks(recipe, selectedDate) : null;

  const handleDone = () => {
    setShowCalendarOptions(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) setShowCalendarOptions(false);
      onOpenChange(isOpen);
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif">
            {showCalendarOptions ? "Add to Phone Calendar?" : "Add to Meal Plan"}
          </DialogTitle>
          <DialogDescription>
            {showCalendarOptions 
              ? `"${recipe.title}" has been added to your meal plan. Want to sync it to your phone calendar too?`
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
                className="rounded-xl border shadow-sm"
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
          <div className="space-y-4 py-4">
            <div className="grid gap-3">
              <Button
                variant="outline"
                className="w-full justify-start gap-3 h-12"
                onClick={() => window.open(calendarLinks?.googleUrl, "_blank")}
              >
                <div className="w-6 h-6 rounded bg-gradient-to-br from-blue-500 via-green-500 to-yellow-500 flex items-center justify-center">
                  <CalendarIcon className="h-3.5 w-3.5 text-white" />
                </div>
                <span className="flex-1 text-left">Google Calendar</span>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start gap-3 h-12"
                onClick={() => window.open(calendarLinks?.outlookUrl, "_blank")}
              >
                <div className="w-6 h-6 rounded bg-[#0078D4] flex items-center justify-center">
                  <CalendarIcon className="h-3.5 w-3.5 text-white" />
                </div>
                <span className="flex-1 text-left">Outlook Calendar</span>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </Button>

              <a
                href={calendarLinks?.appleUrl}
                download={`${recipe.title.replace(/\s+/g, "-")}.ics`}
                className="inline-flex"
              >
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 h-12"
                  type="button"
                >
                  <div className="w-6 h-6 rounded bg-gradient-to-b from-red-400 to-red-600 flex items-center justify-center">
                    <CalendarIcon className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span className="flex-1 text-left">Apple Calendar (Download .ics)</span>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </Button>
              </a>
            </div>

            <div className="flex justify-end pt-2">
              <Button variant="ghost" onClick={handleDone}>
                Skip, I'm done
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
