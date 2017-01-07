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

let HelloComponent = React.createClass({
  displayName: 'HelloComponent',
  propTypes: {},
  render: function render() {
    return React.createElement(
      'span',
      null,
      'Hello World!'
    );
  }
});

routerApp.value('HelloComponent', HelloComponent);
