let routerApp = angular.module('app', [
  'ui.router',
  'app.finance',
  'app.worship'
]);

routerApp.config(($stateProvider) => {
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
angular.module('app.worship', ['ui.router']).config($stateProvider => {
    $stateProvider
        .state('base.worship', {
            abstract: true,
            url: '^/worship',
            template: '<ui-view/>'
        })
        .state('base.worship.list', {
            url: '',
            templateUrl: 'worship/list.html'
        })
        .state('base.worship.new', {
            url: '/new',
            templateUrl: 'worship/new.html'
        })
});