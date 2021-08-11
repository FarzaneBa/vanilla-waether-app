//display time
function timezone(time) {
  let date = new Date(time);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thusday",
    "friday",
    "saturday",
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
// display weather description
function showDescribtion(response) {
  let displayCityName = document.querySelector("#city-name");
  let displayTemp = document.querySelector(".temp");
  let displayWind = document.querySelector("#wind");
  let displayWeatherDes = document.querySelector("#description");
  let displayHumidity = document.querySelector("#humidity");
  let displayTime = document.querySelector("#time");
  let displayIcon = document.querySelector("#icon");

  displayIcon.setAttribute("src");
  displayTime.innerHTML = timezone(response.data.list[0].dt * 1000);
  displayHumidity.innerHTML = `${response.data.list[0].main.humidity} %`;
  displayWeatherDes.innerHTML = response.data.list[0].weather[0].description;
  displayWind.innerHTML = `${Math.round(
    response.data.list[0].wind.speed
  )} Km/h`;
  displayTemp.innerHTML = Math.round(response.data.list[0].main.temp - 273.15);
  displayCityName.innerHTML = response.data.list[0].name;
}

function handleclick(event) {
  event.preventDefault();

  let city = document.querySelector("#city");
  let apiKey = `f9ecda2c689aa064746066d544f0c32b`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/find?q=${city.value}&appid=${apiKey}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showDescribtion);
}

let submitCity = document.querySelector("form");
submitCity.addEventListener("submit", handleclick);
