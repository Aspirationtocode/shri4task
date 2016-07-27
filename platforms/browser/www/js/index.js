'use strict';

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var app = {
    // Application Constructor
    initialize: function initialize() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function bindEvents() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function onDeviceReady() {
        app.receivedEvent('deviceready');
        var options = { enableHighAccuracy: true };
        navigator.geolocation.getCurrentPosition(success, error, options);

        function success(position) {
            var geo = position.coords;
            document.getElementById('lat').innerHTML = '' + geo.latitude;
            document.getElementById('lng').innerHTML = '' + geo.longitude;
            var url = 'http://api.openweathermap.org/data/2.5/weather?APPID=ff47a2ee95ac3a2c5fdcd697e1a07409&lat=' + geo.latitude + '&lon=' + geo.longitude;
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
    },
    // Update DOM on a Received Event
    receivedEvent: function receivedEvent(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};