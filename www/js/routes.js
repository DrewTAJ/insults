function routeConfig($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('tabs', {
      url: '/tab',
      abstract:true,
      templateUrl:'templates/tabs.html'
    })

    .state('tabs.generator', {
      url: '/generator',
      views: {
        'generator-tab': {
          templateUrl: 'templates/home.html',
          controller: 'MainCtrl',
          controllerAs: 'vm'  
        }
      }
    })

    .state('tabs.settings', {
      url: '/settings',
      views: {
        'settings-tab': {
          templateUrl: 'templates/settings.html',
          controller: 'SettingsCtrl',
          controllerAs: 'vm'
        }
      }
    })

    .state('tabs.insults', {
      url: '/insults/:index',
      views: {
        'settings-tab': {
          templateUrl: 'templates/insult-list.html',
          controller: 'InsultsCtrl',
          controllerAs: 'vm'
        }
      }
    })

    .state('tabs.insult', {
      url: '/insults/:index/:id',
      views: {
        'settings-tab': {
          templateUrl: 'templates/insult.html',
          controller:'InsultCtrl',
          controllerAs: 'vm'
        }
      }
    });

    $urlRouterProvider.otherwise('/tab/generator');
    $urlRouterProvider.when('/tab','/tab/generator')
}

angular.module('app').config(routeConfig);