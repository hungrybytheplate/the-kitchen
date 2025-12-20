-- Create function to update timestamps (if not exists)
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create table for meal reminder settings
CREATE TABLE public.meal_reminder_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  enabled BOOLEAN NOT NULL DEFAULT true,
  breakfast_time TIME NOT NULL DEFAULT '08:00',
  lunch_time TIME NOT NULL DEFAULT '12:00',
  dinner_time TIME NOT NULL DEFAULT '18:00',
  reminder_minutes_before INTEGER NOT NULL DEFAULT 60,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.meal_reminder_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for meal_reminder_settings
CREATE POLICY "Users can view their own settings" 
ON public.meal_reminder_settings 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own settings" 
ON public.meal_reminder_settings 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own settings" 
ON public.meal_reminder_settings 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_meal_reminder_settings_updated_at
BEFORE UPDATE ON public.meal_reminder_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();