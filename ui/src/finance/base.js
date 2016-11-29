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