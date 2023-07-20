import { PeopleListProps, Person } from './interface';
import React, { useState, useEffect } from "react";
import axios from "axios";

const WithPeopleList = (Component: React.FC<PeopleListProps>) => {
  const Hoc = () => { 

    const [data, setData] = useState<Person[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [favorites, setFavorites] = useState<string[]>([]);
  
    useEffect(() => {
      const fetchStarWarsData = async () => {
        try {
          const localData = localStorage.getItem("star-wars-people-data");
          if (localData) {
            const response = JSON.parse(localData);
            const peopleWithFavProp = response.data.data.allPeople.people.map(
              (people: Person) => ({
                ...people,
                isFav: favorites.includes(people.id),
              })
            );
  
            setData(peopleWithFavProp);
            setLoading(false);
          } else {
            const response = await axios.post(
              "https://swapi-graphql.netlify.app/.netlify/functions/index",
              {
                query: `
                      {
                        allPeople {
                          people {
                            id
                            gender
                            name
                           
                          }
                        }
                      }
                    `,
              }
            );
  
            localStorage.setItem(
              "star-wars-people-data",
              JSON.stringify(response)
            );
  
            const peopleWithFavProp = response.data.data.allPeople.people.map(
              (people: Person) => ({
                ...people,
                isFav: favorites.includes(people.id),
              })
            );
            setData(peopleWithFavProp);
            setLoading(false);
          }
        } catch (error) {
          setError("Error fetching data.");
          setLoading(false);
        }
      };
  
      fetchStarWarsData();
    }, [favorites]);
  
    const handleToggleFavorite = (film: Person) => {
      setFavorites((prevFavorites) =>
        prevFavorites.includes(film.id)
          ? prevFavorites.filter((favTitle) => favTitle !== film.id)
          : [...prevFavorites, film.id]
      );
    };
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>{error}</div>;
    }

    const newProps = {
      data,
      loading,
      error,
      favorites,
      handleToggleFavorite
      };
  
      return <Component {...newProps} />;
  };

  return Hoc;
};

export { WithPeopleList };