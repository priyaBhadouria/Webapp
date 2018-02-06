define(['angular', './sample-module'], function (angular, controllers) {
    'use strict';
    // Controller definition
    controllers.controller('inventorydrillCtrl', ['$scope', '$http','$window','$rootScope','$timeout','$document','EnvURLService','TokenService', function ($scope,$http,$window,$rootScope,$timeout,$document,EnvURLService,TokenService) {		
	$scope.drilldata = true;
	$scope.drilldataview = false;
	$scope.drilldata1 = true;
	$scope.drilldataview1 = false;
	$scope.drilldata2 = true;
	$scope.drilldataview2 = false;
		//$scope.test = 'Testing Angular Js';
		$scope.plantdata = true;
		/* $scope.$watch('$viewContentLoaded', function(){			
			var myEl = angular.element( document.querySelectorAll( '.modal' )[0] );
			myEl.attr('id',"myModal3");   
		}); */
		$scope.DEV_DIV_SERVICE_URL = EnvURLService.config().DEV_DIV_SERVICE_URL;
		
		
		$scope.blobStore_url = EnvURLService.config().BLOBSTORE_SERVICE_URL;
	$scope.validUser=false;
	$scope.InvalidUser=false;
	
	$scope.callAllServices = function(){
		
		$http.get($scope.blobStore_url+'/getRole?sso='+sso).success(function(response) {	
				
					$scope.ssoDetails = response;
						//console.log("USER.....Role..",$scope.ssoDetails);
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
		
		
		$scope.myFunction = function(row2){
			//alert("jk");
			//console.log('--data-in FSG controller--row2---',row2);
			$scope.plantName= row2;
			$http.get($scope.DEV_DIV_SERVICE_URL+'/DIVServices/getTreeTableDataPlantLevel?plant='+row2,{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			})
			.success(function(response) {	
				$scope.plantDataResponse = response;	
			var responseData = response;
			var projectData = [];
					
				for (var i = 0; i < responseData.length; i++){
					
					if(responseData[i].material!== undefined){
						var material=responseData[i].material;
						}
					else var material='';
					if(responseData[i].location!== undefined){
					var	Storage_location= responseData[i].location;
					}
					else var Storage_location='';
					if(responseData[i].quantity!== undefined){
					//var	Quantity= responseData[i].Quantity;
						if(responseData[i].quantity< 0){
								var quantity="<font style='color:red;'>"+responseData[i].quantity+"</font>";
							}else{
								var quantity=responseData[i].quantity;
							}
					}
					else var quantity='';
					
					if(responseData[i].source!== undefined){
					var	source=responseData[i].source;
					}
					else var source='';
					
					if(responseData[i].uom!== undefined){
						var uom=responseData[i].uom;
						}
					else var uom='';
																
					if(responseData[i].materialDescription!== undefined){
					var	materialDescription= responseData[i].materialDescription;
					}
					else var materialDescription='';
					var nodeObj111 = {
						material: material,
						Storage_location: Storage_location,
						quantity: quantity,
						source: source,
						uom:uom,
						materialDescription:materialDescription
					}

					projectData.push(nodeObj111);
				}
				$scope.plantDataTable = projectData;
		});
		
		
		//Export to Excel for PLANT DETAILED DATA Start
	
	$(function () {
	  $("#inventoryImageId14").click(function () {
		  var plantName1 = $scope.plantName;
		  ////console.log('--$scope.div_ms_url--'+$scope.div_ms_url);
			// $http.get('https://digital-inventory-services-dev-test-1.run.aws-usw02-pr.ice.predix.io/DIVServices/getTreeTableDataPlantLevel?plant='+plantName1)
			// .success(function(response) { 
				// //console.log('---response---',response);
				var JSONData = $scope.plantDataResponse;
				 
				JSONData.forEach(function(obj){
							
							delete obj.vid;
				}); 

				var ReportTitle = "PLANT DETAILED DATA";
				var ShowLabel = true;
				var headerArray = {
					"material":"MATERIAL",
					"location":"TO LOCATION",
					"quantity":"QUANTITY",
					"source":"FROM LOCATION",
					"uom":"UNIT OF MEASURE",
					"materialDescription":"MATERIAL DESCRIPTION"
				}
				EnvURLService.JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel,headerArray);
			//});
					
	  });
	});
	
	//Export to Excel for PLANT DETAILED DATA End
		
		$http.get($scope.DEV_DIV_SERVICE_URL+'/div/totalinventory/getTotalInventorySummary',{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			})
		.success(function(response) {	
			$scope.treeDataPlantLevel = response;		
		//console.log('--treeDataPlantLevel-in controller--row2---',response);			
		});
		
		}
		
		$scope.myFunction1 = function(row3){
			//alert("jk");
			//console.log('--data-in controller--row3---',row3);
			$scope.FSGName= row3;
			$http.get($scope.DEV_DIV_SERVICE_URL+'/DIVServices/getInventoryDrilldownDetailsByFSG?source='+row3,{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			})
			.success(function(response) {	
			$scope.fsgLevelDetailedData = response;
			var responseData = response;
			var projectData = [];
					
				for (var i = 0; i < responseData.length; i++){
					
					if(responseData[i].material!== undefined){
						var material=responseData[i].material;
						}
					else var material='';
					if(responseData[i].location!== undefined){
					var	Storage_location= responseData[i].location;
					}
					else var Storage_location='';
					if(responseData[i].quantity!== undefined){
					//var	Quantity= responseData[i].Quantity;
						if(responseData[i].quantity< 0){
								var quantity="<font style='color:red;'>"+responseData[i].quantity+"</font>";
							}else{
								var quantity=responseData[i].quantity;
							}
					}
					else var quantity='';
					
					if(responseData[i].source!== undefined){
					var	source=responseData[i].source;
					}
					else var source='';
					
					if(responseData[i].uom!== undefined){
						var uom=responseData[i].uom;
						}
					else var uom='';
																
					if(responseData[i].materialDescription!== undefined){
					var	materialDescription= responseData[i].materialDescription;
					}
					else var materialDescription='';
					
					var nodeObj111 = {
						material: material,
						Storage_location: Storage_location,
						quantity: quantity,
						source: source,
						uom:uom,
						materialDescription:materialDescription
					}

					projectData.push(nodeObj111);
				}
			
			$scope.transitdata = projectData;		
		//console.log('--response-in controller--row3---',projectData);			
		});
		
		//Export to Excel for FSG DETAILS DATA Start
	
		$(function () {
		  $("#inventoryImageId13").click(function () {
			  var fsgName = $scope.FSGName;
			  // $http.get('https://digital-inventory-services-dev-test-1.run.aws-usw02-pr.ice.predix.io/DIVServices/getInventoryDrilldownDetailsByFSG?source='+fsgName)
				// .success(function(response) { 
					////console.log('---response---',response);
					var JSONData = $scope.fsgLevelDetailedData;
					var ReportTitle = "FSG DETAILS DATA";
					var ShowLabel = true;
					var headerArray = {
							"material":"MATERIAL",
							"location":"TO LOCATION",
							"quantity":"QUANTITY",
							"source":"FROM LOCATION",
							"uom":"UNIT OF MEASURE",
							"materialDescription":"MATERIAL DESCRIPTION"
						}
					EnvURLService.JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel,headerArray);
				//});
						
		  });
		});
		
		$http.get($scope.DEV_DIV_SERVICE_URL+'/DIVServices/getTreeDataAtFSGLevel?location='+row3,{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			})
		.success(function(response) {	
			$scope.treeDataFSGtLevel = response;		
		//console.log('--treeDataFSGtLevel-in controller---row3--',response);			
		});
		
		}
		
		//3rd jan
		
		$scope.myFunction2 = function(row4){
			$scope.customerName = row4;
			
			$http.get($scope.DEV_DIV_SERVICE_URL+'/DIVServices/getInventoryDrilldownDetailsByCustomer?customer='+row4,{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			})
			.success(function(response) {	
				$scope.treeDataCustomerLevel = response;		
				//console.log('--treeDataCustomerLevel-in controller---row4--',$scope.treeDataCustomerLevel );
			
			$scope.projectData99 = response;
				
				var projectData99 = [];
					var i =0;
					for (i = 0; i < $scope.treeDataCustomerLevel.length; i++){
					
						if($scope.treeDataCustomerLevel[i].customer!== undefined){
							var customer=$scope.treeDataCustomerLevel[i].customer;
							}
						else var customer='';
						if($scope.treeDataCustomerLevel[i].quantity!== undefined){
							//var quantity=$scope.treeDataCustomerLevel[i].quantity;
								if($scope.treeDataCustomerLevel[i].quantity< 0){
								var quantity="<font style='color:red;'>"+$scope.treeDataCustomerLevel[i].quantity+"</font>";
							}else{
								var quantity=$scope.treeDataCustomerLevel[i].quantity;
							}
							}
						else var quantity='';
						if($scope.treeDataCustomerLevel[i].intransitToCustomer!== undefined){
							var intransitToCustomer=$scope.treeDataCustomerLevel[i].intransitToCustomer;
							}
						else var intransitToCustomer='';
						
						var nodeObj99 = {						
						customer: customer,
						quantity: quantity,
						intransitToCustomer: intransitToCustomer
					}
					$scope.intransitToCustomerScope = intransitToCustomer;
					$scope.quantityScope = quantity;

					projectData99.push(nodeObj99);
					} 
									
			});
			
			////console.log('--row4--customer level--',row4);
		$http.get($scope.DEV_DIV_SERVICE_URL+'/DIVServices/getCustomerTableDataByCustomer?customer='+row4,{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			})
		.then(function(result) {
			$scope.customerLevelDataAll = result.data;
			$scope.finalData77 = result.data;
			////console.log('datafsg',$scope.finalData77);
			$scope.projectData75 = $scope.finalData77;
				
				var projectData75 = {
							"details75": []
						}
					var i =0;
					for (i = 0; i < $scope.finalData77.length; i++){
					
					if($scope.finalData77[i].isFSG!== undefined){
						var isFSG=$scope.finalData77[i].isFSG;
						}
					else var isFSG='';	
					
					if($scope.finalData77[i].installedQty!== undefined){
						//var installedQty=$scope.finalData77[i].installedQty;
							if($scope.finalData77[i].installedQty< 0){
								var installedQty="<font style='color:red;'>"+$scope.finalData77[i].installedQty+"</font>";
							}else{
								var installedQty=$scope.finalData77[i].installedQty;
							}
						}
					else var installedQty='';
					
										
					var nodeObj75 = {						
						isFSG: isFSG,
						installedQty:installedQty
					}
				$scope.mustdata = isFSG;
					
				}
					projectData75.details75.push(nodeObj75);										
					var jk = $scope.mustdata;
					var kk = $scope.finalData77.length;
					//console.log(jk);
					//console.log(kk);
					if (kk === 0){
						$("#myModal11").css("visibility","visible");
						 $("#myModal11").show();					
					}
					else if(jk === 'FSG'){
						 $("#myModal7").css("visibility","visible");
						 $("#myModal7").show();						
					}
					
					else if (jk === 'CUSTOMER'){
						$("#myModal9").css("visibility","visible");
						 $("#myModal9").show();
						
					}
					
			});	
			
			//Export to Excel for CUSTOMER DETAILS DATA Start
	
			$(function () {
			  $("#inventoryImageId17").click(function () {
				  var customerName = $scope.customerName;
				  var arrayJson = [];
				  
				  //console.log('--customerName--',customerName);
				  // $http.get('https://digital-inventory-services-dev-test-1.run.aws-usw02-pr.ice.predix.io/DIVServices/getCustomerTableDataByCustomer?customer='+customerName)
					// .success(function(response) { 
						////console.log('---response customer---',response);
						
						var newArray = $scope.customerLevelDataAll;
							newArray.forEach(function(obj){
							
							delete obj.isFSG;
							delete obj.uom;
							delete obj.source;
							delete obj.currentQty;
							
							});
							//console.log('newArray value--',newArray); 
						
						var JSONData = newArray;
						var ReportTitle = "CUSTOMER DETAILS DATA";
						var ShowLabel = true;
						var headerArray = {
							"customer":"CUSTOMER",
							"material":"MATERIAL",
							"materialDescription":"MATERIAL DESCRIPTION",
							"intransitQty":"QUANTITY"
						}
						EnvURLService.JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel,headerArray);
					//});
							
			  });
			});
		
			//Export to Excel for CUSTOMER DETAILS DATA End
			
			$scope.FSGNameCustomerLevel = row4;
			$http.get($scope.DEV_DIV_SERVICE_URL+'/DIVServices/getInventoryDrilldownDetailsByFSG?source='+row4,{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			})
			.success(function(response) {
				$scope.fsgLevelSecondLevel = response;
				var responseData = response;
				var projectData = [];
					
				for (var i = 0; i < responseData.length; i++){
					
					if(responseData[i].material!== undefined){
						var material=responseData[i].material;
						}
					else var material='';
					if(responseData[i].location!== undefined){
					var	Storage_location= responseData[i].location;
					}
					else var Storage_location='';
					if(responseData[i].quantity!== undefined){
					//var	Quantity= responseData[i].Quantity;
						if(responseData[i].quantity< 0){
								var quantity="<font style='color:red;'>"+responseData[i].quantity+"</font>";
							}else{
								var quantity=responseData[i].quantity;
							}
					}
					else var quantity='';
					
					if(responseData[i].source!== undefined){
					var	source=responseData[i].source;
					}
					else var source='';
					
					if(responseData[i].uom!== undefined){
						var uom=responseData[i].uom;
						}
					else var uom='';
																
					if(responseData[i].materialDescription!== undefined){
					var	materialDescription= responseData[i].materialDescription;
					}
					else var materialDescription='';
					
					var nodeObj111 = {
						material: material,
						Storage_location: Storage_location,
						quantity: quantity,
						source: source,
						uom:uom,
						materialDescription:materialDescription
					}

					projectData.push(nodeObj111);
				}
				
				$scope.transitdataCustomerLevel = projectData;		
				//console.log('--projectData-in controller-----',projectData);			
			});
			
			//Export to Excel for FSG DETAILS DATA Start
	
			$(function () {
			  $("#inventoryImageId16").click(function () {
				  var fsgName = $scope.FSGNameCustomerLevel;
				  // $http.get('https://digital-inventory-services-dev-test-1.run.aws-usw02-pr.ice.predix.io/DIVServices/getInventoryDrilldownDetailsByFSG?source='+fsgName)
					// .success(function(response) { 
						////console.log('---response fsg---',response);
						var JSONData = $scope.fsgLevelSecondLevel;
						var ReportTitle = "FSG DETAILS DATA";
						var ShowLabel = true;
						var headerArray = {
							"material":"MATERIAL",
							"location":"TO LOCATION",
							"quantity":"QUANTITY",
							"source":"FROM LOCATION",
							"uom":"UNIT OF MEASURE",
							"materialDescription":"MATERIAL DESCRIPTION"
						}
						EnvURLService.JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel,headerArray);
					//});
							
			  });
			});
		
			$http.get($scope.DEV_DIV_SERVICE_URL+'/DIVServices/getTreeDataAtFSGLevel?location='+row4,{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			})
			.success(function(response) {	
				$scope.treeDataCustomerLevel = response;		
				//console.log('--treeDataCustomerLevel-in controller---row3--',response);			
			});
			
		}
		//
		
		$scope.treeFunctionForPlantLevel = function(row3){
			
			//console.log('--data-in controller-----',row3);
			//$scope.FSGName= row3;
		
		}
		
		
		/* $scope.editcancelForm = function (){
			
			 $("#myModal3").css("visibility","hidden"); 			
			 $("#myModal3").hide();
		};
		$scope.editcancelForm1 = function (){
			 $("#myModal5").css("visibility","hidden"); 
			 $("#myModal5").hide(); 
					
		};
		$scope.editcancelForm2 = function (){
			 $("#myModal7").css("visibility","hidden"); 
			 $("#myModal7").hide(); 			
		}; */
		
		$scope.tabview = function () {
			//alert("first");
		$('#tab1').addClass('selected');
		$('#tab2').removeClass('selected');		
		$scope.drilldata = true;		
	   $scope.drilldataview = false;

		};
		$scope.tabview1 = function () {
					//alert("second");
				$('#tab1').removeClass('selected');
				$('#tab2').addClass('selected');		
			   $scope.drilldata = false;		
			   $scope.drilldataview = true;

		};

		$scope.tabview3 = function () {
					//alert("first");
				$('#tab3').addClass('selected');
				$('#tab5').removeClass('selected');		
				$scope.drilldata1 = true;		
			   $scope.drilldataview1 = false;

		};
		$scope.tabview5 = function () {
					//alert("second");
				$('#tab3').removeClass('selected');
				$('#tab5').addClass('selected');		
			   $scope.drilldata1 = false;		
			   $scope.drilldataview1 = true;

		};
		$scope.tabview7 = function () {
					//alert("first");
				$('#tab7').addClass('selected');
				$('#tab9').removeClass('selected');		
				$scope.drilldata2 = true;		
			   $scope.drilldataview2 = false;

		};
		$scope.tabview9 = function () {
					//alert("second");
				$('#tab7').removeClass('selected');
				$('#tab9').addClass('selected');		
			   $scope.drilldata2 = false;		
			   $scope.drilldataview2 = true;

		};
		
		$scope.changeFunction = function (){
			var area = $('#plants').val();
				if ( area === '') 
				{
				$('#booxx').attr('disabled', true);
				$('#booxx').addClass('btn--disabled');
				$scope.plantdata = true;
				}
				else {
				$('#booxx').removeAttr('disabled');
				$('#booxx').removeClass('btn--disabled');
				}				
		};
		$scope.editcancelForm3 = function (){
			//alert("jai");
			$('.node').hover(function (){
				
			$('#carat').addClass('bottom');
			$('#tooltipWrapper').removeClass('hidden');
			
			$(this).toggleClass("result_hover");
			});		
		};
			
		
		$scope.submitForm = function (){
			
			var myEl = angular.element( document.querySelectorAll( '.modal' )[0] );
			myEl.attr('id',"myModal3");
			var myEl = angular.element( document.querySelectorAll( '.modal' )[1] );
			myEl.attr('id',"myModal5");
			var myEl = angular.element( document.querySelectorAll( '.modal' )[2] );
			myEl.attr('id',"myModal7");
			var myEl = angular.element( document.querySelectorAll( '.modal' )[3] );
			myEl.attr('id',"myModal9");
			var myEl = angular.element( document.querySelectorAll( '.modal' )[4] );
			myEl.attr('id',"myModal11");
			$scope.plantName = $('select#plants option:selected').val();
			//console.log('Plant - '+$scope.plantName);			
			if ( $scope.plantName === '') {
				$scope.plantdata = true;
								
            }
			else {
				$http.get($scope.DEV_DIV_SERVICE_URL+'/div/plantinventorydrilldown/getFSGNames?plantName='+$scope.plantName,{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).success(function(response) {	
					$scope.plantDetails = response;
					////console.log('Plant '+$scope.plantName+' Details '+JSON.stringify($scope.plantDetails));					
			});
			var am = $( ".jOrgChart" ).val();
			if ( am != ''){
			renderTree();
			}
				$scope.plantdata = false; 
				
			}	

		};   
		};
	
	var sso = document.querySelector('px-login').querySelector('div').querySelectorAll('button')[1].querySelector('span').textContent;
		
		//var sso = 502685515;
		// ACS
		
					  TokenService.getToken().then(
										   function(data) {
												 $scope.config = data.config;
												 $scope.postgresHeader = data.postgresWSHeader;
												 console.log('Token'+$scope.postgresHeader);
													$scope.callAllServices();
												});
		
		
    }]);
	
	
	
});
