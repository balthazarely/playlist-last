import React from "react";
import { RiPlayListFill } from "react-icons/ri";

export const MakePlaylistButton = ({ fakeLoading, createPlaylistForUser }) => {
  return (
    <div className="w-full  flex justify-between items-center">
      <button
        onClick={() => createPlaylistForUser()}
        class={`btn btn-primary btn-outline ${fakeLoading ? "loading" : ""}`}
      >
        <div className="flex flex-row items-center justify-center">
          {!fakeLoading && <RiPlayListFill className=" w-6 h-6 mr-2" />}
          Make Playlist
        </div>
      </button>
    </div>
  );
};
