let routerApp = angular.module('app', [
  'ui.router',
  'app.finance',
  'app.worship',
  'ngAnimate',
  'ngSanitize',
  'ui.bootstrap'
]);

routerApp.config(($stateProvider) => {
  $stateProvider
    .state('base', {
      abstract: true,
      template: '<ui-view/>'
    });
});