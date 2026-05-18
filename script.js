const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherResult = document.getElementById("weatherResult");

async function getWeather(city) {
  weatherResult.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch(`https://wttr.in/${city}?format=j1`);
    const data = await response.json();

    const current = data.current_condition[0];

    weatherResult.innerHTML = `
      <h2>${city}</h2>
      <p>Temperature: ${current.temp_C} °C</p>
      <p>Weather: ${current.weatherDesc[0].value}</p>
      <p>Humidity: ${current.humidity}%</p>
      <p>Wind Speed: ${current.windspeedKmph} km/h</p>
    `;
  } catch (error) {
    weatherResult.innerHTML =
      "<p>Failed to fetch weather data. Please try again.</p>";
    console.error(error);
  }
}

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
  } else {
    alert("Please enter a city name.");
  }
});

// Load default city on page load
getWeather("Hyderabad");
