// import { FavoriteFilmsProps } from '../interface';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Film, StarWarsListProps } from "./interface";

const WithStarwarsList = (Component: React.FC<StarWarsListProps>) => {
  const Hoc = () => { 
    const [data, setData] = useState<Film[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const fetchStarWarsData = async () => {
      try {
        const localData = localStorage.getItem('star-wars-films-data');
        if(localData){
        const response = JSON.parse(localData)
          const filmsWithFavProp = response.data.data.allFilms.films.map(
            (film: Film) => ({
              ...film,
              isFav: favorites.includes(film.title), // Check if the film is in the favorites list
            })
          );
  
          setData(filmsWithFavProp);
          setLoading(false);
        } else {

          const response = await axios.post(
            "https://swapi-graphql.netlify.app/.netlify/functions/index",
            {
              query: `
                    {
                      allFilms {
                        films {
                          id
                          title
                          director
                          releaseDate
                        }
                      }
                    }
                  `,
            }
          );

          console.log()
          localStorage.setItem('star-wars-films-data',  JSON.stringify(response));
          
          const filmsWithFavProp = response.data.data.allFilms.films.map(
            (film: Film) => ({
              ...film,
              isFav: favorites.includes(film.title), // Check if the film is in the favorites list
            })
          );
          setData(filmsWithFavProp);
          setLoading(false);
        }
       
      } catch (error) {
        setError("Error fetching data.");
        setLoading(false);
      }
    };

    fetchStarWarsData();
  }, [favorites]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  
  const handleToggleFavorite = (film: Film) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(film.title)
        ? prevFavorites.filter((favTitle) => favTitle !== film.title)
        : [...prevFavorites, film.title]
    );
  };

  const newProps: StarWarsListProps = {
    data,
    loading,
    error,
    favorites,
    handleToggleFavorite
  };
  
      return <Component {...newProps}  />;
  };

  return Hoc;
};

export { WithStarwarsList };