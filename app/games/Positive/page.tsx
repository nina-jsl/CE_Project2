"use client";
import { useState } from "react";
import { AiOutlineClose, AiOutlineHome } from "react-icons/ai";
import Link from "next/link";

const GratitudeGarden = () => {
  const [bulbs, setBulbs] = useState<
    { id: number; left: string; bottom: string; color: string; text: string }[]
  >([]);
  const [inputText, setInputText] = useState<string>("");
  const [selectedText, setSelectedText] = useState<string | null>(null); // For pop-up content
  const [showInfoPopup, setShowInfoPopup] = useState(true); // Initial pop-up

  const colors = [
    "bg-turqoise",
    "bg-light-blue",
    "bg-light-yellow",
    "bg-white",
  ];

  // Adds a new bulb to the garden
  const addBulb = () => {
    if (inputText.trim() !== "") {
      const newBulb = {
        id: bulbs.length,
        left: `${Math.random() * 90}%`,
        bottom: `${Math.random() * 90}%`, // Adjusted to cover the full height
        color: colors[Math.floor(Math.random() * colors.length)],
        text: inputText,
      };
      setBulbs([...bulbs, newBulb]);
      setInputText("");
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-resolution-blue via-marian-blue to-green-900 overflow-hidden">
      {/* Home Icon */}
      <Link href="/">
        <AiOutlineHome
          className="absolute top-4 left-4 text-white text-2xl cursor-pointer z-50"
          // aria-label="Return to homepage"
        />
      </Link>

      <div className="flex flex-col items-center justify-center min-h-screen relative">
        {/* Info Pop-Up */}
        {showInfoPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white bg-opacity-10 backdrop-blur-md py-6 px-4 rounded-lg shadow-lg max-w-md w-full relative">
              <AiOutlineClose
                className="text-white text-lg absolute top-4 right-4 cursor-pointer"
                aria-label="Close introduction"
                onClick={() => setShowInfoPopup(false)}
              />
              <h1 className="text-white text-xl font-bold text-center mb-4">
                Welcome to Luminous Journal
              </h1>
              <p className="text-white text-center leading-relaxed">
                I’m so glad you’re feeling positive today! Studies show that
                positivity thrives when we reflect on the good in the past,
                savor the present, and look forward to the future. Add a thought
                that makes you smile to grow glowing bulbs. Click a bulb anytime
                to revisit your positivity. Let’s cultivate joy together!
              </p>
            </div>
          </div>
        )}

        {/* Glowing Bulbs */}
        <div className="absolute inset-0 overflow-hidden">
          {bulbs.map((bulb) => (
            <div
              key={bulb.id}
              className={`absolute w-12 h-12 rounded-full ${bulb.color} animate-float cursor-pointer shadow-[0_0_15px_rgba(255,255,255,0.6),0_0_30px_rgba(255,255,255,0.4)]`}
              style={{
                left: bulb.left,
                bottom: bulb.bottom,
              }}
              onClick={() => setSelectedText(bulb.text)}
              aria-label="Click to view positive thought"
            ></div>
          ))}
        </div>

        {/* Input Field and Add Button */}
        <div className="flex items-center gap-2 z-10">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter your positive thought"
            className="bg-white bg-opacity-10 backdrop-blur-md text-white px-4 py-2 rounded w-80"
          />
          <button
            onClick={addBulb}
            className="bg-white bg-opacity-10 backdrop-blur-md text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Add Bulb
          </button>
        </div>

        {/* Positive Thought Pop-Up */}
        {selectedText && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white bg-opacity-10 backdrop-blur-md py-6 px-4 rounded-lg shadow-lg max-w-md w-full relative">
              <AiOutlineClose
                className="text-white text-lg absolute top-4 right-4 cursor-pointer"
                aria-label="Close positive thought"
                onClick={() => setSelectedText(null)}
              />
              <p className="text-white text-center mt-4 mb-6">{selectedText}</p>
            </div>
          </div>
        )}
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(10px, -20px);
          }
          100% {
            transform: translate(0, 0);
          }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default GratitudeGarden;
