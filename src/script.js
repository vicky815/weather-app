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

 let apiKey = "77ef935cfd0fb8845d0422ce5b03c720";
  let city = "Toronto";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

function showResults(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  document.querySelector("#current-temp").innerHTML = temperature;

  let currentIcon = document.querySelector("#current-temp-icon");
  currentIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

axios.get(apiUrl).then(showResults);

