import { useState, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'recently-viewed-recipes';
const MAX_ITEMS = 5;

export function useRecentlyViewed() {
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setRecentlyViewed(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load recently viewed:', e);
    }
  }, []);

  // Save to localStorage whenever it changes
  const saveToStorage = useCallback((items: string[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save recently viewed:', e);
    }
  }, []);

  const addRecentlyViewed = useCallback((recipeId: string) => {
    setRecentlyViewed(prev => {
      // Remove if already exists (to move to front)
      const filtered = prev.filter(id => id !== recipeId);
      // Add to front, limit to MAX_ITEMS
      const updated = [recipeId, ...filtered].slice(0, MAX_ITEMS);
      saveToStorage(updated);
      return updated;
    });
  }, [saveToStorage]);

  const clearRecentlyViewed = useCallback(() => {
    setRecentlyViewed([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    recentlyViewed,
    addRecentlyViewed,
    clearRecentlyViewed,
  };
}
