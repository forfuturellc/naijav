
var backendUrl = 'http://localhost:8090';
var timeout = 5000;

angular.module('Naijav.Site.Controllers', ["ngResource"])


.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.withCredentials = true;
  //$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
}])


.controller('AccountCtrl', ['$scope', '$http', '$location', '$sce', function($scope, $http, $location, $sce) {
  // Scope variables
  $scope.memberCount =
  $scope.alertClass =
  $scope.alertMessage =
  $scope.newUsername =
  $scope.newEmail =
  $scope.newPassword =
  $scope.loginUsername =
  $scope.loginPassword = null;

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
        $scope.$apply();
      }, timeout);
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
  $scope.login = function login() {
    $scope.alertMessage = null;
    $http.post(backendUrl + "/members/login", {
      username: $scope.loginUsername,
      password: $scope.loginPassword
    })
    .success(function(data, status, headers, config) {
      $scope.alertMessage = $sce.trustAsHtml("<strong>Okey!</strong> You are logged in! Switching you to your user panel.");
      $scope.alertClass = "alert-success";
      setTimeout(function() {
        $location.path("/user");
        $scope.$apply();
      }, timeout);
    })
    .error(function(data, status, headers, config) {
      if (status >= 400 && status < 500) {
        $scope.alertMessage = $sce.trustAsHtml("<strong>Nooo!</strong> We do not agree that is correct!");
      } else {
        $scope.alertMessage = $sce.trustAsHtml("<strong>Damn!</strong> Problems on our side!");
      }
      $scope.alertClass = "alert-danger";
    });
  };

}])


.controller('UserCtrl', ['$scope', '$sce', '$location', '$http', function($scope, $sce, $location, $http) {
  // $scope variables
  $scope.settings = {};
  $scope.alertMessage =
  $scope.alertClass =
  $scope.settings.emailUpdates =
  $scope.feedback = null;

  function errorHandler(data, status, headers, config) {
    console.log(data);
    if (status === 401 || status === 403) {
      $scope.alertMessage = $sce.trustAsHtml("<strong>Hey!</strong> You not logged in! Redirecting to Login!");
      setTimeout(function() {
        $location.path("/account");
        $scope.$apply();
      }, timeout);
    } else {
      $scope.alertMessage = $sce.trustAsHtml("<strong>Hey!</strong> Finding it hard to exchange data with server!");
    }
    $scope.alertClass = "alert-danger";
  }

  // retrieving user data
  $http.get(backendUrl + "/members/settings")
  .success(function(data) {
    $scope.emailUpdates = !!data.email_updates;
    $('input[ng-checked="settings.emailUpdates"]').bootstrapSwitch('state', !!data.email_updates);
  })
  .error(errorHandler);

  // Updates Settings in remote server
  function updateRemote() {
    $http.post(backendUrl + "/members/settings", {
      email_updates: String($scope.settings.emailUpdates)
    })
    .success(function(data) {
      $scope.alertMessage = $sce.trustAsHtml("<i class='fa fa-smile-o'></i> Settings saved!");
      $scope.alertClass = "alert-success alert-flush";
      setTimeout(function() {
        $scope.alertMessage = null;
        $scope.$apply();
      }, timeout / 2);
    })
    .error(errorHandler);
  }

  // Watching on the settings to keep updating remote server
  $scope.$watch("settings", function(updatedSettings) {
    updateRemote();
  }, true);
  // Still watching settings, particularly for the checkboxes
  $('input[type="checkbox"]').on('switchChange.bootstrapSwitch', function(event, state) {
    updateRemote();
  });

  // Sending user feedback
  $scope.sendFeedback = function sendFeedback() {
    $http.post(backendUrl + "/members/feedback", {
      feedback: String($scope.feedback)
    })
    .success(function(data) {
      $scope.alertMessage = $sce.trustAsHtml("<i class='fa fa-smile-o'></i> Feedback received!");
      $scope.alertClass = "alert-success alert-flush";
      setTimeout(function() {
        $scope.alertMessage = null;
        $scope.$apply();
      }, timeout / 2);
    })
    .error(errorHandler);
  };

}])
