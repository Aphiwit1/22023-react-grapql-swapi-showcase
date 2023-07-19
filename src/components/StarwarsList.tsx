import React, { useState, useEffect } from 'react'
import axios from 'axios';
import FavoriteList from './FavoriteList/FavoriteList';
// import Film from './interface'

// Define the type for a film object
type Film = {
    title: string;
    director: string;
    releaseDate: string;
    // Add other properties as needed
  };

const StarwarsList = () => {
    const [data, setData] = useState<Film[] | null>(null); // Use Film[] type here
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [favorites, setFavorites] = useState<string[]>([]);

    useEffect(() => {
        const fetchStarWarsData = async () => {
          try {
            const response = await axios.post(
              "https://swapi-graphql.netlify.app/.netlify/functions/index",
              {
                query: `
                  {
                    allFilms {
                      films {
                        title
                        director
                        releaseDate
                      }
                    }
                  }
                `,
              }
            );
    
            // Add the 'isFav' property to each film object
            const filmsWithFavProp = response.data.data.allFilms.films.map(
              (film: any) => ({
                ...film,
                isFav: favorites.includes(film.title), // Check if the film is in the favorites list
              })
            );  
    
            setData(filmsWithFavProp);
            setLoading(false);
          } catch (error) {
            setError("Error fetching data.");
            setLoading(false);
          }
        };
    
        fetchStarWarsData();
      }, [favorites, data]);

      if (loading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>{error}</div>;
      }
    
      const handleToggleFavorite = (film: any) => {
        setFavorites((prevFavorites) =>
          prevFavorites.includes(film.title)
            ? prevFavorites.filter((favTitle) => favTitle !== film.title)
            : [...prevFavorites, film.title]
        );
      };
    

    
  return (
    <div>
        <>
    <div>
      <h1>Star Wars Films</h1>
      {data && (
        <ul>
          {data.map((film: any) => (
            <li key={film.title}>
              <strong>{film.title}</strong> - {film.releaseDate}
              <button onClick={() => handleToggleFavorite(film)}>
                {film.isFav ? "Remove " : "Add to Favorites"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
 
    

    <FavoriteList favorites={favorites} data={data} handleToggleFavorite={handleToggleFavorite} />
  </>
    </div>
  )
}

export default StarwarsList
