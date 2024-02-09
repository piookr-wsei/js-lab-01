document.addEventListener('DOMContentLoaded', () => {
  const weatherContainer = document.getElementById('weatherContainer');
  const locationInput = document.getElementById('locationInput');
  const addLocationButton = document.getElementById('addLocation');

  let locations = JSON.parse(localStorage.getItem('locations') || '[]');

  function fetchWeather(location) {
    const apiKey = '80c1ac3774d748bb5248f2f0dd531d04';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
        const weather = {
        location: data.name,
        temperature: data.main.temp,
        humidity: data.main.humidity,
        icon: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
        };
        displayWeather(weather);
        saveLocation(location);
        })
        .catch(error => console.error('Error fetching weather:', error));
  }

  function displayWeather(weather) {
    const weatherCard = document.createElement('div');
    weatherCard.className = 'weather-card';
    weatherCard.innerHTML = `
        <h3>${weather.location}</h3>
        <img src="${weather.icon}" class="weather-icon" alt="Weather Icon">
        <p>Temperature: ${weather.temperature}°C</p>
        <p>Humidity: ${weather.humidity}%</p>
    `;
    weatherContainer.appendChild(weatherCard);
  }

  function saveLocation(location) {
    if (!locations.includes(location)) {
        locations.push(location);
        localStorage.setItem('locations', JSON.stringify(locations));
    }
  }

  function loadLocations() {
    locations.forEach(location => fetchWeather(location));
  }

  addLocationButton.addEventListener('click', () => {
    const location = locationInput.value;
    fetchWeather(location);
    locationInput.value = '';
  });

  window.addEventListener('load', loadLocations);
})