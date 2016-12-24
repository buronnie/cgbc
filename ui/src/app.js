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