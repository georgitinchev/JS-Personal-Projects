let weather = {
  apiKey: "455a8f30c0de00629144a98cf148ac03", // OpenWeatherMap API key
  unsplashApiKey: "AFhFDAIlIsd4HQ7YedVk3fiFoUMOhjdGXscqDGrGEgA", // Unsplash API key

  // Fetch weather data for a city
  fetchWeather: function (city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`)
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },

  // Fetch background image for the city
  fetchBackgroundImage: function (query) {
    fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&page=1&per_page=1`, {
      headers: {
        Authorization: `Client-ID ${this.unsplashApiKey}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.results.length > 0) {
          const imageUrl = data.results[0].urls.regular;
          document.body.style.backgroundImage = `url('${imageUrl}')`;
        } else {
          console.log("No background image found.");
        }
      })
      .catch((error) => console.error("Error fetching background image:", error));
  },

  // Display weather data on the page
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    this.fetchBackgroundImage(name);
  },

  // Search weather for the city input
  search: function () {
    const city = document.querySelector(".search-bar").value;
    if (city) {
      this.fetchWeather(city);
    } else {
      alert("Please enter a city name.");
    }
  },
};

// Event listeners for search functionality
document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    weather.search();
  }
});

// Initial fetch for default city
weather.fetchWeather("Sofia");
