import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface RecipeSaveCounts {
  [recipeId: string]: number;
}

export function useRecipeSaveCounts() {
  const [saveCounts, setSaveCounts] = useState<RecipeSaveCounts>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Defer this non-critical API call to avoid extending the critical request chain
    const timeoutId = setTimeout(() => {
      const fetchSaveCounts = async () => {
        try {
          const { data, error } = await supabase.rpc('get_recipe_save_counts');
          
          if (error) {
            console.error('Error fetching save counts:', error);
            return;
          }

          const counts: RecipeSaveCounts = {};
          data?.forEach((item: { recipe_id: string; save_count: number }) => {
            counts[item.recipe_id] = item.save_count;
          });
          setSaveCounts(counts);
        } catch (error) {
          console.error('Error fetching save counts:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchSaveCounts();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  const getSaveCount = (recipeId: string): number => {
    return saveCounts[recipeId] || 0;
  };

  return {
    saveCounts,
    getSaveCount,
    loading
  };
}
