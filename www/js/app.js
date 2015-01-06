/**
* Main Angular Module
* Copyright (C) 2014-2015  Forfuture LLC <we@forfuture.co.ke>
*
* This program is free software; you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation; either version 2 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License along
* with this program; if not, write to the Free Software Foundation, Inc.,
* 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
*/


angular.module('naijav', ['ionic', 'naijav.controllers'])

.run(function($ionicPlatform) {
  "use strict";

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
  "use strict";

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
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
