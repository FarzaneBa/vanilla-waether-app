//display time
function timezone(time) {
  let date = new Date(time);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thusday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

//function for display forcast
function getForcast(coordinates) {
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  let apiKey = `53647c12f67effb0b2c13aa8c1aa18af`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  axios.get(apiUrl).then(dispalyForcast);
}
// display weather description
function showDescribtion(response) {
  let displayCityName = document.querySelector("#city-name");
  let displayTemp = document.querySelector(".temp");
  let displayWind = document.querySelector("#wind");
  let displayWeatherDes = document.querySelector("#description");
  let displayHumidity = document.querySelector("#humidity");
  let displayTime = document.querySelector("#time");
  let displayIcon = document.querySelector("#icon");
  showCelsuis = Math.round(response.data.list[0].main.temp - 273.15);
  displayIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.list[0].weather[0].icon}@2x.png`
  );
  displayTime.innerHTML = timezone(response.data.list[0].dt * 1000);
  displayHumidity.innerHTML = `${response.data.list[0].main.humidity} %`;
  displayWeatherDes.innerHTML = response.data.list[0].weather[0].description;
  displayWind.innerHTML = `${Math.round(response.data.list[0].wind.speed)} m/h`;
  displayTemp.innerHTML = Math.round(response.data.list[0].main.temp - 273.15);
  displayCityName.innerHTML = response.data.list[0].name;

  getForcast(response.data.list[0].coord);
}

function handleclick(event) {
  event.preventDefault();

  let city = document.querySelector("#city");
  let apiKey = `f9ecda2c689aa064746066d544f0c32b`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/find?q=${city.value}&appid=${apiKey}`;

  axios.get(apiUrl).then(showDescribtion);
}
let showCelsuis = null;
let submitCity = document.querySelector("form");
submitCity.addEventListener("submit", handleclick);

//unit conversion

function showCelsius(event) {
  event.preventDefault();
  celsius.classList.add("active");
  fahrenhite.classList.remove("active");
  let displayTemp = document.querySelector(".temp");
  displayTemp.innerHTML = showCelsuis;
}

function showFahenhite(event) {
  event.preventDefault();
  fahrenhite.classList.add("active");
  celsius.classList.remove("active");
  let displayTemp = document.querySelector(".temp");
  displayTemp.innerHTML = Math.round((showCelsuis * 9) / 5 + 32);
}
let celsius = document.querySelector("#cel");
let fahrenhite = document.querySelector("#fa");

celsius.addEventListener("click", showCelsius);
fahrenhite.addEventListener("click", showFahenhite);

//forcast
function formatDate(time) {
  let date = new Date(time);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thusday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return day;
}
function dispalyForcast(response) {
  console.log(response.data.daily);
  let forcast = response.data.daily;
  let forcastElement = document.querySelector("#forcast");
  forcastHtml = `<div class="row">`;
  forcast.forEach(function (forcastDay, index) {
    if (index < 4) {
      forcastHtml += ` <div class="col-3 text-center" >
          <h1 id="forcast-day">${formatDate(forcastDay.dt * 1000)}</h1>
          <img
            src="https://openweathermap.org/img/wn/${
              forcastDay.weather[0].icon
            }@2x.png"
            alt=""
          />
          <span id="min-temp">${Math.round(
            forcastDay.temp.min - 273.15
          )} °</span>
          <span id="max-temp">${Math.round(
            forcastDay.temp.max - 273.15
          )} °</span>
        </div>
      `;
    }
  });
  forcastHtml = forcastHtml + `</div>`;
  forcastElement.innerHTML = forcastHtml;
}
// dispalyForcast();
