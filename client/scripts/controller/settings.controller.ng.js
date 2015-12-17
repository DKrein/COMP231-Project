 angular
  .module('COMP231-Project')
  .controller('SettingsCtrl', SettingsCtrl);
 
function SettingsCtrl($scope, $meteor, $state) {
  
  var user = Meteor.user();
  var name = user && user.profile ? user.profile.name : '';
  var personal = user && user.profile ? user.profile.personal : 'Be-In App';
  var picture = user && user.profile ? user.profile.picture : '';

  $scope.data = {
    name: name,
    personal: personal,
    picture: picture
  };

  $scope.logout = logout;
  $scope.openProfile = openProfile;
 
  ////////////
 
  function logout() {
    $meteor.logout().then(function () {
      $state.go('login');
    });
  }

  function openProfile() {
    $state.go("profile");
  }

}