import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings2, Leaf, Wheat, Milk, Nut, Flame, Apple, Heart, Dumbbell, Salad, Carrot, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUserPreferences, type MealTimes } from "@/hooks/useUserPreferences";
import type { DietaryTag } from "@/data/recipes";

const dietaryOptions: { tag: DietaryTag; label: string; icon: React.ElementType; color: string }[] = [
  { tag: "vegetarian", label: "Vegetarian", icon: Leaf, color: "bg-emerald-500/15 border-emerald-500/30 text-emerald-600 dark:text-emerald-400" },
  { tag: "vegan", label: "Vegan", icon: Apple, color: "bg-green-500/15 border-green-500/30 text-green-600 dark:text-green-400" },
  { tag: "gluten-free", label: "Gluten-Free", icon: Wheat, color: "bg-amber-500/15 border-amber-500/30 text-amber-600 dark:text-amber-400" },
  { tag: "dairy-free", label: "Dairy-Free", icon: Milk, color: "bg-blue-500/15 border-blue-500/30 text-blue-600 dark:text-blue-400" },
  { tag: "nut-free", label: "Nut-Free", icon: Nut, color: "bg-orange-500/15 border-orange-500/30 text-orange-600 dark:text-orange-400" },
  { tag: "keto", label: "Keto", icon: Flame, color: "bg-red-500/15 border-red-500/30 text-red-600 dark:text-red-400" },
  { tag: "paleo", label: "Paleo", icon: Carrot, color: "bg-stone-500/15 border-stone-500/30 text-stone-600 dark:text-stone-400" },
  { tag: "high-protein", label: "High Protein", icon: Dumbbell, color: "bg-purple-500/15 border-purple-500/30 text-purple-600 dark:text-purple-400" },
  { tag: "low-carb", label: "Low Carb", icon: Salad, color: "bg-teal-500/15 border-teal-500/30 text-teal-600 dark:text-teal-400" },
  { tag: "high-fiber", label: "High Fiber", icon: Heart, color: "bg-pink-500/15 border-pink-500/30 text-pink-600 dark:text-pink-400" },
];

const skillLevels = [
  { value: 'beginner' as const, label: 'Beginner', description: 'Easy recipes only' },
  { value: 'intermediate' as const, label: 'Intermediate', description: 'Easy & medium recipes' },
  { value: 'advanced' as const, label: 'Advanced', description: 'All difficulty levels' },
];

const mealTypeLabels: { key: keyof MealTimes; label: string; icon: string }[] = [
  { key: 'breakfast', label: 'Breakfast', icon: '🌅' },
  { key: 'lunch', label: 'Lunch', icon: '☀️' },
  { key: 'dinner', label: 'Dinner', icon: '🌙' },
  { key: 'dessert', label: 'Dessert', icon: '🍰' },
  { key: 'sides', label: 'Sides', icon: '🥗' },
];

// Generate time options from 5am to 11pm in 30min increments
const timeOptions = Array.from({ length: 37 }, (_, i) => {
  const totalMinutes = (5 * 60) + (i * 30);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const time24 = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  const period = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
  const time12 = `${hours12}:${String(minutes).padStart(2, '0')} ${period}`;
  return { value: time24, label: time12 };
});

interface UserPreferencesDialogProps {
  trigger?: React.ReactNode;
}

export function UserPreferencesDialog({ trigger }: UserPreferencesDialogProps) {
  const { preferences, toggleDietaryPreference, setSkillLevel, setMealTime, loading } = useUserPreferences();

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="sm" className="gap-2">
            <Settings2 className="h-4 w-4" />
            <span className="hidden sm:inline">Preferences</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings2 className="h-5 w-5 text-primary" />
            Your Preferences
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Dietary Preferences */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Dietary Preferences</Label>
            <p className="text-xs text-muted-foreground">
              Select your dietary requirements. Recipes matching your preferences will be highlighted.
            </p>
            <div className="flex flex-wrap gap-2">
              {dietaryOptions.map(({ tag, label, icon: Icon, color }) => {
                const isSelected = preferences.dietaryPreferences.includes(tag);
                return (
                  <Badge
                    key={tag}
                    variant="outline"
                    className={cn(
                      "cursor-pointer transition-all duration-200 px-3 py-1.5",
                      isSelected ? color : "bg-muted/30 hover:bg-muted/50"
                    )}
                    onClick={() => toggleDietaryPreference(tag)}
                  >
                    <Icon className="h-3.5 w-3.5 mr-1.5" />
                    {label}
                  </Badge>
                );
              })}
            </div>
          </div>

          {/* Skill Level */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Cooking Skill Level</Label>
            <p className="text-xs text-muted-foreground">
              We'll highlight recipes that match your skill level.
            </p>
            <div className="grid gap-2">
              {skillLevels.map(({ value, label, description }) => (
                <button
                  key={value}
                  onClick={() => setSkillLevel(value)}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-lg border transition-all duration-200 text-left",
                    preferences.skillLevel === value
                      ? "border-primary bg-primary/5"
                      : "border-border/50 hover:border-border"
                  )}
                >
                  <div>
                    <p className="font-medium text-sm">{label}</p>
                    <p className="text-xs text-muted-foreground">{description}</p>
                  </div>
                  {preferences.skillLevel === value && (
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Meal Times */}
          <div className="space-y-3">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Default Meal Times
            </Label>
            <p className="text-xs text-muted-foreground">
              Set when each meal type starts in your calendar.
            </p>
            <div className="grid gap-2">
              {mealTypeLabels.map(({ key, label, icon }) => (
                <div key={key} className="flex items-center justify-between p-2 rounded-lg border border-border/50 bg-muted/20">
                  <span className="text-sm font-medium flex items-center gap-2">
                    <span>{icon}</span>
                    {label}
                  </span>
                  <Select
                    value={preferences.mealTimes[key]}
                    onValueChange={(value) => setMealTime(key, value)}
                  >
                    <SelectTrigger className="w-[120px] h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
