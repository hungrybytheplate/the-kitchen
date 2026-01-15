-- Drop the existing restrictive SELECT policy
DROP POLICY IF EXISTS "Users can view their own saved drinks" ON public.saved_drinks;

-- Create a new permissive SELECT policy that requires authentication
CREATE POLICY "Users can view their own saved drinks"
ON public.saved_drinks
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Also ensure INSERT and DELETE policies are properly scoped to authenticated users
DROP POLICY IF EXISTS "Users can insert their own saved drinks" ON public.saved_drinks;
CREATE POLICY "Users can insert their own saved drinks"
ON public.saved_drinks
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own saved drinks" ON public.saved_drinks;
CREATE POLICY "Users can delete their own saved drinks"
ON public.saved_drinks
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);