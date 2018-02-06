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
    controllers.controller('BlobCtrl',['$scope','$http','EnvURLService','TokenService',function Ctrl($scope,$http,EnvURLService,TokenService){
		$scope.date = new Date();
		 $scope.blobStore_url_role = EnvURLService.config().BLOBSTORE_SERVICE_URL;	
	 $scope.blobStore_url = EnvURLService.config().BLOBSTORE_SERVICE_URL_EXCEL;
	$scope.validUser=false;
	$scope.InvalidUser=false;
	$scope.postgresHeader ='';
	$scope.hidePxSpinner=true;

	$scope.fileUploadData = function (){
		$http.get($scope.blobStore_url+'/enableProcessOnDemand').success(function(response) {	
					if(response.status=='Y')
					{
						$scope.showProcessOnDemand = true;
						$scope.fileProcessingMsg= "File Processing...";
						$scope.clear();
					}
					else
					{
						$scope.showProcessOnDemand = false;
						$scope.fileProcessingMsg= "";
					}
					//console.log('RESPONSE...',response);
			});
		
		
	};
		
	$scope.callAllServices = function(){
		// ACS
		$http.get($scope.blobStore_url_role+'/getRole?sso='+sso).success(function(response) {	
				
					$scope.ssoDetails = response;
						
						  if($scope.ssoDetails.groupName == 'ADMIN')
						{
							$scope.validUser=true;
							
						} 
						else
						{
							$scope.InvalidUser=true;
							
						}
			});
			
					
	$http.get($scope.blobStore_url+'/enableProcessOnDemand').success(function(response) {	
					if(response.status=='Y')
					{
						$scope.showProcessOnDemand = true;
						$scope.fileProcessingMsg= "File Processing...";
					}
					else
					{
						$scope.showProcessOnDemand = false;
						$scope.fileProcessingMsg= ""; 
					}
					//console.log('RESPONSE',response);
					
			});
		
$scope.processOnDemand = function(){
$scope.spinner = true;
    $scope.hidePxSpinner=false;
    var ps = document.querySelector('paper-spinner');
	
	console.log('Process On Demand URL');
		$http.get($scope.blobStore_url+'/initiateProcessOnDemand?sso='+sso,{
		headers: {'Content-Type': undefined,
		  'divBlobAuthentication':$scope.postgresHeader}
		}).success(function(response) {	
	console.log('Process On Demand URL'+$scope.blobStore_url+'/initiateProcessOnDemand');
	  $scope.hidePxSpinner=true;
        $scope.spinner = false;
        
	  $scope.fileUploadData();
	//console.log('Process On Demand'+response);
	})
	.error(function(response) {	
	console.log('error  on demand');
	//console.log('Process On Demand'+response);
	});
};
								 
$http.get($scope.blobStore_url+'/getTemplateDetails',{
	 headers: {
		  'divBlobAuthentication':$scope.postgresHeader}
		}).success(function(result) {
            $scope.names = result;
	});		
$scope.fname="";
$('input[type=file]').change(function () {

var val = $(this).val().toLowerCase();
$scope.fname=val;
/*	  
var regex = new RegExp("(.*?)\.(csv)$");
if(!(regex.test(val))) {
$(this).val('');
$scope.fname="";
//alert('Please select correct file format');
$scope.resErrMsg="Please select .csv file format";
$scope.resMsg="";
}else{
$scope.resErrMsg="";
}
*/

var attach_id = "fileupload"; // Id of the Upload
if($('#'+attach_id)[0].files[0]){
	var size = $('#'+attach_id)[0].files[0].size;
	
	var uploadSize = size/1024/1024 ;
	if(uploadSize<200){
	$scope.fileMsg="size is:"+uploadSize.toFixed(3)+" MB";
	$scope.resErrMsg="";
	}
	else{
	//alert("File size should be less than 200mb");
	$scope.resErrMsg="File size should be less than 200mb";
	$scope.resMsg="";
	$scope.fname="";
	}
}else{
	$scope.fileMsg="";
}
}); 

$scope.isValidFileSize = function () {
var attach_id = "fileupload"; // Id of the Upload
if($('#'+attach_id)[0].files[0]){
	var size = $('#'+attach_id)[0].files[0].size;
	var name = $('#'+attach_id)[0].files[0].name;
	$scope.fsize=size;
	$scope.fname=name;
	var uploadSize = size/1024/1024 ;
	if(uploadSize<200){
		return true;
	}
	else{
		return false;
	}
}else{
	return false;
}
};

$scope.clear = function(){
//alert($scope.templateId);
$scope.resMsg="";
$scope.comments="";
$scope.fileMsg="";
angular.element("input[type='file']").val(null);
}


$scope.clearFields = function(){
$scope.comments="";
$scope.fileMsg="";
$scope.templateName="";
angular.element("input[type='file']").val(null);
}
$scope.btndisable=false;
$scope.upload = function() {
if($scope.isValidFileSize()){
$(".tab1").css('opacity','.3');
$(".overlay").fadeIn();
$scope.btndisable=true;
//var file=$scope.bfile.files[0];
var attach_id = "fileupload"; // Id of the Upload
var file = $('#'+attach_id)[0].files[0];


	var SSO = document.querySelector('px-login').querySelector('div').querySelectorAll('button')[1].querySelector('span').textContent;


						
	   var fd = new FormData();
	   fd.append('file', file);
	   fd.append('usercomments',$scope.comments);
	   fd.append('templateName',$scope.templateName);
	   fd.append('SSO',SSO);
	   //console.dir(file);
	    //console.log('HeaderInside'+JSON.stringify($scope.postgresHeader));
	   $http.post($scope.blobStore_url+"/uploadMultiBlob", fd, {
		  transformRequest: angular.identity,
		  headers: {'Content-Type': undefined,
		  'divBlobAuthentication':$scope.postgresHeader}
		  })
	
	   .success(function(data){
		   $scope.resMsg="File upload successful";
		   $scope.resErrMsg="";
		   $(".tab1").css('opacity','1');
		   $(".overlay").fadeOut();
		   $scope.clearFields();
		   $scope.btndisable=false;
	   })
	
	   .error(function(data, status){
		   $scope.resErrMsg="File upload failed";
		   $scope.resMsg="";
		   $(".tab1").css('opacity','1');
		   $(".overlay").fadeOut();
		   $scope.clearFields();
		   $scope.btndisable=false;
	   });
	   }else{
		   $scope.fileMsg="";
	   }
	}		
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
