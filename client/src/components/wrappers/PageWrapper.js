import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion/dist/es/index";
import GlobalContext from "../../context/appContext";
import SearchOverlay from "../pageElements/SearchOverlay";

const loadStyle = {
  height: "calc(100vh + 10px)",
};

const loadStyleSeach = {
  height: "80vh",
};

export const PageWrapper = ({ children }) => {
  const gContext = useContext(GlobalContext);
  const location = useLocation();

  return (
    <div
      style={
        location.pathname !== "/" && location.pathname !== "/explore-genre"
          ? loadStyle
          : loadStyleSeach
      }
      className=" flex flex-col items-center container mx-auto max-w-2xl mt-10 mb-10 px-2 h-full min-h-96 "
    >
      <>{children}</>
      <AnimatePresence>
        {gContext.showSearchOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 w-full h-screen bg-base-200 bg-opacity-90 "
          >
            <SearchOverlay />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
