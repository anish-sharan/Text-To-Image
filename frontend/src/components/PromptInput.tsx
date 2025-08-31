import React, { useState } from 'react';
import { Wand2, Copy, RotateCcw } from 'lucide-react';

interface PromptInputProps {
  onGenerate: (prompt: string) => void;
  isGenerating: boolean;
}

export function PromptInput({ onGenerate, isGenerating }: PromptInputProps) {
  const [prompt, setPrompt] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const suggestions = [
    "A majestic mountain landscape at sunset",
    "A cute robot reading a book in a cozy library",
    "Abstract geometric art with vibrant colors",
    "A futuristic city skyline with flying cars"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isGenerating) {
      onGenerate(prompt.trim());
    }
  };

  const useSuggestion = (suggestion: string) => {
    setPrompt(suggestion);
  };

  const clearPrompt = () => {
    setPrompt('');
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(prompt);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 transition-all duration-300 hover:shadow-2xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
            Describe your image
          </label>
          <div className={`relative transition-all duration-200 ${isFocused ? 'transform scale-[1.02]' : ''}`}>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="A beautiful sunset over a mountain range with purple and orange colors..."
              className="w-full p-4 border-2 border-gray-200 rounded-xl resize-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-gray-800 placeholder-gray-400"
              rows={4}
              maxLength={500}
            />
            <div className="absolute bottom-3 right-3 flex items-center space-x-2">
              {prompt && (
                <>
                  <button
                    type="button"
                    onClick={copyPrompt}
                    className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors"
                    title="Copy prompt"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={clearPrompt}
                    className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                    title="Clear prompt"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </>
              )}
              <span className="text-xs text-gray-400">
                {prompt.length}/500
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-700">Quick suggestions:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                type="button"
                onClick={() => useSuggestion(suggestion)}
                className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-blue-50 text-gray-700 hover:text-blue-700 rounded-lg transition-all duration-200 hover:scale-105"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={!prompt.trim() || isGenerating}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-[1.02] disabled:scale-100 shadow-lg hover:shadow-xl"
        >
          <Wand2 className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
          <span>{isGenerating ? 'Generating...' : 'Generate Image'}</span>
        </button>
      </form>
    </div>
  );
}