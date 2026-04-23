import { pantryItems, fridgeItems, spiceItems } from "@/data/ingredients";
import { drinkIngredientCategories } from "@/data/drinkIngredients";

/**
 * Fuzzy resolver that maps free-text ingredient names typed by users into
 * the "Other" field to known ingredient IDs in our recipe matcher.
 *
 * Strategy (cheap → expensive):
 *   1. exact id match
 *   2. exact name match
 *   3. token containment (each query token is a substring of a candidate token)
 *   4. Levenshtein distance against the closest candidate token
 *
 * The index is built once on first use.
 */

export interface FuzzyCandidate {
  /** The canonical id we'll feed into the matching engine. */
  id: string;
  /** Display name for toast / UX feedback. */
  name: string;
  /** Tokens used for matching (lowercased, hyphen-split). */
  tokens: string[];
}

let cachedIndex: FuzzyCandidate[] | null = null;

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/[\s-]+/)
    .filter((t) => t.length > 1);
}

function buildIndex(): FuzzyCandidate[] {
  if (cachedIndex) return cachedIndex;
  const seen = new Map<string, FuzzyCandidate>();

  const add = (id: string, name: string) => {
    if (!id || seen.has(id)) return;
    const tokens = Array.from(new Set([...tokenize(id), ...tokenize(name)]));
    seen.set(id, { id, name, tokens });
  };

  for (const cat of [...pantryItems, ...fridgeItems, ...spiceItems]) {
    for (const item of cat.items) add(item.id, item.name);
  }
  for (const cat of drinkIngredientCategories) {
    for (const item of cat.ingredients) add(item.id, item.name);
  }

  cachedIndex = Array.from(seen.values());
  return cachedIndex;
}

/** Classic Levenshtein distance, iterative DP. */
function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  const prev = new Array(b.length + 1);
  for (let j = 0; j <= b.length; j++) prev[j] = j;
  let curr = new Array(b.length + 1);
  for (let i = 1; i <= a.length; i++) {
    curr[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(curr[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
    }
    for (let j = 0; j <= b.length; j++) prev[j] = curr[j];
  }
  return prev[b.length];
}

/** Score a candidate against query tokens. Higher is better; 0 means no match. */
function scoreCandidate(query: string, queryTokens: string[], candidate: FuzzyCandidate): number {
  const qNorm = query.toLowerCase().trim();

  // 1. Exact id or name
  if (candidate.id === qNorm || candidate.name.toLowerCase() === qNorm) return 1000;

  // 2. Whole-string contains
  const candStr = `${candidate.id} ${candidate.name.toLowerCase()}`;
  if (qNorm.length >= 3 && candStr.includes(qNorm)) return 500;

  // 3. Token containment — every query token appears in some candidate token
  let tokenHits = 0;
  let bestTokenDistance = Infinity;
  for (const qt of queryTokens) {
    let matched = false;
    for (const ct of candidate.tokens) {
      if (ct === qt) { matched = true; break; }
      if (ct.includes(qt) || qt.includes(ct)) { matched = true; break; }
    }
    if (matched) tokenHits++;

    // Track the closest token by edit distance for fuzzy fallback
    for (const ct of candidate.tokens) {
      if (Math.abs(ct.length - qt.length) > 3) continue;
      const d = levenshtein(qt, ct);
      if (d < bestTokenDistance) bestTokenDistance = d;
    }
  }

  if (queryTokens.length > 0 && tokenHits === queryTokens.length) {
    // All query tokens matched some candidate token
    return 100 + tokenHits * 10;
  }
  if (tokenHits > 0) {
    return 30 + tokenHits * 10;
  }

  // 4. Pure edit-distance fallback for typos like "tomatto" -> "tomato"
  if (bestTokenDistance <= 2) {
    return 20 - bestTokenDistance * 5;
  }

  return 0;
}

export interface FuzzyMatchResult {
  id: string;
  name: string;
  score: number;
}

/**
 * Given free-text input, return the best-matching known ingredient ids.
 * Returns at most `limit` results, sorted by score descending.
 * Returns empty array when nothing exceeds the minimum score threshold.
 */
export function fuzzyMatchIngredient(query: string, limit = 3): FuzzyMatchResult[] {
  const trimmed = query.trim();
  if (!trimmed) return [];
  const queryTokens = tokenize(trimmed);
  if (queryTokens.length === 0) return [];

  const index = buildIndex();
  const scored: FuzzyMatchResult[] = [];
  for (const cand of index) {
    const score = scoreCandidate(trimmed, queryTokens, cand);
    if (score > 0) {
      scored.push({ id: cand.id, name: cand.name, score });
    }
  }

  scored.sort((a, b) => b.score - a.score);

  // Only return strong matches. If the top score is huge (exact/contains)
  // we trust it; otherwise require a moderate confidence.
  const top = scored[0];
  if (!top) return [];
  const minScore = top.score >= 100 ? 100 : 30;
  return scored.filter((r) => r.score >= minScore).slice(0, limit);
}