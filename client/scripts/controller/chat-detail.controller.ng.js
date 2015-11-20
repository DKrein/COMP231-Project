angular
  .module('COMP231-Project')
  .controller('ChatDetailCtrl', ChatDetailCtrl);

function ChatDetailCtrl ($scope, $stateParams, $ionicScrollDelegate, $timeout, $meteor) {

  var chatId = $stateParams.chatId;
  var checkPlatform = ionic.Platform.isWebView() && ionic.Platform.checkPlatform();

  $scope.chat = $scope.$meteorObject(Chats, chatId, false);

  $scope.messages = $scope.$meteorCollection(function () {
    return Messages.find({ chatId: chatId });
  }, false);

  $scope.messages = $scope.$meteorCollection(function () {
      return Messages.find({ chatId: chatId });
  }, false);

   $scope.$watchCollection('messages', function (oldVal, newVal) {
    var animate = oldVal.length !== newVal.length;
    $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(animate);
  });

  $scope.data = {};
  $scope.sendMessage = sendMessage;
  $scope.keyboardUp = keyboardUp;
  $scope.keyboardDown = keyboardDown;
  $scope.closeKeyboard = closeKeyboard;

  $scope.data = {};
  $scope.sendMessage = sendMessage;
 
  function sendMessage () {
      if (_.isEmpty($scope.data.message)) {
          return;
      }

      $meteor.call('newMessage', {
        text: $scope.data.message,
        chatId: chatId
      });
    
      delete $scope.data.message;
  }

  function keyboardUp() {
      if (checkPlatform) {
          $scope.data.keyboardHeight = 216;
      }

      $timeout(function () {
          $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(true);
      }, 300);
  }

  function keyboardDown() {
      if (checkPlatform) {
          $scope.data.keyboardHeight = 0;
      }

      $ionicScrollDelegate.$getByHandle('chatScroll').resize();
  }

  function closeKeyboard() {
      // cordova.plugins.Keyboard.close();
  }
}