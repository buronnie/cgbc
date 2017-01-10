let routerApp = angular.module('app', [
  'ui.router',
  'app.finance',
  'app.worship',
  'ngAnimate',
  'ngSanitize',
  'ui.bootstrap',
  'react'
]);

routerApp.config(($stateProvider) => {
  $stateProvider
    .state('base', {
      abstract: true,
      template: '<ui-view/>'
    });
});

routerApp.value('Photo', ns.Photo);
