'use strict';

function startTime() {
	var today = new Date();
	var hours = today.getHours();
	var minutes = today.getMinutes();
	var seconds = today.getSeconds();
	minutes = checkTime(minutes);
	seconds = checkTime(seconds);
	$('.clock').text(hours + ':' + minutes + ':' + seconds);
	setTimeout(function () {
		startTime();
	}, 500);
};

function checkTime(i) {
	if (i < 10) {
		i = '0' + i;
	}
	return i;
};

function getWeather() {
	var options = { enableHighAccuracy: true };
	navigator.geolocation.getCurrentPosition(success, error, options);

	function success(position) {
		var geo = position.coords;
		var url = 'http://api.openweathermap.org/data/2.5/weather?APPID=ff47a2ee95ac3a2c5fdcd697e1a07409&lat=' + geo.latitude + '&lon=' + geo.longitude;
		console.log(url);
		$.ajax({
			url: url,
			type: 'GET',
			dataType: "jsonp",
			cache: false,
			contentType: "application/json ",
			success: function success(data) {
				setWeather(data);
			},
			error: function error() {
				alert("Ошибка при получении погоды!");
			}
		});
	}
	function error(error) {
		alert('Не удалось определить местоположение');
	}
};

function setWeather(data) {
	var path = "weather-icons/";
	var icon = "";
	$('#temp').text(Math.round(data.main.temp - 273) + " C°");
	$('#humidity').text(data.main.humidity + "%");
	$('#pressure').text(data.main.pressure + " hPa");
	$('#wind_speed').text(data.wind.speed + " м/с");
	$('#clouds').text(data.clouds.all + " %");
	$('#name').text(data.name);
	// document.getElementById('city_name').innerHTML = data.name;

	// var icon_id = data.weather[0].icon;

	// switch(icon_id){
	// 	case("11d"):
	// 	icon = "storm";
	// 	break;
	// 	case("09d"):
	// 	icon = "heavy"
	// 	break;
	// 	case("10d"):
	// 	icon = "heavy"
	// 	break;
	// 	case("13d"):
	// 	icon = "snow"
	// 	break;
	// 	case("50d"):
	// 	icon = "fog"
	// 	break;
	// 	case("01d"):
	// 	icon = "sunny"
	// 	break;
	// 	case("03d"):
	// 	icon = "overcast"
	// 	break;
	// 	case("04d"):
	// 	icon = "overcast"
	// 	break;
	// 	//for night weather
	// 	case("11n"):
	// 	icon = "storm";
	// 	break;
	// 	case("09n"):
	// 	icon = "heavy"
	// 	break;
	// 	case("10n"):
	// 	icon = "heavy"
	// 	break;
	// 	case("13n"):
	// 	icon = "snow"
	// 	break;
	// 	case("50n"):
	// 	icon = "fog"
	// 	break;
	// 	case("01n"):
	// 	icon = "sunny"
	// 	break;
	// 	case("03n"):
	// 	icon = "overcast"
	// 	break;
	// 	case("04n"):
	// 	icon = "overcast"
	// 	break;
	// }

	// $('#weather-icon').css({"background": "url("+path+icon+".png) no-repeat center"});
};

getWeather();

// {
//     "coord": {
//         "lon": 31.99,
//         "lat": 46.97
//     },
//     "sys": {
//         "message": 0.0052,
//         "country": "Ukraine",
//         "sunrise": 1392699040,
//         "sunset": 1392736871
//     },
//     "weather": [
//         {
//             "id": 701,
//             "main": "Mist",
//             "description": "туман",
//             "icon": "50d"
//         }
//     ],
//     "base": "cmc stations",
//     "main": {
//         "temp": 2,
//         "pressure": 1021,
//         "humidity": 93,
//         "temp_min": 2,
//         "temp_max": 2
//     },
//     "wind": {
//         "speed": 3,
//         "deg": 290
//     },
//     "clouds": {
//         "all": 12
//     },
//     "dt": 1392706800,
//     "id": 700569,
//     "name": "Mykolaiv",
//     "cod": 200
// }