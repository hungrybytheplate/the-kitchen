import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Keyboard } from "lucide-react";

interface Shortcut {
  key: string;
  description: string;
}

interface KeyboardShortcutsHelpProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const shortcuts: Shortcut[] = [
  { key: "S", description: "Go to Shopping list" },
  { key: "M", description: "Go to Meal plan" },
  { key: "R", description: "Go to Recipes" },
  { key: "I", description: "Go to Ingredients" },
  { key: "?", description: "Show keyboard shortcuts" },
  { key: "Esc", description: "Close dialogs" },
];

export function KeyboardShortcutsHelp({ open, onOpenChange }: KeyboardShortcutsHelpProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-serif text-xl">
            <Keyboard className="h-5 w-5 text-primary" />
            Keyboard Shortcuts
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-2 mt-4">
          {shortcuts.map((shortcut) => (
            <div
              key={shortcut.key}
              className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/50"
            >
              <span className="text-sm text-muted-foreground">
                {shortcut.description}
              </span>
              <kbd className="px-2 py-1 text-xs font-mono font-semibold bg-background border border-border rounded shadow-sm">
                {shortcut.key}
              </kbd>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground text-center mt-4">
          Press <kbd className="px-1 py-0.5 text-xs font-mono bg-muted rounded">?</kbd> anytime to show this help
        </p>
      </DialogContent>
    </Dialog>
  );
}
