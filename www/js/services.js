/**
* Services utilized by the Application
* Copyright (c) 2014-2015 Forfuture LLC
*/

"use strict";


angular.module("naijav.services", ["ngResource"])


.factory("BaraService", ["$resource", function($resource) {
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
  }
}])
