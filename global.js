var app = angular.module("APP", ['ngMaterial','ngStorage','oc.lazyLoad','pascalprecht.translate','ngMessages']);

app.controller("globalCTRL", ['$rootScope','$scope', '$http','$q','$filter','$translate','$mdToast', function ($rootScope,$scope, $http,$q, $filter,$translate,$mdToast){
	$rootScope.AppTitle="Medicall";
	$rootScope.BaseUrls="http://172.16.201.42:7001/ehealth-ws-1.2/rest/api/v1/;http://172.16.201.249:8081/rest/api/v1/".split(";");
	$rootScope.contents=[];
	$rootScope.changeLanguage = function (lang) {
		$translate.use(lang);
		localStorage.setItem("__localStorage.__lang",lang);
	};

	//toastMessage

    var toastUrl="toastTmpl/TOAST_TEMPLATET.html";
    $rootScope.resultMsg=function(status,message){
        if(status!= null && status !=''  && status==1){
            $rootScope.resCode=1;
        }else
            $rootScope.resCode=2;

        if(message!= null && message !=''){
            $rootScope.resMsg=message;
        }else{
            if(status!= null && status !='' && status==1)
                $rootScope.resMsg= $filter('translate')('OPERATION_COMMITED');
            else
                $rootScope.resMsg= $filter('translate')('OPERATION_FAILED');
        }
        $scope.showResultToast();
    };
    $scope.showResultToast = function() {
        $mdToast.show({
            hideDelay   : 3000,
            position    : 'top right',
            templateUrl : toastUrl
        });
    };



		// from webDefiner > 1

$rootScope.getRand = function(){
	$rootScope.rand = Math.random();
}
$rootScope.getRand();

// todo change for each project
$rootScope.setJWTToken = function(client_id,jwt_token)
{
	localStorage.setItem("__localStorage.__CLIENT_ID",client_id);
	localStorage.setItem("__localStorage.__token",jwt_token);
}

if(localStorage.getItem("__localStorage.__token")!=null)
	var token = localStorage.getItem("__localStorage.__token");
	
if(localStorage.getItem("__localStorage.__CLIENT_ID")!=null)
	var clientId = localStorage.getItem("__localStorage.__CLIENT_ID");

	
$rootScope.$watch("__toastMessage",function (newValue, oldValue) {
	if(newValue!=oldValue){
		var toast = $mdToast
					.simple()
					.textContent($rootScope.__toastMessage)
					.hideDelay(3000);
					$mdToast.show(toast);
	}
});	

$rootScope.getInitData = function(variable,staticData,baseUrlId,url,param,scope){
	if(baseUrlId!="")
		url = $rootScope.BaseUrls[baseUrlId]+url;
	
	if(staticData!='')
		$rootScope[variable] = staticData;
	else
	{
		$http({
			url: url,
			params:param,
			headers:{ 	
						'Content-Type': 'application/json' ,
						'CLIENT_ID':localStorage.getItem("__localStorage.__CLIENT_ID"),
						'authorization':'Bearer '+localStorage.getItem("__localStorage.__token")
					}
			})
		.then(function (response) {
			$rootScope[variable] = response.data;
			scope[variable] = response.data;
		});
	}
}
	
$rootScope.getDynamicData = function(variable,staticData,baseUrlId,url,catalog,filter,scope){
	data={};
	data.item = catalog;
	data.filter = filter;
	if(baseUrlId!="")
		url = $rootScope.BaseUrls[baseUrlId]+url;
	
	if(staticData!='')
		$rootScope[variable] = staticData;
	else
	{
		$http({
			url: url,
			params:data,
			headers:{ 	
						'Content-Type': 'application/json' ,
						'CLIENT_ID':localStorage.getItem("__localStorage.__CLIENT_ID"),
						'authorization':'Bearer '+localStorage.getItem("__localStorage.__token")
					}
			})
		.then(function (response) {
			$rootScope[variable] = response.data;
			scope[variable] = response.data;
		});
	}
}

$rootScope.getData = function(variable,url,filter,scope){
	$http({
		url: url,
		data:filter,
		headers:{ 	
					'Content-Type': 'application/json' ,
					'CLIENT_ID':localStorage.getItem("__localStorage.__CLIENT_ID"),
					'authorization':'Bearer '+localStorage.getItem("__localStorage.__token")
				}
		})
	.then(function (response) {
		$rootScope[variable] = response.data;
		scope[variable] = response.data;
	});
}

$rootScope.sendData = function ($scope,url,param,methodType,callback,scope) {
	if(url=='')
		$scope.$eval(callback+"()");
	else
	{	
		$http({
			url: url,
			data:param,
			method: methodType,
			headers:{ 	
						'Content-Type': 'application/json' ,
						'CLIENT_ID':localStorage.getItem("__localStorage.__CLIENT_ID"),
						'authorization':'Bearer '+localStorage.getItem("__localStorage.__token")
					}
		})
		.then(function (response) {
			$scope.$eval(callback).call([],response.data);
			scope.$eval(callback).call([],response.data);
		});
	}	
}

$rootScope.uploadPhoto = function ($scope,url,param,methodType,callback,imageName) {
	$http({
		url: url,
		uploadEventHandlers: {
			progress: function (e) {
				if (e.lengthComputable) {
					$rootScope.image_source[imageName].progress = (e.loaded / e.total) * 100;
				}
			}
		},			
		data:param,
		method: methodType,
			headers:{ 	
						'Content-Type': 'application/json' ,
						'CLIENT_ID':localStorage.getItem("__localStorage.__CLIENT_ID"),
						'authorization':'Bearer '+localStorage.getItem("__localStorage.__token")
					}
	})
	.then(function (response) {
		$scope.$eval(callback).call([],response.data,imageName);
	});	
}
}]);


