angular.module('app.finance', ['ui.router', 'ui.bootstrap']).config($stateProvider => {
  $stateProvider
      .state('base.finance', {
        abstract: true,
        url: '^/finance',
        template: '<ui-view/>'
      })
      .state('base.finance.list', {
        url: '',
        templateUrl: 'finance/list.html',
        controller: 'Finance.ListCtrl'
      })
      .state('base.finance.new', {
        url: '/new',
        templateUrl: 'finance/new.html',
        controller: 'Finance.NewCtrl'
      });
  console.log(ui.router);
});