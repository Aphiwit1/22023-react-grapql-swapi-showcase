import { Person } from "../PeopleList/interface";

export interface FavoritePeopleProps {
    favorites: string[];
    data: Person[] | null;
    handleToggleFavorite: (people: Person) => void;
}
