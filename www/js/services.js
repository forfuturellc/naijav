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


angular.module("naijav.services", ["ngResource"])


.factory("BaraService", ["$resource", function($resource) {
  "use strict";

//  var service = $resource("http://localhost:8100");
//  return {
//    service: service
//  };
  return {
    notifications: {
      get: function() {
        return [
          {id: 1, message: "accident at strath", username: "gocho"},
          {id: 2, message: "traffic jam", username: "brian"}
        ];
      }
    }
  };
}]);
