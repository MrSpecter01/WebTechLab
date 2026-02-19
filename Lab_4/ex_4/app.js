const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherDisplay = document.getElementById('weatherDisplay');
const loader = document.getElementById('loader');
const errorMsg = document.getElementById('errorMsg');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (!city) return;

    // Reset UI
    errorMsg.classList.add('hidden');
    weatherDisplay.classList.add('hidden');
    loader.classList.remove('hidden');

    // Step 1: Get Coordinates for the City Name
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`;

    fetch(geoUrl)
        .then(res => res.json())
        .then(geoData => {
            if (!geoData.results) throw new Error("City not found");
            
            const { latitude, longitude, name, country } = geoData.results[0];
            document.getElementById('cityName').innerText = `${name}, ${country}`;

            // Step 2: Get Weather using Coordinates
            return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
        })
        .then(res => res.json())
        .then(weatherData => {
            const current = weatherData.current_weather;
            document.getElementById('temp').innerText = `Temperature: ${current.temperature}°C`;
            document.getElementById('condition').innerText = `Wind Speed: ${current.windspeed} km/h`;
            
            weatherDisplay.classList.remove('hidden');
        })
        .catch(err => {
            errorMsg.innerText = err.message;
            errorMsg.classList.remove('hidden');
        })
        .finally(() => {
            loader.classList.add('hidden');
        });
});