// css styles
import css from './common/app.less';
// import finance from './finance/base.js';

export const routerApp = angular.module('app', [
  'ui.router',
  // finance,
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
