/**
* Services utilized by the Application
*/

"use strict";


angular.module("naijav.services", ["ngResource"])


.factory("BaraService", ["$resource", function($resource) {
  var service = $resource("http://localhost:8100");
  return {
    service: service
  };
}])
