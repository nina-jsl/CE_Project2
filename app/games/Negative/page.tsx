'use client'
import { useState, useRef } from "react";

const SoundtrackSelector = () => {
  type TrackKey = "river-flows-in-you" | "summer" | "merry-christmas-mr-lawrence";

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<TrackKey | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  const tracks: Record<TrackKey, { name: string; src: string }> = {
    "river-flows-in-you": { name: "River Flows in You", src: "/sounds/river-flows-in-you.mp3" },
    summer: { name: "Summer", src: "/sounds/summer.mp3" },
    "merry-christmas-mr-lawrence": {
      name: "Merry Christmas, Mr. Lawrence",
      src: "@/sounds/merry-christmas-mr-lawrence.mp3",
    },
  };

  const startAudio = () => {
    if (audioRef.current && selectedTrack) {
      const audio = audioRef.current;
      setHasInteracted(true); // Mark as interacted to show the breathing exercise

      audio.src = tracks[selectedTrack].src; // Set the audio source
      audio
        .play()
        .then(() => {
          console.log("Audio playback started successfully.");
        })
        .catch((err) => {
          console.error("Audio playback failed:", err);
        });
    } else {
      console.warn("Audio element or selected track is missing.");
    }
  };

  if (!selectedTrack) {
    return (
      <div className="p-6 max-w-lg mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">Choose Your Soundtrack</h1>
        <ul className="mb-6">
          {Object.keys(tracks).map((trackKey) => (
            <li key={trackKey} className="mb-2">
              <button
                className="px-4 py-2 rounded bg-gray-200 hover:bg-blue-500 hover:text-white transition"
                onClick={() => setSelectedTrack(trackKey as TrackKey)}
              >
                {tracks[trackKey as TrackKey].name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-100 relative">
      {!hasInteracted ? (
        <button
          onClick={startAudio}
          className="px-6 py-3 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          Start Audio & Breathing Exercise
        </button>
      ) : (
        <>
          <h1 className="text-xl font-bold mb-4">Calm Breather</h1>
          <div className="w-32 h-32 bg-blue-500 rounded-full animate-breath"></div>
          <p className="mt-4 text-gray-700">
            Breathe in as the circle expands. Breathe out as it contracts.
          </p>
        </>
      )}

      {/* Hidden Audio Element */}
      <audio ref={audioRef} loop hidden>
        Your browser does not support the audio element.
      </audio>

      <style jsx>{`
        @keyframes breath {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.5);
          }
        }
        .animate-breath {
          animation: breath 4s infinite;
        }
      `}</style>
    </div>
  );
};

export default SoundtrackSelector;

