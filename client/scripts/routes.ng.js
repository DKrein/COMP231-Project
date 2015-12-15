angular
  .module('COMP231-Project')
  .config(config);

function config($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'client/templates/tabs.ng.html',
      resolve: {
        user: ['$meteor', function ($meteor) {
          return $meteor.requireUser();
        }],
        chats: ['$meteor', function ($meteor) {
          return $meteor.subscribe('chats');
        }]
      }
    })
    .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'client/templates/chats.ng.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'client/templates/chat-detail.ng.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })
    .state('login', {
      url: '/login',
      templateUrl: 'client/templates/login.ng.html',
      controller: 'LoginCtrl'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'client/templates/register.ng.html',
      controller: 'RegisterCtrl'
    })
    .state('profile', {
      url: '/profile',
      templateUrl: 'client/templates/profile.ng.html',
      controller: 'ProfileCtrl',
      resolve: {
        user: ['$meteor', function ($meteor) {
          return $meteor.requireUser();
        }]
      }
    })
    .state('tab.settings', {
      url: '/settings',
      views: {
        'tab-settings': {
          templateUrl: 'client/templates/settings.ng.html',
          controller: 'SettingsCtrl'
        }
      }

    })
    .state('tab.contacts', {
        url: '/contacts',
        views: {
            'tab-contacts': {
                templateUrl: 'client/templates/contacts.ng.html',
                controller: 'ContactsCtrl'
            }
        }

    });

  $urlRouterProvider.otherwise('tab/chats');
}