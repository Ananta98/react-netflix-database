import React, { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { UserAuth } from "../context/AuthContext";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const SavedShows = () => {
  const { user } = UserAuth();

  const [movies, setMovies] = useState([]);

  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  const movieRef = doc(db, 'users', `${user.email}`);
  const deleteShow = async (passedID) => {
    try {
        const result = movies.filter((item) => item.id !== passedID);
        await updateDoc(movieRef, {
            savedShows: result,
        })
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setMovies(doc.data()?.savedShows);
    });
  }, [user?.email]);

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">My Shows</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={() => slideLeft()}
          size={40}
          className="bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
        />
        <div
          id={"slider"}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          {movies &&
            movies.map((item, id) => {
              return (
                <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[200px] inline-block cursor-pointer relative p-2">
                  <img
                    className="w-full h-auto block"
                    src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
                    alt={item?.title}
                  />
                  <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
                    <p className="whitespace-normal text-xs md:text-sm font-bold flex justify-center items-center h-full">
                      {item?.title}
                    </p>
                    <p onClick={deleteShow} className="absolute text-gray-300 top-4 right-4"><AiOutlineClose /></p>
                  </div>
                </div>
              );
            })}
        </div>
        <MdChevronRight
          onClick={() => slideRight()}
          size={40}
          className="right-0 bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
        />
      </div>
    </>
  );
};

export default SavedShows;
