import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { listNamesFunction, millisToMinutesAndSeconds } from "../../../utils";
import { motion } from "framer-motion/dist/es/index";
import { BsSpotify } from "react-icons/bs";

const variants = {
  open: {
    opacity: 1,
    height: 40,
    scaleY: 1,
  },
  closed: { opacity: 0, height: 0, scaleY: 0.6 },
};

export const PlaylistResultsCard = ({ song }) => {
  const history = useHistory();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navigateToPlaylistPage = (songid) => {
    history.push(`/playlist/${songid}`);
  };

  return (
    <>
      {song && (
        <div
          style={{ overflow: "visible" }}
          className={`border-2 hover:border-gray-600 rounded-lg border-transparent z-10 group ${
            drawerOpen ? "border-gray-600 shadow-xl" : "border-transparent"
          }`}
          onClick={() => setDrawerOpen(!drawerOpen)}
        >
          <div className="w-full grid grid-cols-5 gap-0 cursor-pointer group   p-2  ">
            <div className="col-span-3  flex">
              <div className="relative h-12 w-12   ">
                <img
                  alt="song album cover"
                  className="absolute top-0 left-0 h-12 w-12   "
                  src={
                    song.album.images[2].url ? song.album.images[2].url : null
                  }
                />

                {/* {song.external_urls.spotify && (
                  <a target="BLANK" href={song.external_urls.spotify}>
                    <HiPlay className="absolute duration-200 transition  h-12 w-12  z-50 opacity-0 hover:opacity-100" />
                  </a>
                )} */}
              </div>
              <div className="ml-4 flex justify-center flex-col truncate overflow-hidden ">
                <div className="truncate font-bold md:text-base text-sm overflow-ellipsis overflow-hidden  transition-all duration-200  ">
                  {song.name}
                </div>
                <div className="truncate font-base text-xs text-gray-300 mt-1">
                  {listNamesFunction(song.artists)}
                </div>
              </div>
            </div>
            <div className="col-span-2 flex items-center justify-end  duration-200 z-50 ">
              <button
                className="btn btn-outline btn-ghost btn-xs font-base opacity-0 group-hover:opacity-100"
                onClick={(e) => {
                  navigateToPlaylistPage(song.id);
                  e.stopPropagation();
                }}
              >
                Find Similar
              </button>
              <a target="BLANK" href={song.external_urls.spotify}>
                <BsSpotify className="text-gray-400 duration-200 transition-all hover:text-gray-200 w-6 h-6 mr-2 ml-3" />
              </a>
            </div>
          </div>

          <motion.div
            className="overflow-hidden flex items-center justify-between px-3 "
            animate={drawerOpen ? "open" : "closed"}
            variants={variants}
          >
            <div className="text-xs  text-gray-200 font-bold">
              <span className="text-gray-400 font-normal">Album: </span>
              {song.album.name}
            </div>
            <div className="text-xs  text-gray-200 font-bold">
              <span className="text-gray-400 font-normal">Year: </span>
              {song.album.release_date.slice(0, 4)}
            </div>
            <div className="text-xs  text-gray-200 font-bold">
              <span className="text-gray-400 font-normal">Length: </span>
              {millisToMinutesAndSeconds(song.duration_ms)}
            </div>
            <div className="text-xs  text-gray-200 font-bold">
              <span className="text-gray-400 font-normal">Popularity: </span>
              {song.popularity}
            </div>

            {/* {song.external_urls.spotify && (
                  <a target="BLANK" href={song.external_urls.spotify}>
                    <HiPlay className="absolute duration-200 transition  h-12 w-12  z-50 opacity-0 hover:opacity-100" />
                  </a>
                )} */}
          </motion.div>
        </div>
      )}
    </>
  );
};
