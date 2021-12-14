import React, { useState } from "react";

export const AdvancedSearch = () => {
  const [danceability, setDanceability] = useState(50);
  const [energy, setEnergy] = useState(50);
  const [popularity, setPopularity] = useState(50);

  return (
    <div class="collapse-content flex flex-col">
      <div className="flex flex-row ">
        <div>
          danceability: {danceability}
          <input
            type="range"
            max="100"
            name="danceability"
            value={danceability}
            class="range range-primary range-sm  "
            onChange={(e) => setDanceability(e.target.value)}
          />
        </div>
        <div className="mx-4">
          energy: {energy}
          <input
            type="range"
            max="100"
            name="energy"
            value={energy}
            class="range range-primary range-sm  "
            onChange={(e) => setEnergy(e.target.value)}
          />
        </div>
        <div>
          popularity: {popularity}
          <input
            type="range"
            max="100"
            name="popularity"
            value={popularity}
            class="range range-primary range-sm  "
            onChange={(e) => setPopularity(e.target.value)}
          />
        </div>
      </div>
      <button>go</button>
    </div>
  );
};
