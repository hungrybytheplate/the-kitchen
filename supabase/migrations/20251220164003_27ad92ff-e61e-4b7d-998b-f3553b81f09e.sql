-- Drop the trigger first
DROP TRIGGER IF EXISTS update_meal_reminder_settings_updated_at ON public.meal_reminder_settings;

-- Drop the table (this also removes the RLS policies)
DROP TABLE IF EXISTS public.meal_reminder_settings;