import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

// Using import.meta.env instead of process.env for Vite
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const getRecipeFromGemini = async (
  query: string,
  ingredients: string[] = [],
  dietaryPreferences: string[] = []
) => {
  // Use 'gemini-1.5-flash' instead of 'gemini-pro' for latest model
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    safetySettings: [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
    ],
  });

  // Construct detailed prompt with ingredient and dietary requirements
  const prompt = `Generate a recipe based on the following criteria:

    Search Query: ${query}
    
    Available Ingredients (MUST USE THESE): ${ingredients.length
      ? ingredients.join(', ')
      : 'No specific ingredient requirements, use common ingredients'
    }
    
    Dietary Preferences/Restrictions (MUST FOLLOW THESE): ${dietaryPreferences.length
      ? dietaryPreferences.join(', ')
      : 'No specific dietary restrictions'
    }
    
    IMPORTANT INSTRUCTIONS:
    1. Recipe MUST primarily use the available ingredients listed above
    2. Recipe MUST strictly adhere to any dietary restrictions specified
    3. If dietary preferences include vegan, vegetarian, gluten-free, etc., ensure ALL ingredients comply
    4. Provide accurate nutritional information based on the ingredients and amounts
    5. Return ONLY the raw JSON without any markdown formatting, code blocks, or additional text
    
    The response must be a valid JSON object with exactly this structure:
    {
      "title": "Recipe Title",
      "description": "Brief description",
      "ingredients": [{ "name": "ingredient name", "amount": "amount" }],
      "instructions": ["step 1", "step 2", ...],
      "cookTime": "time in minutes",
      "servings": number,
      "tags": ["tag1", "tag2", ...],
      "nutrition": {
        "calories": number,
        "protein": number,
        "carbs": number,
        "fat": number,
        "fiber": number,
        "sugar": number
      }
    }`;

  try {
    console.log("Sending request to Gemini API...");
    console.log("Query:", query);
    console.log("Ingredients:", ingredients);
    console.log("Dietary Preferences:", dietaryPreferences);

    const result = await model.generateContent(prompt);
    console.log("Received response from Gemini API");
    const response = result.response;
    let text = response.text();

    // Clean up the text by removing markdown code blocks and other non-JSON content
    text = text.replace(/```json\s*/g, ''); // Remove ```json
    text = text.replace(/```\s*$/g, '');    // Remove closing ```
    text = text.replace(/^```\s*/g, '');    // Remove any other code block markers
    text = text.trim();                     // Trim whitespace

    console.log("Cleaned text:", text.substring(0, 100) + "..."); // Log first 100 chars

    // Try to parse the response as JSON, but handle cases where it's not proper JSON
    try {
      return JSON.parse(text);
    } catch (parseError) {
      console.error("Failed to parse Gemini response as JSON:", parseError);
      console.log("Raw response:", text);

      // Extract JSON using regex as a fallback
      try {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
      } catch (regexError) {
        console.error("Failed to extract JSON with regex:", regexError);
      }

      // Return a formatted error response that matches your expected structure
      return {
        title: "Recipe Generation Error",
        description: "Could not generate a recipe with the provided query.",
        ingredients: [{ name: "No ingredients", amount: "N/A" }],
        instructions: ["Try a different search query."],
        cookTime: "N/A",
        servings: 0,
        tags: ["Error"],
        nutrition: {
          calories: 0,
          protein: 0,
          carbs: 0,
          fat: 0,
          fiber: 0,
          sugar: 0
        }
      };
    }
  } catch (error) {
    console.error('Error generating recipe:', error);
    throw error;
  }
};