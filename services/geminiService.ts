
import { GoogleGenAI } from "@google/genai";

// Fix: Per coding guidelines, the API key must be obtained from `process.env.API_KEY`
// and should be used directly. This also resolves the TypeScript error.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateDescription(productName: string): Promise<string> {
  const prompt = `Generate a short, stylish, and appealing e-commerce product description for a piece of clothing called "${productName}". Mention material, fit, and feel. Make it sound trendy and high-quality. Do not use markdown or special formatting. Just plain text. Keep it under 250 characters.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    // Fix: The `text` property on GenerateContentResponse is a non-optional string, so optional chaining is not needed.
    const description = response.text.trim();
    if (!description) {
      throw new Error("Received an empty description from the API.");
    }
    
    return description;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    // Throw an error to be handled by the component that calls this function
    throw new Error("Oops! We couldn't generate a new description. Please try again later.");
  }
}
