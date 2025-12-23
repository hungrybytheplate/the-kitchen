-- Drop family sharing tables and functions that are no longer used

-- First drop tables that have foreign key dependencies
DROP TABLE IF EXISTS public.shared_drinks;
DROP TABLE IF EXISTS public.shared_recipes;
DROP TABLE IF EXISTS public.family_members;
DROP TABLE IF EXISTS public.family_groups;

-- Drop helper functions
DROP FUNCTION IF EXISTS public.is_family_member(uuid, uuid);
DROP FUNCTION IF EXISTS public.get_user_family_group(uuid);