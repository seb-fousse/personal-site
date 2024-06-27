function openWeatherIconToFontAwesome(iconCode) {
	const code = iconCode.substring(0,2);
	const day = iconCode.substring(2,3) == 'd';
	switch (code) {
		case '01':
			return day ? 'sun' : 'moon';
		case '02':
			return day ? 'cloud-sun' : 'cloud-moon';
		case '03':
			return 'cloud';
		case '04':
			return 'cloud';
		case '09':
			return 'cloud-showers-heavy';
		case '10':
			return day ? 'cloud-sun-rain' : 'cloud-moon-rain';
		case '11':
			return 'cloud-bolt';
		case '13':
			return 'snowflake';
		case '50':
			return 'smog';
		default:
			return 'meteor';
	}
}

export default async function handler(req, res) {
	if(req.method === "GET") {
		const url = new URL("https://api.openweathermap.org/data/2.5/weather");
  	url.searchParams.append("q", "Brooklyn");
		url.searchParams.append("appid", process.env.OPENWEATHER_API_KEY);
		url.searchParams.append("units", "metric");

		try {
			const response = await fetch(url);

			if (!response.ok) {
				return res.status(response.status).json({ error: `Error: ${response.status} ${response.statusText}` });
			}

			const weatherData = await response.json();
			const dataTrimmed = {
				"coord": weatherData.coord,
				"temp": weatherData.main.temp,
				"feels_like": weatherData.main.feels_like,
				"icon": openWeatherIconToFontAwesome(weatherData.weather[0].icon),
				"type": weatherData.weather[0].main,
				"description": weatherData.weather[0].description,
			}

			console.log('Success fetching weather');
			return res.status(200).json(dataTrimmed);
		} catch (error) {
			console.error('Error fetching weather:', error.message);
			return res.status(500).json({ error: 'Internal Server Error'})
		}
	} else {
		return res.status(405).json({ message: 'Method not allowed'});
	}
}

