-- Create a function to get recipe save counts (aggregated, no user data exposed)
CREATE OR REPLACE FUNCTION public.get_recipe_save_counts()
RETURNS TABLE(recipe_id text, save_count bigint)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT recipe_id, COUNT(*) as save_count
  FROM saved_recipes
  GROUP BY recipe_id;
$$;

-- Grant execute permission to anonymous and authenticated users
GRANT EXECUTE ON FUNCTION public.get_recipe_save_counts() TO anon;
GRANT EXECUTE ON FUNCTION public.get_recipe_save_counts() TO authenticated;