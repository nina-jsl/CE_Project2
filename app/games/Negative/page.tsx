"use client";
import { useState, useRef } from "react";
import Link from "next/link";

const SoundtrackSelector = () => {
  type TrackKey =
    | "river-flows-in-you"
    | "summer"
    | "merry-christmas-mr-lawrence";

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<TrackKey | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [exerciseComplete, setExerciseComplete] = useState(false); // State for pop-up
  const [isPaused, setIsPaused] = useState(false); // State for pause/resume

  const tracks: Record<TrackKey, { name: string; src: string }> = {
    "river-flows-in-you": {
      name: "River Flows in You",
      src: "/sounds/river-flows-in-you.mp3",
    },
    summer: { name: "Summer", src: "/sounds/summer.mp3" },
    "merry-christmas-mr-lawrence": {
      name: "Merry Christmas, Mr. Lawrence",
      src: "/sounds/merry-christmas-mr-lawrence.mp3",
    },
  };

  const startAudio = () => {
    if (audioRef.current && selectedTrack) {
      const audio = audioRef.current;
      setHasInteracted(true);

      audio.src = tracks[selectedTrack].src; // Set the audio source
      audio
        .play()
        .then(() => {
          console.log("Audio playback started successfully.");
          audio.onended = () => setExerciseComplete(true); // Trigger pop-up when audio ends
        })
        .catch((err) => {
          console.error("Audio playback failed:", err);
        });
    } else {
      console.warn("Audio element or selected track is missing.");
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPaused(true);
    }
  };

  const resumeAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPaused(false);
    }
  };

  if (!selectedTrack) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="p-6 max-w-lg mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4 text-harvest-gold">
            Choose A Soundtrack To Continue
          </h1>
          <ul className="mb-6">
            {Object.keys(tracks).map((trackKey) => (
              <li key={trackKey} className="mb-2">
                <button
                  className="px-4 py-2 rounded bg-harvest-gold/20 hover:bg-harvest-gold hover:text-white transition"
                  onClick={() => setSelectedTrack(trackKey as TrackKey)}
                >
                  {tracks[trackKey as TrackKey].name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-harvest-gold via-harvest-gold/70 via-50% to-lapis-lazuli overflow-y-hidden h-screen">
      <div className="flex flex-col items-center justify-center h-[90%] relative">
        {!hasInteracted ? (
          <button
            onClick={startAudio}
            className="px-6 py-3 rounded bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 text-white hover:bg-sage transition"
          >
            Start Audio & Breathing Exercise
          </button>
        ) : (
          <>
            <div className="w-32 h-32 bg-white bg-opacity-50 backdrop-blur-md border border-white border-opacity-20 text-white rounded-full animate-breath"></div>
            <p className="mt-20 text-white">
              Breathe in as the circle expands. Breathe out as it contracts.
            </p>
            <div className="flex gap-4 mt-6">
              <Link href="/">
                <button className="text-white px-4 py-2 bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 rounded hover:bg-harvest-gold transition">
                  Home
                </button>
              </Link>
              {isPaused ? (
                <button
                  onClick={resumeAudio}
                  className="text-white px-4 py-2 bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 rounded hover:bg-harvest-gold transition"
                >
                  Resume
                </button>
              ) : (
                <button
                  onClick={pauseAudio}
                  className="text-white px-4 py-2 bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 rounded hover:bg-harvest-gold transition"
                >
                  Pause
                </button>
              )}
            </div>
          </>
        )}

        {/* Pop-Up when audio ends */}
        {exerciseComplete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h1 className="text-2xl font-bold text-center mb-4 ">
                🎉 Exercise Complete! 🎉
              </h1>
              <p className="text-gray-800 text-center mb-4">
                You’ve completed the breathing exercise. Are you feeling better?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setExerciseComplete(false)}
                  className="px-4 py-2 bg-harvest-gold text-white rounded hover:bg-green-600 transition"
                >
                  Yes
                </button>
                <Link href="/">
                  <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition">
                    No, Back to Home
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Hidden Audio Element */}
        <audio ref={audioRef} hidden>
          Your browser does not support the audio element.
        </audio>

        <style jsx>{`
          @keyframes breath {
            0%,
            100% {
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
    </div>
  );
};

export default SoundtrackSelector;
