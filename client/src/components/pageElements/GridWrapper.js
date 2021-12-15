import React, { useState } from "react";
import { listNamesFunction } from "../../utils";
import { HiOutlineDotsHorizontal, HiOutlineDotsVertical } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";

export const GridWrapper = ({ song }) => {
  const history = useHistory();

  const [imageLoaded, setImageLoaded] = useState(false);

  const navigateToPlaylistPage = (songid) => {
    history.push(`/playlist/${songid}`);
  };

  return (
    <div
      onClick={() => navigateToPlaylistPage(song.id)}
      className=" hover:bg-base-300 p-6 h-60 rounded-lg cursor-pointer transform hover:-translate-y-1 duration-200 flex flex-col justify-center items-center w-full  "
    >
      <div
        className={`relative overflow-hidden flex justify-center items-center w-36 h-36 rounded-full   `}
      >
        <div
          className={`duration-700  transition w-full h-full  flex justify-center items-center absolute top-0 left-0  ${
            !imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <Loader
            type="Oval"
            color="#2dd4bf"
            height={50}
            width={50}
            timeout={3000} //3 secs
          />
        </div>
        <img
          className={`duration-700  transition w-full h-full absolute top-0 left-0 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          src={song.album.images[0].url}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      <div className="w-full">
        <div className="font-bold text-sm mt-4 truncate">
          {song.name} <br />
        </div>
        <div className="font-base mt-1 text-xs truncate">
          {listNamesFunction(song.artists)}
        </div>
      </div>
    </div>
  );
};
