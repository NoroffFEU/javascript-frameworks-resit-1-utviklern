import type { Game, GamesResponse, SingleGameResponse } from '../types/Game';

const API_BASE_URL = 'https://v2.api.noroff.dev/old-games';

export const fetchGames = async (): Promise<GamesResponse> => {
  const response = await fetch(`${API_BASE_URL}`);
  if (!response.ok) {
    throw new Error('Fail when trying to fetch games');
  }
  return response.json();
};

export const fetchGameById = async (id: number): Promise<SingleGameResponse> => {
  const response = await fetch(`${API_BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Fail when trying to fetch game');
  }
  return response.json();
};

export const fetchGamesByGenre = async (genre: string): Promise<Game[]> => {
  const response = await fetch(`${API_BASE_URL}/games?category=${genre}`);
  if (!response.ok) {
    throw new Error('Fail when trying to fetch games by genre');
  }
  return response.json();
}; 