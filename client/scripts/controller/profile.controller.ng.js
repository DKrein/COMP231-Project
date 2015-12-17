angular
  .module('COMP231-Project')
  .controller('ProfileCtrl', ProfileCtrl);
 
function ProfileCtrl ($scope, $state, $meteor, $ionicPopup, $log, $ionicLoading) {
  var user = Meteor.user();
  var name = user && user.profile ? user.profile.name : '';
  var personal = user && user.profile ? user.profile.personal : 'Be-In App';
 
  $scope.data = {
    name: name,
    personal: personal
  };
 
  $scope.updateName = updateName;
  $scope.updatePicture = updatePicture;
 
  ////////////

  function updatePicture () {
    MeteorCameraUI.getPicture({ width: 60, height: 60 }, function (err, data) {
      if (err && err.error == 'cancel') {
        return;
      }
 
      if (err) {
        return handleError(err);
      }
 
      $ionicLoading.show({
        template: 'Updating picture...'
      });
 
      $meteor.call('updatePicture', data)
        .finally(function () {
          $ionicLoading.hide();
        })
        .catch(handleError);
    });
  }
 
  function updateName () {
    if (_.isEmpty($scope.data.name)) {
      return;
    }
 
    $meteor.call('updateName', $scope.data.name)
      .then(function () {
        $state.go('tab.chats');
      })
      .catch(handleError);
  }
  
  function updatePersonal () {
    if (_.isEmpty($scope.data.personal)) {
      return;
    }
 
    $meteor.call('updatePersonal', $scope.data.personal)
      .then(function () {
        $state.go('tab.chats');
      })
      .catch(handleError);
  }


  function handleError (err) {
    $log.error('profile save error ', err);
 
    $ionicPopup.alert({
      title: err.reason || 'Save failed',
      template: 'Please try again',
      okType: 'button-positive button-clear'
    });
  }
}