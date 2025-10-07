import axios from 'axios';
import { GoogleGenerativeAI } from '@google/generative-ai';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const UNSPLASH_KEY = process.env.UNSPLASH_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY || "demo-key");
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
const normalizeBudget = (price) => {
  if (!price || isNaN(price)) return { budgetCategory: "mid", price: 200000 };
  if (price < 150000) return { budgetCategory: "budget", price };
  if (price <= 400000) return { budgetCategory: "mid", price };
  return { budgetCategory: "luxury", price };
};

const normalizeInsights = (insights) => {
  if (!insights) return [];
  if (Array.isArray(insights)) return insights;
  if (typeof insights === "string") {
    return insights
      .split(/[\n•\-]+|,\s*/g)
      .map(s => s.trim())
      .filter(s => s.length > 0);
  }
  return [];
};

const fetchUnsplashImage = async (query) => {
  try {
    const res = await axios.get("https://api.unsplash.com/photos/random", {
      params: { query, orientation: "landscape" },
      headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` },
    });
    return res.data?.urls?.regular || null;
  } catch (err) {
    console.error("Unsplash error:", err.message);
    return `https://source.unsplash.com/400x300/?${encodeURIComponent(query)}`;
  }
};

export const getAIRecommendations = async ({ destination, interests, budget, travelers, duration }) => {
  if (!destination || !interests || interests.length === 0) {
    throw new Error("Missing required fields");
  }

  const prompt = `
    As a travel expert, recommend 6 amazing destinations for someone traveling to ${destination}.
    Travel Details:
    - Destination: ${destination}
    - Interests: ${interests.join(", ")}
    - Budget: ${budget || "any"}
    (use ONLY these categories: 
      "budget" = under 150,000 INR, 
      "mid" = 150,000–400,000 INR, 
      "luxury" = above 400,000 INR)
    - Travelers: ${travelers}
    - Duration: ${duration} days

    Return ONLY valid JSON array with these fields:
    name, country, region, emoji, moodTags, purposeTags, themeTags, info,
    imageQuery, price, budgetCategory, duration, highlights, aiScore, aiInsights, overallScore
  `;

  try {
    const result = await model.generateContent(prompt);
    const rawText = await result.response.text();
    console.log("AI raw reply:", rawText);

    let recommendations;
    try {
      recommendations = JSON.parse(rawText);
    } catch {
      const jsonMatch = rawText.match(/```json\n([\s\S]*?)\n```/) || rawText.match(/\[.*\]|\{.*\}/s);
      if (!jsonMatch) throw new Error("No JSON found in AI response");
      recommendations = JSON.parse(jsonMatch[1] || jsonMatch[0]);
    }

    const enriched = await Promise.all(
      recommendations.map(async (place) => {
        const cleanPrice = parseInt(String(place.price).replace(/[^0-9]/g, ""), 10) || null;
        const { budgetCategory, price } = normalizeBudget(cleanPrice);
        const image = await fetchUnsplashImage(place.imageQuery || `${place.name}, ${destination}`);
        return {
          name: place.name || "Unknown",
          country: place.country || destination,
          region: place.region || "",
          emoji: place.emoji || "🌍",
          moodTags: place.moodTags || [],
          purposeTags: place.purposeTags || [],
          themeTags: place.themeTags || [],
          info: place.info || "No info available",
          image,
          mapUrl: `https://www.google.com/maps?q=${encodeURIComponent(place.name + " " + (place.country || ""))}`,
          price,
          budgetCategory: place.budgetCategory || budgetCategory,
          duration: place.duration || `${duration} days`,
          highlights: place.highlights || [],
          aiScore: place.aiScore || Math.floor(Math.random() * 100),
          aiInsights: [...normalizeInsights(place.aiInsights), `Estimated cost: ~₹${price?.toLocaleString()} (${budgetCategory})`],
          overallScore: place.overallScore || Math.floor(Math.random() * 100),
          aiGenerated: true,
        };
      })
    );

    return enriched;
  } catch (err) {
    console.error("AI API error:", err.message);
    throw new Error("AI service failed: " + err.message);
  }
};
