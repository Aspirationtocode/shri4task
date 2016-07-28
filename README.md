# Задание по лекции "Нативные приложения на веб-технологиях"
Было реализовано приложение, позволяющее:
- Смотреть погоду в различных городах (реализовано с помощью сервиса http://openweathermap.org/api)
- Добавлять свой город для просмотра (реализовано с помощью сервиса http://geobytes.com)

Приложение написано полностью с нуля, без использования фреймворков для мобильной разработки. Была попытка прикрутить JqueryMobile, но понял,
что не имею времени для полного погружения в эту технологию. 
Собирал приложение с помощью сервиса PhonegapBuild, в папке **packets** имеются .apk(для андроид) и .xap(для windows phone)

Плагины: cordova-whitelist, cordova-splashscreen

Были проблемы с геолокацией на android, решить не получилось даже с помощью плагина cordova-geolocation, не могу понять в чем дело, пришлось убрать эту опцию из приложения ;(

gulp-сборка: babel, sass, jade
