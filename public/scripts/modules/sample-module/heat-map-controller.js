define(['angular', './sample-module'], function (angular, controllers) {
    'use strict';
    // Controller definition
    controllers.controller('heatmapCtrl', ['$scope','$http', '$compile', '$log', 'PredixAssetService', 'PredixViewService','EnvURLService','TokenService','$timeout', '$injector', function ($scope, $http, $compile, $log, PredixAssetService, PredixViewService,EnvURLService,TokenService, $timeout, $injector) {
		
		 $scope.blobStore_url = EnvURLService.config().BLOBSTORE_SERVICE_URL;
	   $scope.DEV_DIV_SERVICE_URL = EnvURLService.config().DEV_DIV_SERVICE_URL;
        
var map,radius,opacity;

$scope.callAllServices = function(){
		$http.get($scope.blobStore_url+'/getRole?sso='+sso).success(function(response) {	
				
					$scope.ssoDetails = response;
						
						  if($scope.ssoDetails.groupName == 'ADMIN' || $scope.ssoDetails.groupName == 'BASIC' )
						{
							$scope.validUser=true;
							//console.log("VALID USER...!!!!");
						} 
						else
						{
							$scope.InvalidUser=true;
							//console.log("INVALID USER...!!!!");
						}
			});

$http.get($scope.DEV_DIV_SERVICE_URL+'/div/heatmap/landingpage').success(function(response) {
				$scope.heatMapRes = response;
    
            
			$scope.heatFinalRes = $scope.heatMapRes;
            
            var heatMapFirstlvlres1=[];
				var heatFinalRes = {
							"details11": []
						}
						
						console.log('list size   '+$scope.heatMapRes.length);
					var i =0;
					for (i = 0; i < $scope.heatMapRes.length; i++){
					if($scope.heatMapRes[i].latitude !== undefined || $scope.heatMapRes[i].latitude !== null){	
					if($scope.heatMapRes[i].latitude!== undefined){
						var lat =$scope.heatMapRes[i].latitude;
						}
                    
					else var lat='';
					
					if($scope.heatMapRes[i].longitude!== undefined){
						var lng=$scope.heatMapRes[i].longitude;
						}
					else var lng='';
					
					if($scope.heatMapRes[i].quantity!== undefined){
						var quantity=$scope.heatMapRes[i].quantity;
						}
					else var quantity='';
					
					console.log('quantity >>>>>> '+quantity);
                        
                     if(quantity >= 500){
                           var weight = 9
                        }
                    else if(quantity >= 250){
                        var weight = 3
                        }
                        else var weight = 0.5
                    				
					var nodeObj11 = {
						location: new google.maps.LatLng(lat, lng),
						weight: weight			
					}
					heatFinalRes.details11.push(nodeObj11);	
                    }
			}
    
    angular.forEach(response, function(value, key) {
    
     var heatMapFirstlvlres2 = {
            
                    "customerCode":value.customerCode,
                    "quantity":value.quantity,
                    "lat":parseFloat(value.latitude),
                    "lng":parseFloat(value.longitude)
                };
            heatMapFirstlvlres1.push(heatMapFirstlvlres2);
        
           });
    
    console.log("heatMapFirstlvlres1",heatMapFirstlvlres1);

		$scope.heatMapFirstlvlres = heatFinalRes.details11;
        $scope.heatMapFirstlvlres1 = {     
            "customerCode":response.customerCode,
            "quantity":response.quantity,
            "lat":response.latitude,
            "lng":response.longitude
        };
       
		//console.log("HeatMap Response : "+ $scope.heatMapFirstlvlres);
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: new google.maps.LatLng(39.609463, -101.315770),
    mapTypeId: 'terrain'
  });

var heatmap = new google.maps.visualization.HeatmapLayer({
  //data: heatMapData
  data: $scope.heatMapFirstlvlres
});
heatmap.set('radius', heatmap.get('radius') ? null : 60);
//heatmap.set('opacity', heatmap.get('opacity') ? null : 2);
heatmap.setMap(map);
    //var heatMapScope = $scope.heatMapRes;
   
    var markers = heatMapFirstlvlres1.map(function(location) {
        return new google.maps.Marker({
        position: location,
        icon: '../images/greenBubble.png'
    });
  });
    
    //alert("After markers");
    
 var markerCluster = new MarkerClusterer(map, markers);    

 google.maps.event.addListener(markerCluster,'clusterclick', 
    function(cluster){
              var $state = $injector.get('$state');
                document.querySelector('px-app-nav').markSelected('/googleMap');
                $state.go('googleMap');
    });
        
});
        
       }
	   		
	var sso = document.querySelector('px-login').querySelector('div').querySelectorAll('button')[1].querySelector('span').textContent;
		//var sso = 502685514;
		// ACS
	TokenService.getToken().then(
										   function(data) {
												 $scope.config = data.config;
												 $scope.postgresHeader = data.postgresWSHeader;
												 
													$scope.callAllServices();
												});
 
        
        
        
    }]);
});
