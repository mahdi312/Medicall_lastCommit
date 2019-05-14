angular.module("APP").controller("Design_20224", ['$rootScope', '$scope', '$http', '$q', '$filter', function ($rootScope, $scope, $http, $q, $filter) {

////////////////// code for action : compareSecondCode 

    $rootScope.design_20224 = function ($scope, param, $event) {
        $scope.Form.verifyCode = $scope.Form.verifyCode1.toString()+$scope.Form.verifyCode2.toString()+$scope.Form.verifyCode3.toString()+$scope.Form.verifyCode4;

        $scope.nationalCode = localStorage.getItem("__localStorage.__nationalCode");

        $scope.SmsObject = {};
        $scope.SmsObject.input = $scope.Form.verifyCode;
        $scope.SmsObject.input1 = $rootScope.smsData;
        $scope.SmsObject.person = {};
        $scope.SmsObject.person.nationalCode = $scope.nationalCode;

        url = 'http://172.16.201.42:7001/ehealth-ws-1.2/rest/api/v1/membership/signup/patient/sms/token';
        $scope.callBack_20224 = function (data) {
            localStorage.setItem("__localStorage.__token", data.jwt_token);
            localStorage.setItem("__localStorage.__CLIENT_ID", data.client_id);
            localStorage.setItem("__localStorage.__patientId", data.result);

            if (data.mdc_error_code == -1) {
                $rootScope.resultMsg(2, $filter('translate')(data.mdc_error_msg));
            } else if (data.mdc_error_code == 1) {
                $rootScope.resultMsg(1, $filter('translate')(data.mdc_error_msg));
                // Design : goToPatientProfile
                $rootScope.design_20238($scope);
            }
        };
        $rootScope.sendData($scope, url, $scope.SmsObject, 'Post', 'callBack_20224');
    };


}
]);