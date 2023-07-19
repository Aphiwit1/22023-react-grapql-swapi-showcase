import FavoriteList from "./FavoriteList/FavoriteList";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";


import { Film, StarWarsListProps } from "./interface";
import { WithStarwarsList } from "./WithStarwarsList";

const StarWarsList = ({data, loading, error, favorites,
  handleToggleFavorite}:StarWarsListProps) =>  (
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



const WrappedComponent = WithStarwarsList(StarWarsList)
export default WrappedComponent