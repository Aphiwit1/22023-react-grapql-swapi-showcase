import React from "react";

const FavoriteList = (props: any) => {
  const { favorites, data, handleToggleFavorite } = props;
  return (
    <>
      <section>
        <h2>Favorite Films</h2>
        {favorites.length === 0 ? (
          <p>No favorite films yet.</p>
        ) : (
          <ul>
            {favorites.map((favTitle: any) => {
              const favFilm = data.find((film: any) => film.title === favTitle);
              return (
                <li key={favFilm.title}>
                  <strong>{favFilm.title}</strong> - {favFilm.releaseDate}
                  (Director: {favFilm.director})
                  <button onClick={() => handleToggleFavorite(favFilm)}>Remove from Favorites</button>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </>
  );
};

export default FavoriteList;
