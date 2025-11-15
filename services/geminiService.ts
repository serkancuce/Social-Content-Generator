
import { GoogleGenAI, Type } from "@google/genai";
import { Tone, SocialPost, Platform, AspectRatio } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const platformConfig: Record<Platform, { aspectRatio: AspectRatio }> = {
  LinkedIn: { aspectRatio: '4:3' },
  Twitter: { aspectRatio: '16:9' },
  Instagram: { aspectRatio: '1:1' },
};

const generateTexts = async (idea: string, tone: Tone): Promise<Omit<SocialPost, 'imageUrl'>[]> => {
  const prompt = `
    Based on the following idea and tone, generate social media posts for LinkedIn, Twitter, and Instagram.

    Idea: "${idea}"
    Tone: "${tone}"

    - For LinkedIn, create a professional, longer-form post that encourages discussion.
    - For Twitter, create a short, punchy tweet under 280 characters.
    - For Instagram, create a visually-focused caption with 3-5 relevant hashtags at the end.
    
    Ensure the platform name in your response is one of "LinkedIn", "Twitter", or "Instagram".
  `;

  const responseSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        platform: {
          type: Type.STRING,
          description: "The social media platform (LinkedIn, Twitter, or Instagram)."
        },
        content: {
          type: Type.STRING,
          description: "The generated text content for the post."
        },
      },
      required: ['platform', 'content'],
    },
  };

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-pro',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema,
    },
  });

  const jsonText = response.text.trim();
  const parsedResponse = JSON.parse(jsonText);

  // Validate and cast the response
  if (!Array.isArray(parsedResponse) || parsedResponse.some(item => !item.platform || !item.content)) {
      throw new Error("Invalid response format from text generation model.");
  }
  
  return parsedResponse as Omit<SocialPost, 'imageUrl'>[];
};

const generateImage = async (prompt: string, aspectRatio: AspectRatio): Promise<string> => {
    const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: prompt,
        config: {
            numberOfImages: 1,
            outputMimeType: 'image/jpeg',
            aspectRatio: aspectRatio,
        },
    });

    const base64ImageBytes = response.generatedImages[0]?.image?.imageBytes;
    if (!base64ImageBytes) {
        throw new Error("Image generation failed or returned no data.");
    }

    return `data:image/jpeg;base64,${base64ImageBytes}`;
};

export const generateSocialPosts = async (idea: string, tone: Tone): Promise<SocialPost[]> => {
  try {
    const textPosts = await generateTexts(idea, tone);

    const imageGenerationPromises = textPosts.map(post => {
      const config = platformConfig[post.platform as Platform];
      if (!config) {
        // Fallback for safety, though schema should prevent this
        return Promise.resolve('https://picsum.photos/500/500'); 
      }
      const imagePrompt = `A high-quality, visually appealing image representing the concept: "${idea}". Style: ${tone}.`;
      return generateImage(imagePrompt, config.aspectRatio);
    });

    const imageUrls = await Promise.all(imageGenerationPromises);

    const finalPosts = textPosts.map((post, index) => ({
      ...post,
      imageUrl: imageUrls[index],
    })) as SocialPost[];
    
    // Sort to ensure a consistent order
    const platformOrder: Platform[] = ['LinkedIn', 'Twitter', 'Instagram'];
    finalPosts.sort((a, b) => platformOrder.indexOf(a.platform) - platformOrder.indexOf(b.platform));

    return finalPosts;

  } catch (error) {
    console.error("Error in generateSocialPosts:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate social posts: ${error.message}`);
    }
    throw new Error("An unknown error occurred during content generation.");
  }
};
