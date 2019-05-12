angular.module("APP").controller("Design_10116", ['$rootScope', '$scope', '$http', '$q', '$filter',function($rootScope,$scope, $http,$q, $filter){

////////////////// code for action : goToYourPatientState

$rootScope.design_10116 = function($scope,param,$event){
    $scope.patState = localStorage.getItem("__localStorage.__patState");

    if($scope.patState == 'php'){
    	//call patientSMS ->  patient pass
        $rootScope.design_20198($scope);
	}else if($scope.patState == 'phnp'){
    	//call SEND SMS1 -> patient Dashboard
        $rootScope.design_10100($scope);
	}
};



} 
]);