/**
 * Renders all the widgets on the tab and triggers the datasources that are used by the widgets.
 * Customize your widgets by:
 *  - Overriding or extending widget API methods
 *  - Changing widget settings or options
 */
 
define(['angular',
    './sample-module' 
], function (angular, controllers) {
    'use strict';
    controllers.controller('SAPFileLogsCtrl',['$scope','$http','$compile', '$log', 'PredixAssetService', 'PredixViewService','TokenService','EnvURLService',function Ctrl($scope,$http,$compile, $log, PredixAssetService, PredixViewService,TokenService,EnvURLService){
		 $scope.blobStore_url = EnvURLService.config().BLOBSTORE_SERVICE_URL;	
		 $scope.sapUpload_url = EnvURLService.config().SAP_UPLOAD_URL;
		 
	$scope.validUser=false;
	$scope.InvalidUser=false;
	
	var sso = document.querySelector('px-login').querySelector('div').querySelectorAll('button')[1].querySelector('span').textContent;
		
		//var sso = 502685514;
		// ACS
		
		$scope.callAllServices = function(){
			
		$http.get($scope.blobStore_url+'/getRole?sso='+sso).success(function(response) {	
				
					$scope.ssoDetails = response;
						//console.log("USER.....Role..",$scope.ssoDetails);
						  if($scope.ssoDetails.groupName == 'ADMIN')
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
		 
		$http.get($scope.sapUpload_url+'/getSAPUploadDetails',{
		    headers : {
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).success(function (result){
            $scope.logDetails = result;
			
				
				var logData = {
							"details": []
						}
					var i =0;
					for (i = 0; i < $scope.logDetails.length; i++){
					
					if($scope.logDetails[i].id!== undefined){
						var id=$scope.logDetails[i].id;
						}
					else var id='';
					
					
					if($scope.logDetails[i].recordsPassed!== undefined){
					var	recordsPassed= $scope.logDetails[i].recordsPassed;
					}
					else var recordsPassed='';
					
					if($scope.logDetails[i].recordsFailed!== undefined){
					var	recordsFailed= $scope.logDetails[i].recordsFailed;
					}
					else var recordsFailed='';
					
					if($scope.logDetails[i].totRecords!== undefined){
					var	totRecords= $scope.logDetails[i].totRecords;
					}
					else var totRecords='';
					
					if($scope.logDetails[i].serviceName!== undefined){
					var	serviceName= $scope.logDetails[i].serviceName;
					}
					else var serviceName='';
					
					if($scope.logDetails[i].isProcessed!== undefined){
						
					var	isProcessed_char= $scope.logDetails[i].isProcessed;
					var isProcessed = '';
						if(isProcessed_char=='Y')
						{
							isProcessed='Yes';
						}
						else if(isProcessed_char=='N')
						{
							isProcessed='No';
						}
					}
					else var isProcessed='';
					
					if($scope.logDetails[i].createDtm!== undefined){
					var	createDtm= $scope.logDetails[i].createDtm;
					}
					else var createDtm='';
			
			var nodeObj11 = {
						id: "<a href='javascript:void(0)' onclick='drilldownLog()' style='text-decoration: none'>"+id+"</a>",
						recordsPassed: recordsPassed,
						recordsFailed: recordsFailed,
						totRecords: totRecords,
						serviceName: serviceName,
						isProcessed: isProcessed,
						createDtm: createDtm,
						status: (totRecords != null && recordsPassed !=null && recordsFailed != null && totRecords ==recordsPassed) ? "Success" : (totRecords!=null && recordsPassed != null && recordsFailed!= null && totRecords == recordsFailed ? "Failure" : "Partial")
						
					}

					logData.details.push(nodeObj11);
				}
															
			$scope.logDetailsObj = logData.details;
			console.log('logDetails :' , $scope.logDetailsObj);
		});		
		
		
		
		
		if(document.getElementById("custdemand")){			
		document.getElementById("custdemand").addEventListener("px-row-click", function(e) {
            var clickedRow = e.detail.row;
			
			var id = clickedRow.row.id;
			////console.log('id_1 :' + id);
			//id=id.innerHTML;
			var nameFormatted = id.substring(84,id.length - 4);
			
			////console.log('+++++++',nameFormatted);
			var id = parseInt(nameFormatted);
			//console.log('id :' + id);
	
			$http.get($scope.sapUpload_url+'/getSAPLoggerData?sapUploadId='+id,{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).success(function (response){
					$scope.sapLoggerDetails = response;
					console.log('Logger response :',$scope.sapLoggerDetails);
			});			
          });
	}	
		
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
