import { useEffect, useState } from 'react';
import { fetchGames } from '../services/api';
import type { Game } from '../types/Game';


export default function Genres() {
  const [genres, setGenres] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  //fetches genres
  useEffect(() => {
    const loadGenres = async () => {
      try {
        const response = await fetchGames();
        const allGenres = new Set<string>();
        for (const game of response.data) {
          for (const genre of game.genre) {
            allGenres.add(genre);
          }
        }
        const genresArray = Array.from(allGenres);
        //sorts genres a-z
        for (let i = 0; i < genresArray.length - 1; i++) {
          for (let j = 0; j < genresArray.length - i - 1; j++) {
            if (genresArray[j].toLowerCase() > genresArray[j + 1].toLowerCase()) {
              const temp = genresArray[j];
              genresArray[j] = genresArray[j + 1];
              genresArray[j + 1] = temp;
            }
          }
        }
        setGenres(genresArray);
        setError(null);
      } catch (err) {
        setError('Failed to load');
      } finally {
        setLoading(false);
      }
    };
    loadGenres();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

    // shows genre buttons
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-12 text-center">Genres</h1>
      <div className="flex flex-wrap gap-4 justify-center">
        {(() => {
          const genreButtons = [];
          for (let i = 0; i < genres.length; i++) {
            const genre = genres[i];
            genreButtons.push(
              <button
                key={genre}
                className="px-6 py-2 bg-blue-100 text-blue-800 rounded-full font-semibold text-lg hover:bg-blue-200 transition"
              >
                {genre}
              </button>
            );
          }
          return genreButtons;
        })()}
      </div>
    </div>
  );
} 