$(document).ready(function() {


  var weatherApi = "http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&APPID=9ba037edaaa09f9ce875786979b66dc6&units=metric";
  var weatherIconUrl = "http://openweathermap.org/img/w/{id}.png";
  var temp = {};
  var roundedTemparature = 0;
  var tempInFahrenheit = 0;


  getLocation().done(function(data) {
    var loc = data.loc.split(",");
    var lat = loc[0];
    var lon = loc[1];
    getWeather(lat, lon).done(function(weatherData) {
      var weather = new Weather(weatherData.name, weatherData.sys.country, weatherData.weather[0].main, weatherData.weather[0].id);
      console.log(weather.city);
    });



  });


  function Weather(city, country, weather, weatherId) {

    this.city = city;
    this.country = country;
    this.weather = weather;
    this.weatherId = weatherId;

    this.getCity = function() {
      return this.city;
    }

    // getCity: function() {
    //     return this.city;
    //   },
    //   getCountry: function() {
    //     return this.country;
    //   },
    //   getWeather: function() {
    //     return this.weather;
    //   },
    //   getweatherId: function() {
    //     return this.weatherId;
    //   }

  };


  function getWeather(lat, lon) {
    var url = weatherApi.replace('{lat}', lat).replace('{lon}', lon);
    console.log(url);
    return $.get(url);
  }

  function getLocation() {
    return $.getJSON('http://ipinfo.io');
  }




});
