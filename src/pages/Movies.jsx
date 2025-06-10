import { useEffect, useState } from 'react';
import { theme } from '../styles/theme';

const TMDB_KEY = import.meta.env.VITE_TMDB_KEY;
const CHUCK_ID = 51576;

function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/person/${CHUCK_ID}/movie_credits?api_key=${TMDB_KEY}`
        );
        const data = await res.json();
        const sorted = data.cast
          .filter(m => m.poster_path && m.release_date)
          .sort((a, b) => new Date(b.release_date) - new Date(a.release_date));

        setMovies(sorted);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch Chuck Norris movies:', err);
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  return (
    <div className="p-8 text-center">
      <h1 className={`text-3xl font-bold mb-6 ${theme.heading}`}>Chuck Norris Movies</h1>
      {loading ? (
        <p className={`${theme.text}`}>Loading movies... or Chuck roundhouse kicked the API.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {movies.map(movie => (
            <div key={movie.id} className={`rounded-lg shadow-md ${theme.cardBg} ${theme.border}`}>
              <img
                src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-80 object-contain rounded-t-lg"
              />
              <div className="p-4">
                <h2 className={`text-lg font-bold ${theme.text}`}>{movie.title}</h2>
                <p className="text-sm text-white/80">Released: {movie.release_date}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Movies;
