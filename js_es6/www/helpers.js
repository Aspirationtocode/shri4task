function startTime() {
	const today   = new Date();
	const hours   = today.getHours();
	let minutes = today.getMinutes();
	let seconds = today.getSeconds();
	minutes = checkTime(minutes);
	seconds = checkTime(seconds);
	clock.text(`${hours}:${minutes}:${seconds}`);
	setTimeout(() => {startTime()}, 500);
};

function checkTime(i) {
	if (i < 10){
			i = `0${i}`;
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
	const city = citiesField.val();
	if (city) {
		addCity(city);
	}
}

function weatherContentSwipeHandler(e) {
	const swipeDirection = e.gesture.direction;
	const length = parseInt(countCity.text()[5], 10);
	let index = parseInt(countCity.text()[1], 10);
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
	countCity.html(`&nbsp${index} / ${cities.length}&nbsp`);
	getWeather(cities[index - 1]);
}
// handlers

function addCity(city) {
	const stringArr = countCity.html().split('');
	cities.push(city);
	stringArr[6] = cities.length;
	stringArr[10] = cities.length;
	const string = stringArr.join('');
	getWeather(cities[cities.length - 1]);
	countCity.html(string);
}




