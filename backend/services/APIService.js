const axios = require('axios');

class APIService {
  constructor() {
    this.geminiKey = process.env.GEMINI_API_KEY;
  }

  // Main method - only AI recommendations
  async getTravelRecommendations(params) {
    try {
      console.log('Getting AI recommendations for:', params);
      return await this.getAIRecommendations(params);
    } catch (error) {
      console.error('AI recommendations failed:', error.message);
      return this.getFallbackRecommendations(params);
    }
  }

  // AI Recommendation method
  async getAIRecommendations(params) {
  try {
    const { destination, interests, budget, travelers, duration } = params;

    const prompt = `
      As a travel expert, recommend 6 amazing destinations for someone traveling to ${destination}.
      Travel Details:
      - Destination: ${destination}
      - Interests: ${interests.join(", ")}
      - Budget: ${budget || "any"}
      - Travelers: ${travelers}
      - Duration: ${duration} days

      Return ONLY valid JSON array with these exact fields for each destination:
      {
        "name": "destination name",
        "country": "country name",
        "region": "continent/region",
        "emoji": "relevant emoji",
        "moodTags": ["array", "of", "moods"],
        "purposeTags": ["array", "of", "purposes"],
        "themeTags": ["array", "of", "themes"],
        "info": "1-2 sentence description",
        "imageQuery": "search query for unsplash",
        "price": estimated price in INR,
        "duration": "recommended duration",
        "highlights": ["attraction1", "attraction2", "attraction3"],
        "aiScore": score between 80-100,
        "aiInsights": ["insight1", "insight2"],
        "overallScore": calculated score
      }
    `;

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

    // Safely extract text
    const content = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!content) throw new Error("Gemini returned no content");

    // Extract JSON
    const jsonMatch =
      content.match(/```json\n([\s\S]*?)\n```/) ||
      content.match(/\[.*\]|\{.*\}/s);

    if (!jsonMatch) throw new Error("No JSON found in AI response");

    const recommendations = JSON.parse(jsonMatch[1] || jsonMatch[0]);

    // Ensure array
    const list = Array.isArray(recommendations)
      ? recommendations
      : [recommendations];

    // Attach Unsplash image + Google Maps
    return list.map(place => ({
      ...place,
      image: `https://source.unsplash.com/400x300/?${encodeURIComponent(
        place.imageQuery || place.name
      )}`,
      mapUrl: `https://www.google.com/maps?q=${encodeURIComponent(
        place.name + " " + place.country
      )}&output=embed`,
      aiGenerated: true,
      interestMatch: this.calculateInterestMatch(place, interests)
    }));
  } catch (error) {
    console.error("AI API error:", error.message);
    throw new Error(`AI service failed: ${error.message}`);
  }
}


  // Simple fallback if AI fails
  getFallbackRecommendations(params) {
    const { destination, interests } = params;
    
    const fallbackData = [
      {
        name: destination || "Tokyo",
        country: "Japan",
        region: "Asia",
        emoji: "🏯",
        moodTags: ["Cultural", "Adventurous"],
        purposeTags: ["City break", "Cultural trip"],
        themeTags: ["Historical Place", "Modern City"],
        info: "A beautiful destination with rich culture and amazing experiences.",
        image: "https://source.unsplash.com/400x300/?japan,travel",
        price: 150000,
        duration: "7 Days",
        mapUrl: `https://www.google.com/maps?q=${encodeURIComponent(destination)}&output=embed`,
        aiScore: 85,
        highlights: ["Cultural sites", "Local cuisine", "Scenic views"],
        aiInsights: ["Great cultural experience", "Good value for money"],
        overallScore: 85,
        aiGenerated: false,
        interestMatch: 3
      }
    ];
    
    return fallbackData;
  }

  // Calculate interest match
  calculateInterestMatch(place, interests) {
    const placeText = `${place.name} ${place.info} ${place.moodTags.join(' ')}`.toLowerCase();
    let matchCount = 0;
    
    interests.forEach(interest => {
      if (placeText.includes(interest.toLowerCase())) {
        matchCount++;
      }
    });
    
    return matchCount;
  }
}

module.exports = APIService;