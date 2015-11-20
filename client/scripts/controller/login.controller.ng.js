angular
  .module('COMP231-Project')
  .controller('LoginCtrl', LoginCtrl);
 
function LoginCtrl($scope, $state, $ionicLoading, $ionicPopup, $log) {
  $scope.data = {};
  $scope.login = login;
  $scope.register = register;

  ////////////
 
  function login() {
    if (_.isEmpty($scope.data.email)) {
      return;
    }

    Meteor.loginWithPassword($scope.data.email, $scope.data.password, function(error){
      if(error){
          console.log(error.reason);
      } else {
          $state.go("profile");
      }
    });
  
  }

  function register() {
    $state.go('register');
  
  }
  
}