import { useState, useEffect, useContext } from "react";
import { catchErrors } from "../utils";
import { getCurrentUserProfile, searchForArtist } from "../spotify";
import { SearchInput } from "../components/elements/inputs/SearchInput";
import { PageWrapper } from "../components/wrappers/PageWrapper";
import GlobalContext from "../context/appContext";
import { motion } from "framer-motion/dist/es/index";
import {
  animationChildContainerProfile,
  animationParentContainer,
} from "../components/animations/animations";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const gContext = useContext(GlobalContext);

  const setUserInput = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getCurrentUserProfile();
      setProfile(data);
      gContext.logInUser(data);
    };

    catchErrors(fetchData());
  }, []);

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

  return (
    <PageWrapper>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          variants={animationParentContainer}
          initial="hidden"
          animate="show"
          className=" w-full "
        >
          {profile && (
            <motion.div
              className=" flex flex-col items-center justify-center max-w-sm gap-4"
              variants={animationParentContainer}
            >
              <motion.div
                variants={animationChildContainerProfile}
                className="text-3xl text-gray-200 font-bold"
              >
                Welcome to SongDive
              </motion.div>
              <motion.div
                variants={animationChildContainerProfile}
                className="text-md text-gray-200 text-center  mx-4 sm:mx-0"
              >
                Make your own spotify playlists from songs you already love!
                Either search below or look at your top played songs from
                selecting them in the menu.
              </motion.div>

              <motion.div
                variants={animationChildContainerProfile}
                className="text-xl text-gray-200 font-bold text-center mt-8"
              >
                Find songs similar to:
              </motion.div>
              <motion.div variants={animationChildContainerProfile}>
                <SearchInput
                  setUserInput={setUserInput}
                  searchQuery={searchQuery}
                  searchResults={searchResults}
                  loading={loading}
                />
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </PageWrapper>
  );
};

export default Profile;
