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


angular.module('naijav.controllers', ["naijav.services"])


/**
* Controller used throughout the Application
*/
.controller('AppCtrl', ["$scope", "$ionicModal", "UserService",
  function($scope, $ionicModal, UserService) {
    "use strict";

    // Login prompt in left menu
    $scope.loginHandle = UserService.isLoggedIn()
      ? { label: "Logout", func: logout }
      : { label: "Login", func: login };

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.loginModal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function closeLogin() {
      $scope.loginModal.hide();
    };

    // Open the login modal
    function login() {
      $scope.loginModal.show();
    };

    // Doing log out
    function logout() {
      UserService.logoutUser();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
      UserService.loginUser($scope.loginData, function(loggedIn) {
        loggedIn = null; // for jshint to ingore unused vars
        closeLogin();
      });
    };

}])


.controller("HomeCtrl", ["$scope", "BaraService", function($scope, BaraService) {
  "use strict";

  function handleError() { }

  BaraService.notifications.get(function(notifications) {
    if (! notifications) { return handleError(); }
    $scope.notifications = notifications.reverse();
  });
  $scope.refreshNotifications = function() {
    $scope.notifications = BaraService.notifications.get(function(notifications) {
      if (! notifications) {
        handleError();
      } else {
        $scope.notifications = notifications.reverse();
        $scope.$apply();
      }
      $scope.$broadcast("scroll.refreshComplete");
    });
  };
}])


.controller('NotificationCtrl', ["$scope", "$stateParams", "BaraService",
  function($scope, $stateParams, BaraService) {
    "use strict";
    // We shall use the BaraService to retrieve the notification with the id
    $scope.notification = BaraService.notifications.get($stateParams.notificationId);
    // Allow voting up and down
    $scope.voteUp = function() { BaraService.voteUp($stateParams.notificationId); };
    $scope.voteDown = function() { BaraService.voteDown($stateParams.notificationId); };
}])


.controller("RoutesCtrl", ["$scope", "BaraService", function($scope, BaraService) {
  "use strict";
  $scope.routes = BaraService.routes.get();
}])


.controller("UserCtrl", ["$scope", "UserService", function($scope, UserService) {
  "use strict";
  // default profile pic url = img/avatar_1.png
  $scope.user = UserService.getUserInformation();
}])


.controller("PostCtrl", ["$scope", "$ionicPopup", "$timeout", "BaraService", "$state",
  function($scope, $ionicPopup, $timeout, BaraService, $state) {
    "use strict";

    $scope.date = Date.now();
    $scope.user = {
      username: "gocho",
      profilepic: "/img/gocho.png"
    };
    $scope.txtMessage = "";
    $scope.submitPost = function() {
      BaraService.postNotification($scope.user, $scope.txtMessage, function(err) {
        var alertPopup = $ionicPopup.alert({
           title: 'Post Request Status',
           template: err ? 'Post Submission failed' : 'Post Submission succeeded'
         });
         alertPopup.then(function() {
           if (! err) { $state.go("app.home"); }
         });
      });
    };

}]);
