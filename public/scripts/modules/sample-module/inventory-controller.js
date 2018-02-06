define(['angular', './sample-module'], function (angular, controllers) {
    'use strict';

    // Controller definition
    controllers.controller('inventoryCtrl', ['$scope', '$http', '$compile', '$log', 'PredixAssetService', 'PredixViewService','EnvURLService','TokenService', function Ctrl ($scope, $http, $compile, $log, PredixAssetService, PredixViewService,EnvURLService,TokenService) {
		
		//$scope.postgresHeader='';
		//$scope.postgresHeader='';
							
	$scope.custConsumption = true;
	$scope.geShipment = false;
	$scope.IsHidden = true;
	$scope.fsgtransit = true;
	$scope.fsgreceived = true;	
	$scope.customertransit = true;
	$scope.custReceived = true;
	$scope.custdemand = true;
	$scope.InstallerReceived= true;
	$scope.date = new Date();
	$scope.viewShow = true;
	$scope.custmaterialdemand = true;
	$('.dollar').hide();
	
	$scope.DEV_DIV_SERVICE_URL = EnvURLService.config().DEV_DIV_SERVICE_URL;
	$scope.blobStore_url = EnvURLService.config().BLOBSTORE_SERVICE_URL;
	$scope.headerData = [];	
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
			$http.get($scope.DEV_DIV_SERVICE_URL+'/DIVServices/getCustomerConsumptionView',{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).success(function (response){
			 $scope.headerData = response;
		 });

	/* $http.get('http://localhost:8082/DIVServices/getCustomerConsumptionView').then(function(result) {
	
			$scope.headerData = result.data;
			////console.log('----',$scope.headerData);
	}); */
		$http.get($scope.DEV_DIV_SERVICE_URL+'/div/totalinventory/getTotalFSGSummary',{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).success(function (response){
			 $scope.fsgSummaryData = response;
		 });
		 
		 
	
	$http.get($scope.DEV_DIV_SERVICE_URL+'/div/totalinventory/getTotalInventorySummary',{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).success(function(response) {	
    $scope.totalInventory = response.totalQuantity;
	$scope.totalInventoryTransitToFSG = response.transitToFSGQuantity;
	$scope.totalInventoryAtFSG = response.atFSGQuantity;
	$scope.totalInventoryTransitToCustomer = response.transitToCustomerQuantity;
	$scope.totalInventoryAtCustomer = response.atCustomerQuantity;
	$scope.customerConsumedTotalInventory = response.customerConsumedQuantity;
	$scope.customerDemandTotalInventory = response.customerDemandQuantity;
	$scope.InstallerReceivedQuantity = response.totalInstallerReceived;
	});
	
	$http.get($scope.DEV_DIV_SERVICE_URL+'/div/totalinventory/getTIShipmentDetails',{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).success(function(response) {	
			$scope.dashboarddata = response;			
	});
	

	  
	  
	//Export to Excel for GE Third Party Stock Start
	
	
	
	$(function () {
	  $("#inventoryImageId1").click(function () {
				$scope.date1 = new Date();
				$scope.currDate = ('0' + ($scope.date1.getMonth() + 1)).slice(-2) + '-' + ('0' + $scope.date1.getDate()).slice(-2) + '-' +$scope.date1.getFullYear();
				var JSONData = $scope.dashboarddata;
				var ReportTitle = "GE THIRD PARTY STOCK + GE SHIPMENT FOR"+"  "+$scope.currDate;
				var ShowLabel = true;
				var headerArray = {
					"material":"MATERIAL",
					"location":"LOCATION",
					"status":"STATUS",
					"materialdesc":"MATERIAL DESCRIPTION",
					"Quantity":"QUANTITY",
					"unitofmeasure":"UNIT OF MEASURE",
					"productcost":"PRODUCT COST($$)"
				}
				EnvURLService.JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel,headerArray);
		  });
	});
	
	//Export to Excel for GE Third Party Stock End
	
	$http.get($scope.DEV_DIV_SERVICE_URL+'/div/totalinventory/getInventoryConsumedDetails',{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).success(function(response) {	
			$scope.custconsumptiondata = response;			
	});
	
	//Export to Excel for CUSTOMER CONSUMPTION Start
	
	$(function () {
	  $("#inventoryImageId7").click(function () {
			    var JSONData = $scope.custconsumptiondata;
				var ReportTitle = "TOTAL CUSTOMER CONSUMPTION";
				var ShowLabel = true;
				var headerArray = {
					"material":"MATERIAL",
					"materialdesc":"MATERIAL DESCRIPTION",
					"Quantity":"QUANTITY",
					"unitofmeasure":"UNIT OF MEASURE",
					"custcode":"CUSTOMER ID",
					"custname":"CUSTOMER NAME",
					"receivedfrom":"RECEIVED FROM",
					"installationdate":"INSTALLATION DATE",
					"productcost":"PRODUCT COST($$)"
				}
				EnvURLService.JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel,headerArray);
	  });
	});
	
	
		//New for showing customer Demand for material
	
	$http.get($scope.DEV_DIV_SERVICE_URL+'/div/totalinventory/getCustomerMaterialDemandOverview',{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).then(function(result) {
								
			$scope.finalData12 = result.data;
			//console.log('demand',$scope.finalData12);
			$scope.projectData12 = $scope.finalData12;
				
				var projectData12 = {
							"details12": []
						}
					var i =0;
					for (i = 0; i < $scope.finalData12.length; i++){
					
					if($scope.finalData12[i].material!== undefined){
						var material=$scope.finalData12[i].material;
						}
					else var material='';
					
					if($scope.finalData12[i].materialdesc!== undefined){
						var materialdesc=$scope.finalData12[i].materialdesc;
						}
					else var materialdesc='';
																
					if($scope.finalData12[i].total_demand_qty!== undefined){
					//var	demand_qty= $scope.finalData12[i].demand_qty;
						if($scope.finalData12[i].total_demand_qty< 0){
								var total_demand_qty="<font style='color:red;'>"+$scope.finalData12[i].total_demand_qty+"</font>";
							}else{
								var total_demand_qty=$scope.finalData12[i].total_demand_qty;
							}
					}
					else var demand_qty='';
					
					if($scope.finalData12[i].total_shortage_qty!== undefined){
					//var	total_shortage_qty= $scope.finalData12[i].total_shortage_qty;
						if($scope.finalData12[i].total_shortage_qty< 0){
								var total_shortage_qty="<font style='color:red;'>"+$scope.finalData12[i].total_shortage_qty+"</font>";
							}else{
								var total_shortage_qty=$scope.finalData12[i].total_shortage_qty;
							}
					}
					else var total_shortage_qty='';
					
					if($scope.finalData12[i].demand_week!== undefined){
					var	demand_week= $scope.finalData12[i].demand_week;
					}
					else var demand_week='';
					
					if($scope.finalData12[i].location!== undefined){
					var	location= $scope.finalData12[i].location;
					}
					else var location='';
					
					if($scope.finalData12[i].year!== undefined){
					var	year= $scope.finalData12[i].year;
					}
					else var year='';
										
					var nodeObj12 = {
						material:material ,
						materialdesc: materialdesc,
						total_demand_qty: total_demand_qty,
						total_shortage_qty: total_shortage_qty,
						demand_week: demand_week,
						location: location,						
						year: year
					}

					projectData12.details12.push(nodeObj12);
				}
															
					$scope.projectDetails12 = projectData12.details12;
	});
	
	
//Export to Excel for CUSTOMER DEMAND NEW Start
	
	$(function () {
	  $("#inventoryImageId9").click(function () {
			   var JSONData = $scope.finalData12;
				var ReportTitle = "CUSTOMER DEMAND";
				var ShowLabel = true;
				var headerArray = {
					"material":"MATERIAL",
					"location":"SERVING LOCATION",
					"year":"YEAR",
					"materialdesc":"MATERIAL DESCRIPTION",
					"demand_week":"FISCAL WEEK",
					"total_demand_qty":"TOTAL DEMAND QUANTITY",
					"total_shortage_qty":"TOTAL SHORTAGE QUANTITY"
					
					
											
				}
				EnvURLService.JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel,headerArray);
		});
	});
	 
	
	//Export to Excel for CUSTOMER CONSUMPTION End
	
	$http.get($scope.DEV_DIV_SERVICE_URL+'/div/totalinventory/getCustomerDemandDetails',{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).then(function(result) {
									//console.log("result :::",result.data);
					//$scope.projectDetails11 = result.data;
								////console.log('--CUSTOMER DEMAND--',result.data);
			$scope.finalData11 = result.data;
			//console.log('demand',$scope.finalData11);
			$scope.projectData11 = $scope.finalData11;
				
				var projectData11 = {
							"details11": []
						}
					var i =0;
					for (i = 0; i < $scope.finalData11.length; i++){
					
					if($scope.finalData11[i].custcode!== undefined){
						var custcode=$scope.finalData11[i].custcode;
						}
					else var custcode='';
					
					if($scope.finalData11[i].custname!== undefined){
						var custname=$scope.finalData11[i].custname;
						}
					else var custname='';
																
					if($scope.finalData11[i].demand_qty!== undefined){
					//var	demand_qty= $scope.finalData11[i].demand_qty;
						if($scope.finalData11[i].demand_qty< 0){
								var demand_qty="<font style='color:red;'>"+$scope.finalData11[i].demand_qty+"</font>";
							}else{
								var demand_qty=$scope.finalData11[i].demand_qty;
							}
					}
					else var demand_qty='';
					
					if($scope.finalData11[i].shortage_qty!== undefined){
					//var	shortage_qty= $scope.finalData11[i].shortage_qty;
						if($scope.finalData11[i].shortage_qty< 0){
								var shortage_qty="<font style='color:red;'>"+$scope.finalData11[i].shortage_qty+"</font>";
							}else{
								var shortage_qty=$scope.finalData11[i].shortage_qty;
							}
					}
					else var shortage_qty='';
					
					if($scope.finalData11[i].unitofmeasure!== undefined){
					var	unitofmeasure= $scope.finalData11[i].unitofmeasure;
					}
					else var unitofmeasure='';
					
					if($scope.finalData11[i].demand_week!== undefined){
					var	demand_week= $scope.finalData11[i].demand_week;
					}
					else var demand_week='';
					
					if($scope.finalData11[i].year!== undefined){
					var	year= $scope.finalData11[i].year;
					}
					else var year='';
										
					var nodeObj11 = {
						custcode: "<a href='javascript:void(0)' onclick='drilldown11()' style='text-decoration: none'>"+custcode+"</a>",
						custname: custname,
						demand_qty: demand_qty,
						shortage_qty: shortage_qty,
						unitofmeasure: unitofmeasure,
						demand_week: demand_week,						
						year: year
					}

					projectData11.details11.push(nodeObj11);
				}
															
					$scope.projectDetails11 = projectData11.details11;
	});
	
	//Export to Excel for CUSTOMER DEMAND Start
	
	$(function () {
	  $("#inventoryImageId6").click(function () {
			   var JSONData = $scope.finalData11;
				var ReportTitle = "CUSTOMER DEMAND";
				var ShowLabel = true;
				var headerArray = {
					"year":"YEAR",
					"custcode":"CUSTOMER ID",
					"custname":"CUSTOMER NAME",
					"demand_week":"FISCAL WEEK",
					"demand_qty":"DEMAND QUANTITY",
					"shortage_qty":"SHORTAGE QUANTITY"						
				}
				EnvURLService.JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel,headerArray);
		});
	});
	
	//Export to Excel for CUSTOMER DEMAND End
	
	
	if(document.getElementById("custdemand")){
		document.getElementById("custdemand").addEventListener("px-row-click", function(e) {
            var clickedRow = e.detail.row;
			
            var name = e.detail.row.row.custcode;
			var id = e.detail.row.row.demand_week;
			var year = e.detail.row.row.year;
			//console.log(name);
			//console.log(id);
			//console.log(year);
			
			
			var nameFormatted = name.substring(83,name.length - 4);
			//console.log(nameFormatted);
			$scope.custName = nameFormatted;
			$http.get($scope.DEV_DIV_SERVICE_URL+'/div/totalinventory/getCustomerMaterialDemandDetails?customerId='+nameFormatted+'&fiscalWeek='+id+'&year='+year,{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).success(function(response) {	
						$scope.responseDataa = response;
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
					
					
					if(responseData[i].year!== undefined){
					var	year=responseData[i].year;
					}
					else var year='';
					
					if(responseData[i].materialdesc!== undefined){
						var materialdesc=responseData[i].materialdesc;
						}
					else var materialdesc='';
																
					if(responseData[i].demand_week!== undefined){
					var	demand_week= responseData[i].demand_week;
					}
					else var demand_week='';
					
					if(responseData[i].demand_qty!== undefined){
					//var	Quantity= responseData[i].Quantity;
						if(responseData[i].demand_qty< 0){
								var demand_qty="<font style='color:red;'>"+responseData[i].demand_qty+"</font>";
							}else{
								var demand_qty=responseData[i].demand_qty;
							}
					}
					else var demand_qty='';
					
					if(responseData[i].shortage_qty!== undefined){
					//var	Quantity= responseData[i].Quantity;
						if(responseData[i].shortage_qty< 0){
								var shortage_qty="<font style='color:red;'>"+responseData[i].shortage_qty+"</font>";
							}else{
								var shortage_qty=responseData[i].shortage_qty;
							}
					}
					else var shortage_qty='';
					
					var nodeObj111 = {
						material: material,
						Storage_location: Storage_location,
						year: year,
						materialdesc: materialdesc,
						demand_week:demand_week,
						demand_qty:demand_qty,
						shortage_qty:shortage_qty
					}

					projectData.push(nodeObj111);
				}
					
					$scope.demanddrill = projectData;
					
					//console.log('++++++inventoryImageId18--',projectData);	
			});			
			
			
          });
	}
	
	//Export to Excel for CUSTOMER DEMAND DETAILED DATA Start
	
	 $(function () {
	  $("#inventoryImageId18").click(function () {
		  //console.log('--CUSTOMER DEMAND DETAILED DATA--');
				var JSONData = $scope.demanddrill;
				var ReportTitle = "CUSTOMER DEMAND DETAILED DATA";
				var ShowLabel = true;
				var headerArray = {
					"material":"MATERIAL",
					"location":"SERVING LOCATION",
					"year":"YEAR",
					"materialdesc":"MATERIAL DESCRIPTION",
					"demand_week":"FISCAL WEEK",
					"demand_qty":"DEMAND QUANTITY",
					"shortage_qty":"SHORTAGE QUANTITY"
				}
				EnvURLService.JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel,headerArray);
			
		 });
	 });
	//Export to Excel for CUSTOMER DEMAND DETAILED DATA End
	
	
	
	$http.get($scope.DEV_DIV_SERVICE_URL+'/div/totalinventory/getTITransitToFSGDetails',{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).success(function(response) {	
			$scope.transitdata = response;			
	});
	
	
	//Export to Excel for IN TRANSIT TO SERVICE PROVIDER Start
	
	$(function () {
	  $("#inventoryImageId2").click(function () {
			var JSONData = $scope.transitdata;
				var ReportTitle = "INVENTORY TRANSIT DETAIL FROM (GE LED GE CORE AND FSG TO FSG)";
				var ShowLabel = true;
				var headerArray = {
					"material":"MATERIAL",
					"location":"TO LOCATION",
					"materialdesc":"MATERIAL DESCRIPTION",
					"Quantity":"QUANTITY",
					"unitofmeasure":"UNIT OF MEASURE",
					"receivedfrom":"FROM LOCATION",
					"productcost":"PRODUCT COST($$)",
					"carriername":"CARRIER NUMBER",
					"pronumber":"PRO NUMBER"
				}
				EnvURLService.JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel,headerArray);
					
	  });
	});
	
	//Export to Excel for IN TRANSIT TO SERVICE PROVIDER End
	$http.get($scope.DEV_DIV_SERVICE_URL+'/div/totalinventory/getTIDetailsAtFSG',{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).success(function(response) {	
			$scope.fsgreceiveddata = response;	
			//console.log('STOCK AT SERVICE PROVIDER DRILL DOWN',response);
////console.log(response[1].Quantity);			
////console.log(typeof($scope.fsgreceiveddata[1].Quantity));	
	});
	
	//Export to Excel for STOCK AT SERVICE PROVIDER Start
	
	$(function () {
	  $("#inventoryImageId3").click(function () {
				var newJSONData = [];
				var JSONData = $scope.fsgreceiveddata;
				//console.log('before adding--JSONData--',JSONData);
				//JSONData.forEach(function(obj){
					//var prodCostValue = obj.productcost;
					// if(prodCostValue.includes("font")){
						// var m = prodCostValue.indexOf(">");
						// var n = prodCostValue.indexOf("</");
						// var res = prodCostValue.substring(n, m+1);
						// //console.log('----x---',res);
						// newJSONData['productcost']=obj.productcost;
					// }
				//});
				
				//console.log('--after adding--JSONData---',JSONData);
				//console.log('--new JSONData---',newJSONData);
				$scope.date2 = new Date();
				$scope.currDate1 = ('0' + ($scope.date2.getMonth() + 1)).slice(-2) + '-' + ('0' + $scope.date2.getDate()).slice(-2) + '-' +$scope.date2.getFullYear();
				var ReportTitle = "STOCK AT SERVICE PROVIDER + RECEIPT AS OF TODAY ("+$scope.currDate1+")";
				var ShowLabel = true;
				var headerArray = {
					"material":"MATERIAL",
					"location":"LOCATION",					
					"materialdesc":"MATERIAL DESCRIPTION",
					"unitofmeasure":"UNIT OF MEASURE",
					"productcost":"PRODUCT COST($$)",
					"prev_stock":"ON HAND",
					"BO":"BACK ORDER",	
					"COM":"COMMITTED STOCK",
					"UN":"UNAVAILABLE STOCK",
					"NET":"NET AVAILABLE",
					"received":"RECEIVED"	
				}
				EnvURLService.JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel,headerArray);
		});
	});
	
	//Export to Excel for STOCK AT SERVICE PROVIDER End
	
	$http.get($scope.DEV_DIV_SERVICE_URL+'/div/totalinventory/getTITransitToCustomerDetails',{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).success(function(response) {	
			$scope.transittocustdata = response;			
	});
	
	//Export to Excel for IN TRANSIT TO CUSTOMER Start
	
	$(function () {
	  $("#inventoryImageId4").click(function () {
				var JSONData = $scope.transittocustdata;
				var ReportTitle = "INVENTORY IN TRANSIT FROM SERVICE PROVIDER TO CUSTOMER";
				var ShowLabel = true;
				var headerArray = {
					"material":"MATERIAL",
					"location":"FROM LOCATION",
					"materialdesc":"MATERIAL DESCRIPTION",
					"Quantity":"QUANTITY",
					"unitofmeasure":"UNIT OF MEASURE",
					"custcode":"CUSTOMER ID",
					"custname":"CUSTOMER NAME",
					"issuedate":"ISSUE DATE",
					"productcost":"PRODUCT COST($$)"
				}
				EnvURLService.JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel,headerArray);
					
	   });
	});
	
	//Export to Excel for IN TRANSIT TO CUSTOMER End
	
	$http.get($scope.DEV_DIV_SERVICE_URL+'/div/totalinventory/getInventoryAtCustomerDetails',{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).success(function(response) {	
			$scope.customerdata = response;			
	}); 
	
	//Export to Excel for RECEIVED AT CUSTOMER Start
	
	$(function () {
	  $("#inventoryImageId5").click(function () {
				var JSONData = $scope.customerdata;
				var ReportTitle = "RECEIVED AT CUSTOMER";
				var ShowLabel = true;
				EnvURLService.JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel);
	  });
	});
	//################################################################################
	$http.get($scope.DEV_DIV_SERVICE_URL+'/div/totalinventory/getInstallerReceived',{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).success(function(response) {	
			$scope.installerdata = response;			
	}); 
	
	//Export to Excel for RECEIVED AT CUSTOMER Start
	
	$(function () {
	  $("#inventoryImageId15").click(function () {
				var JSONData = $scope.installerdata;
				var ReportTitle = "RECEIVED AT INSTALLER";
				var ShowLabel = true;
		var headerArray = {
"customerNumber":"CUSTOMER NUMBER",
"material":"MATERIAL",
"quantity":"QUANTITY",
"uom":"UNIT OF MEASURE",
"amount":"AMOUNT",
"originPickUpName":"ORIGIN PICK UP NAME",
"originPickUpAddress1":"ORIGIN PICK UP ADDRESS 1",
"originPickUpCity":"ORIGIN PICK UP CITY",
"originPickUpState":"ORIGIN PICK UP STATE",
"destinationDeliveryName":"DESTINATION DELIVERY NAME",
"destinationDeliveryState":"DESTINATION DELIVERY STATE",
"actualPickUpArrivalDate":"ACTUAL PICK UP ARRIVAL DATE",
"actualDeliveryArrivalDate":"ACTUAL DELIVERY ARRIVAL DATE",
"fsgshipmentNumber":"FSG SHIPMENT NUMBER"					
}
				EnvURLService.JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel,headerArray);	  });
	});
	//################################################################################

	//Export to Excel for RECEIVED AT CUSTOMER End
	
	$http.get($scope.DEV_DIV_SERVICE_URL+'/div/totalinventory/getTotalInventoryDollarSummary',{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).success(function(response) {	
    $scope.totalqty_$_value = response.totalqty_$_value;
	$scope.transittofsg_$_value = response.transittofsg_$_value;
	$scope.atfsg_$_value = response.atfsg_$_value;
	$scope.transittocust_$_value = response.transittocust_$_value;
	$scope.atcustomer_$_value = response.atcustomer_$_value;
	$scope.consuption_$_value = response.consuption_$_value;
	$scope.custdemand_$_value = response.custdemand_$_value;
	});
	
		$scope.tabview1 = function () {
		
	   $scope.custdemand = false;
	   $scope.custmaterialdemand = true;

};

	$scope.tabview = function () {
		
	   $scope.custdemand = true;
	   $scope.custmaterialdemand = false;
	   };
		
		$scope.greyData = function (){
			
			$scope.geShipment = false;
			$scope.fsgtransit = true;
			$scope.custConsumption = true;
			$scope.fsgreceived = true;
			$scope.customertransit = true;
			$scope.custReceived = true;
			$scope.custdemand = true;
			$scope.InstallerReceived= true;	
			$scope.viewShow = true;			
			$('#ge-shipment').addClass('selected');
			$('#ship').addClass('selected');
			$('#fsgtransit').removeClass('selected');
			$('#fsgreceive').removeClass('selected');
			$('#customer').removeClass('selected');
			$('#demand').removeClass('selected');
			$('#consumption').removeClass('selected');
			$('#recvdcustomer').removeClass('selected');
			$('#ge-shipment1').addClass('selected');
			$('#ship1').addClass('selected');
			$('#fsgtransit1').removeClass('selected');
			$('#fsgreceive1').removeClass('selected');
			$('#customer1').removeClass('selected');
			$('#demand1').removeClass('selected');
			$('#consumption1').removeClass('selected');
			$('#recvdcustomer1').removeClass('selected');
			$('#installer').removeClass('selected');
			$('#installer1').removeClass('selected');
			$('#recvdinstaller').removeClass('selected');
			$('#recvdinstaller1').removeClass('selected');
			
		}; 
		$scope.greyData1 = function (){
			
			$scope.geShipment = true;
			$scope.fsgtransit = false;
			$scope.custConsumption = true;
			$scope.fsgreceived = true;
			$scope.customertransit = true;
			$scope.custReceived = true;	
			$scope.custdemand = true;
			$scope.InstallerReceived= true;	
			$scope.viewShow = true;			
			$('#fsgtransit').addClass('selected');
			$('#ship').removeClass('selected');
			$('#fsgreceive').removeClass('selected');
			$('#customer').removeClass('selected');
			$('#demand').removeClass('selected');
			$('#consumption').removeClass('selected');
			$('#recvdcustomer').removeClass('selected');
			$('#fsgtransit1').addClass('selected');
			$('#ship1').removeClass('selected');
			$('#fsgreceive1').removeClass('selected');
			$('#customer1').removeClass('selected');
			$('#demand1').removeClass('selected');
			$('#consumption1').removeClass('selected');
			$('#recvdcustomer1').removeClass('selected');
			$('#installer').removeClass('selected');
			$('#installer1').removeClass('selected');
			$('#recvdinstaller').removeClass('selected');
			$('#recvdinstaller1').removeClass('selected');
		}; 
		$scope.greyData2 = function (){
			
			$scope.geShipment = true;
			$scope.fsgtransit = true;
			$scope.custConsumption = true;
			$scope.fsgreceived = false;
			$scope.customertransit = true;
			$scope.custReceived = true;	
			$scope.custdemand = true;
			$scope.InstallerReceived= true;
			$scope.viewShow = true;
			$('#fsgreceive').addClass('selected');
			$('#fsgtransit').removeClass('selected');
			$('#ship').removeClass('selected');
			$('#demand').removeClass('selected');
			$('#customer').removeClass('selected');
			$('#consumption').removeClass('selected');
			$('#recvdcustomer').removeClass('selected');
			$('#fsgreceive1').addClass('selected');
			$('#fsgtransit1').removeClass('selected');
			$('#ship1').removeClass('selected');
			$('#demand1').removeClass('selected');
			$('#customer1').removeClass('selected');
			$('#consumption1').removeClass('selected');
			$('#recvdcustomer1').removeClass('selected');
			$('#installer').removeClass('selected');
			$('#installer1').removeClass('selected');
			$('#recvdinstaller').removeClass('selected');
			$('#recvdinstaller1').removeClass('selected');
			
		}; 
		
				
		$scope.greyData3 = function (){
			
			$scope.geShipment = true;
			$scope.fsgtransit = true;
			$scope.fsgreceived = true;
			$scope.custConsumption = true;
			$scope.InstallerReceived= true;
			$scope.customertransit = false;	
			$scope.custReceived = true;
			$scope.custdemand = true;
			$scope.viewShow = true;
			$('#installer').addClass('selected');
			$('#installer1').addClass('selected');			
			$('#fsgreceive').removeClass('selected');
			$('#fsgtransit').removeClass('selected');
			$('#ship').removeClass('selected');
			$('#demand').removeClass('selected');
			$('#consumption').removeClass('selected');
			$('#recvdcustomer').removeClass('selected');
					
			$('#fsgreceive1').removeClass('selected');
			$('#fsgtransit1').removeClass('selected');
			$('#ship1').removeClass('selected');
			$('#demand1').removeClass('selected');
			$('#consumption1').removeClass('selected');
			$('#recvdcustomer1').removeClass('selected');
			$('#recvdinstaller').removeClass('selected');
			$('#recvdinstaller1').removeClass('selected');
			
		};
		
		$scope.greyData4 = function (){
			
			$scope.geShipment = true;
			$scope.fsgtransit = true;
			$scope.fsgreceived = true;
			$scope.custConsumption = false;
			$scope.customertransit = true;
			$scope.InstallerReceived= true;			
			$scope.custReceived = true;
			$scope.custdemand = true;
			$scope.viewShow = true;
			$('#consumption').addClass('selected');
			$('#receivedcustomer').removeClass('selected');	
			$('#fsgreceive').removeClass('selected');
			$('#fsgtransit').removeClass('selected');
			$('#ship').removeClass('selected');
			$('#demand').removeClass('selected');
			$('#customer').removeClass('selected');
			$('#recvdcustomer').removeClass('selected');
			$('#consumption1').addClass('selected');
			$('#receivedcustomer1').removeClass('selected');	
			$('#fsgreceive1').removeClass('selected');
			$('#fsgtransit1').removeClass('selected');
			$('#ship1').removeClass('selected');
			$('#demand1').removeClass('selected');
			$('#customer1').removeClass('selected');
			$('#recvdcustomer1').removeClass('selected');
			$('#installer').removeClass('selected');
			$('#installer1').removeClass('selected');
			$('#recvdinstaller').removeClass('selected');
			$('#recvdinstaller1').removeClass('selected');
			
		};
		
		$scope.greyData5 = function (){
			
			$scope.geShipment = true;
			$scope.fsgtransit = true;
			$scope.fsgreceived = true;
			$scope.custConsumption = true;
			$scope.custReceived = true;
			$scope.custdemand = true;
			$scope.customertransit = true;
			$scope.InstallerReceived= false;
			$scope.viewShow = true;			
			$('#consumption').removeClass('selected');
			$('#recvdcustomer').removeClass('selected');			
			$('#fsgreceive').removeClass('selected');
			$('#fsgtransit').removeClass('selected');
			$('#demand').removeClass('selected');
			$('#ship').removeClass('selected');
			$('#customer').removeClass('selected');
			$('#consumption1').removeClass('selected');
			$('#recvdcustomer1').removeClass('selected');			
			$('#fsgreceive1').removeClass('selected');
			$('#fsgtransit1').removeClass('selected');
			$('#demand1').removeClass('selected');
			$('#ship1').removeClass('selected');
			$('#customer1').removeClass('selected');
			$('#installer').removeClass('selected');
			$('#installer1').removeClass('selected');
			$('#recvdinstaller').addClass('selected');
			$('#recvdinstaller1').addClass('selected');
		};
		
		
			$scope.greyData6 = function (){
			
			$scope.geShipment = true;
			$scope.fsgtransit = true;
			$scope.fsgreceived = true;
			$scope.custConsumption = true;
			$scope.custReceived = false;
			$scope.custdemand = true;
			$scope.customertransit = true;	
			$scope.InstallerReceived= true;	
			$scope.viewShow = true;
			$('#consumption').removeClass('selected');
			$('#recvdcustomer').addClass('selected');			
			$('#fsgreceive').removeClass('selected');
			$('#fsgtransit').removeClass('selected');
			$('#demand').removeClass('selected');
			$('#ship').removeClass('selected');
			$('#customer').removeClass('selected');
			$('#consumption1').removeClass('selected');
			$('#recvdcustomer1').addClass('selected');			
			$('#fsgreceive1').removeClass('selected');
			$('#fsgtransit1').removeClass('selected');
			$('#demand1').removeClass('selected');
			$('#ship1').removeClass('selected');
			$('#customer1').removeClass('selected');
			$('#installer').removeClass('selected');
			$('#installer1').removeClass('selected');
			$('#recvdinstaller').removeClass('selected');
			$('#recvdinstaller1').removeClass('selected');
		};
		$scope.greyData7 = function (){
			
			$scope.geShipment = true;
			$scope.fsgtransit = true;
			$scope.fsgreceived = true;
			$scope.custConsumption = true;
			$scope.custReceived = true;
			$scope.custdemand = true;
			$scope.customertransit = true;
			$scope.viewShow = false;
			$scope.InstallerReceived= true;
			$scope.custmaterialdemand = false;	
			$('#consumption').removeClass('selected');
			$('#recvdcustomer').removeClass('selected');
			$('#demand').addClass('selected');			
			$('#fsgreceive').removeClass('selected');
			$('#fsgtransit').removeClass('selected');
			$('#ship').removeClass('selected');
			$('#customer').removeClass('selected');
			$('#consumption1').removeClass('selected');
			$('#recvdcustomer1').removeClass('selected');
			$('#demand1').addClass('selected');			
			$('#fsgreceive1').removeClass('selected');
			$('#fsgtransit1').removeClass('selected');
			$('#ship1').removeClass('selected');
			$('#customer1').removeClass('selected');
			$('#installer').removeClass('selected');
			$('#installer1').removeClass('selected');
			$('#recvdinstaller').removeClass('selected');
			$('#recvdinstaller1').removeClass('selected');
			
		};

		
	};
	 
												
	//var sso = document.querySelector('px-login').querySelector('div').querySelectorAll('button')[1].querySelector('span').textContent;
	var sso = 502685514;
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