app.config(function ($mdThemingProvider,$translateProvider,$qProvider) {
	var lang = localStorage.getItem("__localStorage.__lang");
	if(lang==null)
	{
		lang = "fa";
		localStorage.setItem("__localStorage.__lang",lang);
	}

    $mdThemingProvider.definePalette('firstpalette', {
        '50': 'e1e5ec',
        '100': 'b4bfd0',
        '200': '8294b1',
        '300': '506992',
        '400': '2b497a',
        '500': '052963',
        '600': '04245b',
        '700': '041f51',
        '800': '031947',
        '900': '010f35',
        'A100': '6d84ff',
        'A200': '3a59ff',
        'A400': '072eff',
        'A700': '0025ec',
        'contrastDefaultColor': 'light',
        'contrastDarkColors': [
            '50',
            '100',
            '200',
            'A100'
        ],
        'contrastLightColors': [
            '300',
            '400',
            '500',
            '600',
            '700',
            '800',
            '900',
            'A200',
            'A400',
            'A700'
        ]
    });
    $mdThemingProvider.definePalette('secondarypalette', {
        '50': 'e0f8fa',
        '100': 'b3eef3',
        '200': '80e3eb',
        '300': '4dd7e3',
        '400': '26cfdd',
        '500': '00c6d7',
        '600': '00c0d3',
        '700': '00b9cd',
        '800': '00b1c7',
        '900': '00a4be',
        'A100': 'e6fbff',
        'A200': 'b3f3ff',
        'A400': '80ebff',
        'A700': '67e7ff',
        'contrastDefaultColor': 'light',
        'contrastDarkColors': [
            '50',
            '100',
            '200',
            '300',
            '400',
            '500',
            '600',
            '700',
            'A100',
            'A200',
            'A400',
            'A700'
        ],
        'contrastLightColors': [
            '800',
            '900'
        ]
    });
    $mdThemingProvider.theme('mcgtheme')
        .primaryPalette('firstpalette')
        .accentPalette('secondarypalette');

    $qProvider.errorOnUnhandledRejections(false);
	$translateProvider.useStaticFilesLoader({
		prefix: 'Language/',
		suffix: '.json'
	})
	.preferredLanguage(lang)
	.fallbackLanguage(['en', 'fa']);
});

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
