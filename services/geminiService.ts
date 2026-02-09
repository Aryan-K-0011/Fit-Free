import { GoogleGenAI } from "@google/genai";

// Initialize the client with the API key from the environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateFitnessAdvice = async (userPrompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: `You are "FitFree Coach", an expert personal trainer specializing in home, body-weight, and equipment-free workouts. 
        Your goal is to provide motivating, safe, and effective fitness advice.
        Keep your answers concise, encouraging, and structured (use bullet points or lists where applicable).
        If the user asks for a workout plan, provide a clear list of exercises with reps or duration.`,
      },
    });

    if (!response.text) {
      throw new Error("No response generated");
    }

    return response.text;
  } catch (error: any) {
    console.error("Error generating fitness advice:", error);
    
    // Improved error handling
    const errorMessage = error.message || '';
    
    if (errorMessage.includes('429') || errorMessage.toLowerCase().includes('quota')) {
      return "I'm currently receiving too many requests. Please try again in a minute.";
    }
    
    if (errorMessage.includes('API key') || errorMessage.includes('403')) {
      return "There seems to be an issue with the AI service configuration. Please contact support.";
    }

    return "I'm having trouble connecting to the fitness database right now. Please check your internet connection and try again.";
  }
};