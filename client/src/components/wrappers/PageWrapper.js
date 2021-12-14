import React, { useContext } from "react";
import { AnimatePresence, motion } from "framer-motion/dist/es/index";
import GlobalContext from "../../context/appContext";
import SearchOverlay from "../pageElements/SearchOverlay";

export const PageWrapper = ({ children }) => {
  const gContext = useContext(GlobalContext);

  return (
    <div className=" flex flex-col items-center container mx-auto max-w-2xl mt-10 mb-10 px-2 h-full min-h-screen ">
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
