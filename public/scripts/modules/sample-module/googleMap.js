define(['angular', './sample-module'], function (angular, controllers) {
    'use strict';
    // Controller definition
    controllers.controller('googleMapCtrl', ['$scope', '$http', '$compile', '$log', 'PredixAssetService', 'PredixViewService','EnvURLService','TokenService','$timeout', function ($scope, $http, $compile, $log, PredixAssetService, PredixViewService,EnvURLService,TokenService, $timeout) {
		
		 $scope.blobStore_url = EnvURLService.config().BLOBSTORE_SERVICE_URL;
	   $scope.DEV_DIV_SERVICE_URL = EnvURLService.config().DEV_DIV_SERVICE_URL;
        
        var path = [];
        var counter = 0;
        var routeArray = [];
        var img;
        var marker = document.createElement('google-map-marker');
        var map;
        var lineColor;
		
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
		
            var mapOptions = {
            center: new google.maps.LatLng(39.609463, -101.315770),
            zoom: 8,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
       map = new google.maps.Map(document.getElementById("dvMap"), mapOptions); 
	
		
		
		
     
            
        $http.get($scope.DEV_DIV_SERVICE_URL+'/div/heatmap/secondpage').success(function(responseData) {
          //console.log("responseData-------",responseData);
    
    var mainArrayCounter = 0;
        laodAllArray();
        function laodAllArray() {
                routeArray = [];
                path = [];
                counter = 0;
									
                onloadFun(responseData[mainArrayCounter]);
                //console.log("responseData[mainArrayCounter]---------",responseData[mainArrayCounter]);
				
    }
       
       function onloadFun(a_data) {
		   
           var img;
        var marker = document.createElement('google-map-marker');
          
        var infoWindow = new google.maps.InfoWindow();
        var lat_lng = new Array();
        var latlngbounds = new google.maps.LatLngBounds();
		
		//console.log('Data..',a_data);
		
		if(a_data!==undefined && a_data!==null )
				{	
        for (i = 0; i < a_data.length; i++) {
             marker = document.createElement('google-map-marker');
            var data = a_data[i];
			//console.log('Data..',data);
            var myLatlng = new google.maps.LatLng(data.lat, data.lng);
            lat_lng.push(myLatlng);
			var iconTitle = data.description;
            
            if(data.type == "fsg"){
                   img = '../images/warehouse1.png';
                    marker.setAttribute('icon',img);
                }
                else{
                    img = '../images/Boss.png';
                    marker.setAttribute('icon',img);
                }
            
            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                icon: img,
                title: iconTitle
            });
            latlngbounds.extend(marker.position);
            (function (marker, data) {
                google.maps.event.addListener(marker, "click", function (e) {
                    infoWindow.setContent(data.description);
                    infoWindow.open(map, marker);
                });
            })(marker,data);
            
             
        }
				}
        map.setCenter(latlngbounds.getCenter());
        map.fitBounds(latlngbounds);
		
 
        //***********ROUTING****************//
 
        //Initialize the Path Array
           
        for (var i = 1; i < lat_lng.length; i++) {
        path = new google.maps.MVCArray();
           
           var arrow = {
            path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
        };
            
           
 
        //Initialize the Direction Service
        //Set the Path Stroke Color
            var polyLineObj = { 
                                icons: [{
                                        icon: arrow,
                                        offset: '0',
                                        repeat: '180px'
                                       }],
                                map: map
                               // strokeColor: 'purple'
            }
        
            //for(var i=0; i<a_data.length; i++){
               
                    if(a_data[i].type == "fsg"){
                        
                    polyLineObj.strokeColor = "purple";
                        console.log("INSIDE purple")
                    }else{
                        console.log("higggghjhjgyfghfhgh")
                        polyLineObj.strokeColor = "#4986E7";
                    }  
                  
            //}
            
            
          
            var poly = new google.maps.Polyline(polyLineObj);
 
        //Loop and Draw Path Route between the Points on MAP
            if (i  < lat_lng.length) {
                var src = lat_lng[0];
                var des = lat_lng[i];
                path.push(src);
                path.push(des);
                poly.setPath(path);
            }
        }
        loadPath();
		google.maps.event.trigger(map,'resize');
		
    }
   
    function loadPath() {
        console.log("INSIDE LOADpath..........")
        if(counter < routeArray.length) {
        var service = new google.maps.DirectionsService();
        service.route(routeArray[counter], function (result, status) {
            console.log("Inside route");
                    if (status == google.maps.DirectionsStatus.OK) {
                        for (var i = 0, len = result.routes[0].overview_path.length; i < len; i++) {
                            path.push(result.routes[0].overview_path[i]);
                        }
                        counter++;
                        loadPath();
                    }
                });
        }else {
            console.log("check else");
            mainArrayCounter++;
            if(mainArrayCounter < responseData.length) {
                laodAllArray();
            }
            
        }

    }
	
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