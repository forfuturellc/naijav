/**
* Main Angular Module
* Copyright (c) 2014-2015 Forfuture LLC
*/


"use strict";


angular.module('naijav', ['ionic', 'naijav.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/shell.html",
    controller: 'AppCtrl'
  })

  .state('app.home', {
    url: "/home",
    views: {
      'mainContent': {
        templateUrl: "templates/home.html",
        controller: "HomeCtrl"
      }
    }
  })

  .state('app.settings', {
    url: "/settings",
    views: {
      'mainContent': {
        templateUrl: "templates/settings.html"
      }
    }
  })

  .state('app.browse', {
    url: "/browse",
    views: {
      'mainContent': {
        templateUrl: "templates/browse.html"
      }
    }
  })

  .state('app.browse.routes', {
    url: "/browse/routes",
    views: {
      'routes': {
        templateUrl: "templates/routes.html",
        controller: "RoutesCtrl"
      }
    }
  })

  .state('app.browse.saccos', {
    url: "/browse/saccos",
    views: {
      'saccos': {
        templateUrl: "templates/saccos.html"
      }
    }
  })

  .state('app.notification', {
    url: "/notification/:notificationId",
    views: {
      'mainContent': {
        templateUrl: "templates/notification.html",
        controller: "NotificationCtrl"
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
