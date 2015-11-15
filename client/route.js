 angular.module('demo').config(['$urlRouterProvider', '$stateProvider', '$locationProvider', function($urlRouterProvider, $stateProvider, $locationProvider){
 
      $locationProvider.html5Mode(true);
 
      $stateProvider
        .state('bank', {
          url: '/bank',
          templateUrl: 'client/bank/view/bank.ng.html',
          controller: 'BankCtrl'
        })
        .state('chat', {
          url: '/',
          templateUrl: 'client/chat/view/chat.ng.html',
          controller: 'ChatCtrl'
        });
 
      $urlRouterProvider.otherwise("/");
    }]);
  