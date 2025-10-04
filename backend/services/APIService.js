const axios = require("axios");

class APIService  {
  constructor() {
    this.geminiKey = process.env.REACT_APP_GEMINI_API_KEY;
    this.unsplashKey = process.env.REACT_APP_UNSPLASH_KEY;
  }

  // --- Normalize price into categories ---
  normalizeBudget(price) {
    if (!price || isNaN(price)) return { budgetCategory: "mid", price: 200000 };

    if (price < 150000) return { budgetCategory: "budget", price };
    if (price <= 400000) return { budgetCategory: "mid", price };
    return { budgetCategory: "luxury", price };
  }

  // --- Normalize AI Insights ---
  normalizeInsights(insights) {
    if (!insights) return [];
    if (Array.isArray(insights)) return insights;

    if (typeof insights === "string") {
      return insights
        .split(/[\n•\-]+|,\s*/g) // split by newline, bullet, dash, or comma
        .map(s => s.trim())
        .filter(s => s.length > 0);
    }

    return [];
  }

  // --- Fetch image from Unsplash ---
  async fetchUnsplashImage(query) {
    try {
      const res = await axios.get("https://api.unsplash.com/photos/random", {
        params: { query, orientation: "landscape" },
        headers: { Authorization: `Client-ID ${this.unsplashKey}` },
      });
      return res.data?.urls?.regular || null;
    } catch (err) {
      console.error("Unsplash error:", err.message);
      // fallback to free source.unsplash.com if API fails
      return `https://source.unsplash.com/400x300/?${encodeURIComponent(query)}`;
    }
  }

  // --- Main recommendation function ---
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
        (use ONLY these categories: 
          "budget" = under 150,000 INR, 
          "mid" = 150,000–400,000 INR, 
          "luxury" = above 400,000 INR)
      - Travelers: ${travelers}
      - Duration: ${duration} days

      Return ONLY valid JSON array with these fields:
      name, country, region, emoji, moodTags, purposeTags, themeTags, info,
      imageQuery, price (numeric INR), budgetCategory, duration, highlights,
      aiScore, aiInsights, overallScore
    `;

    try {
      // ---- Call Gemini ----
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent",
        { contents: [{ parts: [{ text: prompt }] }] },
        {
          headers: {
            "Content-Type": "application/json",
            "X-goog-api-key": this.geminiKey,
          },
          timeout: 30000,
        }
      );

      const content = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!content) throw new Error("No content from Gemini API");

      // ---- Extract JSON ----
      const jsonMatch =
        content.match(/```json\n([\s\S]*?)\n```/) || content.match(/\[.*\]|\{.*\}/s);
      if (!jsonMatch) throw new Error("No JSON found in AI response");

      const recommendations = JSON.parse(jsonMatch[1] || jsonMatch[0]);

      // ---- Normalize + add Unsplash images ----
      const enriched = await Promise.all(
        recommendations.map(async (place) => {
          const cleanPrice = parseInt(
            String(place.price).replace(/[^0-9]/g, ""),
            10
          ) || null;

          const { budgetCategory, price } = this.normalizeBudget(cleanPrice);

          const image =
            (await this.fetchUnsplashImage(
              place.imageQuery || `${place.name}, ${destination}`
            )) ||
            `https://source.unsplash.com/400x300/?${encodeURIComponent(
              place.name
            )}`;

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
            mapUrl: `https://www.google.com/maps?q=${encodeURIComponent(
              place.name + " " + (place.country || "")
            )}`,
            price,
            budgetCategory: place.budgetCategory || budgetCategory,
            duration: place.duration || `${duration} days`,
            highlights: place.highlights || [],
            aiScore: place.aiScore || Math.floor(Math.random() * 100),
            aiInsights: [
              ...this.normalizeInsights(place.aiInsights),
              `Estimated cost: ~₹${price.toLocaleString()} (${budgetCategory})`,
            ],
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
  }
} module.exports = APIService;
