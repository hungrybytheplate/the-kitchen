-- Add meal times preferences column to user_preferences
ALTER TABLE public.user_preferences
ADD COLUMN meal_times JSONB DEFAULT '{"breakfast": "08:00", "lunch": "12:00", "dinner": "18:00", "dessert": "19:00", "sides": "18:00"}'::jsonb;