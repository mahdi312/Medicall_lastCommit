angular.module('APP').controller('langCtrl', function($scope, $rootScope) {
	$scope.languageName="فارسی";
	$scope.changeLanText=function(lan){
		if(lan=='Fa'){
			$scope.languageName="فارسی";
		}
		if(lan=='En'){
			$scope.languageName="English";
		}
	}
});