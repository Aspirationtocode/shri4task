"use strict";

function initWeather() {
	getWeather(cities[0]);
	countCity.html("&nbsp1 / " + cities.length + "&nbsp");
}

function getWeather(cityName) {
	var url = "http://api.openweathermap.org/data/2.5/weather?APPID=ff47a2ee95ac3a2c5fdcd697e1a07409&q=" + cityName;
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

	var iconId = data.weather[0].icon;
	var dscr = data.weather[0].description;

	mainDegrees.text(Math.round(kelvinToDegrees(data.main.temp)) + "°");
	humidityValue.text(data.main.humidity + "%");
	pressureValue.text(data.main.pressure + " hPa");
	windspeedValue.text(data.wind.speed + " м/с");
	cloudsValue.text(data.clouds.all + " %");
	cityName.html(data.name + "&nbsp");

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

	weatherImg.hide(100, animateWeatherImg);

	situation.text(dscr);

	function animateWeatherImg() {
		weatherImg.attr('src', "img/tick/" + iconId + ".png");
		weatherImg.show(100);
	}

	function kelvinToDegrees(kel) {
		return kel - 273;
	}
};

weatherContent.hammer().bind('swipe', weatherContentSwipeHandler);

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

$('.add-city').hammer().bind('tap', addCityHandler);