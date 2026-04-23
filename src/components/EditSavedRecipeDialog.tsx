import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Pencil, Save, Minus, Plus, RotateCcw, Users } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface EditSavedRecipeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recipeId: string;
  recipeTitle: string;
  /** The recipe's default servings count (used as the baseline). */
  defaultServings: number;
  /** Current saved override servings, or null/undefined if none set. */
  currentServings: number | null | undefined;
  /** Current saved note text. */
  currentNote: string;
  onSave: (data: { servings: number | null; note: string }) => Promise<void> | void;
}

/**
 * Unified "edit" dialog for a saved recipe — adjust servings + edit notes
 * in one place. Saving upserts to the same row each time, so repeated edits
 * never create duplicate saves.
 */
export function EditSavedRecipeDialog({
  open,
  onOpenChange,
  recipeId,
  recipeTitle,
  defaultServings,
  currentServings,
  currentNote,
  onSave,
}: EditSavedRecipeDialogProps) {
  const initialServings = currentServings ?? defaultServings;
  const [servings, setServings] = useState<number>(initialServings);
  const [note, setNote] = useState<string>(currentNote);
  const [saving, setSaving] = useState(false);

  // Reset local state whenever the dialog opens for a new recipe
  useEffect(() => {
    if (open) {
      setServings(currentServings ?? defaultServings);
      setNote(currentNote);
    }
  }, [open, currentServings, defaultServings, currentNote]);

  const adjust = (delta: number) => {
    setServings((s) => Math.max(1, Math.min(99, s + delta)));
  };

  const handleReset = () => {
    setServings(defaultServings);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // If the user reverted to the recipe's default, store null so we
      // don't keep an unnecessary override row around.
      const nextServings = servings === defaultServings ? null : servings;
      await onSave({ servings: nextServings, note });
      toast({
        title: "Recipe updated",
        description: "Your changes have been saved.",
      });
      onOpenChange(false);
    } catch (err) {
      console.error(err);
      toast({
        title: "Couldn't save changes",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const isCustomized = servings !== defaultServings;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100vw-1rem)] sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-serif text-base sm:text-lg pr-6">
            <Pencil className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />
            <span className="truncate">Edit {recipeTitle}</span>
          </DialogTitle>
          <DialogDescription className="text-xs">
            Adjust your saved servings and notes. Edits update the same saved
            recipe — no duplicates.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 pt-2">
          {/* Servings adjuster */}
          <div className="space-y-2">
            <Label htmlFor={`servings-${recipeId}`} className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-muted-foreground" />
              Servings
              {isCustomized && (
                <span className="text-xs font-normal text-muted-foreground">
                  (default: {defaultServings})
                </span>
              )}
            </Label>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => adjust(-1)}
                disabled={servings <= 1}
                aria-label="Decrease servings"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                id={`servings-${recipeId}`}
                type="number"
                min={1}
                max={99}
                value={servings}
                onChange={(e) => {
                  const n = parseInt(e.target.value, 10);
                  if (!Number.isNaN(n)) setServings(Math.max(1, Math.min(99, n)));
                }}
                className="w-20 text-center"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => adjust(1)}
                disabled={servings >= 99}
                aria-label="Increase servings"
              >
                <Plus className="h-4 w-4" />
              </Button>
              {isCustomized && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleReset}
                  className="ml-auto text-xs text-muted-foreground"
                >
                  <RotateCcw className="h-3 w-3 mr-1" />
                  Reset
                </Button>
              )}
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor={`note-${recipeId}`} className="text-sm">
              Notes
            </Label>
            <Textarea
              id={`note-${recipeId}`}
              placeholder="Personal tweaks, swaps, timing tips…"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="min-h-[120px] resize-none text-sm"
              maxLength={1000}
            />
            <div className="text-right text-xs text-muted-foreground">
              {note.length}/1000
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="ghost"
              onClick={() => onOpenChange(false)}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving} className="gap-2">
              <Save className="h-4 w-4" />
              {saving ? "Saving…" : "Save changes"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}