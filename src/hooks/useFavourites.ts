import { useState, useEffect } from 'react';
import type { Game } from '../types/Game';
import { toast } from 'react-hot-toast';

export const useFavourites = () => {
  const [favourites, setFavourites] = useState<Game[]>(() => {
    const saved = localStorage.getItem('favourites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  const addFavourite = (game: Game) => {
    if (!isFavourite(game.id)) {
      setFavourites(prev => [...prev, game]);
      toast.success(`"${game.name}" added to favorites!`);
    }
  };

  const removeFavourite = (gameId: number) => {
    const removed = favourites.find(game => game.id === gameId);
    setFavourites(prev => prev.filter(game => game.id !== gameId));
    if (removed) {
      toast(`"${removed.name}" removed from favorites.`);
    }
  };

  const isFavourite = (gameId: number) => {
    return favourites.some(game => game.id === gameId);
  };

  const toggleFavourite = (game: Game) => {
    if (isFavourite(game.id)) {
      removeFavourite(game.id);
    } else {
      addFavourite(game);
    }
  };

  return {
    favourites,
    addFavourite,
    removeFavourite,
    isFavourite,
    toggleFavourite
  };
}; 