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

          });
    dateandTime()
    get5DayForecast()


  })}

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

function date (){
var tomorrow = new Date()
tomorrow.setDate(new Date().getDate() + 1)
document.getElementById("tdate").innerHTML = tomorrow;

}
  button.addEventListener("click", displaySearchHistory);
  button.addEventListener("click", getWeather);

  