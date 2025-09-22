const axios = require('axios');

class AIService {
  constructor() {
    this.openaiKey = process.env.OPENAI_API_KEY;
    this.geminiKey = process.env.GEMINI_API_KEY;
  }

  // Using OpenAI GPT for recommendations
  async getAIRecommendations(params) {
    try {
      const { destination, interests, budget, travelers, duration } = params;
      
      const prompt = `
        Act as a travel expert. Recommend 6 amazing destinations for someone traveling to ${destination}.
        Interests: ${interests.join(', ')}
        Budget: ${budget || 'any'}
        Travelers: ${travelers}
        Duration: ${duration} days
        
        Return JSON format with:
        - name: destination name
        - country: country name
        - region: continent/region
        - emoji: relevant emoji
        - moodTags: array of moods (e.g., ["Cultural", "Adventurous"])
        - purposeTags: array of purposes (e.g., ["City break", "Cultural trip"])
        - themeTags: array of themes (e.g., ["Historical Place", "Modern City"])
        - info: 1-2 sentence description
        - image: unsplash image URL query (e.g., "tokyo,japan,travel")
        - price: estimated price in INR
        - duration: recommended duration
        - highlights: array of 3-4 key attractions
        - aiScore: 80-100 score
        - aiInsights: array of 2-3 AI insights
        - overallScore: calculated score
      `;

      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 2000,
        temperature: 0.7
      }, {
        headers: {
          'Authorization': `Bearer ${this.openaiKey}`,
          'Content-Type': 'application/json'
        }
      });

      const content = response.data.choices[0].message.content;
      // Extract JSON from AI response
      const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/{[\s\S]*}/);
      
      if (jsonMatch) {
        const recommendations = JSON.parse(jsonMatch[1]);
        return Array.isArray(recommendations) ? recommendations : [recommendations];
      }
      
      throw new Error('Invalid AI response format');

    } catch (error) {
      console.error('AI API error:', error.message);
      throw new Error(`AI service failed: ${error.message}`);
    }
  }

  // Alternative: Google Gemini API
  async getGeminiRecommendations(params) {
    try {
      const response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${this.geminiKey}`, {
        contents: [{
          parts: [{
            text: `Generate travel recommendations for: ${JSON.stringify(params)}. Return valid JSON array.`
          }]
        }]
      });

      const content = response.data.candidates[0].content.parts[0].text;
      const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/{[\s\S]*}/);
      
      return JSON.parse(jsonMatch[1]);

    } catch (error) {
      console.error('Gemini API error:', error.message);
      throw new Error('Gemini API failed');
    }
  }
}

module.exports = AIService;