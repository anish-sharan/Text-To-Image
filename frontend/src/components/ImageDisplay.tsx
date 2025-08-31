import {
  Download,
  Share2,
  RotateCcw,
  Image as ImageIcon,
} from "lucide-react";

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

interface ImageDisplayProps {
  image: GeneratedImage | null;
  isGenerating: boolean;
  onRegenerate: () => void;
}

export function ImageDisplay({
  image,
  isGenerating,
  onRegenerate,
}: ImageDisplayProps) {
  const downloadImage = () => {
    if (image) {
      try {
        if (image.url.startsWith("data:image/")) {
          // Base64 images
          const link = document.createElement("a");
          link.href = image.url;
          link.download = `generated-image-${image.id}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          // Regular URLs
          const link = document.createElement("a");
          link.href = image.url;
          link.download = `generated-image-${image.id}.png`;
          link.click();
        }
      } catch (error) {
        console.error("Download failed:", error);
        alert(
          "Download failed. Please try right-clicking and saving the image."
        );
      }
    }
  };

  const shareImage = () => {
    if (image) {
      if (navigator.share && !image.url.startsWith("data:image/")) {
        navigator.share({
          title: "Generated Image",
          text: image.prompt,
          url: image.url,
        });
      } else {
        navigator.clipboard
          .writeText(image.prompt)
          .then(() => {
            alert("Prompt copied to clipboard!");
          })
          .catch(() => {
            alert("Unable to share. Try downloading the image instead.");
          });
      }
    }
  };

  if (isGenerating) {
    return (
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center">
        <div className="space-y-6">
          <div className="relative w-32 h-32 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
            <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
              <ImageIcon className="w-12 h-12 text-gray-400" />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">
              Creating your masterpiece...
            </h3>
            <p className="text-gray-600">This usually takes 15-30 seconds</p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 h-full rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!image) {
    return (
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-12 text-center">
        <div className="space-y-4">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
            {/* FIXED: changed Image → ImageIcon */}
            <ImageIcon className="w-12 h-12 text-gray-400" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">
              Ready to create
            </h3>
            <p className="text-gray-600">
              Enter a prompt above to generate your first image
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-2xl">
      <div className="aspect-square relative group">
        <img
          src={image.url}
          alt={image.prompt}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
        <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={downloadImage}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-all duration-200 hover:scale-110"
            title="Download image"
          >
            <Download className="w-4 h-4 text-gray-700" />
          </button>
          <button
            onClick={shareImage}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-all duration-200 hover:scale-110"
            title="Share image"
          >
            <Share2 className="w-4 h-4 text-gray-700" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <p className="text-gray-800 font-medium line-clamp-2">{image.prompt}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <span>{image.settings.style}</span>
            <span>{image.settings.dimensions}</span>
            <span>{image.settings.quality}</span>
          </div>
          <button
            onClick={onRegenerate}
            className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Regenerate</span>
          </button>
        </div>
      </div>
    </div>
  );
}
