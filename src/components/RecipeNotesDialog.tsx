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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-serif">
            <StickyNote className="h-5 w-5 text-primary" />
            Notes for {recipeTitle}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="Add your personal notes, modifications, or tips for this recipe..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="min-h-[150px] resize-none"
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
