function showDescribtion(response) {
  console.log(response);
}

function handleclick(event) {
  event.preventDefault();
  let city = document.querySelector("#city");
  let apiKey = `f9ecda2c689aa064746066d544f0c32b`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/find?q=${city.value}&appid=${apiKey}`;
  axios.get(apiUrl).then(showDescribtion);
}

let submitCity = document.querySelector("button");
submitCity.addEventListener("submit", handleclick);
