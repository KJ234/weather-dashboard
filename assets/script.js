var formInput = document.querySelector(".form-input");
var button = document.querySelector(".searchBtn");
var currentTempEl = document.querySelector("#temperature");
var currentHumidityEl = document.querySelector("#humidity");
var currentWindEl = document.querySelector("#wind-speed");
var DisplayOnPage = document.querySelector("#searchHistory");
var currentUVEl = document.querySelector(".UV-index");
var TodayEl = document.querySelector("#currentDay");
var TimeEl = document.querySelector(".time");
var forecastEls = document.querySelectorAll(".five-day");


var APIKey = "bd0d0c0b9ffe1286395e4abb56d49400";

function getWeather() {

    fetch ( "https://api.openweathermap.org/data/2.5/weather?q=" + formInput.value + "&appid=" + APIKey)
   .then(function (response) {
      return response.json();
    })
    .then(function (data) { console.log(data)
      currentHumidityEl.innerHTML = "Humidity: " + data.main.humidity + "%"
      currentTempEl.innerHTML = "Temperature: " + data.main.temp + "&#176F"
      currentWindEl.innerHTML = "Wind Speed: " + data.wind.speed + " MPH" 
      var lat = data.coord.lat;
      var lon = data.coord.lon;
        fetch( "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&cnt=1")
        .then(function (response) {
          return response.json();
        })
        .then(function(data){
            console.log(data)

            currentUVEl.innerHTML = "";
            currentUVEl.textContent = "UV Index: "+ data[0].value
      
        })})
    
    function displaySearchHistory(event) {
            var cityButtons = document.createElement("button")
            cityButtons.textContent = formInput.value
            DisplayOnPage.appendChild(cityButtons)
            event.preventDefault();
          }


    button.addEventListener("click", displaySearchHistory);
    button.addEventListener("click", getWeather);

  }
    