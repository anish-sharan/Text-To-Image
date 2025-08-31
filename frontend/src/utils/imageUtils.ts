export interface ImageGenerationRequest {
  prompt: string;
  settings: {
    style: string;
    dimensions: string;
    quality: string;
  };
}

export interface ImageGenerationResponse {
  success: boolean;
  image?: string; // base64 encoded image
  error?: string;
}

export function base64ToImageUrl(base64Data: string): string {
  // Handle both with and without data URL prefix
  if (base64Data.startsWith('data:image/')) {
    return base64Data;
  }
  
  // Assume PNG format if no prefix provided
  return `data:image/png;base64,${base64Data}`;
}

export async function generateImageFromAPI(
  prompt: string, 
  settings: ImageGenerationRequest['settings']
): Promise<string> {
  try {
    const response = await fetch('/api/generate-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        settings
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ImageGenerationResponse = await response.json();
    
    if (!data.success || !data.image) {
      throw new Error(data.error || 'Failed to generate image');
    }

    return base64ToImageUrl(data.image);
  } catch (error) {
    console.error('Image generation failed:', error);
    throw error;
  }
}