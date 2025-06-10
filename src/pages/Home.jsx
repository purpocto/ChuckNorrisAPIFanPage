import { useState, useEffect } from "react";
import kickingImg from "../assets/chuck-kick.png";

const memeImages = [
  "/assets/chuck1.jpg",
  "/assets/chuck2.jpg",
  "/assets/chuck3.jpg",
  "/assets/chuck4.jpg"
];

function Home() {
  const [joke, setJoke] = useState("");
  const [kicking, setKicking] = useState(false);
  const [position, setPosition] = useState({ top: 100, left: 100 });
  const [memeIndex, setMemeIndex] = useState(0);

  const fetchJoke = async () => {
    try {
      const res = await fetch("https://api.chucknorris.io/jokes/random");
      const data = await res.json();
      setJoke(data.value);


      setKicking(true);
      const randTop = Math.floor(Math.random() * (window.innerHeight - 200));
      const randLeft = Math.floor(Math.random() * (window.innerWidth - 200));
      setPosition({ top: randTop, left: randLeft });
      setTimeout(() => setKicking(false), 1500);
    } catch (err) {
      console.error("Failed to fetch joke:", err);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setMemeIndex((prev) => (prev + 1) % memeImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8 text-center relative min-h-screen overflow-hidden">
      <h1 className="text-4xl font-bold text-red-500 mb-2">
        Welcome to the Chuck Norris Universe
      </h1>
      <p className="text-lg text-red-300 mb-6">
        Where facts are deadlier than roundhouse kicks.
      </p>

      <button
        onClick={fetchJoke}
        className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded text-white font-semibold transition"
      >
        Get Random Chuck Fact
      </button>

    
      {kicking && (
        <img
          src={kickingImg}
          alt="Chuck Kick"
          className="w-32 h-auto animate-bounce-fast z-50 absolute"
          style={{ top: `${position.top}px`, left: `${position.left}px` }}
        />
      )}

      {joke && (
        <div className="mt-6 max-w-2xl mx-auto text-lg bg-zinc-900 text-green-400 p-6 rounded-lg shadow-lg border border-red-600">
          <p className="italic leading-relaxed">💥 {joke}</p>
        </div>
      )}


      <div className="mt-10 flex justify-center">
        <img
          src={memeImages[memeIndex]}
          alt={`Chuck meme ${memeIndex + 1}`}
          className="w-[300px] h-auto rounded-lg shadow-lg border border-red-500"
        />
      </div>
    </div>
  );
}

export default Home;
