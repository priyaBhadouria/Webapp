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
    controllers.controller('FileLogsCtrl',['$scope','$http','$compile', '$log', 'PredixAssetService', 'PredixViewService','EnvURLService','TokenService',function Ctrl($scope,$http,$compile, $log, PredixAssetService, PredixViewService,EnvURLService,TokenService){
		$scope.blobStore_url_role = EnvURLService.config().BLOBSTORE_SERVICE_URL;

			$scope.blobStore_url = EnvURLService.config().BLOBSTORE_SERVICE_URL_EXCEL;

		 
		 
	$scope.validUser=false;
	$scope.InvalidUser=false;
	
		$scope.callAllServices = function(){
		
		//var sso = 502685514;
		// ACS
		$http.get($scope.blobStore_url_role+'/getRole?sso='+sso).success(function(response) {	
				
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
    								 
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [ month,day,year].join('/')+' ' +[ d.getHours(),d.getMinutes(),d.getSeconds()].join(':');
                    
}
    
$scope.tableData = function() {
    $scope.logDetailsObj = [];
		$http.get($scope.blobStore_url+'/getUploadDetails',{
	 headers: {
		  'divBlobAuthentication':$scope.postgresHeader}
		}).then(function(result) {
			console.log('result'+result);
            $scope.logDetails = result.data;
			
				
				var logData = {
							"details": []
						}
					var i =0;
					for (i = 0; i < $scope.logDetails.length; i++){
					
					if($scope.logDetails[i].upload_id!== undefined){
						var upload_id=$scope.logDetails[i].upload_id;
						}
					else var upload_id='';
					
					if($scope.logDetails[i].file_name!== file_name){
						var file_name=$scope.logDetails[i].file_name;
						}
					else var file_name='';
																
					if($scope.logDetails[i].csv_blob_store_location!== csv_blob_store_location){
						var csv_blob_store_location=$scope.logDetails[i].csv_blob_store_location;
						}
					else var csv_blob_store_location='';
					
					if($scope.logDetails[i].row_passed!== undefined && $scope.logDetails[i].row_passed!== null ){
					var	row_passed= $scope.logDetails[i].row_passed;
					}
					else var row_passed='';
					console.log('ROW PASSED',row_passed);
					if($scope.logDetails[i].row_failed!== undefined && $scope.logDetails[i].row_failed!== null){
					var	row_failed= $scope.logDetails[i].row_failed;
					}
					else var row_failed='';
					
					if($scope.logDetails[i].total_rows!== undefined && $scope.logDetails[i].total_rows!== null){
					var	total_rows= $scope.logDetails[i].total_rows;
					}
					else var total_rows='';
					
					if($scope.logDetails[i].user_comment!== undefined){
					var	user_comment= $scope.logDetails[i].user_comment;
					}
					else var user_comment='';
					
					if($scope.logDetails[i].created_by!== undefined){
					var	created_by= $scope.logDetails[i].created_by;
					}
					else var created_by='';
					
					if($scope.logDetails[i].db_processed!== undefined){
						
					var	db_processed_char= $scope.logDetails[i].db_processed;
					var db_processed = '';
						if(db_processed_char=='Y')
						{
							db_processed='Yes';
						}
						else if(db_processed_char=='N')
						{
							db_processed='No';
						}
					}
					else var db_processed='';
					
					if($scope.logDetails[i].create_dtm!== undefined){
					var	create_dtm= $scope.logDetails[i].create_dtm;
					var create_dtm_excel = formatDate(create_dtm);
					}
					else var create_dtm='';
			
			var nodeObj11 = {
						upload_id: "<a href='javascript:void(0)' onclick='drilldownLog()' style='text-decoration: none'>"+upload_id+"</a>",
						upload_id_number:upload_id,
						file_name: file_name,
						csv_blob_store_location: csv_blob_store_location,
						row_passed: row_passed,
						row_failed: row_failed,
						total_rows: total_rows,
						user_comment: user_comment,
						created_by: created_by,	
						db_processed: db_processed,
						create_dtm: create_dtm,
						create_dtm_excel:create_dtm_excel,
						status: (total_rows != null && row_passed !=null && row_failed != null && total_rows ==row_passed) ? "Success" : (total_rows!=null && row_passed != null && row_failed!= null && total_rows == row_failed ? "Failure" :(total_rows == null && row_passed ==null && row_failed == null )?"not started":"Partial")
					
					}

					logData.details.push(nodeObj11);
				}
															
			$scope.logDetailsObj = logData.details;
			
		});		
}
$scope.tableData();
		
		
		
		if(document.getElementById("custdemand")){			
		document.getElementById("custdemand").addEventListener("px-row-click", function(e) {
            var clickedRow = e.detail.row;
			
			var id = clickedRow.row.upload_id;
			////console.log('id_1 :' + id);
			//id=id.innerHTML;
			var nameFormatted = id.substring(84,id.length - 4);
			
			////console.log('+++++++',nameFormatted);
			var id = parseInt(nameFormatted);
			//console.log('id :' + id);

			$http.get($scope.blobStore_url+'/getLoggerData?uploadId='+id,{
	 headers: {
		  'divBlobAuthentication':$scope.postgresHeader}
		}).success(function(response) {
									
					//console.log('uploadId : ',response.uploadId);
					//console.log('Log_info : ',response.log);
					$scope.loggerDetails = response;
					//console.log('Logger response :' + $scope.loggerDetails);
			});			
          });
	}	
	
	
	
		//Export to Excel for Upload Excel Details Start
	
	$(function () {
	  $("#inventoryImageId6").click(function () {
		  //var JSONData = $scope.responseData1;
		  
		 var JSONData = $scope.logDetailsObj;
				
				JSONData.forEach(function(obj){
							
							delete obj.xls_id;
							delete obj.csv_blob_store_location;
							delete obj.db_processed;
							delete obj.upload_id;
							delete obj.create_dtm;
							
				});
				var ReportTitle = "UPLOAD EXCEL DETAILS";
				var ShowLabel = true;
				var headerArray = {
					"upload_id_number":"UPLOAD ID",
					"file_name":"FILE NAME",
					"row_passed":"ROW PASSED",
					"row_failed":"ROW FAILED",
					"total_rows":"TOTAL ROWS",
					"user_comment":"USER COMMENTS",
					"created_by":"CREATED BY",
					"create_dtm_excel":"CREATED DATE",
					"status": "STATUS"
				}
				EnvURLService.JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel,headerArray);
			//});
					
	  });
	});
	
	//Export to Excel for Upload Excel Details End
		 
	
			};
		
			var sso = document.querySelector('px-login').querySelector('div').querySelectorAll('button')[1].querySelector('span').textContent;
		//var sso = 502685514;	
			//$scope.postgresHeader='';
	TokenService.getToken().then(
			
                   function(data) {
						 $scope.config = data.config;
						 $scope.postgresHeader = data.postgresWSHeader;		
						$scope.callAllServices();				 
						});
		
	}]);
                          
});
