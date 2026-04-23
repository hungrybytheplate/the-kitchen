import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from '@/hooks/use-toast';
import React from 'react';

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

/** Compare two id lists irrespective of order. */
function sameItems(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  const set = new Set(a);
  for (const id of b) if (!set.has(id)) return false;
  return true;
}

/** Summarise the difference between cached and server lists. */
function diffSummary(cached: string[], server: string[]): string {
  const cachedSet = new Set(cached);
  const serverSet = new Set(server);
  const onlyLocal = cached.filter(id => !serverSet.has(id)).length;
  const onlyServer = server.filter(id => !cachedSet.has(id)).length;
  const parts: string[] = [];
  if (onlyLocal) parts.push(`${onlyLocal} only on this device`);
  if (onlyServer) parts.push(`${onlyServer} only on server`);
  return parts.join(' · ') || 'Lists differ';
}

export type PantrySyncStatus = 'idle' | 'syncing' | 'synced' | 'offline';

export function usePantry() {
  const { user } = useAuth();
  const [pantryItems, setPantryItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncStatus, setSyncStatus] = useState<PantrySyncStatus>('idle');
  const [lastSyncedAt, setLastSyncedAt] = useState<number | null>(null);

  const loadPantry = useCallback(async () => {
    if (!user) {
      setPantryItems([]);
      setLoading(false);
      setSyncStatus('idle');
      return;
    }

    // Hydrate immediately from local cache so the UI shows last-known state
    // even if the network is slow or offline.
    const cached = readPantryCache(user.id);
    const hadCache = cached.length > 0;
    if (cached.length > 0) {
      setPantryItems(cached);
      setLoading(false);
    }

    setSyncStatus('syncing');

    try {
      const { data, error } = await supabase
        .from('user_pantry')
        .select('ingredient_id')
        .eq('user_id', user.id);

      if (error) throw error;
      const fresh = data?.map(item => item.ingredient_id) || [];

      // Suspicious-empty guard: if we had a populated cache but the server
      // returns an empty list, treat it as a possible outage / partial response
      // and KEEP the cached selections visible. The user can still confirm
      // they cleared it via the conflict toast below.
      const serverLooksEmpty = hadCache && fresh.length === 0;

      // Conflict: cached state existed and differs from server.
      // Surface a toast and let the user pick which copy wins.
      if (hadCache && !sameItems(cached, fresh)) {
        const userId = user.id;

        const useCached = async () => {
          setPantryItems(cached);
          try {
            await supabase.from('user_pantry').delete().eq('user_id', userId);
            if (cached.length > 0) {
              await supabase.from('user_pantry').insert(
                cached.map(ingredient_id => ({ user_id: userId, ingredient_id }))
              );
            }
            writePantryCache(userId, cached);
            toast({ title: 'Using cached pantry', description: 'Server updated to match this device.' });
          } catch (e) {
            console.error('Failed to push cached pantry to server:', e);
            toast({ title: 'Sync failed', description: 'Could not update server. Will retry later.', variant: 'destructive' });
          }
        };

        const useServer = () => {
          setPantryItems(fresh);
          writePantryCache(userId, fresh);
          toast({ title: 'Using server pantry', description: 'Local cache updated to match server.' });
        };

        toast({
          title: serverLooksEmpty ? 'Pantry looks empty on server' : 'Pantry out of sync',
          description: React.createElement(
            'div',
            { className: 'flex flex-col gap-2' },
            React.createElement(
              'span',
              null,
              serverLooksEmpty
                ? `Server returned no items but ${cached.length} are cached on this device. Keeping cached selections — confirm which copy to use.`
                : diffSummary(cached, fresh) + '. Which copy should we use?',
            ),
            React.createElement(
              'div',
              { className: 'flex gap-2 mt-1' },
              React.createElement(
                'button',
                {
                  onClick: useCached,
                  className: 'inline-flex h-8 items-center justify-center rounded-md border bg-background px-3 text-xs font-medium hover:bg-secondary',
                },
                'Use cached'
              ),
              React.createElement(
                'button',
                {
                  onClick: useServer,
                  className: 'inline-flex h-8 items-center justify-center rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground hover:bg-primary/90',
                },
                'Use server'
              )
            )
          ),
          duration: 15000,
        });
        // Leave UI on cached copy until the user chooses; do not overwrite cache yet.
      } else {
        setPantryItems(fresh);
        writePantryCache(user.id, fresh);
      }
      setSyncStatus('synced');
      setLastSyncedAt(Date.now());
    } catch (error) {
      console.error('Error loading pantry (using cached copy):', error);
      setSyncStatus('offline');
      // Network / server error: keep showing the cached copy. If we had no
      // cache, ensure UI doesn't get stuck in loading state with nothing.
      if (!hadCache) {
        setPantryItems([]);
      } else {
        toast({
          title: 'Offline mode',
          description: 'Showing your last saved pantry. Changes will sync when you reconnect.',
        });
      }
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
    syncStatus,
    lastSyncedAt,
  };
}
