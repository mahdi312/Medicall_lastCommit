angular.module("APP").controller("Design_20198", ['$rootScope', '$scope', '$http', '$q', '$filter', function ($rootScope, $scope, $http, $q, $filter) {

////////////////// code for action : patientSMS 

    $rootScope.design_20198 = function ($scope, param, $event) {
        $scope.nationalCode = localStorage.getItem("__localStorage.__nationalCode");

        $scope.objData = {};
        $scope.objData.input1 = $scope.nationalCode;
        url = 'http://172.16.201.42:7001/ehealth-ws-1.2/rest/api/v1/validate/sms/send/confirm';
        $scope.callBack_20198 = function (data) {
            $rootScope.smsData = data.result;
            localStorage.setItem("__localStorage.__expirationTime", data.expiration_time);
            if (data.mdc_error_code == -1) {
                $rootScope.resultMsg(2, $filter('translate')(data.mdc_error_msg));
            } else if (data.mdc_error_code == 1) {
                $rootScope.resultMsg(1, $filter('translate')(data.mdc_error_msg));
                // Navigate : Sign Up/verifyPage
                $scope.navigateULR(180332, 190613);
            }
        };
        $rootScope.sendData($scope, url, $scope.objData, 'Post', 'callBack_20198');
    };


}
]);