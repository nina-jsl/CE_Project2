'use client'
import { useState } from "react";
import Link from "next/link"

const GratitudeGlow = () => {
  const [gratitudeList, setGratitudeList] = useState<string[]>([]);
  const [orbSize, setOrbSize] = useState(100); // Initial size of the orb

  const gratitudeSuggestions = [
    "I’m thankful for sunshine",
    "I had a nice meal",
    "I’m grateful for my health",
    "I appreciate my family and friends",
    "I’m thankful for learning opportunities",
  ];

  const addGratitude = (thought: string) => {
    if (!gratitudeList.includes(thought)) {
      setGratitudeList([...gratitudeList, thought]);
      setOrbSize(orbSize + 20); // Increase orb size
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-carrot-orange via-gamboge to-rose-pompadour  text-center">
      {/* <h1 className="text-2xl font-bold mb-4">Gratitude Glow</h1> */}
      <p className="mb-4 text-white">
        Add positive or grateful thoughts to make the orb glow brighter!
      </p>

      {/* Glowing Orb */}
      <div
        style={{
          width: `${orbSize}px`,
          height: `${orbSize}px`,
          background: `radial-gradient(circle, #ffcc00, #ffa500, #ff8800)`,
          borderRadius: "50%",
          boxShadow: `0 0 ${orbSize / 2}px ${orbSize / 10}px rgba(255, 204, 0, 0.6)`,
          transition: "all 0.5s ease",
        }}
        className={orbSize >= 200 ? "transform rotate-180 transition" : ""}
      ></div>

      {/* Gratitude Input */}
      <div className="mt-6 flex gap-2">
        <input
          type="text"
          placeholder="What are you grateful for?"
          className="bg-white bg-opacity-10 placeholder-white backdrop-blur-md border border-white border-opacity-20  text-white rounded p-2 w-80"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
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
          className=" bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20  text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Add
        </button>
      </div>

      {/* Gratitude Suggestions */}
      <div className="mt-12 mx-12">
        <h2 className="text-lg font-semibold mb-2 text-white text-left">Suggestions:</h2>
        <div className="flex flex-wrap justify-center gap-2">
          {gratitudeSuggestions.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => addGratitude(suggestion)}
              className=" bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 text-white px-3 py-1 rounded hover:bg-opacity-55"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Gratitude List
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Your Gratitude List:</h2>
        <ul className="list-disc text-left">
          {gratitudeList.map((thought, index) => (
            <li key={index} className="text-gray-800">
              {thought}
            </li>
          ))}
        </ul>
      </div> */}

      {/* Orb Transformation */}
      {orbSize >= 200 && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold text-center mb-4">
            🎉 Milestone Reached! 🎉
          </h1>
          <p className="text-gray-700 text-center mb-4">
            You’ve added 5 or more gratitudes! We hope this good mood
            accompanies you today.
          </p>
          <ul className="list-disc list-inside text-gray-800">
            {gratitudeList.map((text, index) => (
              <li key={index}>{text}</li>
            ))}
          </ul>
          <div className = "flex gap-2">
          {/* <button
            onClick={() => setMilestoneReached(false)}
            className="mt-6 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Close
          </button> */}
          <Link href="/">
            <button className="mt-6 px-4 py-2 bg-gamboge2 text-white rounded hover:bg-burnt-sienna transition">
              Home
            </button>
          </Link>
          </div>
          
        </div>
      </div>
        // <div className="mt-6 text-xl text-green-700 font-bold">
        //   The orb is fully grown! Your gratitude has created a radiant star 🌟!
        // </div>
      )}
    </div>
  );
};

export default GratitudeGlow;
