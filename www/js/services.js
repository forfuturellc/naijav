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


.service("BaraService", ["NotificationFactory", "BaraServiceDataFixtures",
  function(NotificationFactory, BaraServiceDataFixtures) {
    "use strict";

    // Instantiating factories
    var notificationService = new NotificationFactory();
    //BaraService.initializeData(BaraServiceDataFixtures.get());

    // Instantiating containers
    this.notifications = {};
    this.routes = {};
    this.users = {};

    // Using resources
    this.notifications.get = BaraServiceDataFixtures.getNotifications;
    this.notifications.voteUp = function() {}; // notificationService.voteUp;
    this.notifications.voteDown = function() {}; // notificationService.voteDown;
    this.routes.get = BaraServiceDataFixtures.getRoutes;
    this.users.login = function(data, callback) {
      setTimeout(function() {
        callback(null, false);
      }, 2000);
    };

}]);
