'use strict';

function startTime() {
	var today = new Date();
	var hours = today.getHours();
	var minutes = today.getMinutes();
	var seconds = today.getSeconds();
	minutes = checkTime(minutes);
	seconds = checkTime(seconds);
	clock.text(hours + ':' + minutes + ':' + seconds);
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

function split(val) {
	return val.split(/,\s*/);
}

function extractLast(term) {
	return split(term).pop();
}
// handlers
function addCityHandler() {
	var city = citiesField.val();
	if (city) {
		addCity(city);
	}
}

function weatherContentSwipeHandler(e) {
	var swipeDirection = e.gesture.direction;
	var length = parseInt(countCity.text()[5], 10);
	var index = parseInt(countCity.text()[1], 10);
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
	countCity.html('&nbsp' + index + ' / ' + cities.length + '&nbsp');
	getWeather(cities[index - 1]);
}
// handlers

function addCity(city) {
	var stringArr = countCity.html().split('');
	cities.push(city);
	stringArr[6] = cities.length;
	stringArr[10] = cities.length;
	var string = stringArr.join('');
	getWeather(cities[cities.length - 1]);
	countCity.html(string);
}