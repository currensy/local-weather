'use strict';
$(document).ready(function() {


  var weatherIconUrl = "http://openweathermap.org/img/w/{id}.png";
  var temp = {};
  var roundedTemparature = 0;
  var tempInFahrenheit = 0;
  var weather = {};


  getLocation().done(function(data) {
    var loc = data.loc.split(",");
    var lat = loc[0];
    var lon = loc[1];
    getWeather(lat, lon).done(function(weatherData) {
      weather = new Weather(weatherData.name, weatherData.sys.country, weatherData.weather[0].main, weatherData.weather[0].id,weatherData.main.temp,"celsius");
      console.log(weather.getCity());
      $("#location").html(weather.getCity() +", "+weather.getCountry());
      $("#temp").html(weather.getTemp() + getUnitGlyphicon(weather.getUnit()));
      $("#weather-text").html(weather.getWeather());
      $("#icon").html(changeIcon(weather.getweatherId()));
    });



  });

  $("#temp").click(function(){
      changeTempUnit();
  });

  function changeTempUnit(){
    var temp = weather.getTemp();
    var unit = weather.getUnit();
    if (unit==="celsius") {
      weather.setUnit("fahrenheit");
      weather.setTemp(tempConvertor().toFahrenheit(temp))
    } else if(unit==="fahrenheit"){
      weather.setUnit("celsius");
      weather.setTemp(tempConvertor().toCelsius(temp));
    }

    $("#temp").html(weather.getTemp() + getUnitGlyphicon(weather.getUnit()));

  }

  function tempConvertor(){
    return {
      toFahrenheit: function(celsius){
        return Math.round((celsius*9)/5+32);
      },
      toCelsius: function(fahrenheit){
        return Math.round(((fahrenheit-32)*5)/9);
      }
    }
  }

  function getUnitGlyphicon(unit){
    return unit==="celsius" ? ' <i class="wi wi-celsius"></i>' : ' <i class="wi wi-fahrenheit"></i>';
  }


  function Weather(city, country, weather, weatherId,temp,unit) {

    var self = this;

    self.city = city;
    self.country = country;
    self.weather = weather;
    self.weatherId = weatherId;
    self.temp = Math.round(temp);
    self.unit = unit;


    return {
      getCity: function() {
        return self.city;
      },
      getCountry: function() {
        return self.country;
      },
      getWeather: function() {
        return self.weather;
      },
      getweatherId: function() {
        return self.weatherId;
      },
      getTemp: function() {
        return self.temp;
      },
      getUnit: function() {
        return self.unit;
      },
      setUnit: function(unit){
        self.unit = unit;
      },
      setTemp: function(temp){
        self.temp = temp;
      }
    };
};


  function getWeather(lat, lon) {
    var weatherApi = "http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&APPID=9ba037edaaa09f9ce875786979b66dc6&units=metric";
    var url = weatherApi.replace('{lat}', lat).replace('{lon}', lon);
    console.log(url);
    return $.get(url);
  }

  function getLocation() {
    return $.getJSON('http://ipinfo.io');
  }



function changeIcon(id){
  var i = id===800 ? 800 : id[0];
  switch(i){
    case 800:
    return '<i class="wi wi-day-sunny"></i>';
    break;
    case 2:
    return '<i class="wi wi-thunderstorm"></i>';
    break;
    case 3:
    return '<i class="wi wi-rain-wind"></i>';
    break;
    case 5:
    return '<i class="wi wi-rain"></i>';
    break;
    case 6:
    return '<i class="wi wi-snow"></i>';
    break;
    case 8:
    return '<i class="wi wi-cloudy"></i>';
    break;
  }
}


});
