angular
  .module('COMP231-Project')
  .controller('ContactsCtrl', ContactsCtrl);

function ContactsCtrl($scope, $ionicModal, $state) {
    $scope.$meteorSubscribe('users').then(function () {
        $scope.users = $scope.$meteorCollection(function () {
            return Meteor.users.find({ _id: { $ne: Meteor.userId() } });
        }, false);
    });


    $scope.openNewProfileModal = openNewProfileModal;
    $scope.remove = remove;

    ////////////

    function openNewProfileModal() {
        $state.go("profile");
        //$scope.modal.show();
    }
 
  $scope.$on('$destroy', function () {
    $scope.modal.remove();
  });

  function remove (contacts) {
    $meteor.call('removeContact', user._id);
  }
}



