import { useState, type KeyboardEvent } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { fuzzyMatchIngredient } from "@/lib/fuzzyIngredientMatch";
import { toast } from "@/hooks/use-toast";

export const CUSTOM_INGREDIENT_PREFIX = "custom:";

const CUSTOM_NAME_STORAGE_KEY = "kitchen.customIngredientNames";

/** Read the persisted map of custom-ingredient id → original entered name. */
function readCustomNameMap(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(CUSTOM_NAME_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function writeCustomNameMap(map: Record<string, string>) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CUSTOM_NAME_STORAGE_KEY, JSON.stringify(map));
  } catch {
    // ignore quota / privacy-mode errors
  }
}

/** Persist the original name a user typed for a custom ingredient id. */
export function rememberCustomIngredientName(id: string, name: string) {
  if (!isCustomIngredientId(id)) return;
  const trimmed = name.trim();
  if (!trimmed) return;
  const map = readCustomNameMap();
  if (map[id] === trimmed) return;
  map[id] = trimmed;
  writeCustomNameMap(map);
}

/** Look up the original name a user typed for a custom ingredient id, if any. */
export function getCustomIngredientName(id: string): string | undefined {
  if (!isCustomIngredientId(id)) return undefined;
  return readCustomNameMap()[id];
}

/**
 * Convert a free-text ingredient name into a stable id with the custom: prefix.
 */
export function toCustomIngredientId(name: string): string {
  const slug = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${CUSTOM_INGREDIENT_PREFIX}${slug}`;
}

/** Returns true if the given id was added by the user via the Other field. */
export function isCustomIngredientId(id: string): boolean {
  return id.startsWith(CUSTOM_INGREDIENT_PREFIX);
}

/** Get a display-friendly label for any ingredient id (custom or built-in). */
export function formatIngredientLabel(id: string): string {
  if (isCustomIngredientId(id)) {
    const original = getCustomIngredientName(id);
    if (original) return original;
    return id.slice(CUSTOM_INGREDIENT_PREFIX.length).replace(/-/g, " ");
  }
  const raw = isCustomIngredientId(id) ? id.slice(CUSTOM_INGREDIENT_PREFIX.length) : id;
  return raw.replace(/-/g, " ");
}

interface CustomIngredientInputProps {
  selectedIngredients: string[];
  onAdd: (id: string) => void;
  className?: string;
}

/**
 * "Other" checkbox + free-text field so users can add ingredients
 * that aren't in the predefined list. Added items use a `custom:` id prefix
 * and show up alongside the standard selections.
 */
export function CustomIngredientInput({
  selectedIngredients,
  onAdd,
  className,
}: CustomIngredientInputProps) {
  const [expanded, setExpanded] = useState(false);
  const [value, setValue] = useState("");

  const hasCustom = selectedIngredients.some(isCustomIngredientId);
  const isChecked = expanded || hasCustom;

  const handleAdd = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    const id = toCustomIngredientId(trimmed);
    if (id === CUSTOM_INGREDIENT_PREFIX) return;
    if (!selectedIngredients.includes(id)) {
      onAdd(id);
    }

    // Fuzzy-map the typed text to known ingredient ids so the recipe matcher
    // can use it (e.g. "tomatto paste" -> tomato-paste, "kosher salt" -> salt-kosher).
    const matches = fuzzyMatchIngredient(trimmed, 3).filter(
      (m) => !selectedIngredients.includes(m.id) && m.id !== id,
    );
    matches.forEach((m) => onAdd(m.id));

    if (matches.length > 0) {
      toast({
        title: `Added "${trimmed}"`,
        description: `Also matched: ${matches.map((m) => m.name).join(", ")}`,
      });
    } else {
      toast({
        title: `Added "${trimmed}"`,
        description: "No close matches found in our list — added as-is.",
      });
    }

    setValue("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div
      className={cn(
        "mt-4 rounded-xl border p-3 transition-colors",
        isChecked
          ? "border-primary bg-primary/5"
          : "border-dashed border-border bg-muted/30",
        className,
      )}
    >
      <label className="flex items-center gap-2 cursor-pointer">
        <Checkbox
          checked={isChecked}
          onCheckedChange={(checked) => setExpanded(Boolean(checked))}
          aria-label="Add a custom ingredient"
        />
        <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium text-foreground">
          Other (type your own ingredient)
        </span>
      </label>

      {isChecked && (
        <div className="mt-3 flex gap-2">
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. tamarind paste, ramps, kefir…"
            className="h-9 text-sm"
            aria-label="Custom ingredient name"
          />
          <Button
            type="button"
            size="sm"
            variant="warm"
            onClick={handleAdd}
            disabled={!value.trim()}
            className="h-9 shrink-0"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      )}
    </div>
  );
}