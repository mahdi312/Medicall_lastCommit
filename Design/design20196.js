angular.module("APP").controller("Design_20196", ['$rootScope', '$scope', '$http', '$q', '$filter',function($rootScope,$scope, $http,$q, $filter){ 

////////////////// code for action : confirmNewUser 

$rootScope.design_20196 = function($scope,param,$event){
	var mobile = $scope.Form.country+$scope.Form.cellPhone ;
	
	$rootScope.mobileNo = {};
	$rootScope.mobileNo.input = mobile ;
	url= 'http://172.16.201.42:7001/ehealth-ws-1.2/rest/api/v1/validate/sms/send/confirm';
	$scope.callBack_20196 = function(data){
		$rootScope.smsData = data.result;
        localStorage.setItem("__localStorage.__expirationTime", data.expiration_time);
        if (data.mdc_error_code == -1) {
            $rootScope.resultMsg(2, $filter('translate')(data.mdc_error_msg));
        } else if (data.mdc_error_code == 1) {
            $rootScope.resultMsg(1, $filter('translate')(data.mdc_error_msg));
            // Navigate : Sign Up/verifyPage
            $scope.navigateULR(180332,190669);
        }
	};
	$rootScope.sendData($scope,url,$rootScope.mobileNo,'Post','callBack_20196');
};



} 
]);