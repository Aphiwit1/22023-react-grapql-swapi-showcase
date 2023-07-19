export interface Film {
    id: string
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

export interface StarWarsListProps {
    data: Film[] | null;
    loading: boolean;
    error: string | null;
    favorites: string[];
    handleToggleFavorite: (film: Film) => void;
  }
