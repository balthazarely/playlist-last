import React, { useState } from "react";
import { listNamesFunction } from "../../utils";
import { useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";
import { BsSpotify } from "react-icons/bs";

export const GridWrapper = ({ song }) => {
  const history = useHistory();
  const [imageLoaded, setImageLoaded] = useState(false);

  const navigateToPlaylistPage = (songid) => {
    history.push(`/playlist/${songid}`);
  };

  const openSpotifyLink = (e, link) => {
    window.open(link);
    e.stopPropagation(e);
  };

  return (
    <div
      onClick={() => navigateToPlaylistPage(song.id)}
      className=" hover:bg-base-300 p-6  cursor-pointer transform hover:-translate-y-1 duration-200 flex flex-col justify-center items-center w-full  "
    >
      <div
        className={`relative overflow-hidden flex justify-center items-center w-36 h-36    `}
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
          className={`duration-700  transition h-36 w-36 absolute top-0 left-0 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          alt="song image"
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
        <div className=" flex justify-start mt-2">
          <a onClick={(e) => openSpotifyLink(e, song.external_urls.spotify)}>
            <BsSpotify className="text-gray-400 duration-200 transition-all hover:text-gray-200 w-5 h-5 " />
          </a>
        </div>
      </div>
    </div>
  );
};
