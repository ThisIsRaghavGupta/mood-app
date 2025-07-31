import { GoogleGenAI } from "@google/genai";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

export default async function handler(req, res) {
  const { mood } = req.body;
  try {
    const response = await ai.models.generateContent({
  		model: "gemini-2.5-flash",
    	contents: `You are a mood assistant. Given a mood, reply in JSON format with: bookRecommendation, quote, and backgroundColor, emojiWeather, activity. My mood is: ${mood}`,
  	})
		let text = response.text.trim()
  	if (text.startsWith("```")) {
    	text = text.replace(/```(?:json)?/, "").replace(/```$/, "").trim();
  	}
		console.log(text)
		const data = JSON.parse(text);
		res.status(200).json(data);
	} catch (error) {
		console.error(error);
    res.status(500).json({ error: 'Failed to generate mood response.' });
  }
}
