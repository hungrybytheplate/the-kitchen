import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from '@/hooks/use-toast';

const PANTRY_CACHE_PREFIX = 'kitchen.pantryCache.';

/** Build the localStorage key for a given user's pantry cache. */
function pantryCacheKey(userId: string) {
  return `${PANTRY_CACHE_PREFIX}${userId}`;
}

/** Read cached pantry ids for the given user (returns [] when missing/corrupt). */
function readPantryCache(userId: string): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(pantryCacheKey(userId));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === 'string') : [];
  } catch {
    return [];
  }
}

/** Persist pantry ids for the given user to localStorage. */
function writePantryCache(userId: string, items: string[]) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(pantryCacheKey(userId), JSON.stringify(items));
  } catch {
    // ignore quota / privacy-mode errors
  }
}

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

    // Hydrate immediately from local cache so the UI shows last-known state
    // even if the network is slow or offline.
    const cached = readPantryCache(user.id);
    if (cached.length > 0) {
      setPantryItems(cached);
      setLoading(false);
    }

    try {
      const { data, error } = await supabase
        .from('user_pantry')
        .select('ingredient_id')
        .eq('user_id', user.id);

      if (error) throw error;
      const fresh = data?.map(item => item.ingredient_id) || [];
      setPantryItems(fresh);
      writePantryCache(user.id, fresh);
    } catch (error) {
      console.error('Error loading pantry (using cached copy):', error);
      // Cache already populated above; nothing else to do.
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
        setPantryItems(prev => {
          const next = prev.filter(id => id !== ingredientId);
          writePantryCache(user.id, next);
          return next;
        });
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
        setPantryItems(prev => {
          const next = [...prev, ingredientId];
          writePantryCache(user.id, next);
          return next;
        });
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
