import './list.js';
import './new.js';

angular.module('app.finance', []).config($stateProvider => {
  $stateProvider
    .state('base.finance', {
      abstract: true,
      url: '^/finance',
      template: '<ui-view/>'
    })
    .state('base.finance.list', {
      url: '',
      templateUrl: './list.html',
      controller: 'Finance.ListCtrl'
    })
    .state('base.finance.new', {
      url: '/new',
      templateUrl: './new.html',
      controller: 'Finance.NewCtrl'
    });
});
