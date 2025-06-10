import { Link, useLocation } from 'react-router-dom';
import { theme } from '../styles/theme';

function Navbar() {
  const { pathname } = useLocation();

  const linkClass = (path) =>
    `hover:${theme.heading} transition ${
      pathname === path ? `${theme.heading} font-bold` : theme.accent
    }`;

  return (
    <nav className={`px-6 py-4 flex justify-between items-center ${theme.cardBg} ${theme.border}`}>
      <Link to="/" className={`text-2xl font-extrabold ${theme.heading}`}>
        CHUCK NORRIS
      </Link>
      <div className="space-x-6 text-lg">
        <Link to="/" className={linkClass('/')}>Home</Link>
        <Link to="/movies" className={linkClass('/movies')}>Movies</Link>
        <Link to="/shows" className={linkClass('/shows')}>TV Shows</Link>
        <Link to="/jokes" className={linkClass('/jokes')}>Jokes</Link>
      </div>
    </nav>
  );
}

export default Navbar;
