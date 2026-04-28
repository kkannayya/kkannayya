import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getLanguageFeedback(
  userText: string,
  targetLanguage: string,
  context: string = ""
) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a helpful language tutor for ${targetLanguage}. 
      The user is practicing their ${targetLanguage} skills.
      Context: ${context}
      User's input: "${userText}"
      
      Provide constructive feedback on:
      1. Grammar and accuracy.
      2. Naturalness of phrasing.
      3. A better alternative if applicable.
      Keep the feedback concise, encouraging, and informative.`,
      config: {
        temperature: 0.7,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Error getting language feedback:", error);
    return "I'm sorry, I couldn't process your request right now. Keep practicing!";
  }
}

export async function generateQuizQuestion(language: string, level: string = "beginner") {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a multiple choice quiz question for a ${level} ${language} learner.
      Return the response in strictly JSON format with the following structure:
      {
        "question": "string",
        "options": ["string", "string", "string", "string"],
        "correctAnswer": "string",
        "explanation": "string"
      }`,
      config: {
        responseMimeType: "application/json",
      },
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Error generating quiz question:", error);
    return null;
  }
}
