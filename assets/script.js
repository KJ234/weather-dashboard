var formInput = document.querySelector(".form-input");
var button = document.querySelector(".searchBtn");
var currentTempEl = document.querySelector("#temperature");
var currentHumidityEl = document.querySelector("#humidity");
var currentWindEl = document.querySelector("#wind-speed");
var DisplayOnPage = document.querySelector("#searchHistory");
var currentUVEl = document.querySelector("#UV-index");
var TodayEl = document.querySelector("#currentDay");
var TimeEl = document.querySelector(".time");
var forecastEls = document.querySelectorAll(".five-day");
var historyEl = document.getElementById("history");
var futureTemp = document.getElementById("futuretemp");
var futureWind = document.getElementById("futurewind");
var futureHumidity = document.getElementById("futurehumidity");

// generated api key form the openweather website
var APIKey = "bd0d0c0b9ffe1286395e4abb56d49400";

// function to get the weather from the api and display on the page
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
      // Will display the uv index
        fetch( "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&cnt=1")
        .then(function (response) {
          return response.json();
        })
        .then(function(data){
            console.log(data)
            currentUVEl.innerHTML = "";
            currentUVEl.textContent = "UV Index: "+ data[0].value

          });
    dateandTime()
    get5DayForecast()

    var color = document.getElementById("check-box")
          
// if statement to change UVindex color depending on number
    if(currentUVEl.value <= 2){
        color.className="green"
    } else if (currentUVEl.value <= 3 | currentUVEl.value > 5 ) {
        color.className="yellow"
    } else if (currentUVEl.value <= 6 | currentUVEl.value > 7) {
        color.className="orange"
    } else if (currentUVEl.value <= 8 | currentUVEl.value > 10){
        color.className="red"
    } else color.className="purple"


  })}
  
//display the search history
  function displaySearchHistory() {
    var cityButtons = document.createElement("ul")
    cityButtons.textContent = formInput.value
    DisplayOnPage.appendChild(cityButtons)
    
  }

  function dateandTime(){
    TodayEl.innerHTML = formInput.value
    var d = new Date();
    document.getElementById("time").innerHTML = d;
  }

  // will display the five day forecast
    function get5DayForecast (){
  fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + formInput.value + "&appid=" + APIKey + "&cnt=5")
  .then(function (response) {
    return response.json();
  })
  .then(function(response){

    futureWind.innerHTML="";
    futureHumidity.innerHTML="";
    futureTemp.innerHTML="";

    var allDivs = []
     // for statement to show the forecast for the next 5 days
    for(var i=0;i<response.list.length;i++){

        document.querySelector("#results").innerHTML="";
        var div = document.createElement("div");

        
        var item = response.list[i];
        var TemperatureEl = document.createElement("ul");
        TemperatureEl.innerHTML = "Temperature: " +response.list[i].main.temp +  "&#176F"
        div.appendChild(TemperatureEl) 

        var HumidityEl = document.createElement("ul")
        HumidityEl.innerHTML = "Humidity: " +response.list[i].main.humidity + "%"
        div.appendChild(HumidityEl) 
        
        var windEl = document.createElement("ul")
        windEl.innerHTML = "Wind Speed: " +response.list[i].wind.speed + " MPH"
        div.appendChild(windEl)    

        allDivs.push(div);
    }

    allDivs.forEach(item=>{
        document.querySelector("#results").appendChild(item);
    })
  })
  date()
}

// displays todays and tomorrows date
function date (){
var tomorrow = new Date()
tomorrow.setDate(new Date().getDate() + 1)
document.getElementById("tdate").innerHTML = tomorrow;

}

// event listeners for the buttons
  button.addEventListener("click", displaySearchHistory);
  button.addEventListener("click", getWeather);

  