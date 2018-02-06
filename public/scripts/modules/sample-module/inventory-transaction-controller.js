define(['angular', './sample-module'], function (angular, controllers) {
    'use strict';

    // Controller definition
   controllers.controller('transactionsCtrl', ['$scope', '$http', '$compile', '$log', 'PredixAssetService', 'PredixViewService','EnvURLService','TokenService', function ($scope, $http, $compile, $log, PredixAssetService, PredixViewService,EnvURLService,TokenService) {
	//$scope.search = true;
	$scope.overview = true;		
	$scope.summary = false;	
	$('#filter').hide();
	 $scope.DEV_DIV_SERVICE_URL = EnvURLService.config().DEV_DIV_SERVICE_URL;
	 $scope.blobStore_url = EnvURLService.config().BLOBSTORE_SERVICE_URL;
	$scope.validUser=false;
	$scope.InvalidUser=false;
	
	$scope.callAllServices = function(){
	$http.get($scope.blobStore_url+'/getRole?sso='+sso).success(function(response) {	
				
					$scope.ssoDetails = response;
						
						  if($scope.ssoDetails.groupName == 'ADMIN' || $scope.ssoDetails.groupName == 'BASIC' )
						{
							$scope.validUser=true;
							
						} 
						else
						{
							$scope.InvalidUser=true;
						
						}
			});
		
	 $http.get($scope.DEV_DIV_SERVICE_URL+'/getTotalInventoryTransactionData',{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).success(function(response){		
			$scope.responseData1 = response;
		
			$scope.custconsumptiondata = response;			
	});
	 
		
	//Export to Excel for INVENTORY TRANSACTION DETAILS Start
	
	$(function () {
	  $("#inventoryImageId13").click(function () {
		  //var JSONData = $scope.responseData1;
		  
		 var JSONData = $scope.custconsumptiondata;
				
				JSONData.forEach(function(obj){
							
							delete obj.dateFrom;
							delete obj.dateTo;
							delete obj.stoFrom;
							delete obj.stoTo;
				});
				
				var ReportTitle = "INVENTORY TRANSACTION DETAILS";
				var ShowLabel = true;
				var headerArray = {
					"source":"SOURCE",
					"sourceType":"SOURCE TYPE",
					"destination":"DESTINATION",
					"destinationType":"DESTINATION TYPE",
					"material":"MATERIAL",
					"materialDescription":"MATERIAL DESCRIPTION",
					"quantity":"QUANTITY",
					"shipmentOrder":"SHIPMENT ORDER",
					"customerPO":"CUSTOMER PO",
					"trackingNumber":"TRACKING NUMBER",
					"transactionDate":"TRANSACTION DATE",
					"type":"TYPE"
				}
				EnvURLService.JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel,headerArray);
			//});
					
	  });
	});
	
	//Export to Excel for INVENTORY TRANSACTION DETAILS End
		 
	
	$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
	
	
	$scope.submitForm = function (){			
			var dataObj = JSON.stringify($('form').serializeObject());
			var x = $('input#dateFrom').val();

			var z = $('input#dateTo').val();
			var item1 = $( "span.paper-typeahead" )[ 0 ];
			var item2 = $(item1).text();
			var item3 = $( "span.paper-typeahead" )[ 1 ];
			var item4 = $(item3).text();
			var item5 = $( "span.paper-typeahead" )[ 2 ];
			var item6 = $(item5).text();
			var item7 = $( "span.paper-typeahead" )[ 3 ];
			var item8 = $(item7).text();
			var item9 = $( "span.paper-typeahead" )[ 4 ];
			var item10 = $(item9).text();
			if (x === '' && z === '' && item2 === '' && item4 === '' && item6 === '' && item8 === '' && item10 === '' ){
				
			$http.get($scope.DEV_DIV_SERVICE_URL+'/getTotalInventoryTransactionData',{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).success(function(response){		
			$scope.custconsumptiondata = response;			
					});
								
            }
			else {
				var res = $http.post($scope.DEV_DIV_SERVICE_URL+'/getAllFilteredData', dataObj,{
		    headers : {'Content-Type': 'application/json',
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			});
		res.success(function(data, status, headers, config) {
			$scope.custconsumptiondata = data;
			
		});
		//res.error(function(data, status, headers, config) {
		
		//});		
		
		}			
						
		}; 
		

 $http.get($scope.DEV_DIV_SERVICE_URL+'/getAllMaterials',{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).success(function(response) {	
			$scope.materials = response;			
	});
	
	$http.get($scope.DEV_DIV_SERVICE_URL+'/getAllSTOs',{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).success(function(response) {	
			$scope.sto = response;			
	});
	$http.get($scope.DEV_DIV_SERVICE_URL+'/getAllSources',{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).success(function(response) {	
			$scope.source = response;			
	});
	$http.get($scope.DEV_DIV_SERVICE_URL+'/getAllDestinations',{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).success(function(response) {	
			$scope.destination = response;			
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