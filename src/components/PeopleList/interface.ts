export interface Person {
    id: string;
    gender: string;
    name: string;
    isFav?:boolean;
  }

  export interface PeopleListProps {
    favorites: string[];
    data: Person[] | null;
    handleToggleFavorite: (film: Person) => void;
}