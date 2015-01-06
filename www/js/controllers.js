/**
* All Angular controllers for the Application
* Copyright (c) 2014-2015 Forfuture LLC
*/

"use strict";


angular.module('naijav.controllers', ["Bara", "BaraData"])


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


.controller("HomeCtrl", function($scope, BaraService, BaraServiceDataFixtures) {
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
  // We shall use the BaraService to retrieve the notification with the
  // id, $stateParams.notificationId
  console.log($stateParams);
  $scope.notification = BaraService.notifications.get($stateParams.notificationId);
})


.controller("RoutesCtrl", function($scope, BaraServiceDataFixtures) {
  $scope.routes = BaraServiceDataFixtures.getRoutes();
})

