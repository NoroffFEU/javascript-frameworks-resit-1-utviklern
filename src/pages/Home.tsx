import { useEffect, useState } from 'react';
import type { Game } from '../types/Game';
import { fetchGames } from '../services/api';
import { Link } from 'react-router-dom';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { useFavourites } from '../hooks/useFavourites';
import SearchAndSort from '../components/SearchAndSort';

export default function Home() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isFavourite, toggleFavourite } = useFavourites();
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('name-asc');

//fetch games
  useEffect(() => {
    const loadGames = async () => {
      try {
        const response = await fetchGames();
        setGames(response.data);
        setError(null);
      } catch (err) {
        setError('Fail when trying to load games');
      } finally {
        setLoading(false);
      }
    };
    loadGames();
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

//search and sort
  let filteredGames = games.filter(game =>
    game.name.toLowerCase().includes(search.toLowerCase())
  );

  if (sort === 'name-asc') {
    filteredGames.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === 'name-desc') {
    filteredGames.sort((a, b) => b.name.localeCompare(a.name));
  } else if (sort === 'year-asc') {
    filteredGames.sort((a, b) => Number(a.released) - Number(b.released));
  } else if (sort === 'year-desc') {
    filteredGames.sort((a, b) => Number(b.released) - Number(a.released));
  }

//cards
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-20 text-center">Old Games Collection</h1>
      <SearchAndSort search={search} setSearch={setSearch} sort={sort} setSort={setSort} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {(() => {
          const cards = [];
          for (let i = 0; i < filteredGames.length; i++) {
            const game = filteredGames[i];
            cards.push(
              <Link to={`/game/${game.id}`} key={game.id} className="hover:no-underline">
                <div className="relative flex flex-col rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105 bg-gray-100">
                  <button
                    type="button"
                    onClick={e => {
                      e.preventDefault();
                      toggleFavourite(game);
                    }}
                    className="absolute top-2 right-2 z-10"
                    aria-label={isFavourite(game.id) ? "Remove from favourites" : "Add to favourites"}
                  >
                    {isFavourite(game.id) ? (
                      <HeartSolid className="h-16 w-16 text-red-600" />
                    ) : (
                      <HeartSolid className="h-16 w-16 text-indigo-500" />
                    )}
                  </button>
                  <img
                    src={game.image.url}
                    alt={game.image.alt}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 flex flex-col flex-1">
                    <h2 className="text-xl font-semibold mb-1">{game.name}</h2>
                    <p className="text-gray-600 text-sm mb-1">Released: {game.released}</p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {(() => {
                        const genreTags = [];
                        for (let j = 0; j < game.genre.length; j++) {
                          const genre = game.genre[j];
                          genreTags.push(
                            <span
                              key={genre}
                              className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded"
                            >
                              {genre}
                            </span>
                          );
                        }
                        return genreTags;
                      })()}
                    </div>
                    <p className="text-gray-700 text-sm line-clamp-3">{game.description}</p>
                  </div>
                </div>
              </Link>
            );
          }
          return cards;
        })()}
      </div>
    </div>
  );
} 