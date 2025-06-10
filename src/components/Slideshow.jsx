import { useState, useEffect } from 'react';

const images = [
  '/assets/chuck1.jpg',
  '/assets/chuck2.jpg',
  '/assets/chuck3.jpg',
  '/assets/chuck4.jpg'
];

function Slideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const next = () => setIndex((prev) => (prev + 1) % images.length);
  const prev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="my-6">
      <div className="relative w-full max-w-xl mx-auto rounded overflow-hidden">
        <img
          src={images[index]}
          alt={`Chuck meme ${index + 1}`}
          className="w-full h-auto rounded shadow-lg"
        />
        <button
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 px-3 py-1 text-white bg-black bg-opacity-50 hover:bg-opacity-75"
        >
          ◀
        </button>
        <button
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 px-3 py-1 text-white bg-black bg-opacity-50 hover:bg-opacity-75"
        >
          ▶
        </button>
      </div>
    </div>
  );
}

export default Slideshow;
