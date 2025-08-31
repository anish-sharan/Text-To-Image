import React, { useState } from 'react';
import { Settings, ChevronDown, ChevronUp } from 'lucide-react';

interface ImageSettingsProps {
  settings: {
    style: string;
    dimensions: string;
    quality: string;
  };
  onSettingsChange: (settings: any) => void;
}

export function ImageSettings({ settings, onSettingsChange }: ImageSettingsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const styles = [
    { value: 'realistic', label: 'Realistic' },
    { value: 'artistic', label: 'Artistic' },
    { value: 'cartoon', label: 'Cartoon' },
    { value: 'abstract', label: 'Abstract' },
    { value: 'vintage', label: 'Vintage' },
    { value: 'minimalist', label: 'Minimalist' }
  ];

  const dimensions = [
    { value: '1024x1024', label: 'Square (1024×1024)' },
    { value: '1024x768', label: 'Landscape (1024×768)' },
    { value: '768x1024', label: 'Portrait (768×1024)' },
    { value: '1920x1080', label: 'Wide (1920×1080)' }
  ];

  const qualities = [
    { value: 'standard', label: 'Standard' },
    { value: 'high', label: 'High Quality' },
    { value: 'ultra', label: 'Ultra HD' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-2xl">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <Settings className="w-5 h-5 text-gray-600" />
          <span className="font-medium text-gray-800">Image Settings</span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>

      <div className={`transition-all duration-300 ease-in-out ${
        isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      } overflow-hidden`}>
        <div className="p-4 pt-0 space-y-4 border-t border-gray-100">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Style</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {styles.map((style) => (
                <button
                  key={style.value}
                  onClick={() => onSettingsChange({ ...settings, style: style.value })}
                  className={`p-2 text-sm rounded-lg border-2 transition-all duration-200 ${
                    settings.style === style.value
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Dimensions</label>
            <select
              value={settings.dimensions}
              onChange={(e) => onSettingsChange({ ...settings, dimensions: e.target.value })}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
            >
              {dimensions.map((dim) => (
                <option key={dim.value} value={dim.value}>
                  {dim.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Quality</label>
            <div className="flex space-x-2">
              {qualities.map((quality) => (
                <button
                  key={quality.value}
                  onClick={() => onSettingsChange({ ...settings, quality: quality.value })}
                  className={`flex-1 p-2 text-sm rounded-lg border-2 transition-all duration-200 ${
                    settings.quality === quality.value
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  {quality.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}