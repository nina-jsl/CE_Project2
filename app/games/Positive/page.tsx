"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const GratitudeGarden = () => {
  const [gratitudeList, setGratitudeList] = useState<
    { image: string; left: string; bottom: string }[]
  >([]);
  const [gratitudeTexts, setGratitudeTexts] = useState<string[]>([]);
  const [milestoneReached, setMilestoneReached] = useState(false); // For controlling the milestone pop-up

  const gratitudeSuggestions = [
    "I’m grateful for today’s sunshine",
    "I appreciate my family and friends",
    "I’m thankful for my health",
    "I’m grateful for this moment of peace",
    "I had a delicious meal today",
    "I'm had a good song rec"
  ];

  const flowerImages = [
    "/flowers/cherry-blossom.png",
    "/flowers/daisy.png",
    "/flowers/daisy2.png",
    "/flowers/morning-glory.png",
  ];

  const addGratitude = (thought: string) => {
    if (!gratitudeTexts.includes(thought)) {
      const randomImage =
        flowerImages[Math.floor(Math.random() * flowerImages.length)];
      const randomLeft = `${Math.random() * 90}%`;
      const randomBottom = `${Math.random() * 50 + 10}%`;

      setGratitudeList([
        ...gratitudeList,
        { image: randomImage, left: randomLeft, bottom: randomBottom },
      ]);
      setGratitudeTexts([...gratitudeTexts, thought]);

      // Trigger milestone pop-up when 5 or more gratitudes are added
      if (gratitudeTexts.length + 1 >= 5) {
        setMilestoneReached(true);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-resolution-blue via-marian-blue to-green-900 ">
      <p className="mb-4 text-white">
        Add positive thoughts to grow your garden!
      </p>

      {/* Garden */}
      <div className="relative w-full max-w-6xl h-96 bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 rounded-xl mb-6">
        {gratitudeList.map((item, index) => (
          <div
            key={index}
            className="absolute"
            style={{
              left: item.left,
              bottom: item.bottom,
            }}
          >
            <Image
              src={item.image}
              alt="Flower"
              className="w-12 h-12"
              width={250}
              height={250}
            />
          </div>
        ))}
      </div>

      {/* Gratitude Input */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="What are you grateful for?"
          className="bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20  text-white rounded p-2 w-80"
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
          className=" bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20  text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Add Gratitude
        </button>
      </div>

      {/* Gratitude Suggestions */}
      <div className="mt-6 mx-12">
        <h2 className="text-lg font-semibold mb-2 text-white">Suggestions:</h2>
        <div className="flex flex-wrap justify-center gap-3">
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

      {/* Milestone Pop-Up */}
      {milestoneReached && (
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
              {gratitudeTexts.map((text, index) => (
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
              <button className="mt-6 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
                Home
              </button>
            </Link>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default GratitudeGarden;
