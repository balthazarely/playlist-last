import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { searchForArtist } from "../../spotify";
import GlobalContext from "../../context/appContext";
import { AnimatePresence, motion } from "framer-motion/dist/es/index";
import { HiOutlineX } from "react-icons/hi";
import Loader from "react-loader-spinner";
import { listNamesFunction } from "../../utils";

const container = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      delayChildren: 0.1,
      duration: 0.6,
      staggerChildren: 0.07,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
  exit: {
    opacity: 0,
    transition: {
      // duration: 0.6,
      // staggerChildren: 0.07,
      // ease: [0.43, 0.13, 0.23, 0.96],
      // when: "afterChildren",
    },
  },
};

const listItem = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
  },
  exit: { opacity: 0 },
};

const SearchOverlay = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const gContext = useContext(GlobalContext);
  const history = useHistory();

  const setUserInput = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    if (searchQuery.length < 3) {
      setSearchResults(null);
      return;
    }
    const callSearchService = async () => {
      if (searchQuery.length > 2) {
        const { tracks } = await searchForArtist(searchQuery);
        setSearchResults(tracks);
        console.log(tracks);
      }
    };
    let debouncer = setTimeout(() => {
      setLoading(true);
      callSearchService();
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }, 400);
    return () => {
      clearTimeout(debouncer);
    };
  }, [searchQuery]);

  const navigateToPlaylistPage = (songID) => {
    history.push(`/playlist/${songID}`);
    gContext.isSearchOverlay(false);
  };

  return (
    <div className="flex justify-center items-center  h-full    ">
      <button
        onClick={() => gContext.isSearchOverlay(false)}
        className="absolute top-0 right-0 m-8"
      >
        <HiOutlineX className="text-4xl hover:text-gray-50 transition-all text-gray-200" />
      </button>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        style={{
          width: "100%",
          maxWidth: "900px",
          height: "50%",
          maxHeight: " 800px",
        }}
        className="h-full w-full  px-2 "
      >
        <input
          autoFocus
          type="text"
          placeholder="Enter song name"
          style={{ width: "100%", maxWidth: "900px" }}
          className="outline-none h-16 text-4xl bg-transparent text-gray-300 "
          onChange={(e) => setUserInput(e.target.value)}
          // value={searchQuery}
        />
        <div className="bg-gray-400 w-full h-0.5 "></div>
        <div className="border-2 border-transparent h-72 relative">
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className=" w-full absolute top-16 flex items-center  justify-center "
            >
              <Loader
                type="ThreeDots"
                color="#2dd4bf"
                height={50}
                width={50}
                timeout={3000} //3 secs
              />
            </motion.div>
          )}
          <AnimatePresence exitBeforeEnter>
            {searchResults && searchQuery.length > 2 && !loading && (
              <div>
                {searchResults.total > 0 ? (
                  <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                  >
                    <div className=" mt-2 py-3 rounded-3xl  w-full grid md:grid-cols-3 grid-cols-2   gap-2">
                      {searchResults.items.map((song, i) => (
                        <motion.div
                          onClick={() => navigateToPlaylistPage(song.id)}
                          key={i}
                          variants={listItem}
                          className="grid grid-cols-5 gap-0 cursor-pointer group  bg-base-200 shadow-lg rounded-lg p-2 border-2 hover:border-gray-600 border-transparent   "
                        >
                          <div className="col-span-4 flex ">
                            <img
                              className=" h-12 w-12 rounded-md  "
                              src={song.album.images[2].url}
                            />
                            <div className="ml-4 flex justify-center flex-col truncate overflow-hidden ">
                              <div className="truncate font-bold md:text-base text-sm overflow-ellipsis overflow-hidden  transition-all duration-200  ">
                                {song.name}
                              </div>
                              <div className="truncate font-base text-xs text-gray-300 mt-1">
                                {listNamesFunction(song.artists)}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className=" text-center my-8 text-gray-400"
                  >
                    hmmm no results for this one
                  </motion.div>
                )}
              </div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default SearchOverlay;
