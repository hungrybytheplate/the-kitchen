import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import type { Recipe } from '@/data/recipes';
import type { Drink } from '@/data/drinks';

export interface FamilyGroup {
  id: string;
  name: string;
  inviteCode: string;
  createdBy: string;
  createdAt: string;
}

export interface FamilyMember {
  id: string;
  userId: string;
  displayName: string | null;
  joinedAt: string;
}

export interface SharedRecipe {
  id: string;
  recipeId: string;
  recipeData: Recipe;
  sharedBy: string;
  sharedAt: string;
}

export interface SharedDrink {
  id: string;
  drinkId: string;
  drinkData: Drink;
  sharedBy: string;
  sharedAt: string;
}

export function useFamilyGroup() {
  const { user } = useAuth();
  const [familyGroup, setFamilyGroup] = useState<FamilyGroup | null>(null);
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [sharedRecipes, setSharedRecipes] = useState<SharedRecipe[]>([]);
  const [sharedDrinks, setSharedDrinks] = useState<SharedDrink[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFamilyData = useCallback(async () => {
    if (!user) {
      setFamilyGroup(null);
      setMembers([]);
      setSharedRecipes([]);
      setSharedDrinks([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      // First check if user is a member of any family group
      const { data: memberData } = await supabase
        .from('family_members')
        .select('family_group_id, display_name')
        .eq('user_id', user.id)
        .maybeSingle();

      if (memberData) {
        // Load the family group
        const { data: groupData } = await supabase
          .from('family_groups')
          .select('*')
          .eq('id', memberData.family_group_id)
          .maybeSingle();

        if (groupData) {
          setFamilyGroup({
            id: groupData.id,
            name: groupData.name,
            inviteCode: groupData.invite_code,
            createdBy: groupData.created_by,
            createdAt: groupData.created_at
          });

          // Load all members
          const { data: membersData } = await supabase
            .from('family_members')
            .select('*')
            .eq('family_group_id', groupData.id);

          setMembers(membersData?.map(m => ({
            id: m.id,
            userId: m.user_id,
            displayName: m.display_name,
            joinedAt: m.joined_at
          })) || []);

          // Load shared recipes
          const { data: recipesData } = await supabase
            .from('shared_recipes')
            .select('*')
            .eq('family_group_id', groupData.id)
            .order('shared_at', { ascending: false });

          setSharedRecipes(recipesData?.map(r => ({
            id: r.id,
            recipeId: r.recipe_id,
            recipeData: r.recipe_data as unknown as Recipe,
            sharedBy: r.shared_by,
            sharedAt: r.shared_at
          })) || []);

          // Load shared drinks
          const { data: drinksData } = await supabase
            .from('shared_drinks')
            .select('*')
            .eq('family_group_id', groupData.id)
            .order('shared_at', { ascending: false });

          setSharedDrinks(drinksData?.map(d => ({
            id: d.id,
            drinkId: d.drink_id,
            drinkData: d.drink_data as unknown as Drink,
            sharedBy: d.shared_by,
            sharedAt: d.shared_at
          })) || []);
        }
      } else {
        setFamilyGroup(null);
        setMembers([]);
        setSharedRecipes([]);
        setSharedDrinks([]);
      }
    } catch (error) {
      console.error('Error loading family data:', error);
    }

    setLoading(false);
  }, [user]);

  useEffect(() => {
    loadFamilyData();
  }, [loadFamilyData]);

  // Create a new family group
  const createFamilyGroup = async (name: string, displayName?: string) => {
    if (!user) return { error: 'Not authenticated' };

    try {
      // Create the group
      const { data: groupData, error: groupError } = await supabase
        .from('family_groups')
        .insert({
          name,
          created_by: user.id
        })
        .select()
        .single();

      if (groupError) throw groupError;

      // Add creator as first member
      const { error: memberError } = await supabase
        .from('family_members')
        .insert({
          family_group_id: groupData.id,
          user_id: user.id,
          display_name: displayName || null
        });

      if (memberError) throw memberError;

      await loadFamilyData();
      return { error: null, inviteCode: groupData.invite_code };
    } catch (error: any) {
      console.error('Error creating family group:', error);
      return { error: error.message };
    }
  };

  // Join an existing family group
  const joinFamilyGroup = async (inviteCode: string, displayName?: string) => {
    if (!user) return { error: 'Not authenticated' };

    try {
      // Find the group by invite code
      const { data: groupData, error: findError } = await supabase
        .from('family_groups')
        .select('id, name')
        .eq('invite_code', inviteCode.toLowerCase().trim())
        .maybeSingle();

      if (findError) throw findError;
      if (!groupData) return { error: 'Invalid invite code' };

      // Check if already a member
      const { data: existingMember } = await supabase
        .from('family_members')
        .select('id')
        .eq('family_group_id', groupData.id)
        .eq('user_id', user.id)
        .maybeSingle();

      if (existingMember) return { error: 'You are already a member of this group' };

      // Join the group
      const { error: joinError } = await supabase
        .from('family_members')
        .insert({
          family_group_id: groupData.id,
          user_id: user.id,
          display_name: displayName || null
        });

      if (joinError) throw joinError;

      await loadFamilyData();
      return { error: null, groupName: groupData.name };
    } catch (error: any) {
      console.error('Error joining family group:', error);
      return { error: error.message };
    }
  };

  // Leave the family group
  const leaveFamilyGroup = async () => {
    if (!user || !familyGroup) return { error: 'Not in a group' };

    try {
      await supabase
        .from('family_members')
        .delete()
        .eq('family_group_id', familyGroup.id)
        .eq('user_id', user.id);

      // If creator leaves and no other members, delete the group
      if (familyGroup.createdBy === user.id && members.length === 1) {
        await supabase
          .from('family_groups')
          .delete()
          .eq('id', familyGroup.id);
      }

      setFamilyGroup(null);
      setMembers([]);
      setSharedRecipes([]);
      setSharedDrinks([]);
      return { error: null };
    } catch (error: any) {
      console.error('Error leaving family group:', error);
      return { error: error.message };
    }
  };

  // Share a recipe with the family
  const shareRecipe = async (recipe: Recipe) => {
    if (!user || !familyGroup) return { error: 'Not in a group' };

    try {
      const recipeData = JSON.parse(JSON.stringify(recipe));

      const { error } = await supabase
        .from('shared_recipes')
        .insert({
          family_group_id: familyGroup.id,
          recipe_id: recipe.id,
          recipe_data: recipeData,
          shared_by: user.id
        });

      if (error) {
        if (error.code === '23505') {
          return { error: 'This recipe is already shared with the group' };
        }
        throw error;
      }

      await loadFamilyData();
      return { error: null };
    } catch (error: any) {
      console.error('Error sharing recipe:', error);
      return { error: error.message };
    }
  };

  // Unshare a recipe
  const unshareRecipe = async (recipeId: string) => {
    if (!user || !familyGroup) return { error: 'Not in a group' };

    try {
      await supabase
        .from('shared_recipes')
        .delete()
        .eq('family_group_id', familyGroup.id)
        .eq('recipe_id', recipeId)
        .eq('shared_by', user.id);

      setSharedRecipes(prev => prev.filter(r => r.recipeId !== recipeId));
      return { error: null };
    } catch (error: any) {
      console.error('Error unsharing recipe:', error);
      return { error: error.message };
    }
  };

  // Check if a recipe is shared
  const isRecipeShared = (recipeId: string) => {
    return sharedRecipes.some(r => r.recipeId === recipeId);
  };

  // Share a drink with the family
  const shareDrink = async (drink: Drink) => {
    if (!user || !familyGroup) return { error: 'Not in a group' };

    try {
      const drinkData = JSON.parse(JSON.stringify(drink));

      const { error } = await supabase
        .from('shared_drinks')
        .insert({
          family_group_id: familyGroup.id,
          drink_id: drink.id,
          drink_data: drinkData,
          shared_by: user.id
        });

      if (error) {
        if (error.code === '23505') {
          return { error: 'This drink is already shared with the group' };
        }
        throw error;
      }

      await loadFamilyData();
      return { error: null };
    } catch (error: any) {
      console.error('Error sharing drink:', error);
      return { error: error.message };
    }
  };

  // Unshare a drink
  const unshareDrink = async (drinkId: string) => {
    if (!user || !familyGroup) return { error: 'Not in a group' };

    try {
      await supabase
        .from('shared_drinks')
        .delete()
        .eq('family_group_id', familyGroup.id)
        .eq('drink_id', drinkId)
        .eq('shared_by', user.id);

      setSharedDrinks(prev => prev.filter(d => d.drinkId !== drinkId));
      return { error: null };
    } catch (error: any) {
      console.error('Error unsharing drink:', error);
      return { error: error.message };
    }
  };

  // Check if a drink is shared
  const isDrinkShared = (drinkId: string) => {
    return sharedDrinks.some(d => d.drinkId === drinkId);
  };

  // Update display name
  const updateDisplayName = async (displayName: string) => {
    if (!user || !familyGroup) return { error: 'Not in a group' };

    try {
      await supabase
        .from('family_members')
        .update({ display_name: displayName })
        .eq('family_group_id', familyGroup.id)
        .eq('user_id', user.id);

      setMembers(prev => prev.map(m => 
        m.userId === user.id ? { ...m, displayName } : m
      ));
      return { error: null };
    } catch (error: any) {
      console.error('Error updating display name:', error);
      return { error: error.message };
    }
  };

  return {
    familyGroup,
    members,
    sharedRecipes,
    sharedDrinks,
    loading,
    createFamilyGroup,
    joinFamilyGroup,
    leaveFamilyGroup,
    shareRecipe,
    unshareRecipe,
    isRecipeShared,
    shareDrink,
    unshareDrink,
    isDrinkShared,
    updateDisplayName,
    refresh: loadFamilyData
  };
}
