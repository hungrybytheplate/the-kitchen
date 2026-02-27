import { describe, it, expect } from 'vitest';
import { sampleRecipes } from '@/data/recipes';
import { sampleDrinks } from '@/data/drinks';
import { findPairingByName } from '@/lib/pairingLookup';

describe('Find unlinked pairings', () => {
  it('should list all recipe suggestedSides that do not match any recipe OR drink title', () => {
    const unlinked: { recipeTitle: string; pairingName: string }[] = [];
    
    for (const recipe of sampleRecipes) {
      if (!recipe.suggestedSides) continue;
      for (const side of recipe.suggestedSides) {
        if (!findPairingByName(side.name)) {
          unlinked.push({ recipeTitle: recipe.title, pairingName: side.name });
        }
      }
    }
    
    const uniqueNames = [...new Set(unlinked.map(u => u.pairingName))].sort();
    console.log('UNLINKED RECIPE PAIRINGS (' + uniqueNames.length + '):');
    uniqueNames.forEach(n => console.log('  - ' + n));
    
    console.log('\nDETAILS:');
    unlinked.forEach(u => console.log(`  "${u.recipeTitle}" -> "${u.pairingName}"`));
    
    expect(unlinked.length).toBe(0);
  });

  it('should list all drink suggestedPairings that do not match any recipe OR drink title', () => {
    const unlinked: { drinkTitle: string; pairingName: string }[] = [];
    
    for (const drink of sampleDrinks) {
      if (!drink.suggestedPairings) continue;
      for (const pairing of drink.suggestedPairings) {
        if (!findPairingByName(pairing.name)) {
          unlinked.push({ drinkTitle: drink.title, pairingName: pairing.name });
        }
      }
    }
    
    const uniqueNames = [...new Set(unlinked.map(u => u.pairingName))].sort();
    console.log('UNLINKED DRINK PAIRINGS (' + uniqueNames.length + '):');
    uniqueNames.forEach(n => console.log('  - ' + n));
    
    console.log('\nDETAILS:');
    unlinked.forEach(u => console.log(`  "${u.drinkTitle}" -> "${u.pairingName}"`));
    
    expect(unlinked.length).toBe(0);
  });
});
