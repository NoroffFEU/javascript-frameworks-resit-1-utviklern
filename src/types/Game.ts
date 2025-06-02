export interface Game {
  id: number;
  slug: string;
  name: string;
  description: string;
  released: string;
  image: {
    url: string;
    alt: string;
  };
  genre: string[];
}

export interface GamesResponse {
  data: Game[];
  meta: {
    isFirstPage: boolean;
    isLastPage: boolean;
    currentPage: number;
    previousPage: number | null;
    nextPage: number | null;
    pageCount: number;
    totalCount: number;
  };
}

export interface SingleGameResponse {
  data: Game;
  meta: Record<string, never>;
} 