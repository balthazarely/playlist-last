import React from "react";
import { listNamesFunction } from "../../utils";

export const PageHeader = ({ song }) => {
  return (
    <div className="w-full font-bold text-4xl">
      <div className="font-base text-xs uppercase mb-2 tracking-wider text-gray-400">
        Songs similar to
      </div>

      {song && (
        <>
          <div className="text-primary-content lg:text-4xl md:text-3xl text-2xl">
            {song.name}
          </div>
          <div className="text-primary-content lg:text-2xl md:text-xl text-lg mt-0 lg:mt-2">
            by {listNamesFunction(song.artists)}
          </div>
        </>
      )}
    </div>
  );
};
