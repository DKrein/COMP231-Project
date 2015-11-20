angular
  .module('COMP231-Project')
  .controller('RegisterCtrl', RegisterCtrl);
 
function RegisterCtrl($scope, $state, $ionicLoading, $ionicPopup, $log) {
  $scope.data = {};
  $scope.register = register;
   
  ////////////
 
  function register() {

    if (_.isEmpty($scope.data.email)) {
      return;
    }

    Accounts.createUser({
      email: $scope.data.email,
      password: $scope.data.password,
      profile: {
        name: $scope.data.name
      }
    }, function(error){
      if(error){
          console.log(error.reason);
      } else {
        $state.go("login");
      }
    });
    
  }
  
}