import { useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { PageLoading } from "../components/pageElements/PageLoading";
import { PageWrapper } from "../components/wrappers/PageWrapper";
import { createGenrePlaylist, getGenreList, searchGenre } from "../spotify";
import { capitalizeFirstLetter, catchErrors, insertUrlParam } from "../utils";
import { motion } from "framer-motion/dist/es/index";
import {
  animationChildContainerGenre,
  animationParentContainerGenre,
} from "../components/animations/animations";
import { AnimatePresence } from "framer-motion/dist/es/index";
import { PlaylistResultsCard } from "../components/elements/cards/PlaylistResultsCard";
import { MakeGenrePlaylist } from "../components/elements/buttons/MakeGenrePlaylist";
import { CreatePlaylistModal } from "../components/pageElements/CreatePlaylistModal";

export const ExploreGenre = () => {
  const search = useLocation().search;
  const history = useHistory();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const genre = new URLSearchParams(search).get("genre");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [genres, setGenres] = useState(null);
  const [genrePlaylist, setGenrePlaylist] = useState(null);
  const [genrePlaylistUri, setGenrePlaylistUri] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [fakeLoading, setFakeLoading] = useState(false);
  const [playlistFakeLoading, setPlaylistFakeLoading] = useState(false);
  const myRef = useRef(null);

  useEffect(() => {
    const fetchGenres = async () => {
      const { genres } = await getGenreList();
      setGenres(genres);
    };
    catchErrors(fetchGenres());
    setSelectedGenre(genre);
  }, []);

  const loadGenrePlaylist = async (genre) => {
    setFakeLoading(true);
    insertUrlParam("genre", genre);
    setSelectedGenre(genre);
    const { tracks } = await searchGenre(genre);
    setGenrePlaylist(tracks);
    setGenrePlaylistUri(tracks.map((song) => song.uri));
    setTimeout(() => {
      setFakeLoading(false);
      myRef.current.scrollIntoView();
    }, 500);
  };

  useEffect(() => {
    const fetchTracksWithParams = async () => {
      if (genre) {
        const { tracks } = await searchGenre(genre);
        setGenrePlaylist(tracks);
        setGenrePlaylistUri(tracks.map((song) => song.uri));
        myRef.current.scrollIntoView();
      }
    };
    catchErrors(fetchTracksWithParams());
  }, [genre]);

  const createPlaylistForUser = () => {
    setPlaylistFakeLoading(true);
    setTimeout(() => {
      createGenrePlaylist(selectedGenre, genrePlaylistUri);
      setPlaylistFakeLoading(false);
      setModalOpen(true);
    }, 2000);
  };

  const clearSearch = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setGenrePlaylist(null);
    history.replace({
      search: queryParams.toString(),
    });
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <PageWrapper>
      <motion.div
        variants={animationParentContainerGenre}
        key="modal"
        initial="initial"
        animate="animate"
        exit="exit"
        className="font-semibold text-center text-2xl mb-6="
      >
        <motion.div className="text-3xl text-gray-200 font-bold">
          Genre Explorer
        </motion.div>
        <motion.div className="text-base font-normal text-gray-200 text-center  mx-4 sm:mx-0 mt-1">
          Explore new genres by making your own custom playlist based off one.
        </motion.div>
        <motion.div className="font-semibold text-primary mt-4 mb-4">
          1. Select a Genre
        </motion.div>
      </motion.div>
      <div
        className="test"
        style={{
          minHeight: "300px",
          maxHeight: "300px",
          height: "100%",
          overflowY: "auto",
          marginBottom: "20px",
        }}
      >
        <div className="  ">
          {!genres && <PageLoading />}
          {genres && (
            <>
              <motion.div
                variants={animationParentContainerGenre}
                key="modal"
                initial="initial"
                animate="animate"
                exit="exit"
                className=" flex flex-wrap  "
              >
                {genres.map((genre) => (
                  <button
                    key={genre}
                    className={`btn btn-primary btn-sm btn-outline m-1 ${
                      selectedGenre === genre && "bg-primary"
                    }`}
                    onClick={() => loadGenrePlaylist(genre)}
                  >
                    <div
                      className={` ${selectedGenre === genre && "text-white"} `}
                    >
                      {genre}
                    </div>
                  </button>
                ))}
              </motion.div>
            </>
          )}
        </div>
      </div>
      <AnimatePresence>
        {fakeLoading && <PageLoading />}
        {genrePlaylist && !fakeLoading && (
          <>
            <motion.div
              ref={myRef}
              variants={animationParentContainerGenre}
              key="modal"
              initial="initial"
              animate="animate"
              exit="exit"
              className="font-semibold text-primary text-2xl pt-24 mb-3"
            >
              2. Make Your Playlist
            </motion.div>
            <motion.div
              variants={animationParentContainerGenre}
              key="modal"
              initial="initial"
              animate="animate"
              exit="exit"
              className=" grid grid-cols-1 gap-2 w-full  "
            >
              <motion.div
                variants={animationParentContainerGenre}
                className="w-full mb-4"
              >
                <div className="w-full font-bold text-4xl mt-6  mb-4">
                  <div className="font-base text-xs uppercase mb-2 tracking-wider text-gray-400">
                    Songs in the genre of
                  </div>
                  {selectedGenre && (
                    <div className="flex justify-between">
                      <div className="text-primary-content lg:text-4xl md:text-3xl text-2xl">
                        {capitalizeFirstLetter(selectedGenre)}
                      </div>

                      <button
                        class="btn btn-sm btn-outline"
                        onClick={clearSearch}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          class="inline-block w-4 h-4 mr-2 stroke-current"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                          ></path>
                        </svg>
                        Clear
                      </button>
                    </div>
                  )}
                </div>
                <MakeGenrePlaylist
                  fakeLoading={playlistFakeLoading}
                  createPlaylistForUser={createPlaylistForUser}
                />
              </motion.div>
              {genrePlaylist.map((song, i) => (
                <motion.div
                  variants={animationParentContainerGenre}
                  className="w-full"
                  key={i}
                >
                  <PlaylistResultsCard
                    key={i}
                    song={song}
                    variants={animationChildContainerGenre}
                  />
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div id="my-modal" className={`modal ${modalOpen && "modal-open"}`}>
        <CreatePlaylistModal closeModal={closeModal} modalOpen={modalOpen} />
      </div>
    </PageWrapper>
  );
};
