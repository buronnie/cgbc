let routerApp = angular.module('app', ['ui.router']);

routerApp.config(($stateProvider, $urlRouterProvider) => {
  $urlRouterProvider.otherwise('/home');

  $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'home.html'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'about.html'
      });
});