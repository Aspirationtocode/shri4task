'use strict';

var cities = ['Moscow', 'Лиссабон', 'Тверь', 'Астрахань', 'Хабаровск', 'Астана', 'Bejing'];
$('img').on('dragstart', function (event) {
	event.preventDefault();
});
$('.count-city').html('&nbsp1 / ' + cities.length + '&nbsp');

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
	$('.weather-img').hide(100, function () {
		$('.weather-img').attr('src', 'img/tick/' + iconId + '.png');
		$('.weather-img').show(100);
	});

	// $('.temperature').css({"animation":"translate-animation 1s"});
	$('.situation').text(dscr);
};

getWeather(cities[0]);

$('body').hammer().bind('swipe', function (e) {
	var swipeDirection = e.gesture.direction;
	var index = parseInt($('.count-city').text()[1], 10);
	var length = parseInt($('.count-city').text()[5], 10);
	if (swipeDirection === 2) {
		if (index == 1) {
			index = length;
		} else {
			index--;
		}
	} else if (swipeDirection === 4) {
		if (index === length) {
			index = 1;
		} else {
			index++;
		}
	}
	$('.count-city').html('&nbsp' + index + ' / ' + cities.length + '&nbsp');
	getWeather(cities[index - 1]);
});

function split(val) {
	return val.split(/,\s*/);
}

function extractLast(term) {
	return split(term).pop();
}

var citiesField = jQuery("#city");

citiesField.autocomplete({
	source: function source(request, response) {
		jQuery.getJSON("http://gd.geobytes.com/AutoCompleteCity?callback=?&q=" + extractLast(request.term), function (data) {
			response(data);
		});
	},
	minLength: 3,
	select: function select(event, ui) {
		var selectedObj = ui.item;
		citiesField.val(selectedObj.label);
		return false;
	},
	focus: function focus() {
		// prevent value inserted on focus
		return false;
	}
});

citiesField.autocomplete("option", "delay", 100);

$('.add-city').hammer().bind('tap', function () {
	var city = citiesField.val();
	if (city) {
		addCity(city);
	}
});

function addCity(city) {
	cities.push(city);
	var stringArr = $('.count-city').html().split('');
	stringArr[6] = cities.length;
	stringArr[10] = cities.length;
	var string = stringArr.join('');
	getWeather(cities[cities.length - 1]);
	$('.count-city').html(string);
}

// window.onerror = exitFromApp;
// function exitFromApp() {
// 	console.log('sdsdsd')
//   navigator.app.exitApp();
// }
// throw new Error()