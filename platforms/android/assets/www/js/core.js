'use strict';

var cities = ['Москва', 'Лиссабон', 'Тверь', 'Астрахань', 'Хабаровск'];
$('img').on('dragstart', function (event) {
	event.preventDefault();
});

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

function getWeather(cityName) {
	var url = 'http://api.openweathermap.org/data/2.5/weather?APPID=ff47a2ee95ac3a2c5fdcd697e1a07409&q=' + cityName;
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
};

function setWeather(data) {
	var path = "weather-icons/";
	var icon = "";
	$('.main-degrees').text(Math.round(data.main.temp - 273) + "°");
	$('.humidity-value').text(data.main.humidity + "%");
	$('.pressure-value').text(data.main.pressure + " hPa");
	$('.windspeed-value').text(data.wind.speed + " м/с");
	$('.clouds-value').text(data.clouds.all + " %");
	$('.city-name').html(data.name + '&nbsp');
	// document.getElementById('city_name').innerHTML = data.name;

	var iconId = data.weather[0].icon;
	var dscr = data.weather[0].description;

	switch (dscr) {
		case "clear sky":
			dscr = "чистое небо";
			break;
		case "few clouds":
			dscr = "малооблачно";
			break;
		case "scattered clouds":
			dscr = "рассеянные облака";
			break;
		case "broken clouds":
			dscr = "рваные облака";
			break;
		case "shower rain":
			dscr = "проливной дождь";
			break;
		case "rain":
			dscr = "дождь";
			break;
		case "thunderstorm":
			dscr = "буря";
			break;
		case "snow":
			dscr = "снег";
			break;
		case "mist":
			dscr = "туман";
			break;
	}

	$('.weather-img').attr('src', 'img/tick/' + iconId + '.png');
	$('.situation').text(dscr);
};

getWeather('Лиссабон');

$('body').hammer().bind('swipe', function () {
	getWeather(cities[getRandom(0, 4)]);
});

function getRandom(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

// // {
// //     "coord": {
// //         "lon": 31.99,
// //         "lat": 46.97
// //     },
// //     "sys": {
// //         "message": 0.0052,
// //         "country": "Ukraine",
// //         "sunrise": 1392699040,
// //         "sunset": 1392736871
// //     },
// //     "weather": [
// //         {
// //             "id": 701,
// //             "main": "Mist",
// //             "description": "туман",
// //             "icon": "50d"
// //         }
// //     ],
// //     "base": "cmc stations",
// //     "main": {
// //         "temp": 2,
// //         "pressure": 1021,
// //         "humidity": 93,
// //         "temp_min": 2,
// //         "temp_max": 2
// //     },
// //     "wind": {
// //         "speed": 3,
// //         "deg": 290
// //     },
// //     "clouds": {
// //         "all": 12
// //     },
// //     "dt": 1392706800,
// //     "id": 700569,
// //     "name": "Mykolaiv",
// //     "cod": 200
// // }