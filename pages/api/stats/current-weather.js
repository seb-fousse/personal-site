

export default async function handler(req, res) {
	if(req.method === "GET") {
		const url = new URL("https://api.openweathermap.org/data/2.5/weather");
  	url.searchParams.append("q", "Brooklyn");
		url.searchParams.append("appid", process.env.OPENWEATHER_API_KEY);
		url.searchParams.append("units", "metric");

		try {
			const response = await fetch(url);

			if (!response.ok) {
				if (response.status === 401) {
					return res.status(401).json({ error: 'Unauthorized: Access token is missing or invalid' });
				} else if (response.status === 403) {
					return res.status(403).json({ error: 'Forbidden: You do not have the required permissions' });
				} else if (response.status === 429) {
					return res.status(429).json({ error: 'Too Many Requests: You have exceeded your rate limit' });
				} else {
					return res.status(response.status).json({ error: `Error: ${response.status} ${response.statusText}` });
				}
			}

			const weatherData = await response.json();
			console.log('Weather API response:', weatherData);
			return res.status(200).json(weatherData);
		} catch (error) {
			console.error('Error getting weather:', error.message);
			return res.status(500).json({ error: 'Internal Server Error'})
		}
	} else {
		return res.status(405).json({ message: 'Method not allowed'});
	}
}

