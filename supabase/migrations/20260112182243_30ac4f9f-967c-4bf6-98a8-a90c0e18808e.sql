-- Create table for user pantry/always-on-hand ingredients
CREATE TABLE public.user_pantry (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  ingredient_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, ingredient_id)
);

-- Enable Row Level Security
ALTER TABLE public.user_pantry ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own pantry" 
ON public.user_pantry 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can add to their pantry" 
ON public.user_pantry 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove from their pantry" 
ON public.user_pantry 
FOR DELETE 
USING (auth.uid() = user_id);