"use client";
import { useState } from "react";
import { AiOutlineClose, AiOutlineHome } from "react-icons/ai";
import Link from "next/link";

const GratitudeGlow = () => {
  const [gratitudeList, setGratitudeList] = useState<string[]>([]);
  const [orbSize, setOrbSize] = useState(100); // Initial size of the orb
  const [showInfoPopup, setShowInfoPopup] = useState(true); // Initial pop-up
  const [endPopup, setEndPopup] = useState(false);

  const addGratitude = (thought: string) => {
    if (!gratitudeList.includes(thought)) {
      setGratitudeList([...gratitudeList, thought]);
      setOrbSize(orbSize + 20); // Increase orb size
    }
  };

  return (
    <div className="relative h-screen bg-gradient-to-b from-carrot-orange via-gamboge to-rose-pompadour overflow-hidden text-center">
      {/* Home Icon */}
      <Link href="/">
        <AiOutlineHome className="absolute top-4 left-4 text-white text-2xl cursor-pointer z-30" />
      </Link>

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
              Welcome to Mood Bridge
            </h1>
            <p className="text-white text-center leading-relaxed">
              Feeling neutral is a great place to start! Let’s take a moment to
              appreciate what’s good around us and nurture positivity. Gratitude
              can transform even the smallest moments into something meaningful.
              Add your thoughts to grow the orb! Together, we’ll make this time
              uplifting and energizing 🌟
            </p>
          </div>
        </div>
      )}

      {/* Glowing Orb */}
      <div
        style={{
          width: `${orbSize}px`,
          height: `${orbSize}px`,
          background: `radial-gradient(circle, #ffcc00, #ffa500, #ff8800)`,
          borderRadius: "50%",
          boxShadow: `0 0 ${orbSize / 2}px ${
            orbSize / 10
          }px rgba(255, 204, 0, 0.6)`,
          transition: "all 0.5s ease",
        }}
        className="absolute inset-0 m-auto transform z-10"
      ></div>

      {/* Input and Buttons */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="What are you grateful for?"
            className="bg-white bg-opacity-10 placeholder-white backdrop-blur-md border border-white border-opacity-20 text-white rounded p-2 w-80 font-bold"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.currentTarget.value) {
                addGratitude(e.currentTarget.value);
                e.currentTarget.value = "";
              }
            }}
          />
          <button
            onClick={() => {
              const input =
                document.querySelector<HTMLInputElement>("input[type='text']");
              if (input?.value) {
                addGratitude(input.value);
                input.value = "";
              }
            }}
            className="bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 text-white px-4 py-2 rounded hover:bg-rose-pompadour transition font-bold"
          >
            Add
          </button>
          <button
            onClick={() => setEndPopup(true)}
            className="bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 text-white px-4 py-2 rounded hover:bg-rose-pompadour transition font-bold"
          >
            End
          </button>
        </div>
      </div>

      {/* End Pop-Up */}
      {endPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white bg-opacity-10 backdrop-blur-md py-6 px-4 rounded-lg shadow-lg max-w-md w-full relative">
            <AiOutlineClose
              className="text-white text-lg absolute top-4 right-4 cursor-pointer"
              aria-label="Close introduction"
              onClick={() => setEndPopup(false)}
            />
            <p className="text-white text-center leading-relaxed mb-4 mt-4">
              It’s wonderful that you’ve identified so much to be grateful for!
              Here’s a list of your positive thoughts—may they energize and
              uplift you throughout the day. Keep shining! 🌟
            </p>
            <ul className="list-disc list-inside text-white text-left max-h-40 overflow-y-auto scrollbar scrollbar-thumb-scrollbarThumb scrollbar-track-scrollbarTrack scrollbar-thumb-rounded-full hover:scrollbar-thumb-scrollbarThumbHover">
              {gratitudeList.map((thought, index) => (
                <li key={index}>{thought}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default GratitudeGlow;
