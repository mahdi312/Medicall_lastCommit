angular.module("APP").controller("Design_10149", ['$rootScope', '$scope', '$http', '$q', '$filter',function($rootScope,$scope, $http,$q, $filter){ 

////////////////// code for action : doctorSignOut 

$rootScope.design_10149 = function($scope,param,$event){
	$scope.doctorId = localStorage.getItem("__localStorage.__doctorId");
	//localStorage.clear();
	
	$rootScope.setDashboard("mainDashboard","mainPanel");
	
	
	url= 'http://172.16.201.42:7001/ehealth-ws-1.2/rest/api/v1/account/signout/doctor/'+$scope.doctorId+'';
	$scope.callBack_10149 = function(data){
        if (data.mdc_error_code == -1) {
            $rootScope.resultMsg(2, $filter('translate')(data.mdc_error_msg));
        } else if (data.mdc_error_code == 1) {
            $rootScope.resultMsg(1, $filter('translate')(data.mdc_error_msg));
            // Navigate : Sign Up/firstPage
            $scope.navigateULR(180332,190550);
        }
	};
	$rootScope.sendData($scope,url,null,'Get','callBack_10149');
};



} 
]);