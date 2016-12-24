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