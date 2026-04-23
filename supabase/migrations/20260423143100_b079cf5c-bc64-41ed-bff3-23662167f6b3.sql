-- Per-user, per-recipe overrides (e.g. customized servings count).
-- One row per (user_id, recipe_id) — guaranteed by the unique constraint —
-- so the UI's "edit" flow upserts instead of creating duplicates.
CREATE TABLE public.recipe_overrides (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  recipe_id TEXT NOT NULL,
  servings INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT recipe_overrides_user_recipe_unique UNIQUE (user_id, recipe_id),
  CONSTRAINT recipe_overrides_servings_positive CHECK (servings IS NULL OR servings > 0)
);

ALTER TABLE public.recipe_overrides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own recipe overrides"
ON public.recipe_overrides
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own recipe overrides"
ON public.recipe_overrides
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own recipe overrides"
ON public.recipe_overrides
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own recipe overrides"
ON public.recipe_overrides
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Reuse the existing public.update_updated_at_column() trigger function
-- defined by earlier migrations.
CREATE TRIGGER update_recipe_overrides_updated_at
BEFORE UPDATE ON public.recipe_overrides
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_recipe_overrides_user ON public.recipe_overrides(user_id);
