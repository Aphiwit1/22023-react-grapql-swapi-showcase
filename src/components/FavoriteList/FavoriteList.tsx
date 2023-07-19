import React from "react";
import { FavoriteFilmsProps } from '../interface'
import { AiFillStar } from "react-icons/ai";
import { WithFavoriteList } from "./WithFavoriteList";

const FavoriteList = ({favorites, data, handleToggleFavorite}: FavoriteFilmsProps) => 
//   const { favorites, data, handleToggleFavorite } = props;
   (
    <>
      <section>
        <h2>Favorite Films</h2>
        {favorites.length === 0 ? (
          <p>No favorite films yet.</p>
        ) : (
          <ul>
            {favorites.map((favTitle: any) => {
              const favFilm = data?.find((film: any) => film.title === favTitle);
              return (
               <>
               { favFilm && 
                 <li key={favFilm?.title}>
                 <strong>{favFilm?.title}</strong> - {favFilm?.releaseDate}
                 (Director: {favFilm?.director})
                 <button onClick={() => handleToggleFavorite(favFilm)}><AiFillStar/></button>
               </li>
               }
               </>
              );
            })}
          </ul>
        )}
      </section>
    </>
  );


const WrappedComponent = WithFavoriteList(FavoriteList)
export default WrappedComponent
