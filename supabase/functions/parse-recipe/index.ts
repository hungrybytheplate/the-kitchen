import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// SSRF protection: validate URL is safe to fetch
function isUrlSafe(urlString: string): { safe: boolean; error?: string } {
  try {
    const url = new URL(urlString);
    
    // Only allow http/https protocols
    if (!['http:', 'https:'].includes(url.protocol)) {
      return { safe: false, error: 'Only HTTP and HTTPS URLs are allowed' };
    }
    
    const hostname = url.hostname.toLowerCase();
    
    // Block localhost variations
    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1') {
      return { safe: false, error: 'Localhost URLs are not allowed' };
    }
    
    // Block private IP ranges
    const ipPatterns = [
      /^10\./,                          // 10.0.0.0/8
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./, // 172.16.0.0/12
      /^192\.168\./,                     // 192.168.0.0/16
      /^169\.254\./,                     // 169.254.0.0/16 (link-local, AWS metadata)
      /^0\./,                            // 0.0.0.0/8
      /^100\.(6[4-9]|[7-9][0-9]|1[0-1][0-9]|12[0-7])\./, // 100.64.0.0/10 (carrier-grade NAT)
    ];
    
    for (const pattern of ipPatterns) {
      if (pattern.test(hostname)) {
        return { safe: false, error: 'Private network URLs are not allowed' };
      }
    }
    
    // Block internal hostnames
    const blockedHostnames = [
      'metadata.google.internal',
      'metadata.google.com',
      'metadata',
      'internal',
    ];
    
    if (blockedHostnames.some(blocked => hostname === blocked || hostname.endsWith('.' + blocked))) {
      return { safe: false, error: 'Internal network URLs are not allowed' };
    }
    
    return { safe: true };
  } catch {
    return { safe: false, error: 'Invalid URL format' };
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.error('No authorization header');
      return new Response(
        JSON.stringify({ success: false, error: 'Authentication required' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    });

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      console.error('Auth error:', authError);
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid authentication' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Authenticated user:', user.id);

    const { url } = await req.json();

    if (!url) {
      console.error('No URL provided');
      return new Response(
        JSON.stringify({ success: false, error: 'URL is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate URL for SSRF protection
    const urlCheck = isUrlSafe(url);
    if (!urlCheck.safe) {
      console.error('URL validation failed:', urlCheck.error);
      return new Response(
        JSON.stringify({ success: false, error: urlCheck.error }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Fetching recipe from URL:', url);

    // Fetch the webpage content with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
    
    let pageResponse;
    try {
      pageResponse = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        },
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeoutId);
    }

    if (!pageResponse.ok) {
      console.error('Failed to fetch URL:', pageResponse.status);
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to fetch the recipe page' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const html = await pageResponse.text();
    
    // Limit HTML content to avoid token limits
    const truncatedHtml = html.slice(0, 50000);

    console.log('HTML fetched, length:', html.length, 'Truncated to:', truncatedHtml.length);

    // Use Lovable AI to extract recipe data
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY not configured');
      return new Response(
        JSON.stringify({ success: false, error: 'AI service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: `You are a recipe extraction assistant. Extract recipe information from HTML content and return it as valid JSON. 
            
Extract the following fields:
- title: The recipe title (string)
- description: A brief description of the recipe (string, max 200 chars)
- mealType: One of "breakfast", "lunch", "dinner", "dessert", or "sides" (string)
- cookTime: Total time to make the recipe, e.g., "30 min" or "1 hour" (string)
- servings: Number of servings (integer)
- difficulty: One of "easy", "medium", or "hard" (string)
- ingredients: Array of ingredient names as simple strings, e.g., ["chicken", "garlic", "olive-oil"] (use lowercase, hyphenate multi-word ingredients)
- ingredientAmounts: Array of objects with { id, amount, unit } for each ingredient
- instructions: Array of step-by-step instruction strings
- dietaryTags: Array of applicable tags from ["vegetarian", "vegan", "gluten-free", "dairy-free", "keto", "paleo", "nut-free", "high-protein", "low-carb", "high-fiber"]

Return ONLY valid JSON, no markdown code blocks.`
          },
          {
            role: 'user',
            content: `Extract the recipe from this HTML content:\n\n${truncatedHtml}`
          }
        ],
        tools: [
          {
            type: 'function',
            function: {
              name: 'extract_recipe',
              description: 'Extract recipe data from HTML content',
              parameters: {
                type: 'object',
                properties: {
                  title: { type: 'string', description: 'Recipe title' },
                  description: { type: 'string', description: 'Brief description, max 200 chars' },
                  mealType: { type: 'string', enum: ['breakfast', 'lunch', 'dinner', 'dessert', 'sides'] },
                  cookTime: { type: 'string', description: 'e.g., "30 min" or "1 hour"' },
                  servings: { type: 'integer', description: 'Number of servings' },
                  difficulty: { type: 'string', enum: ['easy', 'medium', 'hard'] },
                  ingredients: { 
                    type: 'array', 
                    items: { type: 'string' },
                    description: 'Array of ingredient names, lowercase, hyphenated'
                  },
                  ingredientAmounts: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: { type: 'string' },
                        amount: { type: 'string' },
                        unit: { type: 'string' }
                      },
                      required: ['id', 'amount', 'unit']
                    }
                  },
                  instructions: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Step-by-step instructions'
                  },
                  dietaryTags: {
                    type: 'array',
                    items: { type: 'string' }
                  }
                },
                required: ['title', 'ingredients', 'instructions']
              }
            }
          }
        ],
        tool_choice: { type: 'function', function: { name: 'extract_recipe' } }
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI API error:', aiResponse.status, errorText);
      
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ success: false, error: 'Rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ success: false, error: 'AI credits exhausted. Please add credits to continue.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to parse recipe with AI' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const aiData = await aiResponse.json();
    console.log('AI response received');

    // Extract the recipe data from tool call
    const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall || toolCall.function.name !== 'extract_recipe') {
      console.error('No tool call in AI response');
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to extract recipe data' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const recipe = JSON.parse(toolCall.function.arguments);
    console.log('Recipe extracted:', recipe.title);

    return new Response(
      JSON.stringify({ 
        success: true, 
        recipe: {
          ...recipe,
          sourceUrl: url
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error parsing recipe:', error);
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
