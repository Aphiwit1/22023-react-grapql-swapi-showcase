import React from "react";
import { FavoriteFilmsProps, Film } from "../interface";
import { AiFillStar } from "react-icons/ai";
import { WithFavoriteList } from "./WithFavoriteList";
import { BsFillBookmarkFill } from "react-icons/bs";


const FavoriteList = ({
  favorites,
  data,
  handleToggleFavorite,
}: FavoriteFilmsProps) => (
  //   const { favorites, data, handleToggleFavorite } = props;
  <>
    <section>
      <h2>Favorite Films</h2>
      {favorites.length === 0 ? (
        <p>No favorite films yet.</p>
      ) : (
        <ul className="flex flex-wrap justify-center">
          {favorites.map((favTitle: any) => {
            const favFilm = data?.find((film: Film) => film.title === favTitle);
            return (
              <>
                {favFilm && (
                  <div
                    key={favFilm.id}
                    className="relative bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl m-5 min-w-[300px] cursor-pointer"
                  >
                    <div className="absolute top-2 right-2">
                      <span
                        onClick={() => handleToggleFavorite(favFilm)}
                        className="inline-flex items-center justify-center p-2 bg-indigo-500 hover:bg-indigo-400 rounded-md shadow-lg"
                      >
                        <button>{<AiFillStar />}</button>
                      </span>
                    </div>

                    <div className="absolute top-2 left-2 text-yellow-400">
                       {<BsFillBookmarkFill/>}
                    </div>

                    <h3 className="text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight">
                      {favFilm.title}
                    </h3>
                    <div className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
                      {favFilm.releaseDate}
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
                      {favFilm.director}
                    </p>
                  </div>
                )}
              </>
            );
          })}
        </ul>
      )}
    </section>
  </>
);

const WrappedComponent = WithFavoriteList(FavoriteList);
export default WrappedComponent;
