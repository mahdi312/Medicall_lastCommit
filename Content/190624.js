app = angular.module("APP").controller("Ctrl190624", ['$rootScope','$scope', '$http','$q','$filter','$translate','$mdToast','$http', function ($rootScope,$scope, $http,$q, $filter,$translate,$mdToast,$http){
	$scope.options = [
        {
          name: 'میزان رضایت بیماران',
          id: '1'
        }
		
    ];
	
	$scope.type = $scope.options[0].value;
    $scope.selectedOption = $scope.options[0];
	$scope.convertTodayToPersianFilter=function(){
		$scope.todayDate=$scope.today.jDate();
		$scope.todayMonth=$scope.today.jMonth()+1;
		$scope.todayYear=$scope.today.jYear();
		$scope.todayDateName=new persianDate([$scope.todayYear,$scope.todayMonth,$scope.todayDate]).format('dddd'); 
		$scope.todayMonthName=new persianDate([$scope.todayYear,$scope.todayMonth,$scope.todayDate]).format('MMMM');
	}
	
	$scope.convertTomarrowToPersianFilter=function(){
		$scope.tomarrowDate=$scope.tomarrow.jDate();
		$scope.tomarrowMonth=$scope.tomarrow.jMonth()+1;
		$scope.tomarrowYear=$scope.tomarrow.jYear();
		$scope.tomarrowDateName=new persianDate([$scope.tomarrowYear,$scope.tomarrowMonth,$scope.tomarrowDate]).format('dddd'); 
		$scope.tomarrowMonthName=new persianDate([$scope.tomarrowYear,$scope.tomarrowMonth,$scope.tomarrowDate]).format('MMMM');
	}
	
	$scope.convertDayAfterTomarrowToPersianFilter=function(){
		$scope.dayAfterTomarrowDate=$scope.dayAfterTomarrow.jDate();
		$scope.dayAfterTomarrowMonth=$scope.dayAfterTomarrow.jMonth()+1;
		$scope.dayAfterTomarrowYear=$scope.dayAfterTomarrow.jYear();
		$scope.dayAfterTomarrowDateName=new persianDate([$scope.dayAfterTomarrowYear,$scope.dayAfterTomarrowMonth,$scope.dayAfterTomarrowDate]).format('dddd'); 
		$scope.dayAfterTomarrowMonthName=new persianDate([$scope.dayAfterTomarrowYear,$scope.dayAfterTomarrowMonth,$scope.dayAfterTomarrowDate]).format('MMMM');
	}
	
	$scope.setLocal=function(local){
		$scope.today=moment();
		$scope.tomarrow=moment().add(1,'days');
		$scope.dayAfterTomarrow=moment().add(2,'days');	
		if(local=='fa'){
			//today
			$scope.convertTodayToPersianFilter();
			//tomarrow
			$scope.convertTomarrowToPersianFilter();
			//dayAfterTomarrow
			$scope.convertDayAfterTomarrowToPersianFilter();
		}
	}
	
	$scope.next=function(){
		$scope.today=$scope.tomarrow;
		$scope.convertTodayToPersianFilter();
				
		$scope.tomarrow=$scope.dayAfterTomarrow;
		$scope.convertTomarrowToPersianFilter();
		
		$scope.dayAfterTomarrow=moment($scope.tomarrow).add(1,'days');
		$scope.convertDayAfterTomarrowToPersianFilter();
	}
	$scope.last=function(){
		$scope.dayAfterTomarrow=$scope.tomarrow;
		$scope.convertDayAfterTomarrowToPersianFilter();
		
		$scope.tomarrow=$scope.today;
		$scope.convertTomarrowToPersianFilter();
		
		$scope.today=moment($scope.today).add(-1,'days');
		$scope.convertTodayToPersianFilter();
	}
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
	
	
$scope.makeDesign_293136 = function(param){ 
	 $rootScope.design_20215($scope,param); 
} 

$scope.makeDesign_293140 = function(param){ 
	 $rootScope.design_20215($scope,param); 
} 

$scope.makeDesign_293251 = function(param){ 
	 $rootScope.design_20215($scope,param); 
} 

$scope.makeDesign_293131 = function(param){ 
	 $rootScope.design_20215($scope,param); 
} 

$scope.makeDesign_293132 = function(param){ 
	 $rootScope.design_20215($scope,param); 
} 

$scope.makeDesign_303521 = function(param){ 
	 $rootScope.design_30255($scope,param); 
} 
 

 
 
 
}]);
app.requires.push('ngMaterial','ngStorage','oc.lazyLoad','pascalprecht.translate','ngMessages','ngMask');

 
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

app.directive('starRating',
	function() {
		return {
			restrict : 'EA',
			template : '<ul class="rating">'
					 + '	<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">'
					 + '\u2605'
					 + '</li>'
					 + '</ul>',
			scope : {
				ratingValue : '=',
				max : '=',
				onRatingSelected : '&'
			},
			link : function(scope, elem, attrs) {
				var updateStars = function() {
					scope.stars = [];
					for ( var i = 0; i < scope.max; i++) {
						scope.stars.push({
							filled : i < scope.ratingValue
						});
					}
				};
				
				scope.toggle = function(index) {
					scope.ratingValue = index + 1;
					scope.onRatingSelected({
						rating : index + 1
					});
				};
				scope.$watch('ratingValue',	function(oldVal, newVal) {
						if (newVal) {
							console.log("activated")
							updateStars();
						}
					}
				);
			}
		};
	}
);
app.directive('init', function () {
    return {
        priority: 0,
        compile: function () {
            return {
                pre: function (scope, element, attrs) {
                    scope.$eval(attrs.init);
                }
            };
        }
    };
});