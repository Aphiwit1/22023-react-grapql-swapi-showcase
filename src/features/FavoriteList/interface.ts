import { Film } from "../interface";

export interface FavoriteFilmsProps {
    favorites: string[];
    data: Film[] | null;
    handleToggleFavorite: (film: Film) => void;
}


