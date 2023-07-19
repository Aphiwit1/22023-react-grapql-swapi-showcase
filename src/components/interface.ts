export interface Film {
    title: string;
    director: string;
    releaseDate: string;
    isFav?: boolean;
}

export interface FavoriteFilmsProps {
    favorites: string[];
    data: Film[] | null;
    handleToggleFavorite: (film: Film) => void;
  }