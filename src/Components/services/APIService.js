import axios from "axios";

export default class APIService {
  constructor() {
    this.geminiKey = process.env.REACT_APP_GEMINI_API_KEY;
  }
  async getAIRecommendations({ destination, interests, budget, travelers, duration }) {
    if (!destination || !interests || interests.length === 0) {
      throw new Error("Missing required fields");
    }

    const prompt = `
      As a travel expert, recommend 6 amazing destinations for someone traveling to ${destination}.
      Travel Details:
      - Destination: ${destination}
      - Interests: ${interests.join(", ")}
      - Budget: ${budget || "any"}
      - Travelers: ${travelers}
      - Duration: ${duration} days

      Return ONLY valid JSON array with these fields:
      name, country, region, emoji, moodTags, purposeTags, themeTags, info,
      imageQuery, price, duration, highlights, aiScore, aiInsights, overallScore
    `;

    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent",
        {
          contents: [{ parts: [{ text: prompt }] }]
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-goog-api-key": this.geminiKey
          },
          timeout: 30000
        }
      );

      const content = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!content) throw new Error("No content from Gemini API");

      // Extract JSON
      const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/\[.*\]|\{.*\}/s);
      if (!jsonMatch) throw new Error("No JSON found in AI response");

      const recommendations = JSON.parse(jsonMatch[1] || jsonMatch[0]);

      return recommendations.map(place => ({
        ...place,
        image: `https://source.unsplash.com/400x300/?${encodeURIComponent(place.imageQuery || place.name)}`,
        mapUrl: `https://www.google.com/maps?q=${encodeURIComponent(place.name + " " + place.country)}`,
        aiGenerated: true,
      }));
    } catch (err) {
      console.error("AI API error:", err.message);
      throw new Error("AI service failed: " + err.message);
    }
  }
}