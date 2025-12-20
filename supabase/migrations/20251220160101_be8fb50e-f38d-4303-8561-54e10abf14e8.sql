-- Create family_groups table
CREATE TABLE public.family_groups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  invite_code TEXT NOT NULL UNIQUE DEFAULT substring(md5(random()::text), 1, 8),
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create family_members table
CREATE TABLE public.family_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  family_group_id UUID NOT NULL REFERENCES public.family_groups(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  display_name TEXT,
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(family_group_id, user_id)
);

-- Create shared_recipes table (recipes shared to family group)
CREATE TABLE public.shared_recipes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  family_group_id UUID NOT NULL REFERENCES public.family_groups(id) ON DELETE CASCADE,
  recipe_id TEXT NOT NULL,
  recipe_data JSONB NOT NULL,
  shared_by UUID NOT NULL,
  shared_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(family_group_id, recipe_id)
);

-- Enable RLS on all tables
ALTER TABLE public.family_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shared_recipes ENABLE ROW LEVEL SECURITY;

-- Helper function to check if user is member of a family group
CREATE OR REPLACE FUNCTION public.is_family_member(_user_id UUID, _family_group_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.family_members
    WHERE user_id = _user_id
      AND family_group_id = _family_group_id
  )
$$;

-- Helper function to get user's family group id
CREATE OR REPLACE FUNCTION public.get_user_family_group(_user_id UUID)
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT family_group_id
  FROM public.family_members
  WHERE user_id = _user_id
  LIMIT 1
$$;

-- RLS Policies for family_groups
CREATE POLICY "Users can view groups they belong to"
ON public.family_groups
FOR SELECT
USING (public.is_family_member(auth.uid(), id) OR created_by = auth.uid());

CREATE POLICY "Users can create family groups"
ON public.family_groups
FOR INSERT
WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Creators can update their groups"
ON public.family_groups
FOR UPDATE
USING (auth.uid() = created_by);

CREATE POLICY "Creators can delete their groups"
ON public.family_groups
FOR DELETE
USING (auth.uid() = created_by);

-- RLS Policies for family_members
CREATE POLICY "Members can view other members in their group"
ON public.family_members
FOR SELECT
USING (public.is_family_member(auth.uid(), family_group_id));

CREATE POLICY "Users can join groups"
ON public.family_members
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can leave groups"
ON public.family_members
FOR DELETE
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own membership"
ON public.family_members
FOR UPDATE
USING (auth.uid() = user_id);

-- RLS Policies for shared_recipes
CREATE POLICY "Members can view shared recipes"
ON public.shared_recipes
FOR SELECT
USING (public.is_family_member(auth.uid(), family_group_id));

CREATE POLICY "Members can share recipes"
ON public.shared_recipes
FOR INSERT
WITH CHECK (auth.uid() = shared_by AND public.is_family_member(auth.uid(), family_group_id));

CREATE POLICY "Sharers can unshare their recipes"
ON public.shared_recipes
FOR DELETE
USING (auth.uid() = shared_by);