'use strict';

navigator.getUserMedia = (
  navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia
);

/**
 * @ngdoc function
 * @name friendtoneApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the friendtoneApp
 */
angular.module('friendtoneApp')
    .controller('RecordRTC', function () {
        console.log('TBD');
    })
// socket init
    .factory('mySocket', function (socketFactory) {
        return socketFactory({
            url: 'http://127.0.0.1:9999/echo'
        });
    });
