angular.module("APP").controller("Design_10092", ['$rootScope', '$scope', '$http', '$q', '$filter', function ($rootScope, $scope, $http, $q, $filter) {

////////////////// code for action : userStatus 

    $rootScope.design_10092 = function ($scope, param, $event) {
        localStorage.setItem("__localStorage.__nationalCode", $scope.Form.nationalCode);

        url = 'http://172.16.201.42:7001/ehealth-ws-1.2/rest/api/v1/membership/status/' + $scope.Form.nationalCode + '';
        $scope.callBack_10092 = function (data) {

            if (data.mdc_error_code == -1) {
                $rootScope.resultMsg(2, $filter('translate')(data.mdc_error_msg));
            } else if (data.mdc_error_code == 1) {
                $rootScope.resultMsg(1, $filter('translate')(data.mdc_error_msg));

                if (data.result == 'cell_phone') {
                    // Navigate : Sign Up/cellPhone
                    $scope.navigateULR(180332, 190476);
                }

                if (data.result == 'patient_sms') {
                    // Design : sendSMS1
                    $rootScope.design_10100($scope);
                }

                if (data.result == 'patient_password') {
                    // Design : patientSMS
                    $rootScope.design_20198($scope);
                }

                if (data.result == 'doctor_patient_password') {
                    localStorage.setItem("__localStorage.__patState", 'php');
                    // Navigate : Sign Up/docPassword
                    $scope.navigateULR(180332, 190649);
                }
                if (data.result == 'doctor_password') {
                    localStorage.setItem("__localStorage.__patState", 'phnp');
                    // Navigate : Sign Up/docPassword
                    $scope.navigateULR(180332, 190649);
                }

                if (data.result == 'secretary_patient_password') {
                    localStorage.setItem("__localStorage.__patState", 'php');
                    // Navigate : Sign Up/secPass
                    $scope.navigateULR(180332, 190648);
                }
                if (data.result == 'secretary_password') {
                    localStorage.setItem("__localStorage.__patState", 'phnp');
                    // Navigate : Sign Up/secPass
                    $scope.navigateULR(180332, 190648);
                }

                if (data.result == 'secretary_password_is_required') {
                    // Navigate : Sign Up/setSecPass
                    $scope.navigateULR(180332, 190627);
                }
            }
        }
        ;
        $rootScope.sendData($scope, url, null, 'Get', 'callBack_10092');
    }
    ;


}
]);