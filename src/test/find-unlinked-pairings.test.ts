import { describe, it, expect } from 'vitest';
import { sampleRecipes } from '@/data/recipes';
import { sampleDrinks } from '@/data/drinks';

function normalizeTitle(str: string): string {
  return str.replace(/[^a-z0-9]/gi, "").toLowerCase();
}

describe('Find unlinked pairings', () => {
  it('should list all recipe suggestedSides that do not match any recipe title', () => {
    const titleSet = new Set(sampleRecipes.map(r => normalizeTitle(r.title)));
    
    const unlinked: { recipeTitle: string; pairingName: string }[] = [];
    
    for (const recipe of sampleRecipes) {
      if (!recipe.suggestedSides) continue;
      for (const side of recipe.suggestedSides) {
        const normalized = normalizeTitle(side.name);
        // Check exact match
        let found = titleSet.has(normalized);
        // Check partial match
        if (!found) {
          for (const key of titleSet) {
            if (key.includes(normalized) || normalized.includes(key)) {
              found = true;
              break;
            }
          }
        }
        if (!found) {
          unlinked.push({ recipeTitle: recipe.title, pairingName: side.name });
        }
      }
    }
    
    // Print unique unlinked pairing names
    const uniqueNames = [...new Set(unlinked.map(u => u.pairingName))].sort();
    console.log('UNLINKED RECIPE PAIRINGS (' + uniqueNames.length + '):');
    uniqueNames.forEach(n => console.log('  - ' + n));
    
    console.log('\nDETAILS:');
    unlinked.forEach(u => console.log(`  "${u.recipeTitle}" -> "${u.pairingName}"`));
    
    // This test is just for reporting
    expect(true).toBe(true);
  });

  it('should list all drink suggestedPairings that do not match any recipe title', () => {
    const titleSet = new Set(sampleRecipes.map(r => normalizeTitle(r.title)));
    
    const unlinked: { drinkTitle: string; pairingName: string }[] = [];
    
    for (const drink of sampleDrinks) {
      if (!drink.suggestedPairings) continue;
      for (const pairing of drink.suggestedPairings) {
        const normalized = normalizeTitle(pairing.name);
        let found = titleSet.has(normalized);
        if (!found) {
          for (const key of titleSet) {
            if (key.includes(normalized) || normalized.includes(key)) {
              found = true;
              break;
            }
          }
        }
        if (!found) {
          unlinked.push({ drinkTitle: drink.title, pairingName: pairing.name });
        }
      }
    }
    
    const uniqueNames = [...new Set(unlinked.map(u => u.pairingName))].sort();
    console.log('UNLINKED DRINK PAIRINGS (' + uniqueNames.length + '):');
    uniqueNames.forEach(n => console.log('  - ' + n));
    
    console.log('\nDETAILS:');
    unlinked.forEach(u => console.log(`  "${u.drinkTitle}" -> "${u.pairingName}"`));
    
    expect(true).toBe(true);
  });
});
