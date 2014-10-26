'use strict';

/**
 * @ngdoc function
 * @name friendtoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the friendtoneApp
 */
angular.module('friendtoneApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
