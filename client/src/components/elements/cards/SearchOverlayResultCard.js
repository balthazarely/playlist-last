import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import GlobalContext from "../../context/appContext";

export const SearchOverlayResultCard = ({ song }) => {
  const history = useHistory();
  const gContext = useContext(GlobalContext);

  console.log(song);
  let names = song.artists
    .map((artist) => artist.name)
    .join(", ")
    .concat(" ", "- ", song.name);

  const navigateToPlaylistPage = () => {
    history.push(`/playlist/${song.id}`);
    gContext.isSearchOverlay(false);
  };

  return (
    <div
      onClick={() => navigateToPlaylistPage()}
      className={`py-2 whitespace-nowrap truncate rounded-lg hover:bg-primary text-gray-300  my-1 cursor-pointer transition-all duration-150 text-3xl `}
    >
      {names}
    </div>
  );
};
