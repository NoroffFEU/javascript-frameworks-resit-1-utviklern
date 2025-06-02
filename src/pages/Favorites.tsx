import { useFavourites } from '../hooks/useFavourites';
import { Link } from 'react-router-dom';

export default function Favorites() {
  const { favourites, isFavourite, toggleFavourite } = useFavourites();

  if (favourites.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl font-bold mb-20">Favorites</h1>
        <p className="text-black text-center">You have no favorites yet.</p>
        <Link to="/" className="text-black underline mt-4 inline-block">Back to Home</Link>
      </div>
    );
  }

  const cards = [];
  for (let i = 0; i < favourites.length; i++) {
    const game = favourites[i];
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
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-7 w-7 text-red-600"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-7 w-7 text-gray-800"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
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
  }

  return (
    <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-20 text-center">Favorites</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {cards}
      </div>
    </div>
  );
} 