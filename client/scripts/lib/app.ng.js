angular
  .module('COMP231-Project', [
    'angular-meteor',
    'ionic'
  ]);
 
if (Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
}
else {
  angular.element(document).ready(onReady);
}
 
function onReady() {
  angular.bootstrap(document, ['COMP231-Project']);
}