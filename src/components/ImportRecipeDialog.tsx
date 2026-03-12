import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, Loader2, Plus, CheckCircle2, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useCustomRecipes } from "@/hooks/useCustomRecipes";

interface ImportRecipeDialogProps {
  onImported: () => void;
  trigger?: React.ReactNode;
}

export function ImportRecipeDialog({ onImported, trigger }: ImportRecipeDialogProps) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "fetching" | "parsing" | "saving" | "done" | "error">("idle");
  const [duplicateWarning, setDuplicateWarning] = useState<string | null>(null);
  const { customRecipes } = useCustomRecipes();

  const handleImport = async (force = false) => {
    const trimmed = url.trim();
    if (!trimmed) return;

    // Basic URL validation
    try {
      const finalUrl = trimmed.startsWith("http") ? trimmed : `https://${trimmed}`;
      new URL(finalUrl);
      
      // Check for duplicate URL
      if (!force) {
        const existingByUrl = customRecipes.find(r => r.source_url === finalUrl);
        if (existingByUrl) {
          setDuplicateWarning(`You already imported "${existingByUrl.title}" from this URL.`);
          return;
        }
      }
      setDuplicateWarning(null);
    } catch {
      toast({ title: "Invalid URL", description: "Please enter a valid recipe URL.", variant: "destructive" });
      return;
    }

    setLoading(true);
    setStatus("fetching");

    try {
      const finalUrl = trimmed.startsWith("http") ? trimmed : `https://${trimmed}`;
      
      setStatus("parsing");
      
      const { data, error } = await supabase.functions.invoke("parse-recipe", {
        body: { url: finalUrl },
      });

      if (error) throw new Error(error.message);
      if (data?.error) throw new Error(data.error);

      setStatus("done");
      
      toast({
        title: "Recipe imported!",
        description: `"${data.recipe.title}" has been added to your collection.`,
      });

      onImported();
      
      setTimeout(() => {
        setOpen(false);
        setUrl("");
        setStatus("idle");
      }, 1000);
    } catch (err) {
      setStatus("error");
      toast({
        title: "Import failed",
        description: err instanceof Error ? err.message : "Could not import this recipe. Try a different URL.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const statusMessages = {
    idle: "",
    fetching: "Fetching page...",
    parsing: "AI is extracting recipe data...",
    saving: "Saving to your collection...",
    done: "Recipe imported successfully!",
    error: "Import failed",
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) { setStatus("idle"); setUrl(""); } }}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Import Recipe</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif flex items-center gap-2">
            <Link className="h-5 w-5 text-primary" />
            Import Recipe from URL
          </DialogTitle>
          <DialogDescription>
            Paste a link from any recipe website and we'll automatically extract the ingredients, instructions, and nutrition info.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 pt-2">
          <div className="flex gap-2">
            <Input
              placeholder="https://www.allrecipes.com/recipe/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={loading}
              onKeyDown={(e) => e.key === "Enter" && !loading && handleImport()}
              className="flex-1"
            />
            <Button onClick={() => handleImport()} disabled={loading || !url.trim()} className="shrink-0">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Import"}
            </Button>
          </div>

          {duplicateWarning && (
            <div className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg bg-amber-100 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-700">
              <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span className="text-amber-800 dark:text-amber-300 flex-1">{duplicateWarning}</span>
              <Button size="sm" variant="outline" onClick={() => handleImport(true)} className="shrink-0 text-xs">
                Import Anyway
              </Button>
            </div>
          )}

          {status !== "idle" && (
            <div className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg bg-muted/50">
              {status === "done" ? (
                <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
              ) : status === "error" ? (
                <AlertCircle className="h-4 w-4 text-destructive shrink-0" />
              ) : (
                <Loader2 className="h-4 w-4 animate-spin text-primary shrink-0" />
              )}
              <span className="text-muted-foreground">{statusMessages[status]}</span>
            </div>
          )}

          <p className="text-xs text-muted-foreground">
            Works with most recipe websites including AllRecipes, Food Network, Epicurious, BBC Good Food, and more.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
