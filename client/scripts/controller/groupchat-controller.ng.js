angular
  .module('COMP231-Project')
  .controller('GroupChatsCtrl', GroupChatsCtrl);

function GroupChatsCtrl($scope, $ionicModal) {
    $scope.chats = $scope.$meteorCollection(Chats, false);

    $ionicModal.fromTemplateUrl('client/templates/group-chat.ng.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $scope.$on('$destroy', function () {
        $scope.modal.remove();
    });

    $scope.openNewGroupChatModal = openNewGroupChatModal;
    $scope.remove = remove;

    ////////////

    function openNewGroupChatModal() {
        $scope.modal.show();
    }

    function remove(chat) {
        $meteor.call('removeChat', chat._id);
    }
}