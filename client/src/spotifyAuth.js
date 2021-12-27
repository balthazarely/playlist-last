export const createPlaylist = async (song, songUris, playlistType) => {
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
        body: JSON.stringify({
          name: `SongDive: Songs inspired by ${song.name}`,
          description: `This playlist is comprised of songs that sounds like ${song.name}`,
        }),
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
