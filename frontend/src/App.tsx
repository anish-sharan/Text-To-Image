import { useState } from "react";
import { Header } from "./components/Header";
import { PromptInput } from "./components/PromptInput";
import { ImageSettings } from "./components/ImageSettings";
import { ImageDisplay } from "./components/ImageDisplay";
import { ImageHistory } from "./components/ImageHistory";
import { generateImageApi } from "./api/generateImage";

interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: Date;
  settings: {
    style: string;
    dimensions: string;
    quality: string;
  };
}

function App() {
  const [currentImage, setCurrentImage] = useState<GeneratedImage | null>(null);
  const [imageHistory, setImageHistory] = useState<GeneratedImage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [settings, setSettings] = useState({
    style: "realistic",
    dimensions: "1024x1024",
    quality: "high",
  });

  const generateImage = async (prompt: string) => {
    if (!prompt) return;
    setIsGenerating(true);
    try {
      // ✅ Call backend API
      const imageUrl = await generateImageApi(prompt);

      const newImage: GeneratedImage = {
        id: Date.now().toString(),
        url: imageUrl,
        prompt,
        timestamp: new Date(),
        settings: {
          style: settings.style,
          dimensions: settings.dimensions,
          quality: settings.quality,
        },
      };

      setCurrentImage(newImage);
      setImageHistory((prev) => [newImage, ...prev]);
    } catch (err) {
      console.error(err);
      alert("Image generation failed. Check backend / ngrok.");
    } finally {
      setIsGenerating(false);
    }
  };

  const regenerateImage = () => {
    if (currentImage) {
      generateImage(currentImage.prompt);
    }
  };

  const selectImageFromHistory = (image: GeneratedImage) => {
    setCurrentImage(image);
  };

  const deleteImageFromHistory = (id: string) => {
    setImageHistory((prev) => prev.filter((img) => img.id !== id));
    if (currentImage?.id === id) {
      setCurrentImage(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Input and Settings */}
          <div className="lg:col-span-1 space-y-6">
            <PromptInput
              onGenerate={generateImage}
              isGenerating={isGenerating}
            />
            {/* <ImageSettings settings={settings} onSettingsChange={setSettings} /> */}
            <ImageHistory
              images={imageHistory}
              onImageSelect={selectImageFromHistory}
              onImageDelete={deleteImageFromHistory}
            />
          </div>

          {/* Right Column - Image Display */}
          <div className="lg:col-span-2">
            <ImageDisplay
              image={currentImage}
              isGenerating={isGenerating}
              onRegenerate={regenerateImage}
            />
          </div>
        </div>
      </main>

      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
      </div>
    </div>
  );
}

export default App;
