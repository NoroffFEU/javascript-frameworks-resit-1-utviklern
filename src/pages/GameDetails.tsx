import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchGameById } from '../services/api';
import type { Game } from '../types/Game';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { useFavourites } from '../hooks/useFavourites';

export default function GameDetails() {
  const { id } = useParams<{ id: string }>();
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isFavourite, toggleFavourite } = useFavourites();

  useEffect(() => {
    const loadGame = async () => {
      try {
        if (!id) return;
        const response = await fetchGameById(Number(id));
        setGame(response.data);
        setError(null);
      } catch (err) {
        setError('Fail when trying to load game details');
      } finally {
        setLoading(false);
      }
    };
    loadGame();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="text-red-500 text-xl mb-4">{error || 'not found'}</div>
        <Link to="/" className="text-black underline">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="text-black underline mb-4 inline-block">&larr; Back to Home</Link>
      <div className="relative max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <button
          type="button"
          onClick={() => toggleFavourite(game)}
          className="absolute top-4 right-4 z-10"
          aria-label={isFavourite(game.id) ? "Remove from favourites" : "Add to favourites"}
        >
          {isFavourite(game.id) ? (
            <HeartSolid className="h-7 w-7 text-red-600" />
          ) : (
            <HeartSolid className="h-7 w-7 text-gray-800" />
          )}
        </button>
        <img src={game.image.url} alt={game.image.alt} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">{game.name}</h1>
          <p className="text-gray-600 mb-2">Released: {game.released}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {(() => {
              const genreTags = [];
              for (let j = 0; j < game.genre.length; j++) {
                const genre = game.genre[j];
                genreTags.push(
                  <span key={genre} className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">
                    {genre}
                  </span>
                );
              }
              return genreTags;
            })()}
          </div>
          <p className="text-gray-700 mb-4">{game.description}</p>
        </div>
      </div>
    </div>
  );
}
