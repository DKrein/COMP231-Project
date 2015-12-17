angular
  .module('COMP231-Project')
  .controller('ContactsCtrl', ContactsCtrl);

function ContactsCtrl($scope, $ionicModal, $state, $meteor) {
    $scope.$meteorSubscribe('users').then(function () {
        $scope.users = $scope.$meteorCollection(function () {
            return Meteor.users.find({ _id: { $ne: Meteor.userId() } });
        }, false);
    });


    $scope.openNewProfileModal = openNewProfileModal;
    $scope.remove = remove;
    $scope.newChat = newChat;
    
    ////////////

    function openNewProfileModal() {
        $state.go("profile");
        //$scope.modal.show();
    }

  function newChat(userId) {
    console.log("new chat contacts");
    var chat = Chats.findOne({type: 'chat', userIds: {$all: [Meteor.userId(), userId]}});
    if (chat) {
      return goToChat(chat._id);
    }
 
    $meteor.call('newChat', userId).then(goToChat);
  }

  function goToChat(chatId) {
    console.log("goto chat");
    return $state.go('tab.chat-detail', {chatId: chatId});
  }

 
  $scope.$on('$destroy', function () {
    $scope.modal.remove();
  });

  function remove (contacts) {
    $meteor.call('removeContact', user._id);
  }
}



