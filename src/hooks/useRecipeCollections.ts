import { useState, useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
import type { RecipeCollection } from "@/components/RecipeCollections";

export function useRecipeCollections() {
  const [collections, setCollections] = useLocalStorage<RecipeCollection[]>("recipe-collections", []);
  const [selectedCollectionId, setSelectedCollectionId] = useState<string | null>(null);

  const createCollection = useCallback((name: string, emoji: string) => {
    const newCol: RecipeCollection = {
      id: `col-${Date.now()}`,
      name,
      emoji,
      recipeIds: [],
    };
    setCollections(prev => [...prev, newCol]);
  }, [setCollections]);

  const deleteCollection = useCallback((id: string) => {
    setCollections(prev => prev.filter(c => c.id !== id));
    if (selectedCollectionId === id) setSelectedCollectionId(null);
  }, [setCollections, selectedCollectionId]);

  const addToCollection = useCallback((collectionId: string, recipeId: string) => {
    setCollections(prev => prev.map(c => 
      c.id === collectionId && !c.recipeIds.includes(recipeId)
        ? { ...c, recipeIds: [...c.recipeIds, recipeId] }
        : c
    ));
  }, [setCollections]);

  const removeFromCollection = useCallback((collectionId: string, recipeId: string) => {
    setCollections(prev => prev.map(c => 
      c.id === collectionId
        ? { ...c, recipeIds: c.recipeIds.filter(id => id !== recipeId) }
        : c
    ));
  }, [setCollections]);

  const getFilteredRecipeIds = useCallback((allRecipeIds: string[]): string[] => {
    if (!selectedCollectionId) return allRecipeIds;
    const col = collections.find(c => c.id === selectedCollectionId);
    if (!col) return allRecipeIds;
    return allRecipeIds.filter(id => col.recipeIds.includes(id));
  }, [selectedCollectionId, collections]);

  return {
    collections,
    selectedCollectionId,
    setSelectedCollectionId,
    createCollection,
    deleteCollection,
    addToCollection,
    removeFromCollection,
    getFilteredRecipeIds,
  };
}
