// #current-time
function formatDate() {
  let now = new Date();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hour = now.getHours();
  let minutes = now.getMinutes();

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  return `${day} ${hour}:${minutes}`;
}

document.querySelector("#current-time").innerHTML = formatDate();

// search city
function showResults(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;

  let temperature = Math.round(response.data.main.temp);
  document.querySelector(".current-temp").innerHTML = temperature;

  let description = response.data.weather[0].description;
  document.querySelector(".weather-description").innerHTML = description;

  let wind = Math.round(response.data.wind.speed);
  document.querySelector(".wind-speed").innerHTML = wind;

  let humidity = Math.round(response.data.main.humidity);
  document.querySelector(".humidity").innerHTML = humidity;

  let currentIcon = document.querySelector("#current-temp-icon");
  currentIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function search(city) {
  let apiKey = "77ef935cfd0fb8845d0422ce5b03c720";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showResults);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-text").value;
  search(city);
}

let searchSubmit = document.querySelector("#search-engine");
searchSubmit.addEventListener("submit", searchCity);

// current location

function showPosition(event) {
  let apiKey = "77ef935cfd0fb8845d0422ce5b03c720";
  let lat = event.coords.latitude;
  let lon = event.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showResults);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

navigator.geolocation.getCurrentPosition(showPosition);

let currentLocationBtn = document.querySelector("#current-location");
currentLocationBtn.addEventListener("click", currentLocation);

// link for celsius and fahrenheit

function changeToFahrenheit(event) {
  event.preventDefault();
  let currentTemp = document.querySelector(".current-temp");
  currentTemp.innerHTML = Math.round(currentTemp.innerHTML * 1.8 + 32);
}
let fLink = document.querySelector("#fahrenheit-link");
fLink.addEventListener("click", changeToFahrenheit);

function changeToCelsius(event) {
  event.preventDefault();
  let currentTemp = document.querySelector(".current-temp");
  currentTemp.innerHTML = Math.round((currentTemp.innerHTML - 32) / 1.8);
}
let cLink = document.querySelector("#celsius-link");
cLink.addEventListener("click", changeToCelsius);
