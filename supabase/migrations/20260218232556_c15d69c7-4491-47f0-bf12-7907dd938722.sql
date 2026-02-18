-- Add UPDATE policy for meal_plans so moveMeal works
CREATE POLICY "Users can update their own meal plans"
ON public.meal_plans
FOR UPDATE
USING (auth.uid() = user_id);