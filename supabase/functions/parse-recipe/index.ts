const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

// SSRF Protection: Block private/internal IPs
function isPrivateUrl(urlStr: string): boolean {
  try {
    const url = new URL(urlStr);
    const hostname = url.hostname.toLowerCase();
    
    // Block localhost
    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1') return true;
    
    // Block private IP ranges
    const parts = hostname.split('.').map(Number);
    if (parts.length === 4 && parts.every(p => !isNaN(p))) {
      if (parts[0] === 10) return true;
      if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) return true;
      if (parts[0] === 192 && parts[1] === 168) return true;
      if (parts[0] === 169 && parts[1] === 254) return true;
      if (parts[0] === 0) return true;
    }
    
    // Only allow http/https
    if (!['http:', 'https:'].includes(url.protocol)) return true;
    
    return false;
  } catch {
    return true;
  }
}

// Simple rate limiting per user
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10; // requests per window
const RATE_WINDOW = 60000; // 1 minute

function checkRateLimit(userId: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(userId);
  
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(userId, { count: 1, resetAt: now + RATE_WINDOW });
    return true;
  }
  
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Authorization required' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Extract user from JWT
    const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2');
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    );
    
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid authentication' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Rate limit
    if (!checkRateLimit(user.id)) {
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please wait a moment.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { url } = await req.json();
    
    if (!url || typeof url !== 'string') {
      return new Response(
        JSON.stringify({ error: 'URL is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate URL
    const trimmedUrl = url.trim();
    
    // Check it's a valid URL with a proper domain
    try {
      const parsed = new URL(trimmedUrl);
      // Must have a dot in hostname (e.g. example.com) to be a real domain
      if (!parsed.hostname.includes('.')) {
        return new Response(
          JSON.stringify({ error: 'Please enter a valid recipe URL (e.g. https://www.allrecipes.com/recipe/...)' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    } catch {
      return new Response(
        JSON.stringify({ error: 'Please enter a valid recipe URL (e.g. https://www.allrecipes.com/recipe/...)' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    if (isPrivateUrl(trimmedUrl)) {
      return new Response(
        JSON.stringify({ error: 'Invalid URL' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Fetch the webpage
    console.log('Fetching recipe from:', trimmedUrl);
    // Manual redirect handling to prevent SSRF via redirect to internal IPs
    let currentUrl = trimmedUrl;
    let pageResponse: Response | null = null;
    const MAX_REDIRECTS = 5;
    for (let i = 0; i <= MAX_REDIRECTS; i++) {
      pageResponse = await fetch(currentUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; RecipeParser/1.0)',
          'Accept': 'text/html,application/xhtml+xml',
        },
        redirect: 'manual',
      });

      if (pageResponse.status >= 300 && pageResponse.status < 400) {
        const location = pageResponse.headers.get('location');
        if (!location) break;
        // Resolve relative redirects against current URL
        const nextUrl = new URL(location, currentUrl).toString();
        if (isPrivateUrl(nextUrl)) {
          return new Response(
            JSON.stringify({ error: 'Invalid URL' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
        if (i === MAX_REDIRECTS) {
          return new Response(
            JSON.stringify({ error: 'Too many redirects' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
        currentUrl = nextUrl;
        continue;
      }
      break;
    }

    if (!pageResponse) {
      return new Response(
        JSON.stringify({ error: 'Could not fetch the page' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!pageResponse.ok) {
      return new Response(
        JSON.stringify({ error: `Could not fetch the page (status ${pageResponse.status})` }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const html = await pageResponse.text();
    
    // Truncate HTML to avoid token limits (keep first ~15k chars)
    const truncatedHtml = html.substring(0, 15000);

    // Use Lovable AI to parse the recipe
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'AI service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: `You are a recipe parser. Extract recipe data from the provided HTML and return ONLY valid JSON with this exact structure:
{
  "title": "Recipe Title",
  "description": "Brief description",
  "meal_type": "breakfast|lunch|dinner|dessert|sides",
  "cook_time": "30 min",
  "servings": 4,
  "difficulty": "easy|medium|hard",
  "ingredients": ["ingredient 1", "ingredient 2"],
  "ingredient_amounts": [{"id": "ingredient-1", "amount": "2", "unit": "cups"}],
  "instructions": ["Step 1", "Step 2"],
  "dietary_tags": ["vegetarian", "gluten-free"],
  "nutrition": {"calories": 350, "protein": 20, "carbs": 45, "fat": 12}
}
Rules:
- meal_type must be one of: breakfast, lunch, dinner, dessert, sides
- difficulty must be one of: easy, medium, hard
- dietary_tags can include: vegetarian, vegan, gluten-free, dairy-free, keto, paleo, low-carb, high-protein, nut-free, sugar-free, heart-healthy, kidney-friendly, diabetic-friendly, anti-inflammatory
- If nutrition info is not available, set nutrition to null
- ingredient_amounts id should be a kebab-case version of the ingredient name
- Return ONLY the JSON object, no markdown or explanation`
          },
          {
            role: 'user',
            content: `Parse this recipe webpage HTML:\\n\\n${truncatedHtml}`
          }
        ],
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI API error:', aiResponse.status, errorText);
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI service credits exhausted. Please try again later.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      return new Response(
        JSON.stringify({ error: 'Failed to parse recipe. Please try again.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const aiData = await aiResponse.json();
    const content = aiData.choices?.[0]?.message?.content || '';
    
    // Extract JSON from response (handle potential markdown wrapping)
    let jsonStr = content.trim();
    if (jsonStr.startsWith('```')) {
      jsonStr = jsonStr.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
    }
    
    const recipe = JSON.parse(jsonStr);
    
    // Validate required fields
    if (!recipe.title || !recipe.ingredients || !recipe.instructions) {
      return new Response(
        JSON.stringify({ error: 'Could not extract recipe data from this page' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Save to database
    const { data: saved, error: saveError } = await supabase
      .from('custom_recipes')
      .insert({
        user_id: user.id,
        title: recipe.title,
        description: recipe.description || null,
        meal_type: recipe.meal_type || 'dinner',
        cook_time: recipe.cook_time || '30 min',
        servings: recipe.servings || 4,
        difficulty: recipe.difficulty || 'medium',
        ingredients: recipe.ingredients,
        ingredient_amounts: recipe.ingredient_amounts || [],
        instructions: recipe.instructions,
        dietary_tags: recipe.dietary_tags || [],
        nutrition: recipe.nutrition || null,
        source_url: trimmedUrl,
      })
      .select()
      .single();

    if (saveError) {
      console.error('Save error:', saveError);
      return new Response(
        JSON.stringify({ error: 'Failed to save recipe' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Recipe parsed and saved:', saved.id);
    return new Response(
      JSON.stringify({ success: true, recipe: saved }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Parse recipe error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to parse recipe. Please try again.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
