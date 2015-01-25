/**
* Services utilized by the Application
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


angular.module("naijav.services", ["Bara", "BaraData"])


.service("BaraService", ["BaraNotifications", "BaraServiceDataFixtures",
  function(NotificationFactory, BaraServiceDataFixtures) {
    "use strict";

    // Instantiating factories
    var notificationService = NotificationFactory;
    console.log(notificationService);
    //BaraService.initializeData(BaraServiceDataFixtures.get());

    // Instantiating containers
    this.notifications = {};
    this.routes = {};
    this.users = {};

    // Using resources
    // BaraServiceDataFixtures.getNotifications;
    this.notifications.get = function(callback) {
      notificationService.get(function(data) {
        callback(data.notifications);
      }, function() {
        callback(null);
      });
    };
    this.notifications.voteUp = function() {}; // notificationService.voteUp;
    this.notifications.voteDown = function() {}; // notificationService.voteDown;
    this.routes.get = BaraServiceDataFixtures.getRoutes;

    // Posting a notification
    this.postNotification = function(user, message, callback) {
      notificationService.post({ message: message, username: "gocho", userId: 1 }, function(data) {
        callback(data);
      });
    };

}])


.service("UserService", ["BaraUsers", function(BaraUsers) {
  "use strict";
  var dummyUser = {
    username: "GochoMugo",
    email: "mugo@forfuture.co.ke",
    imageUrl: "img/gocho.png",
    preferences: {
      autoNotify: true
    }
  };

  // getting user information from local storage
  function getUserInformation() {
    try {
      return JSON.parse(window.localStorage.user);
    } catch (parseError) {
      return dummyUser;
    }
  }
  this.getUserInformation = getUserInformation;

  // storing user information into local storage
  function storeUserInformation(changesObj) {
    var userObj = getUserInformation();
    for (var key in changesObj) {
      userObj[key] = changesObj[key];
    }
    window.localStorage.user = JSON.stringify(userObj);
    return userObj;
  }
  this.storeUserInformation = storeUserInformation;

  // login in user to the service
  this.loginUser = function loginUser(loginData, callback) {
    BaraUsers.login({username: loginData.username, password: loginData.password},
      function(remoteData) {
        storeUserInformation({
          username: remoteData.username,
          email: remoteData.email,
          password: loginData.password,
          preferences: remoteData.preferences
        });
        callback(true);
      },
      function() {
        callback(false);
    });
  };

  // log out user
  this.logoutUser = function() {
    window.localStorage.user = null;
  };

  // check if user is logged in
  this.isLoggedIn = function isLoggedIn() {
    return Boolean(window.localStorage.user);
  };

}]);
