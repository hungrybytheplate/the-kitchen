import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from '@/hooks/use-toast';

export function usePantry() {
  const { user } = useAuth();
  const [pantryItems, setPantryItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPantry = useCallback(async () => {
    if (!user) {
      setPantryItems([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_pantry')
        .select('ingredient_id')
        .eq('user_id', user.id);

      if (error) throw error;
      setPantryItems(data?.map(item => item.ingredient_id) || []);
    } catch (error) {
      console.error('Error loading pantry:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadPantry();
  }, [loadPantry]);

  const togglePantryItem = useCallback(async (ingredientId: string) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save pantry items.",
        variant: "destructive",
      });
      return;
    }

    const isInPantry = pantryItems.includes(ingredientId);

    try {
      if (isInPantry) {
        // Remove from pantry
        const { error } = await supabase
          .from('user_pantry')
          .delete()
          .eq('user_id', user.id)
          .eq('ingredient_id', ingredientId);

        if (error) throw error;
        setPantryItems(prev => prev.filter(id => id !== ingredientId));
        toast({
          title: "Removed from pantry",
          description: "Item will no longer be auto-selected.",
        });
      } else {
        // Add to pantry
        const { error } = await supabase
          .from('user_pantry')
          .insert({ user_id: user.id, ingredient_id: ingredientId });

        if (error) throw error;
        setPantryItems(prev => [...prev, ingredientId]);
        toast({
          title: "Added to pantry",
          description: "Item will be auto-selected when you visit.",
        });
      }
    } catch (error) {
      console.error('Error updating pantry:', error);
      toast({
        title: "Error",
        description: "Failed to update pantry. Please try again.",
        variant: "destructive",
      });
    }
  }, [user, pantryItems]);

  const isInPantry = useCallback((ingredientId: string) => {
    return pantryItems.includes(ingredientId);
  }, [pantryItems]);

  return {
    pantryItems,
    loading,
    togglePantryItem,
    isInPantry,
    refetch: loadPantry,
  };
}
