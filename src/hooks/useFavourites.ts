import { useState, useEffect } from 'react';
import type { Game } from '../types/Game';

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
    }
  };

  const removeFavourite = (gameId: number) => {
    setFavourites(prev => prev.filter(game => game.id !== gameId));
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