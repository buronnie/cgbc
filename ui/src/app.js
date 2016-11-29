let routerApp = angular.module('app', [
  'ui.router',
  'app.finance'
]);

routerApp.config(($stateProvider, $urlRouterProvider) => {
  $urlRouterProvider.otherwise('/finance');

  $stateProvider
      .state('base', {
        abstract: true,
        template: '<ui-view/>'
      });
});