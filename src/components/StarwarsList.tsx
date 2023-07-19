import React, { useState, useEffect } from "react";
import axios from "axios";
import FavoriteList from "./FavoriteList/FavoriteList";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";


import { Film } from "./interface";

const StarWarsList = () => {
  const [data, setData] = useState<Film[] | null>(null);
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

        // const response = [
        //   {
        //     title: '1:XXXXXXXXXXXXx',
        //     director: 'AAAAAAAAAAAA',
        //     releaseDate: '2023-07-11'
        //   },
        //   {
        //     title: '2:XXXXXXXXXXXXx',
        //     director: 'AAAAAAAAAAAA',
        //     releaseDate: '2023-07-11'
        //   },
        //   {
        //     title: '3:XXXXXXXXXXXXx',
        //     director: 'AAAAAAAAAAAA',
        //     releaseDate: '2023-07-11'
        //   },
        //   {
        //     title: '4:XXXXXXXXXXXXx',
        //     director: 'AAAAAAAAAAAA',
        //     releaseDate: '2023-07-11'
        //   }
        // ]

        const filmsWithFavProp = response.data.data.allFilms.films.map(
          (film: Film) => ({
            ...film,
            isFav: favorites.includes(film.title), // Check if the film is in the favorites list
          })
        );


        // const filmsWithFavProp = response.map(
        //   (film: Film) => ({
        //     ...film,
        //     isFav: favorites.includes(film.title), // Check if the film is in the favorites list
        //   })
        // );

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

  const handleToggleFavorite = (film: Film) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(film.title)
        ? prevFavorites.filter((favTitle) => favTitle !== film.title)
        : [...prevFavorites, film.title]
    );
  };

  return (
    <>
      <section className="flex flex-col items-center p-4">
        {/* All List */}
        {/* <div>
          <h1>Star Wars Films</h1>
          {data && (
            <ul>
              {data.map((film: Film) => (
                <li key={film.title}>
                  <strong>{film.title}</strong> - {film.releaseDate}
                  <button onClick={() => handleToggleFavorite(film)}>
                    {film.isFav ?  <AiFillStar/> : <AiOutlineStar/>}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div> */}

       <div>
          <h1>Star Wars Films</h1>
          {data && (
            <ul>
              {data.map((film: Film) => (
                <li key={film.title}>
                  <strong>{film.title}</strong> - {film.releaseDate}
                  <button onClick={() => handleToggleFavorite(film)}>
                    {film.isFav ?  <AiFillStar/> : <AiOutlineStar/>}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div> 

        {/* Fav List */}
        <div>
        {data && (
          <FavoriteList
            favorites={favorites}
            data={data}
            handleToggleFavorite={handleToggleFavorite}
          />
        )}
        </div>
        
      </section>
    </>
  );
};

export default StarWarsList;
