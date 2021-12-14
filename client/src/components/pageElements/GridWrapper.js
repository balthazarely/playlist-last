import React from "react";
import { listNamesFunction } from "../../utils";
import { HiOutlineDotsHorizontal, HiOutlineDotsVertical } from "react-icons/hi";
import { useHistory } from "react-router-dom";

export const GridWrapper = ({ song }) => {
  const history = useHistory();

  const navigateToPlaylistPage = (songid) => {
    history.push(`/playlist/${songid}`);
  };

  return (
    <div
      onClick={() => navigateToPlaylistPage(song.id)}
      className=" hover:bg-base-300 p-6 h-60 rounded-lg cursor-pointer transform hover:-translate-y-1 duration-200 flex flex-col justify-center items-center w-full  "
    >
      <div className="overflow-hidden flex justify-center items-center w-36 h-36 rounded-full ">
        <img className=" " src={song.album.images[0].url} />
      </div>
      <div className="w-full">
        <div className="font-bold text-sm mt-4 truncate">{song.name}</div>
        <div className="font-base mt-1 text-xs truncate">
          {listNamesFunction(song.artists)}
        </div>
      </div>
    </div>
  );
};
