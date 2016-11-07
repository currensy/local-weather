$(document).ready(function() {


  var weatherApi = "http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&APPID=9ba037edaaa09f9ce875786979b66dc6&units=metric";
  var weatherIconUrl = "http://openweathermap.org/img/w/{id}.png";
  var temp = {};
  var roundedTemparature = 0;
  var tempInFahrenheit = 0;

  var weatherMapTable = {
    2: 'wi-thunderstorm',
    3: 'wi-raindrops',
    5: 'wi-rain',
    6: 'wi-snow',
    800: 'wi-day-sunny',
    8: 'wi-cloudy'
  };


  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var url = weatherApi.replace('{lat}', position.coords.latitude).replace('{lon}', position.coords.longitude);
      console.log(weatherApi.replace('{lat}', position.coords.latitude).replace('{lon}', position.coords.longitude));
      $.get(url, function(data) {
        var cityName = data.name;
        var country = data.sys.country;
        var weather = data.weather[0].main;
        var icon = data.weather[0].icon;
        var weatherId = (data.weather[0].id == 800) ? 800 : data.weather[0].id[0];
        roundedTemparature = Math.round(data.main.temp);
        tempInFahrenheit = celsiusToFahrenheit(roundedTemparature);
        temp = {
          degrees: Math.round(data.main.temp),
          unit: "celsius"
        };

        $("#location").html(cityName + ", " + country);
        $("#temp").html(temp.degrees + " " + setWeatherMetrics(temp));
        $("#weather-text").html(weather).append('<i class="wi ' + weatherMapTable[weatherId] + '"></i>');
        //$("#icon").html('<i class="wi ' + weatherMapTable[weatherId] + '"></i>');
        //$("#icon").css('background-image', 'url(' + weatherIconUrl.replace('{id}', icon) + ')');

      });

      $("#data").html("latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude);


    });
  }

  $("#temp").click(function(){
    changeMetric(temp);
    $("#temp").html(temp.degrees + " " + setWeatherMetrics(temp));
  });


  function changeMetric(temp){
    if (isCelsius(temp.unit)) {
      temp.degrees = tempInFahrenheit;
      temp.unit = "fahrenheit";
    } else {
      temp.degrees = roundedTemparature;
      temp.unit = "celsius";
    }
  }

  function isCelsius(temp){
    return temp==="celsius";
  }

  function celsiusToFahrenheit(temp){
    return Math.round((temp*9)/5+32);
  }

  function setWeatherMetrics(temp) {
    var i = '<i class="wi {metric-icon}"></i>';
    return (temp.unit === "celsius") ? i.replace("{metric-icon}", "wi-celsius") : i.replace("{metric-icon}", "wi-fahrenheit");

  }


});
