import React from "react";
import { useHistory } from "react-router-dom";
import { listNamesFunction } from "../../../utils";

export default function SearchResultCard({ song, largeText }) {
  const history = useHistory();
  let names = song.artists
    .map((artist) => artist.name)
    .join(", ")
    .concat(" ", "- ", song.name);

  const navigateToPlaylistPage = () => history.push(`/playlist/${song.id}`);

  return (
    <div className="relative">
      <div
        onClick={() => navigateToPlaylistPage()}
        className={`p-2 whitespace-nowrap truncate rounded-lg  my-1 hover:bg-primary hover:text-gray-800 cursor-pointer transition-all duration-150 ${
          largeText ? "text-md" : "text-sm"
        } `}
      >
        {listNamesFunction(song.artists)} - {song.name}
      </div>
    </div>
  );
}
