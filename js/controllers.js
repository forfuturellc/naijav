
var backendUrl = 'http://localhost:8090';

angular.module('Naijav.Site.Controllers', ["ngResource"])

.controller('AccountCtrl', ['$scope', '$http', '$location', '$sce', function($scope, $http, $location, $sce) {
  // Scope variables
  $scope.memberCount =
  $scope.alertClass =
  $scope.alertMessage =
  $scope.newUsername =
  $scope.newEmail =
  $scope.newPassword = null;

  // Member Count
  function memberCount() {
    $http.get(backendUrl + '/members/count')
    .success(function(data, status, headers, config) {
      $scope.memberCount = data.count;
    })
    .error(function(data, status, headers, config) {
      $scope.memberCount = "--";
    });
  }
  memberCount();

  // Member signup
  $scope.signup = function signup() {
    $scope.alertMessage = null;
    $http.post(backendUrl + "/members/signup", {
      username: $scope.newUsername,
      email: $scope.newEmail,
      password: $scope.newPassword
    })
    .success(function(data, status, headers, config) {
      $scope.alertMessage = $sce.trustAsHtml("<strong>Yeey!</strong> Lets get you logged in!");
      $scope.alertClass = "alert-success";
      memberCount();
      setTimeout(function() {
        $location.path("/user");
      }, 1000);
    })
    .error(function(data, status, header, config) {
      if (status === 400) {
        $scope.alertMessage = $sce.trustAsHtml("<strong>Nope!</strong> Someone with the same <strong>username</strong>/<strong>email</strong> signed up!");
      } else {
        $scope.alertMessage = $sce.trustAsHtml("<strong>Oops!</strong> We messed up with the request!");
      }
      $scope.alertClass = "alert-danger";
    });
  };

  // Member login
  $scope.login = function login() {};

}])


.controller('UserCtrl', ['$scope', '$routeParams', function($scope) {
  // Using route param to retrieve user data
  
}])
