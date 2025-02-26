document.addEventListener('DOMContentLoaded', () => {
  const API_KEY = config.WEATHER_API_KEY; // Access the API key from config.js

  // Function to fetch weather data
  function getWeatherData(zipcode) {
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=${API_KEY}`;
    console.log(`Fetching weather data from: ${url}`);
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        console.log('Weather data:', data);
        displayWeatherData(data);
      })
      .catch(error => console.error('Error fetching the weather data:', error));
  }

  // Function to display weather data
  function displayWeatherData(data) {
    const cityName = document.querySelector('.city_name');
    const temperature = document.querySelector('.temperature');
    const weatherIcon = document.querySelector('.weather_icon');

    if (data.cod === 200) {
      cityName.textContent = data.name;
      temperature.textContent = `${(data.main.temp - 273.15).toFixed(2)}°C`; // Convert from Kelvin to Celsius
      const iconCode = data.weather[0].icon;
      weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}.png`; // Use HTTPS
      weatherIcon.alt = data.weather[0].description;
    } else {
      cityName.textContent = 'Error';
      temperature.textContent = data.message;
    }
  }

  // Function to handle search button click and form submit
  function handleSearch() {
    const zipcode = document.querySelector('.zipcode').value.trim();
    if (zipcode) {
      getWeatherData(zipcode);
      document.querySelector('.zipcode').blur(); // Hide the highlight on the input field
    } else {
      console.error('Zipcode is required');
    }
  }

  // Add event listener to the search button
  document.querySelector('.search-button').addEventListener('click', handleSearch);

  // Add event listener to the form
  document.getElementById('weatherForm').addEventListener('submit', event => {
    event.preventDefault(); // Prevent the default form submission
    handleSearch();
  });

  // Add event listener for the Enter key
  document.querySelector('.zipcode').addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearch();
    }
  });
});
