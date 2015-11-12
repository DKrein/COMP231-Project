angular
  .module('COMP231-Project')
  .directive('keyboard', keyboard);

  function keyboard ($timeout) {
  var directive =  {
    restrict: 'E',
    scope: {
      'returnClose': '=',
      'onReturn': '&',
      'onFocus': '&',
      'onBlur': '&'
    },
    link: link
  };
  return directive;
 
  ////////////
 
  function link (scope, element, attrs) {
    element.bind('focus', function (e) {
      if (scope.onFocus) {
        $timeout(function () {
          scope.onFocus();
        });
      }
    });
 
    element.bind('blur', function (e) {
      if (scope.onBlur) {
        $timeout(function () {
          scope.onBlur();
        });
      }
    });
 
    element.bind('keydown', function (e) {
      if (e.which == 13) {
        if (scope.returnClose) {
          element[0].blur();
        }
 
        if (scope.onReturn) {
          $timeout(function () {
            scope.onReturn();
          });
        }
      }
    });
  }
}