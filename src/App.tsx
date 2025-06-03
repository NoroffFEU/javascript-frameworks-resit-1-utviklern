import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GameDetails from './pages/GameDetails';
import Favorites from './pages/Favorites';
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast';

//app
function App() {
  return (
    <Router>
      <Navbar />
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:id" element={<GameDetails />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Router>
  );
}

export default App;
