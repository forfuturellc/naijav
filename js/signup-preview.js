(function() {

'use strict';

var baseurl = '/naijav';


angular.module('Naijav.Site.Signup', ['ngRoute', 'Naijav.Site.Controllers'])

.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/account', {
        templateUrl: baseurl + '/partials/account/',
        controller: 'AccountCtrl'
      }).
      when('/user', {
        templateUrl: baseurl + '/partials/user/',
        controller: 'UserCtrl'
      }).
      otherwise({
        redirectTo: '/account'
      });
}]);



})();
