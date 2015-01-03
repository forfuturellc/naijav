/**
* All Angular controllers for the Application
* Copyright (c) 2014-2015 Forfuture LLC
*/

"use strict";


angular.module('naijav.controllers', [])//["BaraService"])


.factory("BaraService", [function() {
  var n =  [
    {id: 1, message: "accident at strath", username: "gocho",
    timestamp: "14:14", votes: 101},
    {id: 2, message: "traffic jam", username: "brian",
    timestamp: "10:20", votes: 14}
  ];
  return {
    notifications: {
      get: function(id) {
        if (id >= 0) {
          id = parseInt(id);
          for (var index = 0; index < n.length; index++) {
            if (n[index].id === id) { return n[index]; }
          }
        }
        return n;
      }
    }
  }
}])


/**
* Controller used throughout the Application
*/
.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
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


.controller("HomeCtrl", function($scope, BaraService) {
  $scope.notifications = BaraService.notifications.get();
  $scope.refreshNotifications = function() {
    var n = BaraService.notifications.get(1);
    console.log(n);
    $scope.notifications.unshift(n);
    console.log($scope.notifications);
    $scope.$broadcast("scroll.refreshComplete");
    $scope.$apply();
  };
})


.controller('NotificationCtrl', function($scope, $stateParams, BaraService) {
  // We shall use the BaraService to retrieve the notification with the
  // id, $stateParams.notificationId
  console.log($stateParams);
  $scope.notification = BaraService.notifications.get($stateParams.notificationId);
});
