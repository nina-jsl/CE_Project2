'use client'
import { useState } from "react";

const GratitudeGarden = () => {
  const [gratitudeList, setGratitudeList] = useState<string[]>([]);

  const gratitudeSuggestions = [
    "I’m grateful for today’s sunshine",
    "I appreciate my family and friends",
    "I’m thankful for my health",
    "I’m grateful for this moment of peace",
    "I had a delicious meal today",
  ];

  const addGratitude = (thought: string) => {
    if (!gratitudeList.includes(thought)) {
      setGratitudeList([...gratitudeList, thought]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
      <h1 className="text-3xl font-bold mb-6 text-green-700">Gratitude Garden</h1>
      <p className="mb-4 text-gray-700">
        Add positive thoughts to grow your garden!
      </p>

      {/* Garden */}
      <div className="relative w-full max-w-4xl h-64 bg-green-300 rounded-lg border border-green-500 mb-6">
        {gratitudeList.map((thought, index) => (
          <div
            key={index}
            className="absolute flex items-center justify-center"
            style={{
              left: `${Math.random() * 90}%`,
              bottom: `${Math.random() * 50 + 10}%`,
              animation: `grow 2s ease-in-out`,
            }}
          >
            <div className="w-12 h-12 bg-pink-500 rounded-full relative">
              <div className="absolute w-16 h-16 bg-pink-400 rounded-full animate-bloom"></div>
              <p className="text-sm text-white text-center absolute top-14">{thought}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Gratitude Input */}
      <div className="flex flex-col items-center space-y-4">
        <input
          type="text"
          placeholder="What are you grateful for?"
          className="border border-gray-300 rounded p-2 w-80"
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.currentTarget.value) {
              addGratitude(e.currentTarget.value);
              e.currentTarget.value = "";
            }
          }}
        />
        <button
          onClick={() => {
            const input = document.querySelector<HTMLInputElement>(
              "input[type='text']"
            );
            if (input?.value) {
              addGratitude(input.value);
              input.value = "";
            }
          }}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Add Gratitude
        </button>
      </div>

      {/* Gratitude Suggestions */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Suggestions:</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {gratitudeSuggestions.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => addGratitude(suggestion)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes grow {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }
        .animate-bloom {
          animation: bloom 3s ease-in-out infinite alternate;
        }
        @keyframes bloom {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  );
};

export default GratitudeGarden;
