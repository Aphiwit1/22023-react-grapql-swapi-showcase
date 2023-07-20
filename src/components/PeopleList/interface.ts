export interface Person {
    id: string;
    gender: string;
    name: string;
    isFav?:boolean;
  }

  export interface FavoritePeopleProps {
    favorites: string[];
    data: Person[] | null;
    handleToggleFavorite: (film: Person) => void;
}