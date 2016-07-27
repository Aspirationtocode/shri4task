const cities = ['Moscow', 'Лиссабон', 'Тверь', 'Астрахань', 'Хабаровск', 'Астана', 'Bejing'];
const mainDegrees = $('.main-degrees');
const humidityValue = 	$('.humidity-value');
const pressureValue =	$('.pressure-value');
const windspeedValue =	$('.windspeed-value');
const cloudsValue =	$('.clouds-value');
const cityName =	$('.city-name');
const clock = $('.clock');
const countCity = $('.count-city');
const weatherImg = $('.weather-img');
const situation = $('.situation');
const citiesField = $("#city");
const weatherContent = $('.weather-content');

$('img').on('dragstart', event => { event.preventDefault(); });