import FavoriteList from "./FavoriteList/FavoriteList";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

import { Film, StarWarsListProps } from "./interface";
import { WithStarwarsList } from "./WithStarwarsList";

const StarWarsList = ({
  data,
  loading,
  error,
  favorites,
  handleToggleFavorite,
}: StarWarsListProps) => (
  <>
    <section className="flex flex-col items-center p-4 bg-slate-900">
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

      {/*  ALl List  */}
      <div>
        <h1>Star Wars Films</h1>
        {data && (
          <>
            <section className="flex flex-wrap justify-center">
              {data.map((film: Film) => (     
                  <div
                    key={film.id}
                    className="relative bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl m-5 min-w-[300px] cursor-pointer"
                  >
                    <div className="absolute top-2 right-2">
                      <span onClick={() => handleToggleFavorite(film)} className="inline-flex items-center justify-center p-2 bg-indigo-500 hover:bg-indigo-400 rounded-md shadow-lg">
                        <button>
                          {film.isFav ? <AiFillStar /> : <AiOutlineStar />}
                        </button>
                      </span>
                    </div>

                    <h3 className="text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight">
                      {film.title}
                    </h3>
                    <div className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
                      {film.releaseDate}
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
                      {film.director}
                    </p>
                  </div> 
              ))}
            </section>
          </>
        )}
      </div>


    </section>
  </>
);

const WrappedComponent = WithStarwarsList(StarWarsList);
export default WrappedComponent;
