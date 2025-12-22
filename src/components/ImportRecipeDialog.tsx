import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Loader2, Link, FileText, Plus, X, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

interface ImportRecipeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRecipeImported: () => void;
}

interface ParsedRecipe {
  title: string;
  description?: string;
  mealType: string;
  cookTime: string;
  servings: number;
  difficulty?: string;
  ingredients: string[];
  ingredientAmounts?: { id: string; amount: string; unit: string }[];
  instructions: string[];
  dietaryTags?: string[];
  sourceUrl?: string;
}

const MEAL_TYPES = ["breakfast", "lunch", "dinner", "dessert", "sides"];
const DIFFICULTIES = ["easy", "medium", "hard"];
const DIETARY_TAGS = [
  "vegetarian", "vegan", "gluten-free", "dairy-free", 
  "keto", "paleo", "nut-free", "high-protein", "low-carb", "high-fiber"
];

export function ImportRecipeDialog({ open, onOpenChange, onRecipeImported }: ImportRecipeDialogProps) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"url" | "manual">("url");
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState("");
  
  // Manual form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mealType, setMealType] = useState("dinner");
  const [cookTime, setCookTime] = useState("30 min");
  const [servings, setServings] = useState(4);
  const [difficulty, setDifficulty] = useState("medium");
  const [ingredientsText, setIngredientsText] = useState("");
  const [instructionsText, setInstructionsText] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Parsed recipe preview
  const [parsedRecipe, setParsedRecipe] = useState<ParsedRecipe | null>(null);

  const resetForm = () => {
    setUrl("");
    setTitle("");
    setDescription("");
    setMealType("dinner");
    setCookTime("30 min");
    setServings(4);
    setDifficulty("medium");
    setIngredientsText("");
    setInstructionsText("");
    setSelectedTags([]);
    setParsedRecipe(null);
  };

  const handleClose = () => {
    resetForm();
    onOpenChange(false);
  };

  const handleParseUrl = async () => {
    if (!url.trim()) {
      toast({
        title: "URL required",
        description: "Please enter a recipe URL to import.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('parse-recipe', {
        body: { url: url.trim() }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (!data.success) {
        throw new Error(data.error || 'Failed to parse recipe');
      }

      setParsedRecipe(data.recipe);
      toast({
        title: "Recipe parsed!",
        description: "Review the extracted recipe and save it.",
      });
    } catch (error) {
      console.error('Parse error:', error);
      toast({
        title: "Failed to parse recipe",
        description: error instanceof Error ? error.message : "Could not extract recipe from URL",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const parseManualInput = (): ParsedRecipe | null => {
    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a recipe title.",
        variant: "destructive",
      });
      return null;
    }

    if (!ingredientsText.trim()) {
      toast({
        title: "Ingredients required",
        description: "Please enter at least one ingredient.",
        variant: "destructive",
      });
      return null;
    }

    if (!instructionsText.trim()) {
      toast({
        title: "Instructions required",
        description: "Please enter at least one instruction.",
        variant: "destructive",
      });
      return null;
    }

    // Parse ingredients (one per line)
    const ingredients = ingredientsText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(line => line.toLowerCase().replace(/\s+/g, '-'));

    // Parse instructions (one per line or numbered)
    const instructions = instructionsText
      .split('\n')
      .map(line => line.trim().replace(/^\d+[\.\)]\s*/, ''))
      .filter(line => line.length > 0);

    return {
      title: title.trim(),
      description: description.trim() || undefined,
      mealType,
      cookTime,
      servings,
      difficulty,
      ingredients,
      instructions,
      dietaryTags: selectedTags.length > 0 ? selectedTags : undefined,
    };
  };

  const handleSaveRecipe = async (recipe: ParsedRecipe) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save imported recipes.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.from('custom_recipes').insert({
        user_id: user.id,
        title: recipe.title,
        description: recipe.description || null,
        meal_type: recipe.mealType,
        cook_time: recipe.cookTime,
        servings: recipe.servings,
        difficulty: recipe.difficulty || 'medium',
        ingredients: recipe.ingredients,
        ingredient_amounts: recipe.ingredientAmounts || [],
        instructions: recipe.instructions,
        dietary_tags: recipe.dietaryTags || [],
        source_url: recipe.sourceUrl || null,
      });

      if (error) throw error;

      toast({
        title: "Recipe saved!",
        description: `"${recipe.title}" has been added to your collection.`,
      });
      
      onRecipeImported();
      handleClose();
    } catch (error) {
      console.error('Save error:', error);
      toast({
        title: "Failed to save recipe",
        description: error instanceof Error ? error.message : "Could not save the recipe",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl flex items-center gap-2">
            <Plus className="h-6 w-6 text-primary" />
            Import Recipe
          </DialogTitle>
          <DialogDescription>
            Import a recipe from a URL or paste ingredients and instructions manually.
          </DialogDescription>
        </DialogHeader>

        {parsedRecipe ? (
          // Recipe Preview
          <div className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
              <h3 className="font-semibold text-lg">{parsedRecipe.title}</h3>
              {parsedRecipe.description && (
                <p className="text-sm text-muted-foreground">{parsedRecipe.description}</p>
              )}
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{parsedRecipe.mealType}</Badge>
                <Badge variant="outline">{parsedRecipe.cookTime}</Badge>
                <Badge variant="outline">{parsedRecipe.servings} servings</Badge>
                {parsedRecipe.difficulty && (
                  <Badge variant="outline">{parsedRecipe.difficulty}</Badge>
                )}
              </div>
              {parsedRecipe.dietaryTags && parsedRecipe.dietaryTags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {parsedRecipe.dietaryTags.map(tag => (
                    <Badge key={tag} className="text-xs bg-primary/10 text-primary">{tag}</Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Ingredients ({parsedRecipe.ingredients.length})</h4>
                <ul className="text-sm space-y-1 max-h-32 overflow-y-auto">
                  {parsedRecipe.ingredients.map((ing, i) => (
                    <li key={i} className="text-muted-foreground capitalize">
                      • {ing.replace(/-/g, ' ')}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Steps ({parsedRecipe.instructions.length})</h4>
                <ol className="text-sm space-y-1 max-h-32 overflow-y-auto">
                  {parsedRecipe.instructions.slice(0, 3).map((step, i) => (
                    <li key={i} className="text-muted-foreground text-xs">
                      {i + 1}. {step.slice(0, 60)}...
                    </li>
                  ))}
                  {parsedRecipe.instructions.length > 3 && (
                    <li className="text-muted-foreground text-xs">
                      +{parsedRecipe.instructions.length - 3} more steps
                    </li>
                  )}
                </ol>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setParsedRecipe(null)}
                className="flex-1"
              >
                Edit
              </Button>
              <Button 
                onClick={() => handleSaveRecipe(parsedRecipe)}
                disabled={isLoading}
                className="flex-1"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Recipe"
                )}
              </Button>
            </div>
          </div>
        ) : (
          // Import Form
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "url" | "manual")}>
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="url" className="gap-2">
                <Link className="h-4 w-4" />
                From URL
              </TabsTrigger>
              <TabsTrigger value="manual" className="gap-2">
                <FileText className="h-4 w-4" />
                Manual Entry
              </TabsTrigger>
            </TabsList>

            <TabsContent value="url" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="url">Recipe URL</Label>
                <Input
                  id="url"
                  placeholder="https://example.com/recipe/..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Paste a link to any recipe page. We'll use AI to extract the ingredients and instructions.
                </p>
              </div>

              <Button 
                onClick={handleParseUrl} 
                disabled={isLoading || !url.trim()}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Parsing recipe...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Extract Recipe
                  </>
                )}
              </Button>
            </TabsContent>

            <TabsContent value="manual" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="title">Recipe Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Grandma's Apple Pie"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="col-span-2 space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    placeholder="Brief description of the recipe"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Meal Type</Label>
                  <Select value={mealType} onValueChange={setMealType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {MEAL_TYPES.map(type => (
                        <SelectItem key={type} value={type} className="capitalize">
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Difficulty</Label>
                  <Select value={difficulty} onValueChange={setDifficulty}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {DIFFICULTIES.map(d => (
                        <SelectItem key={d} value={d} className="capitalize">
                          {d}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cookTime">Cook Time</Label>
                  <Input
                    id="cookTime"
                    placeholder="e.g., 45 min"
                    value={cookTime}
                    onChange={(e) => setCookTime(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="servings">Servings</Label>
                  <Input
                    id="servings"
                    type="number"
                    min={1}
                    value={servings}
                    onChange={(e) => setServings(parseInt(e.target.value) || 4)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ingredients">Ingredients * (one per line)</Label>
                <Textarea
                  id="ingredients"
                  placeholder="1 cup flour
2 eggs
1/2 cup sugar
..."
                  value={ingredientsText}
                  onChange={(e) => setIngredientsText(e.target.value)}
                  rows={5}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructions">Instructions * (one step per line)</Label>
                <Textarea
                  id="instructions"
                  placeholder="1. Preheat oven to 350°F
2. Mix dry ingredients
3. Add wet ingredients
..."
                  value={instructionsText}
                  onChange={(e) => setInstructionsText(e.target.value)}
                  rows={5}
                />
              </div>

              <div className="space-y-2">
                <Label>Dietary Tags (optional)</Label>
                <div className="flex flex-wrap gap-2">
                  {DIETARY_TAGS.map(tag => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? "default" : "outline"}
                      className="cursor-pointer capitalize"
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                      {selectedTags.includes(tag) && (
                        <X className="h-3 w-3 ml-1" />
                      )}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button 
                onClick={() => {
                  const recipe = parseManualInput();
                  if (recipe) {
                    handleSaveRecipe(recipe);
                  }
                }}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Recipe"
                )}
              </Button>
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
}
