import { useState, useEffect, useContext } from "react";
import { GridWrapper } from "../components/pageElements/GridWrapper";
import { PageWrapper } from "../components/wrappers/PageWrapper";
import GlobalContext from "../context/appContext";
import { getCurrentUserProfile, getTopTracks } from "../spotify";
import { motion } from "framer-motion/dist/es/index";
import { catchErrors } from "../utils";
import { PageLoading } from "../components/pageElements/PageLoading";

const container = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.1,
    },
  },
};

const listItem = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export const MyMusic = () => {
  const [profile, setProfile] = useState(null);
  const [topTracks, setTopTracks] = useState(null);
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

      const userTopTracks = await getTopTracks("short_term", 30);
      setTopTracks(userTopTracks.data);
      console.log(userTopTracks.data);
      gContext.isLoading(false);
    };

    catchErrors(fetchData());
  }, []);

  return (
    <PageWrapper>
      <>
        {!gContext.loading && (
          <motion.div
            className="w-full"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.2, when: "beforeChildren" }}
          >
            <div className="font-bold text-3xl ">Top Songs</div>
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4 w-full "
            >
              {topTracks &&
                topTracks.items.map((song) => (
                  <motion.div variants={container} className="w-full">
                    <GridWrapper song={song} variants={listItem} />
                  </motion.div>
                ))}
            </motion.div>
          </motion.div>
        )}
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
