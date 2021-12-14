import { useState, useEffect, useContext } from "react";
import { catchErrors } from "../utils";
import {
  getCurrentUserPlaylists,
  getCurrentUserProfile,
  getTopArtists,
  searchForArtist,
} from "../spotify";
import { SearchInput } from "../components/elements/inputs/SearchInput";
import { PageWrapper } from "../components/wrappers/PageWrapper";
import GlobalContext from "../context/appContext";
import { AnimatePresence, motion } from "framer-motion/dist/es/index";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [playlists, setPlaylists] = useState(null);
  const [topArtists, setTopArtists] = useState(null);
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

      const userPlaylists = await getCurrentUserPlaylists();
      setPlaylists(userPlaylists.data);

      const userTopArtist = await getTopArtists();
      setTopArtists(userTopArtist.data);
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
    <div className="">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {profile && (
          <PageWrapper>
            <SearchInput
              setUserInput={setUserInput}
              searchQuery={searchQuery}
              searchResults={searchResults}
              loading={loading}
            />
          </PageWrapper>
        )}
      </motion.div>
    </div>
  );
};

export default Profile;
