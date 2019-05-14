app = angular.module("APP").controller("Ctrl190479", ['$rootScope','$scope', '$http','$q','$filter','$translate','$mdToast','$http','$timeout', function ($rootScope,$scope, $http,$q, $filter,$translate,$mdToast,$http,$timeout){

	// angularJs-Content -> TemplateType
	// For Dialog 
	$scope.getDynamicData = function(variable,staticData,baseUrlId,url,catalog,filter,$scope){
		$rootScope.getDynamicData(variable,staticData,baseUrlId,url,catalog,filter,$scope);
	}
	$scope.getData = function(variable,url,filter,scope){
		$rootScope.getData(variable,url,filter,scope);
	}
	
	$scope.sendData = function ($scope,url,param,methodType,callback,scope) {
		$rootScope.sendData($scope,url,param,methodType,callback,scope);
	}
	
	$scope.getInitData = function(variable,staticData,baseUrlId,url,param,scope){
		$rootScope.getInitData(variable,staticData,baseUrlId,url,param,scope);
	}
	//End For Dialog
	
	
$scope.makeDesign_293190 = function(param){ 
	 $rootScope.design_10111($scope,param); 
} ;

$scope.makeDesign_272365 = function(param){ 
	 $rootScope.design_20224($scope,param); 
};
    // auto Focus
    window.onload = function() {
        var input = document.getElementById("part[0]").focus();
    };

    // countdown Timer
    $scope.showCountDownTimer = true ;
    $scope.resendButton = true ;
    $scope.counter = localStorage.getItem("__localStorage.__expirationTime")/1000;
    if($scope.counter !== 0 || $scope.counter !== null) {
        $scope.onTimeout = function () {
            if ($scope.counter > 0) {
                $scope.counter--;
            }else{
                $scope.resendButton = false ;
			}
            myTimeout = $timeout($scope.onTimeout, 1000);
        };
        var myTimeout = $timeout($scope.onTimeout, 1000);
    }else {
        $scope.showCountDownTimer = false ;
    }

    // verify input properties
    $scope.part=[];


}]);

// filter for count down timer
app.filter('secondsToDateTime', [function() {
    return function(seconds) {
        return new Date(1970, 0, 1).setSeconds(seconds);
    };
}]);

app.requires.push('ngMaterial','ngStorage','oc.lazyLoad','pascalprecht.translate','ngMessages','ngMask');

//directive for going to next input
app.directive("moveNextOnMaxlength", function() {
    return {
        restrict: "A",
        link: function($scope, element, attrs,newValue) {
            element.on("input", function(e) {

                if(element.val().length == element.attr("maxlength")) {
                    //alert(element.attr("maxlength"))
                    var $nextElement = element.next();
                    if($nextElement.length) {
                        $nextElement[0].focus();
                    }
                }
            });
        }
    }
});

//
 app.directive('validNumber', function() {
  return {
    require: '?ngModel',
    link: function(scope, element, attrs, ngModelCtrl) {
      if(!ngModelCtrl) {
        return; 
      }

      ngModelCtrl.$parsers.push(function(val) {
        if (angular.isUndefined(val)) {
            var val = '';
        }
        var clean = val.replace( /[^0-9]+/g, '');
        if (val !== clean) {
          ngModelCtrl.$setViewValue(clean);
          ngModelCtrl.$render();
        }
        return clean;
      });

      element.bind('keypress', function(event) {
        if(event.keyCode === 32) {
          event.preventDefault();
        }
      });
    }
  };
});
 
 