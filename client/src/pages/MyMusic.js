import { useState, useEffect, useContext } from "react";
import { GridWrapper } from "../components/pageElements/GridWrapper";
import { PageWrapper } from "../components/wrappers/PageWrapper";
import GlobalContext from "../context/appContext";
import { getCurrentUserProfile, getTopTracks } from "../spotify";
import { motion } from "framer-motion/dist/es/index";
import { catchErrors } from "../utils";
import { PageLoading } from "../components/pageElements/PageLoading";
import {
  animationChildContainer,
  animationParentContainer,
} from "../components/animations/animations";

const timeRange = [
  { value: "long_term", name: "Long Term" },
  { value: "medium_term", name: "Medium Term" },
  { value: "short_term", name: "Short Term" },
];

const MyMusic = () => {
  const [profile, setProfile] = useState(null);
  const [topTracks, setTopTracks] = useState(null);
  const [sortMusicBy, setSortMusicBy] = useState(timeRange[2].value);
  const gContext = useContext(GlobalContext);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 200);
  }, []);

  useEffect(() => {
    gContext.isLoading(true);
    const fetchData = async () => {
      const { data } = await getCurrentUserProfile();
      setProfile(data);

      const userTopTracks = await getTopTracks(sortMusicBy, 42);
      setTopTracks(userTopTracks.data);
      console.log(userTopTracks.data);
      gContext.isLoading(false);
    };

    catchErrors(fetchData());
  }, [sortMusicBy]);

  return (
    <PageWrapper>
      <>
        <motion.div
          className="w-full "
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.2, when: "beforeChildren" }}
        >
          <div className="flex justify-between flex-col sm:flex-row">
            <div className="font-bold text-3xl ">Top Songs</div>
            <div class="btn-group mt-4 sm:mt-0">
              {timeRange.map((term) => (
                <button
                  onClick={() => setSortMusicBy(term.value)}
                  className={`btn   btn-xs ${
                    sortMusicBy === term.value ? "btn-active" : ""
                  }`}
                >
                  {term.name}
                </button>
              ))}
            </div>
          </div>

          {!gContext.loading && (
            <motion.div
              variants={animationParentContainer}
              initial="hidden"
              animate="show"
              className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4 w-full "
            >
              {topTracks &&
                topTracks.items.map((song) => (
                  <motion.div
                    variants={animationParentContainer}
                    className="w-full"
                    key={song.id}
                  >
                    <GridWrapper
                      song={song}
                      variants={animationChildContainer}
                    />
                  </motion.div>
                ))}
            </motion.div>
          )}
        </motion.div>
        {gContext.loading && (
          <motion.div
            className="w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <PageLoading />
          </motion.div>
        )}
      </>
    </PageWrapper>
  );
};

export default MyMusic;
