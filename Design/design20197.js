angular.module("APP").controller("Design_20197", ['$rootScope', '$scope', '$http', '$q', '$filter', function ($rootScope, $scope, $http, $q, $filter) {

////////////////// code for action : compareVerifyCode 

    $rootScope.design_20197 = function ($scope, param, $event) {
        $scope.Form.verifyCode = $scope.Form.verifyCode1.toString()+$scope.Form.verifyCode2.toString()+$scope.Form.verifyCode3.toString()+$scope.Form.verifyCode4;
        $scope.SmsObject = {};
        $scope.SmsObject.input = $scope.Form.verifyCode;
        $scope.SmsObject.input1 = $rootScope.smsData;
        url = 'http://172.16.201.42:7001/ehealth-ws-1.2/rest/api/v1/validate/sms/compare';
        $scope.callBack_20197 = function (data) {
            if (data.mdc_error_code == -1) {
                $rootScope.resultMsg(2, $filter('translate')(data.mdc_error_msg));
            } else if (data.mdc_error_code == 1) {
                $rootScope.resultMsg(1, $filter('translate')(data.mdc_error_msg));
                // Design : signUpPatient
                $rootScope.design_10096($scope);
            }
        };
        $rootScope.sendData($scope, url, $scope.SmsObject, 'Post', 'callBack_20197');
    };


}
]);