import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Person } from './interface';
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const PeopleList = () => {
  const [data, setData] = useState<Person[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const fetchStarWarsData = async () => {
      try {
        const localData = localStorage.getItem('star-wars-people-data');
        if(localData){
        const response = JSON.parse(localData)
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


          localStorage.setItem('star-wars-people-data',  JSON.stringify(response));
          
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }


  return (

      <section className="flex flex-col items-center p-4 bg-slate-900">
      
      {/*  ALl List  */}
      <div className="bg-slate-900 m-4">
        <h1 className="text-2xl text-center m-5">
          <span className="bg-yellow-400 p-2 ">All Star Wars People</span>
        </h1>
        {data && (
          <>
            <section className="flex flex-wrap justify-center">
              {data.map((film: Person) => (
                <div
                  key={film.id}
                  className="relative bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl m-5 min-w-[300px] cursor-pointer"
                >
                  <div className="absolute top-2 right-2">
                    <span
                   
                      className="inline-flex items-center justify-center p-2 bg-indigo-500 hover:bg-indigo-400 rounded-md shadow-lg"
                    >
                      <button>
                        {film.isFav ? <AiFillStar /> : <AiOutlineStar />}
                      </button>
                    </span>
                  </div>

                  <h3 className="text-white mt-5 text-base font-medium tracking-tight">
                    {film.name}
                  </h3>
                  <div className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
                    {film.gender}
                  </div>
                 
                </div>
              ))}
            </section>
          </>
        )}
      </div>
    </section>
  )
}

export default PeopleList
