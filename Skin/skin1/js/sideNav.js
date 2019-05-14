angular.module('APP').controller('sidenavCtrl', function($scope,$rootScope, $mdSidenav) {
    $scope.toggleRight= buildToggler('right');
	function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      };
    }
});
