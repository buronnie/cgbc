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
angular.module('app.finance', ['ui.router']).config($stateProvider => {
  $stateProvider
      .state('base.finance', {
        abstract: true,
        url: '^/finance',
        template: '<ui-view/>'
      })
      .state('base.finance.list', {
        url: '',
        templateUrl: 'finance/list.html'
      })
      .state('base.finance.new', {
        url: '/new',
        templateUrl: 'finance/new.html'
      })
});