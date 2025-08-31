import React from 'react';
import { Clock, Heart, Trash2 } from 'lucide-react';

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

interface ImageHistoryProps {
  images: GeneratedImage[];
  onImageSelect: (image: GeneratedImage) => void;
  onImageDelete: (id: string) => void;
}

export function ImageHistory({ images, onImageSelect, onImageDelete }: ImageHistoryProps) {
  if (images.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center">
        <div className="space-y-4">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
            <Clock className="w-8 h-8 text-gray-400" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">No images yet</h3>
            <p className="text-gray-600">Your generated images will appear here</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Clock className="w-5 h-5 text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-800">Recent Images</h2>
        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
          {images.length}
        </span>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {images.map((image) => (
          <div
            key={image.id}
            className="group flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 cursor-pointer"
            onClick={() => onImageSelect(image)}
          >
            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={image.url}
                alt={image.prompt}
                className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-110"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">
                {image.prompt}
              </p>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs text-gray-500">{image.settings.style}</span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-500">
                  {image.timestamp.toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                title="Add to favorites"
              >
                <Heart className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onImageDelete(image.id);
                }}
                className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                title="Delete image"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}