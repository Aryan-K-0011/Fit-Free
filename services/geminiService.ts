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

    return response.text || "I'm sorry, I couldn't generate advice right now. Please try again.";
  } catch (error) {
    console.error("Error generating fitness advice:", error);
    return "I'm having trouble connecting to the fitness database. Please check your connection and try again.";
  }
};
