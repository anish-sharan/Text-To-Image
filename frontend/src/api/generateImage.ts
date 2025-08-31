export const generateImageApi = async (prompt: string): Promise<string> => {
    try {
      const response = await fetch("https://e2cfdfb01ca2.ngrok-free.app/generate-image/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data.image; // base64 string
    } catch (error) {
      console.error("Image generation failed:", error);
      throw error;
    }
  }
  