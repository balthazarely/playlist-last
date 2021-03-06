import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { PageHeader } from "../components/pageElements/PageHeader";
import { PageWrapper } from "../components/wrappers/PageWrapper";
import { PlaylistResultsCard } from "../components/elements/cards/PlaylistResultsCard";
import GlobalContext from "../context/appContext";
import { createPlaylist, findRecommendedSongs, getSong } from "../spotify";
import { catchErrors } from "../utils";
import { motion } from "framer-motion/dist/es/index";
import { CreatePlaylistModal } from "../components/pageElements/CreatePlaylistModal";
import { MakePlaylistButton } from "../components/elements/buttons/MakePlaylistButton";
import { PageLoading } from "../components/pageElements/PageLoading";
import {
  animationChildContainer,
  animationParentContainer,
} from "../components/animations/animations";

const Playlist = () => {
  const { id } = useParams();
  const [song, setSong] = useState(null);
  const [similarSongs, setSimilarSongs] = useState(null);
  const [similarSongsUri, setSimilarSongsUri] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [fakeLoading, setFakeLoading] = useState(false);
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
      setSong(await getSong(id));
    };
    catchErrors(fetchData());
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      const { tracks } = await findRecommendedSongs(id);
      setSimilarSongs(tracks);
      setSimilarSongsUri(tracks.map((song) => song.uri));
      gContext.isLoading(false);
    };

    catchErrors(fetchData());
  }, [setSong, id]);

  const createPlaylistForUser = () => {
    setFakeLoading(true);
    setTimeout(() => {
      createPlaylist(song, similarSongsUri, "track");
      setFakeLoading(false);
      setModalOpen(true);
    }, 1000);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <PageWrapper>
      {!gContext.loading && (
        <motion.div
          className="w-full"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.2, when: "beforeChildren" }}
        >
          <PageHeader song={song} />

          <div className="w-full my-6 flex justify-between items-center">
            <MakePlaylistButton
              fakeLoading={fakeLoading}
              createPlaylistForUser={createPlaylistForUser}
            />
          </div>
          {song && similarSongs && (
            <motion.div
              variants={animationParentContainer}
              initial="hidden"
              animate="show"
              className=" grid grid-cols-1 gap-2 w-full  "
            >
              {similarSongs.map((song, i) => (
                <motion.div
                  variants={animationParentContainer}
                  className="w-full"
                  key={i}
                >
                  <PlaylistResultsCard
                    key={i}
                    song={song}
                    variants={animationChildContainer}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
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
      <div id="my-modal" className={`modal ${modalOpen && "modal-open"}`}>
        <CreatePlaylistModal closeModal={closeModal} modalOpen={modalOpen} />
      </div>
    </PageWrapper>
  );
};

export default Playlist;
