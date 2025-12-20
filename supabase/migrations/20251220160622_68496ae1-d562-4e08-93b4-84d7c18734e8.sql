-- Create shared_drinks table (drinks shared to family group)
CREATE TABLE public.shared_drinks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  family_group_id UUID NOT NULL REFERENCES public.family_groups(id) ON DELETE CASCADE,
  drink_id TEXT NOT NULL,
  drink_data JSONB NOT NULL,
  shared_by UUID NOT NULL,
  shared_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(family_group_id, drink_id)
);

-- Enable RLS
ALTER TABLE public.shared_drinks ENABLE ROW LEVEL SECURITY;

-- RLS Policies for shared_drinks
CREATE POLICY "Members can view shared drinks"
ON public.shared_drinks
FOR SELECT
USING (public.is_family_member(auth.uid(), family_group_id));

CREATE POLICY "Members can share drinks"
ON public.shared_drinks
FOR INSERT
WITH CHECK (auth.uid() = shared_by AND public.is_family_member(auth.uid(), family_group_id));

CREATE POLICY "Sharers can unshare their drinks"
ON public.shared_drinks
FOR DELETE
USING (auth.uid() = shared_by);