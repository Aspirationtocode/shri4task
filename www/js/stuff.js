'use strict';

var cities = ['Moscow', 'Лиссабон', 'Тверь', 'Астрахань', 'Хабаровск', 'Астана', 'Bejing'];
var mainDegrees = $('.main-degrees');
var humidityValue = $('.humidity-value');
var pressureValue = $('.pressure-value');
var windspeedValue = $('.windspeed-value');
var cloudsValue = $('.clouds-value');
var cityName = $('.city-name');
var clock = $('.clock');
var countCity = $('.count-city');
var weatherImg = $('.weather-img');
var situation = $('.situation');
var citiesField = $("#city");
var weatherContent = $('.weather-content');

$('img').on('dragstart', function (event) {
  event.preventDefault();
});