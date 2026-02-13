import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { StickyNote, Save } from "lucide-react";

interface RecipeNotesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recipeTitle: string;
  recipeId: string;
  currentNote: string;
  onSaveNote: (recipeId: string, note: string) => void;
}

export function RecipeNotesDialog({
  open,
  onOpenChange,
  recipeTitle,
  recipeId,
  currentNote,
  onSaveNote,
}: RecipeNotesDialogProps) {
  const [note, setNote] = useState(currentNote);

  useEffect(() => {
    setNote(currentNote);
  }, [currentNote, open]);

  const handleSave = () => {
    onSaveNote(recipeId, note);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100vw-1rem)] sm:max-w-md max-h-[85vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-serif text-base sm:text-lg pr-6">
            <StickyNote className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />
            <span className="truncate">Notes for {recipeTitle}</span>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3 sm:space-y-4">
          <Textarea
            placeholder="Add your personal notes, modifications, or tips for this recipe..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="min-h-[120px] sm:min-h-[150px] resize-none text-sm sm:text-base"
            maxLength={1000}
          />
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {note.length}/1000 characters
            </span>
            <Button onClick={handleSave} className="gap-2">
              <Save className="h-4 w-4" />
              Save Note
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
