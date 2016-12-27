angular.module("app.finance").controller("Finance.ListCtrl", ['$scope', function($scope) {
  $scope.partial = { name: 'form.html', url: 'finance/form.html'}
}]);
