-- Create saved_recipes table
CREATE TABLE public.saved_recipes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recipe_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, recipe_id)
);

-- Create meal_plans table
CREATE TABLE public.meal_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date TEXT NOT NULL,
  recipe_id TEXT NOT NULL,
  recipe_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create shopping_list table
CREATE TABLE public.shopping_list (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  ingredient_id TEXT NOT NULL,
  variant TEXT NOT NULL,
  checked BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create saved_drinks table
CREATE TABLE public.saved_drinks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  drink_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, drink_id)
);

-- Create recipe_notes table
CREATE TABLE public.recipe_notes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recipe_id TEXT NOT NULL,
  notes TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, recipe_id)
);

-- Enable RLS on all tables
ALTER TABLE public.saved_recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meal_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shopping_list ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_drinks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recipe_notes ENABLE ROW LEVEL SECURITY;

-- RLS policies for saved_recipes
CREATE POLICY "Users can view their own saved recipes" ON public.saved_recipes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own saved recipes" ON public.saved_recipes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own saved recipes" ON public.saved_recipes FOR DELETE USING (auth.uid() = user_id);

-- RLS policies for meal_plans
CREATE POLICY "Users can view their own meal plans" ON public.meal_plans FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own meal plans" ON public.meal_plans FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own meal plans" ON public.meal_plans FOR DELETE USING (auth.uid() = user_id);

-- RLS policies for shopping_list
CREATE POLICY "Users can view their own shopping list" ON public.shopping_list FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own shopping items" ON public.shopping_list FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own shopping items" ON public.shopping_list FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own shopping items" ON public.shopping_list FOR DELETE USING (auth.uid() = user_id);

-- RLS policies for saved_drinks
CREATE POLICY "Users can view their own saved drinks" ON public.saved_drinks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own saved drinks" ON public.saved_drinks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own saved drinks" ON public.saved_drinks FOR DELETE USING (auth.uid() = user_id);

-- RLS policies for recipe_notes
CREATE POLICY "Users can view their own recipe notes" ON public.recipe_notes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own recipe notes" ON public.recipe_notes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own recipe notes" ON public.recipe_notes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own recipe notes" ON public.recipe_notes FOR DELETE USING (auth.uid() = user_id);