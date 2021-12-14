import axios from "axios";

const LOCALSTORAGE_KEYS = {
  accessToken: "spotify_access_token",
  refreshToken: "spotify_refresh_token",
  expireTime: "spotify_token_expire_time",
  timestamp: "spotify_token_timestamp",
};

// Map to retrieve localStorage values
const LOCALSTORAGE_VALUES = {
  accessToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.accessToken),
  refreshToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.refreshToken),
  expireTime: window.localStorage.getItem(LOCALSTORAGE_KEYS.expireTime),
  timestamp: window.localStorage.getItem(LOCALSTORAGE_KEYS.timestamp),
};

export const logout = () => {
  // Clear all localStorage items
  for (const property in LOCALSTORAGE_KEYS) {
    window.localStorage.removeItem(LOCALSTORAGE_KEYS[property]);
  }
  // Navigate to homepage
  window.location = window.location.origin;
};

const hasTokenExpired = () => {
  const { accessToken, timestamp, expireTime } = LOCALSTORAGE_VALUES;
  if (!accessToken || !timestamp) {
    return false;
  }
  const millisecondsElapsed = Date.now() - Number(timestamp);
  return millisecondsElapsed / 1000 > Number(expireTime);
};

const refreshToken = async () => {
  try {
    // Logout if there's no refresh token stored or we've managed to get into a reload infinite loop
    if (
      !LOCALSTORAGE_VALUES.refreshToken ||
      LOCALSTORAGE_VALUES.refreshToken === "undefined" ||
      Date.now() - Number(LOCALSTORAGE_VALUES.timestamp) / 1000 < 1000
    ) {
      console.error("No refresh token available");
      logout();
    }

    // Use `/refresh_token` endpoint from our Node app
    const { data } = await axios.get(
      `/refresh_token?refresh_token=${LOCALSTORAGE_VALUES.refreshToken}`
    );

    // Update localStorage values
    window.localStorage.setItem(
      LOCALSTORAGE_KEYS.accessToken,
      data.access_token
    );
    window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());

    // Reload the page for localStorage updates to be reflected
    window.location.reload();
  } catch (e) {
    console.error(e);
  }
};

const getAccessToken = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const queryParams = {
    [LOCALSTORAGE_KEYS.accessToken]: urlParams.get("access_token"),
    [LOCALSTORAGE_KEYS.refreshToken]: urlParams.get("refresh_token"),
    [LOCALSTORAGE_KEYS.expireTime]: urlParams.get("expires_in"),
  };
  const hasError = urlParams.get("error");

  // If there's an error OR the token in localStorage has expired, refresh the token
  if (
    hasError ||
    hasTokenExpired() ||
    LOCALSTORAGE_VALUES.accessToken === "undefined"
  ) {
    refreshToken();
  }

  // If there is a valid access token in localStorage, use that
  if (
    LOCALSTORAGE_VALUES.accessToken &&
    LOCALSTORAGE_VALUES.accessToken !== "undefined"
  ) {
    return LOCALSTORAGE_VALUES.accessToken;
  }

  // If there is a token in the URL query params, user is logging in for the first time
  if (queryParams[LOCALSTORAGE_KEYS.accessToken]) {
    // Store the query params in localStorage
    for (const property in queryParams) {
      window.localStorage.setItem(property, queryParams[property]);
    }
    // Set timestamp
    window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());
    // Return access token from query params
    return queryParams[LOCALSTORAGE_KEYS.accessToken];
  }

  // We should never get here!
  return false;
};

export const accessToken = getAccessToken();

axios.defaults.baseURL = "https://api.spotify.com/v1";
axios.defaults.headers["Authorization"] = `Bearer ${accessToken}`;
axios.defaults.headers["Content-Type"] = "application/json";

// since we state the BaseRUL above, we dont need to include it in the call below.
// this returns a promise
/**
 * Get Current User's Profile
 * https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-current-users-profile
 * @returns {Promise}
 */
export const getCurrentUserProfile = () => axios.get("/me");

export const getCurrentUserPlaylists = (limit = 20) => {
  return axios.get(`/me/playlists?limit=${limit}`);
};

export const getTopArtists = (time_range = "short_term", limit) => {
  return axios.get(`/me/top/artists?time_range=${time_range}&limit=${limit}`);
};

export const getTopTracks = (time_range = "short_term", limit) => {
  return axios.get(`/me/top/tracks?time_range=${time_range}&limit=${limit}`);
};

export const playSong = async () => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  let play = await fetch(`https://api.spotify.com/v1/me/player/play`, {
    method: "PUT",
    body: JSON.stringify({ uris: ["spotify:album:2Ds60s4LcHcb77dNQm22kA"] }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

async function getUser() {
  let response = await getCurrentUserProfile();
  console.log(response.data.id);
  return response.data.id;
}

export const createPlaylist = async (song, songUris) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    let userId = await getUser();
    let dataFetch = await fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ name: `Songs inspired by ${song.name}` }),
      }
    );
    let data = await dataFetch.json();
    let playlist = await fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists/${data.id}/tracks`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ uris: songUris }),
      }
    );
  } catch (err) {
    console.log(
      "hmm, looks like the developer messed up here... or the api changed"
    );
  }
};

export const searchForArtist = async (searchQuery) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  try {
    let response = await fetch(
      `https://api.spotify.com/v1/search?q=${searchQuery}&type=track%2Cartist&market=ES&limit=6`,
      {
        headers: headers,
      }
    );
    return response.json();
  } catch (err) {
    console.log("error");
  }
};

export const getSong = async (songID) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  try {
    let response = await fetch(
      `https://api.spotify.com/v1/tracks/${songID}`,

      {
        headers: headers,
      }
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const findRecommendedSongs = async (songId) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    let response = await fetch(
      `https://api.spotify.com/v1/recommendations?seed_tracks=${songId}&limit=50`,

      {
        headers: headers,
      }
    );

    return response.json();
  } catch (error) {
    console.log(error);
  }
};
