import { useEffect, useState } from 'react';
import { theme } from '../styles/theme';

const TMDB_KEY = import.meta.env.VITE_TMDB_KEY;
const CHUCK_ID = 51576;

function Shows() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchShows() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/person/${CHUCK_ID}/tv_credits?api_key=${TMDB_KEY}`
        );
        const data = await res.json();
        const sorted = data.cast
          .filter(s => s.poster_path && s.first_air_date)
          .sort((a, b) => new Date(b.first_air_date) - new Date(a.first_air_date));

        setShows(sorted);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch Chuck Norris TV shows:', err);
        setLoading(false);
      }
    }

    fetchShows();
  }, []);

  return (
    <div className="p-8 text-center">
      <h1 className={`text-3xl font-bold mb-6 ${theme.heading}`}>Chuck Norris TV Shows</h1>
      {loading ? (
        <p className={`${theme.text}`}>Loading shows... Chuck might be rewriting history again.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {shows.map(show => (
            <div key={show.id} className={`rounded-lg shadow-md ${theme.cardBg} ${theme.border}`}>
              <img
                src={`https://image.tmdb.org/t/p/w342${show.poster_path}`}
                alt={show.name}
                className="w-full h-80 object-contain rounded-t-lg"
              />
              <div className="p-4">
                <h2 className={`text-lg font-bold ${theme.text}`}>{show.name}</h2>
                <p className="text-sm text-white/80">Aired: {show.first_air_date}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Shows;
