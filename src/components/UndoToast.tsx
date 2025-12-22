import { Button } from "@/components/ui/button";
import { Undo2, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface UndoToastProps {
  message: string;
  onUndo: () => void;
  onDismiss: () => void;
}

export function UndoToast({ message, onUndo, onDismiss }: UndoToastProps) {
  return (
    <div className={cn(
      "fixed bottom-4 left-1/2 -translate-x-1/2 z-[100]",
      "flex items-center gap-3 px-4 py-3 rounded-xl",
      "bg-foreground text-background shadow-elevated",
      "animate-slide-up"
    )}>
      <span className="text-sm font-medium">{message}</span>
      <Button
        variant="ghost"
        size="sm"
        onClick={onUndo}
        className="h-8 px-3 bg-background/20 hover:bg-background/30 text-background"
      >
        <Undo2 className="h-4 w-4 mr-1.5" />
        Undo
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={onDismiss}
        className="h-6 w-6 text-background/60 hover:text-background hover:bg-transparent"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
