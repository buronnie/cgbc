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
import 'angular';
import 'angular-ui-router';
import 'angular-animate';
import 'angular-sanitize';
import 'angular-ui-bootstrap';

angular.module('app.finance', []).config($stateProvider => {
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
});
angular.module("app.finance").controller("Finance.ListCtrl", ['$scope', function($scope) {
  $scope.partial = { name: 'form.html', url: 'finance/form.html'};

  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function() {
    $scope.dt = null;
  };

  $scope.inlineOptions = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: true
  };

  $scope.dateOptions = {
    dateDisabled: disabled,
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(),
    startingDay: 1
  };

  // Disable weekend selection
  function disabled(data) {
    var date = data.date,
      mode = data.mode;
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  }

  $scope.toggleMin = function() {
    $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
    $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
  };

  $scope.toggleMin();

  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };

  $scope.setDate = function(year, month, day) {
    $scope.dt = new Date(year, month, day);
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  $scope.altInputFormats = ['M!/d!/yyyy'];

  $scope.popup1 = {
    opened: false
  };

  $scope.popup2 = {
    opened: false
  };

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 1);
  $scope.events = [
    {
      date: tomorrow,
      status: 'full'
    },
    {
      date: afterTomorrow,
      status: 'partially'
    }
  ];

  function getDayClass(data) {
    var date = data.date,
      mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  }
}]);

angular.module("app.finance").controller("Finance.NewCtrl", ['$scope', function($scope) {
  $scope.partial = { name: 'form.html', url: 'finance/form.html'}
}]);

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