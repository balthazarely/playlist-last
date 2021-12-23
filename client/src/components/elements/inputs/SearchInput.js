import React from "react";
import SearchResultCard from "../cards/SearchResultCard";
import { SearchCircleIcon } from "@heroicons/react/solid";

export const SearchInput = ({
  setUserInput,
  searchQuery,
  searchResults,
  loading,
}) => {
  return (
    <div className="relative w-96 sm:px-0 px-6 ">
      <input
        type="text"
        placeholder="Enter song name"
        className="input  input-primary rounded-3xl w-full   text-md shadow-xl"
        onChange={(e) => setUserInput(e.target.value)}
        value={searchQuery}
      />
      <div className="h-8 w-8  sm:right-3 right-9 top-2 absolute flex items-center  justify-center ">
        {!loading ? (
          <SearchCircleIcon className=" text-primary " />
        ) : (
          <div className="relative h-7 w-7 animate-spin rounded-full bg-gradient-to-r from-primary to-base-100   ">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-base-100 rounded-full "></div>
          </div>
        )}
      </div>
      {searchResults &&
        searchQuery.length > 2 &&
        !loading &&
        searchResults.items.length > 0 && (
          <div className="bg-base-100 mt-2 p-3 rounded-3xl border-primary border shadow-2xl">
            <div style={{ color: "white" }}>
              {searchResults.items.map((song, i) => (
                <SearchResultCard song={song} key={i} largeText={true} />
              ))}
            </div>
          </div>
        )}
      {searchResults &&
        searchQuery.length > 2 &&
        !loading &&
        searchResults.items.length === 0 && (
          <div className={`text-center mt-8 text-lg font-bold text-gray-400`}>
            No results
          </div>
        )}
    </div>
  );
};
