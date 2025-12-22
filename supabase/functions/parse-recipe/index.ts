import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();

    if (!url) {
      console.error('No URL provided');
      return new Response(
        JSON.stringify({ success: false, error: 'URL is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Fetching recipe from URL:', url);

    // Fetch the webpage content
    const pageResponse = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      }
    });

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
