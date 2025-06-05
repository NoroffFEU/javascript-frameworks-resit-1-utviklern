import { useEffect, useState } from 'react';
import { fetchGames } from '../services/api';
import type { Game } from '../types/Game';
import { Link } from 'react-router-dom';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { useFavourites } from '../hooks/useFavourites';

export default function Genres() {
  const [genres, setGenres] = useState<string[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const { isFavourite, toggleFavourite } = useFavourites();

  //fetches genres
  useEffect(() => {
    const loadGenresAndGames = async () => {
      try {
        const response = await fetchGames();
        setGames(response.data);
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
        //action as default
        if (genresArray.length > 0) {
          setSelectedGenre(genresArray[0]);
        }
        setError(null);
      } catch (err) {
        setError('loading failed');
      } finally {
        setLoading(false);
      }
    };
    loadGenresAndGames();
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

  //filters the games by the genre
  let filteredGames: Game[] = [];
  if (selectedGenre) {
    for (let i = 0; i < games.length; i++) {
      if (games[i].genre.includes(selectedGenre)) {
        filteredGames.push(games[i]);
      }
    }
  }

  const renderGameCard = (game: Game) => {
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

    return (
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
              {genreTags}
            </div>
            <p className="text-gray-700 text-sm line-clamp-3">{game.description}</p>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-12 text-center">Genres</h1>
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        {(() => {
          const genreButtons = [];
          for (let i = 0; i < genres.length; i++) {
            const genre = genres[i];
            genreButtons.push(
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-6 py-2 rounded-full font-semibold text-lg transition ${selectedGenre === genre ? 'bg-indigo-500 text-white' : 'bg-blue-100 text-blue-800 hover:bg-blue-200'}`}
                disabled={selectedGenre === genre}
              >
                {genre}
              </button>
            );
          }
          return genreButtons;
        })()}
      </div>

      {/*the games in the genre*/}
      {selectedGenre && (
        <>
          <h2 className="text-2xl font-bold mb-6 text-center">{selectedGenre} games</h2>
          {filteredGames.length === 0 ? (
            <div className="text-center text-gray-600">No games found</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {(() => {
                const cards = [];
                for (let i = 0; i < filteredGames.length; i++) {
                  cards.push(renderGameCard(filteredGames[i]));
                }
                return cards;
              })()}
            </div>
          )}
        </>
      )}
    </div>
  );
} 