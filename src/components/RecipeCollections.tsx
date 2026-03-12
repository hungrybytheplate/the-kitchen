import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { FolderPlus, Folder, Trash2, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

export interface RecipeCollection {
  id: string;
  name: string;
  emoji: string;
  recipeIds: string[];
}

interface RecipeCollectionsProps {
  collections: RecipeCollection[];
  onCreateCollection: (name: string, emoji: string) => void;
  onDeleteCollection: (id: string) => void;
  onSelectCollection: (id: string | null) => void;
  selectedCollectionId: string | null;
  onAddToCollection: (collectionId: string, recipeId: string) => void;
  onRemoveFromCollection: (collectionId: string, recipeId: string) => void;
}

const EMOJI_OPTIONS = ["📁", "🍝", "🥗", "🎉", "💪", "🌱", "🔥", "❄️", "🏖️", "👶", "💰", "🍰"];

export function RecipeCollections({
  collections,
  onCreateCollection,
  onDeleteCollection,
  onSelectCollection,
  selectedCollectionId,
}: RecipeCollectionsProps) {
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmoji, setNewEmoji] = useState("📁");

  const handleCreate = () => {
    if (!newName.trim()) return;
    onCreateCollection(newName.trim(), newEmoji);
    setNewName("");
    setNewEmoji("📁");
    setShowCreate(false);
    toast({ title: "Collection created!", description: `"${newName.trim()}" is ready to use.` });
  };

  return (
    <>
      <div className="flex flex-wrap gap-1.5 mb-3">
        <Button
          variant={selectedCollectionId === null ? "default" : "outline"}
          size="sm"
          className="h-7 text-xs rounded-full"
          onClick={() => onSelectCollection(null)}
        >
          All
        </Button>
        {collections.map(col => (
          <Button
            key={col.id}
            variant={selectedCollectionId === col.id ? "default" : "outline"}
            size="sm"
            className="h-7 text-xs rounded-full gap-1"
            onClick={() => onSelectCollection(col.id)}
          >
            <span>{col.emoji}</span>
            {col.name}
            <Badge variant="secondary" className="ml-0.5 h-4 px-1 text-[10px]">
              {col.recipeIds.length}
            </Badge>
          </Button>
        ))}
        <Button
          variant="ghost"
          size="sm"
          className="h-7 text-xs rounded-full gap-1 text-muted-foreground"
          onClick={() => setShowCreate(true)}
        >
          <Plus className="h-3 w-3" />
          New
        </Button>
      </div>

      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-serif flex items-center gap-2">
              <FolderPlus className="h-5 w-5 text-primary" />
              New Collection
            </DialogTitle>
            <DialogDescription>
              Organize your saved recipes into custom folders.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="flex gap-2">
              <div className="flex flex-wrap gap-1">
                {EMOJI_OPTIONS.map(e => (
                  <button
                    key={e}
                    onClick={() => setNewEmoji(e)}
                    className={cn(
                      "w-8 h-8 rounded-md text-lg flex items-center justify-center transition-all",
                      newEmoji === e ? "bg-primary/20 ring-2 ring-primary" : "hover:bg-muted"
                    )}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>
            <Input
              placeholder="Collection name..."
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            />
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setShowCreate(false)}>Cancel</Button>
              <Button onClick={handleCreate} disabled={!newName.trim()}>Create</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

// Small dialog to add a recipe to a collection
interface AddToCollectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  collections: RecipeCollection[];
  recipeId: string;
  onAdd: (collectionId: string, recipeId: string) => void;
  onRemove: (collectionId: string, recipeId: string) => void;
}

export function AddToCollectionDialog({ open, onOpenChange, collections, recipeId, onAdd, onRemove }: AddToCollectionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xs">
        <DialogHeader>
          <DialogTitle className="font-serif flex items-center gap-2">
            <Folder className="h-5 w-5 text-primary" />
            Add to Collection
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-2 pt-2">
          {collections.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">No collections yet. Create one first!</p>
          ) : (
            collections.map(col => {
              const isInCollection = col.recipeIds.includes(recipeId);
              return (
                <button
                  key={col.id}
                  onClick={() => isInCollection ? onRemove(col.id, recipeId) : onAdd(col.id, recipeId)}
                  className={cn(
                    "w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-left",
                    isInCollection ? "bg-primary/10 ring-1 ring-primary/30" : "bg-muted/30 hover:bg-muted/50"
                  )}
                >
                  <span className="text-lg">{col.emoji}</span>
                  <span className="flex-1 text-sm font-medium">{col.name}</span>
                  {isInCollection ? (
                    <X className="h-4 w-4 text-primary" />
                  ) : (
                    <Plus className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
              );
            })
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
