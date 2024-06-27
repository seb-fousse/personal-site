async function getAccessToken() {
  const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
      ).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });

  return response.json();
};

async function recentlyPlayed(limit = 1) {
  const { access_token } = await getAccessToken();
  const url = new URL("https://api.spotify.com/v1/me/player/recently-played");
  url.searchParams.append("limit", limit);

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};


export default async function handler(req, res) {
  if(req.method === "GET") {
    try {
      const response = await recentlyPlayed(); // recently played defaults to returning the a single recently played song
      
      if (!response.ok) {
        return res.status(response.status).json({ error: `Error: ${response.status} ${response.statusText}` });
      }

      const { items } = await response.json();
      
      if (!items) {
        return res.status(500).json({ error: 'Failed to retrieve recently played items' });
      }

      const tracks = items.map((e) => ({
        title: e.track.name,
        artist: e.track.artists.map((_artist) => _artist.name).join(", "),
        href: e.track.external_urls.spotify,
        coverImage: e.track.album.images[1],
      }));

      console.log('Success fetching recently played tracks');
      return res.status(200).json(tracks);
    } catch (error) {
      console.error('Error fetching recently played tracks:', error.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed'});
  }
}