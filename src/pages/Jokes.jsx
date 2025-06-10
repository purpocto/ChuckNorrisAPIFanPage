import { useEffect, useState } from 'react';
import { theme } from '../styles/theme';

function Jokes() {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState('');
  const [joke, setJoke] = useState('');
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    fetch('https://api.chucknorris.io/jokes/categories')
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  const fetchJoke = async () => {
    if (!selected) return;
    const res = await fetch(`https://api.chucknorris.io/jokes/random?category=${selected}`);
    const data = await res.json();
    setJoke(data.value);

    setAnimate(true);
    setTimeout(() => setAnimate(false), 400);
  };

  return (
    <div className="p-8 text-center">
      <h1 className={`text-3xl font-bold mb-6 ${theme.heading}`}>Chuck Norris Joke Machine</h1>

      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className={`bg-black text-white border ${theme.border} rounded px-4 py-2 mb-4`}
      >
        <option value="">Select a Category</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat.toUpperCase()}
          </option>
        ))}
      </select>

      <br />

      <button
        onClick={fetchJoke}
        className={`${theme.button.base} ${theme.button.hover} px-6 py-2 rounded font-bold transition`}
      >
        Chuck Punch!
      </button>

      {joke && (
        <div
          className={`mt-6 max-w-2xl mx-auto text-lg ${theme.cardBg} ${theme.text} p-6 rounded-lg shadow-lg ${theme.border} transition-transform ${
            animate ? 'scale-105 rotate-1' : ''
          }`}
        >
          <p className="italic leading-relaxed">💥 {joke}</p>
        </div>
      )}
    </div>
  );
}

export default Jokes;
