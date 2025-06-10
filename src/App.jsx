import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Movies from './pages/Movies';
import Shows from './pages/Shows';
import Jokes from './pages/Jokes';
import { theme } from './styles/theme';

function App() {
  return (
    <div className={`min-h-screen ${theme.background} ${theme.text}`}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/shows" element={<Shows />} />
        <Route path="/jokes" element={<Jokes />} />
      </Routes>
    </div>
  );
}

export default App;
