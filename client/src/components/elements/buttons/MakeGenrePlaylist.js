import React from "react";
import { RiPlayListFill } from "react-icons/ri";

export const MakeGenrePlaylist = ({
  fakeLoading,
  createPlaylistForUser,
  smallBtn,
}) => {
  return (
    <div className=" ">
      <button
        onClick={() => createPlaylistForUser()}
        className={`btn btn-primary btn-outline ${
          fakeLoading ? "loading" : ""
        } ${smallBtn ? "btn-sm" : ""}`}
      >
        <div
          className={`flex flex-row items-center justify-center ${
            smallBtn ? "text-xs" : "text-md"
          }`}
        >
          {!fakeLoading && <RiPlayListFill className=" w-6 h-6 mr-2" />}
          Make Playlist
        </div>
      </button>
    </div>
  );
};
