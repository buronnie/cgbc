let routerApp = angular.module('app', [
  'ui.router',
  'app.finance'
]);

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
      })
      .state('base', {
        abstract: true,
        template: '<ui-view/>'
      })
});