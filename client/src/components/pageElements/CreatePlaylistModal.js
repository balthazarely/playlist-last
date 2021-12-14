import React from "react";
import { HiBadgeCheck } from "react-icons/hi";
import { motion } from "framer-motion/dist/es/index";

export const CreatePlaylistModal = ({ modalOpen, closeModal }) => {
  return (
    <div class="modal-box flex flex-col justify-center items-center bg-base-300">
      {modalOpen && (
        <>
          <motion.div
            animate={{ scale: 1 }}
            initial={{ scale: 0 }}
            transition={{
              duration: 0.25,
              delay: 0.1,
              type: "spring",
              stiffness: 700,
              damping: 20,
            }}
          >
            <HiBadgeCheck className="h-12 w-12 text-primary" />
          </motion.div>
          <div className="font-bold text-3xl mt-1">Great success!</div>
          <div className="text-lg font-base ">
            Your new playlist can be found in your spotify app!
          </div>
          <div class="modal-action">
            <button onClick={closeModal} class="btn btn-primary">
              close
            </button>
          </div>
        </>
      )}
    </div>
  );
};
