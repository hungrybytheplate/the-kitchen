-- Create custom_recipes table for user-imported recipes
CREATE TABLE public.custom_recipes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  meal_type TEXT NOT NULL DEFAULT 'dinner',
  cook_time TEXT NOT NULL DEFAULT '30 min',
  servings INTEGER NOT NULL DEFAULT 4,
  difficulty TEXT DEFAULT 'medium',
  ingredients JSONB NOT NULL DEFAULT '[]'::jsonb,
  ingredient_amounts JSONB DEFAULT '[]'::jsonb,
  instructions JSONB NOT NULL DEFAULT '[]'::jsonb,
  dietary_tags JSONB DEFAULT '[]'::jsonb,
  nutrition JSONB,
  source_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.custom_recipes ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own custom recipes" 
ON public.custom_recipes 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own custom recipes" 
ON public.custom_recipes 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own custom recipes" 
ON public.custom_recipes 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own custom recipes" 
ON public.custom_recipes 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_custom_recipes_updated_at
BEFORE UPDATE ON public.custom_recipes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();