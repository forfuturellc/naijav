/**
* All Angular controllers for the Application
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


angular.module('naijav.controllers', ["Bara", "BaraData"])


/**
* Controller used throughout the Application
*/
.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  "use strict";

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.loginModal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.loginModal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.loginModal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})


.controller("HomeCtrl", function($scope, BaraService, BaraServiceDataFixtures) {
  "use strict";

  BaraService.initializeData(BaraServiceDataFixtures.get());
  $scope.notifications = BaraService.notifications.get();
  $scope.refreshNotifications = function() {
    var n = BaraService.notifications.get(1);
    $scope.notifications.unshift(n);
    $scope.$broadcast("scroll.refreshComplete");
    $scope.$apply();
  };
})


.controller('NotificationCtrl', function($scope, $stateParams, BaraService) {
  "use strict";

  // We shall use the BaraService to retrieve the notification with the
  // id, $stateParams.notificationId
  console.log($stateParams);
  $scope.notification = BaraService.notifications.get($stateParams.notificationId);

  // Allow voting up and down
  $scope.voteUp = BaraService.voteUp($stateParams.notificationId);
  $scope.voteDown = BaraService.voteDown($stateParams.notificationId);
})


.controller("RoutesCtrl", function($scope, BaraServiceDataFixtures) {
  "use strict";

  $scope.routes = BaraServiceDataFixtures.getRoutes();
})


.controller("UserCtrl", function($scope) {
  // default profile pic url = img/avatar_1.png
  $scope.user = {
    name: "GochoMugo",
    email: "mugo@forfuture.co.ke",
    imageUrl: "lib/img/gocho.png",
    prefs: {
      autoNotify: true
    }
  };
});
