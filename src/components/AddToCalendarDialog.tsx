import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { format } from "date-fns";
import type { Recipe } from "@/data/recipes";

interface AddToCalendarDialogProps {
  recipe: Recipe | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (date: Date) => void;
}

export function AddToCalendarDialog({ recipe, open, onOpenChange, onConfirm }: AddToCalendarDialogProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  if (!recipe) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif">Add to Meal Plan</DialogTitle>
          <DialogDescription>
            Choose a date for "{recipe.title}"
          </DialogDescription>
        </DialogHeader>
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
            onClick={() => {
              if (selectedDate) {
                onConfirm(selectedDate);
                onOpenChange(false);
              }
            }}
            disabled={!selectedDate}
          >
            Add to {selectedDate ? format(selectedDate, "MMM d") : "Calendar"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
