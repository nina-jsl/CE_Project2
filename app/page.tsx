"use client";
import { useState } from "react";
import { analyzeSentiment } from "../lib/sentimentAnalyzer";
import Link from "next/link";

const EmotionSelector = () => {
  const [userInput, setUserInput] = useState("");
  const [emotion, setEmotion] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const gameNames: { [key: string]: string } = {
    Positive: "Golden Hours",
    Neutral: "Mood Bridge",
    Negative: "Inner Oasis",
  };

  const handleAnalyze = () => {
    setLoading(true);
    try {
      const { sentiment, scores } = analyzeSentiment(userInput);
      console.log("Sentiment Scores:", scores); // Debug the score
      setEmotion(sentiment);
    } catch (err) {
      console.error("Error analyzing sentiment:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div>
        <h1 className="capitalize text-center text-base mb-4">
          how are you feeling today?
        </h1>
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter here"
          className="w-full p-2 resize-none bg-blue-50/50"
        />
        <div className="flex justify-center">
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="mt-3 text-sm cursor-pointer bg-blue-500 text-white rounded-md px-4 py-2"
          >
            {loading ? "Analyzing..." : "Start Elevating"}
          </button>
        </div>

        {emotion && (
          <div className="mt-5">
            <p className="text-sm text-center">
              Your recommended elevation path:{" "}
              <Link href={`/games/${emotion}`}>
                <span className="font-bold hover:bg-blue-500 hover:text-white transition-colors duration-200 px-2 rounded py-1">
                  {gameNames[emotion]}
                </span>
              </Link>
            </p>
            <p className="mt-2 text-xs text-blue-500">
              (Please click on the name of the recommended path to continue)
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmotionSelector;
