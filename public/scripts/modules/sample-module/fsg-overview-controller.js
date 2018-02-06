define(['angular', './sample-module'], function (angular, controllers) {
    'use strict';
    // Controller definition
    controllers.controller('fsgCtrl', ['$scope', '$compile', '$log','$http', 'PredixAssetService', 'PredixViewService','EnvURLService','TokenService', function ($scope, $compile, $log, $http, PredixAssetService, PredixViewService, EnvURLService,TokenService) {
		
		$scope.DEV_DIV_SERVICE_URL = EnvURLService.config().DEV_DIV_SERVICE_URL;
		$scope.blobStore_url = EnvURLService.config().BLOBSTORE_SERVICE_URL;
		
	$scope.overview = true;	
	$scope.summary = false;
	$scope.custsection = true;
	$scope.agingsection = true;	
	$scope.fsgaggregationdrill = true;
	
	
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
		
	$('#agingdatadrill').hide();
	
	$scope.tabview = function () {
			//alert("first");
		$('#tab1').addClass('selected');
		$('#tab2').removeClass('selected');
		$('#tab3').removeClass('selected');
		$scope.custsection = true;
		$scope.agingsection = true;
	   $scope.fsgsection = false;

};
$scope.tabview1 = function () {
			//alert("second");
		$('#tab1').removeClass('selected');
		$('#tab2').addClass('selected');
		$('#tab3').removeClass('selected');
       $scope.custsection = false;
	$scope.agingsection = true;
	   $scope.fsgsection = true;

};
$scope.tabview2 = function () {
			//alert("third");	
			$('#tab1').removeClass('selected');
		$('#tab2').removeClass('selected');
		$('#tab3').addClass('selected');
       $scope.custsection = true;
	$scope.agingsection = false;
	   $scope.fsgsection = true;

};
	
	$scope.stateChanged = function (qId) {
			
		if($scope.answers[qId]){ //If it is checked
       
	   $scope.fsgsection = false;
		}
else {
	   
	   $scope.fsgsection = true;
	   
   }
};

$scope.stateChanged1 = function (qId1) {
			
		if($scope.answers1[qId1]){ //If it is checked      
	   $scope.custsection = false;
	   //var myEl = angular.element( document.querySelectorAll( '.first' )[0] );
	   //myEl.attr('ng-init',"answers[item.questID]=false");
	   //$scope.fsgsection = true;
		}
else {
	  
	   $scope.custsection = true;
	   
   }
};

$scope.stateChanged2 = function (qId2) {
			
		if($scope.answers2[qId2]){ //If it is checked
      
	   $scope.agingsection = false;
	   //$scope.fsgsection = true;
	   //$scope.custsection = true;
		}
else {
	   
	   $scope.agingsection = true;
	   
   }
};

	$scope.headerData = [];
	$scope.fsgTable = [];
	var currentQtyCount = [];
	var fsgDemand = [];
	var fsgIntransit = [];
	var totalFSGShortage = [];
	$scope.projectDetails1 = [];
	
	$scope.hideShowFun=function(){
		//alert("calling");
	$scope.overview = false;	
	$scope.summary = true;
	window.location.hash = '#dashboard';     	
  }
  $('.dollar').hide();
  $scope.summaryCall = function (){						
				$scope.overview = true;
				$scope.summary = false;
				window.location.hash = '#summary';
				
		};
		
		$scope.summaryCall1 = function (){				
					
				$('#agingdatadrill').hide();
				window.location.hash = '#agingdata';
		};
		
		
			
 
 /*chartconfig 99 - Avg Installation time per site*/ 

$scope.chartSeries = [
	{           type: 'column',
            //stacking: 'normal',
            name: 'Intransit',
            color: '#7cb5ec',
            index:1,                                                
            legendIndex:1,     
            //colorByPoint: true,
            //data: [532, 332, 232, 432, 472]
			data: fsgIntransit
	},
	{          type: 'column',
            //stacking: 'normal',
            name: 'Existing Stock',
            color: 'green',
            index:0,                                                
            legendIndex:0,           
            //colorByPoint: true,
            //data: [1150, 1170, 1400, 1100, 1080]
			data: currentQtyCount
			
	},

	{        type: 'column',
            name: 'Demand',
            index:2,
            legendIndex:2,
            color: '#f7a35c',            
            //colorByPoint: true,
            //data: [1800, 1700, 1850, 1980, 1670]
			data: fsgDemand
	},

	{         type: 'column',
            name: 'Shortage',
            index:3,
            legendIndex:3,
            color: 'red',            
            //colorByPoint: true,
            //data: [118, 198, 218, 448, 118]
			data: totalFSGShortage
	}
               
                
            
                                                

        
  ]; 
                
  $scope.chartConfig99 = {              
    options: {
       chart: {
		  spacingLeft: 20,  // spacing for the units (previously the units were not visible)
		width: 1000,	  // Explicitly increased the width of the graph 
        height: 400 
      },
	  
                  legend: {
            enabled: true
        },
      
		plotOptions: {
            series: {
                cursor: 'pointer',
                point: {
                    events: {
                        click: function (evt) {
													
					
				var fsgLocation1 = evt.point.name;
				$scope.projectDetails5 = fsgLocation1;
							////console.log($scope.projectDetails5);
							
                             //alert($scope.projectDetails5);
							 $('#testing1').focus();
							 $http.get($scope.DEV_DIV_SERVICE_URL+'/div/fsgoverview/getFSGAggregationSummary?fsg='+fsgLocation1,{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).success(function(response) {	
				//alert("1st  ooo");
				////console.log($scope.DEV_DIV_SERVICE_URL+'/div/fsgoverview/getFSGAggregationSummary?fsg='+fsgLocation1);
				$scope.fsgInventory = response.inventory;
				$scope.fsgDemand = response.demand;
				$scope.inTransitToFSG = response.inTransit;
				$scope.fsgShortage = response.shortage;	
			});
	
			$http.get($scope.DEV_DIV_SERVICE_URL+'/div/fsgoverview/getFSGDrillDownDetails?fsg='+fsgLocation1,{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).then(function(result) {
			$scope.customerConsumptionForExcelDownload = result.data;
			$scope.finalData31 = result.data;
			////console.log('demand',$scope.finalData31);
			$scope.projectData31 = $scope.finalData31;
				
				var projectData31 = {
							"details31": []
						}
					var i =0;
					for (i = 0; i < $scope.finalData31.length; i++){
					
					if($scope.finalData31[i].material!== undefined){
						var material=$scope.finalData31[i].material;
						}
					else var material='';
					
					if($scope.finalData31[i].materialdesc!== undefined){
						var materialdesc=$scope.finalData31[i].materialdesc;
						}
					else var materialdesc='';
																
					if($scope.finalData31[i].inventory!== undefined){
					var	inventory= $scope.finalData31[i].inventory;
					}
					else var inventory='';
					
					if($scope.finalData31[i].demand!== undefined){
					//var	demand= $scope.finalData31[i].demand;
						if($scope.finalData31[i].demand< 0){
								var demand="<font style='color:red;'>"+$scope.finalData31[i].demand+"</font>";
							}else{
								var demand=$scope.finalData31[i].demand;
							}
					}
					else var demand='';
					
					if($scope.finalData31[i].intransit!== undefined){
					var	intransit= $scope.finalData31[i].intransit;
					}
					else var intransit='';
					
					if($scope.finalData31[i].shortage!== undefined){
					//var	shortage= $scope.finalData31[i].shortage;
						if($scope.finalData31[i].shortage< 0){
								var shortage="<font style='color:red;'>"+$scope.finalData31[i].shortage+"</font>";
							}else{
								var shortage=$scope.finalData31[i].shortage;
							}
					}
					else var shortage='';
					
					if($scope.finalData31[i].weeklybucket!== undefined){
					var	weeklybucket= $scope.finalData31[i].weeklybucket;
					}
					else var weeklybucket='';
					
					if($scope.finalData31[i].year!== undefined){
					var	year= $scope.finalData31[i].year;
					}
					else var year='';
					
										
					var nodeObj31 = {						
						material: material,
						materialdesc: materialdesc,
						inventory: inventory,
						demand: "<a href='javascript:void(0)' onclick='gotoLink()' style='text-decoration: none'>"+demand+"</a>",
						//intransit: "<a href='javascript:void(0)' onclick='gotoLink1()' style='text-decoration: none'>"+intransit+"</a>",
						intransit: intransit,
						shortage: "<a href='javascript:void(0)' onclick='gotoLink2()' style='text-decoration: none'>"+shortage+"</a>",
						weeklybucket: weeklybucket,
						year: year
					}

					projectData31.details31.push(nodeObj31);
				}
															
					$scope.projectDetails31 = projectData31.details31;
	});
	
	//Export to Excel for FSG DEMAND AND SUPPLY Start
	
	$(function () {
	  $("#inventoryImageId8").click(function () {
		  var fsgLocation = $scope.projectDetails5;
			// $http.get($scope.DEV_DIV_SERVICE_URL+'/div/fsgoverview/getFSGDrillDownDetails?fsg='+fsgLocation)
			// .success(function(response) {    
			
				var JSONData = $scope.customerConsumptionForExcelDownload;
				var FSGLocationUpper = fsgLocation.toUpperCase();
			// $http.get($scope.div_ms_url+'/div/fsgoverview/getFSGDrillDownDetails?fsg='+fsgLocation)
			// .success(function(response) {    
				var ReportTitle = FSGLocationUpper+" "+"INVENTORY/DEMAND/IN-TRANSIT/SHORTAGE DETAILED TABLE"; 
				
				 
				var ShowLabel = true;
				var headerArray = {
					"inventory":"INVENTORY",
					"demand":"DEMAND",
					"shortage":"SHORTAGE",
					"material":"MATERIAL",
					"year":"YEAR",
					"intransit":"IN-TRANSIT",
					"materialdesc":"MATERIAL DESCRIPTION",
					"weeklybucket":"WEEK SHORT(FW)"
				}
				EnvURLService.JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel,headerArray);
			//});
					
	  });
	});
	
	
			$http.get($scope.DEV_DIV_SERVICE_URL+'/div/fsgoverview/getFSGDrillDownDetails?fsg='+fsgLocation1,{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).success(function(response) {	
					$scope.fsgdata = response;			
			});
                        }
                    }
                }
            }
        },
            tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',			
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y} units</b></td></tr>',
           footerFormat: '</table>',
            //shared: true,
            useHTML: true
        },
		scrollbar: {
                enabled: true,
                barBackgroundColor: 'gray',
                barBorderRadius: 7,
                barBorderWidth: 0,
                buttonBackgroundColor: 'gray',
                buttonBorderWidth: 0,
                buttonArrowColor: 'yellow',
                buttonBorderRadius: 7,
                rifleColor: 'yellow',
                trackBackgroundColor: 'white',
                trackBorderWidth: 1,
                trackBorderColor: 'silver',
                trackBorderRadius: 7
            },
            
    },
    series: $scope.chartSeries,
                
                
      
    title: {
        text: 'FSG Inventory/Demand/In-transit/Shortage',
        style: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: '1rem',
        fontFamily: 'GE Inspira Sans, sans-serif'
    }
    },
        subtitle: {
        text: 'Across Locations'
        },
        xAxis: {
			min: 0,
         max:1,
        title: {
      text: 'Location'
    },
		categories: $scope.projectDetails1
            // categories: [
                // 'FS Illinois',
                // 'FS Texas',
                // 'FS California',
                // 'FS New Jersey',
                // 'Graybar Electric'
            // ],
            //crosshair: true
        },     
yAxis: {
           
            title: {
                text: 'Units',
				x:10
            },
			 //min: -1,
            //max: 7000,
          //  tickInterval: 100,
        },

    credits: {
      enabled: false
    },
    loading: false,
    size: {}
  }

  $scope.reflow = function () {
    $scope.$broadcast('highchartsng.reflow');
  }; 
/*chartconfig 9 - Avg Installation time per site ends*/

		if(document.getElementById("fsgtable")){
		document.getElementById("fsgtable").addEventListener("px-row-click", function(e) {
            var clickedRow = e.detail.row;
			//alert('clicked--');
            var materialid = e.detail.row.row.material;
			var week = e.detail.row.row.weeklybucket;
			var year = e.detail.row.row.year;
			////console.log(materialid);
			////console.log(week);
			////console.log(year);
				
				var jsonObj={
					"materialId":materialid,
					"fsgLocation":$scope.projectDetails5,
					"fiscalWeek":week,
					"year":year
					}
					////console.log('jsonObj----------',jsonObj);
					$scope.jsonObject = jsonObj;

				$http.post($scope.DEV_DIV_SERVICE_URL+'/DIVServices/getFSGMaterialCustomerDemand1',jsonObj,{
		    headers : {'Content-Type': 'application/json',
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}
			).success(function(data){
					////console.log('responce----jsonObj------',data);
					$scope.responseData1 = data;
				var responseData = data;
				var projectData = [];
					
				for (var i = 0; i < responseData.length; i++){
					
					if(responseData[i].customerId!== undefined){
						var customerId=responseData[i].customerId;
						}
					else var customerId='';
					if(responseData[i].customerDescription!== undefined){
					var	customerDescription= responseData[i].customerDescription;
					}
					else var customerDescription='';
					if(responseData[i].demandQty!== undefined){
					//var	Quantity= responseData[i].Quantity;
						if(responseData[i].demandQty< 0){
								var demandQty="<font style='color:red;'>"+responseData[i].demandQty+"</font>";
							}else{
								var demandQty=responseData[i].demandQty;
							}
					}
					else var demandQty='';
					if(responseData[i].shortage!== undefined){
						var shortage=responseData[i].shortage;
						}
					else var shortage='';
					
					var nodeObj111 = {
						customerId: customerId,
						customerDescription: customerDescription,
						demandQty: demandQty,
						shortage : shortage
					}

					projectData.push(nodeObj111);
				}
					
					$scope.demandData = projectData;
				});
			
          });
	}
	
	//Export to Excel for DEMAND DETAILED LEVEL DATA Start
	//post ??
	$(function () {
	  $("#inventoryImageId9").click(function () {
		  var jsonObj = $scope.jsonObject;
			var newArray = $scope.responseData1;
							newArray.forEach(function(obj){
							
							delete obj.fiscalWeek;
							delete obj.fsgLocation;
							delete obj.id;
							delete obj.materialId;
							delete obj.shortage;
							delete obj.year;
							
			});
			////console.log('newArray value--',newArray); 
			
				var JSONData = newArray;
				var ReportTitle = "DEMAND DETAILED LEVEL DATA";
				var ShowLabel = true;
				var headerArray = {
					//"id":"ID",
					//"fsgLocation":"FSG LOCATION",
					"customerId":"CUSTOMER SITE",
					"customerDescription":"CUSTOMER NAME",
					//"materialId":"MATERIAL",
					"demandQty":"QUANTITY"
					//"shortage":"SHORTAGE",
					//"fiscalWeek":"FISCAL WEEK",
					//"year":"YEAR"
				}
				EnvURLService.JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel,headerArray);
			//});
					
	  });
	});
	
	//Export to Excel for DEMAND DETAILED LEVEL DATA End
	
	//Export to Excel for SHORTAGE DETAILED LEVEL DATA Start
	//post ??
	$(function () {
	  $("#inventoryImageId10").click(function () {
		  var jsonObj = $scope.jsonObject;
				var newArray = $scope.responseData1;
							newArray.forEach(function(obj){
							delete obj.fiscalWeek;
							delete obj.fsgLocation;
							delete obj.id;
							delete obj.materialId;
							delete obj.demandQty;
							delete obj.year;
							
				});
				var JSONData = newArray;
				var ReportTitle = "SHORTAGE DETAILED LEVEL DATA";
				var ShowLabel = true;
				var headerArray = {
					//"id":"ID",
					//"fsgLocation":"FSG LOCATION",
					"customerId":"CUSTOMER SITE",
					"customerDescription":"CUSTOMER NAME",
					//"materialId":"MATERIAL",
					//"demandQty":"QUANTITY"
					"shortage":"SHORTAGE"
					//"fiscalWeek":"FISCAL WEEK",
					//"year":"YEAR"
				}
				EnvURLService.JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel,headerArray);
			//});
					
	  });
	});
	
	//Export to Excel for SHORTAGE DETAILED LEVEL DATA End
		
	
	
	//$http.get($scope.microservice_url+'/DIVServices/getTotalConsumptionRate')
	$http.get($scope.DEV_DIV_SERVICE_URL+'/DIVServices/getTotalConsumptionRate',{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).then(function(result) {
	
			$scope.headerData = result.data;
			////console.log('----',$scope.headerData);
	});
	
	$http.get($scope.DEV_DIV_SERVICE_URL+'/div/fsgoverview/getFSGOverviewDollarSummary',{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).success(function(response) {	
    $scope.transittofsg_$_value = response.transittofsg_$_value;
	$scope.atfsg_$_value = response.atfsg_$_value;
	$scope.fsg_demand_$_value = response.fsg_demand_$_value;
	$scope.fsg_shortage_$_value = response.fsg_shortage_$_value;	
	});
	

	
	$http.get($scope.DEV_DIV_SERVICE_URL+'/DIVServices/getEachFSGConsumptionRate',{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).then(function(result) {
	
			$scope.chartData = result.data;
			//////console.log('----',$scope.chartData);
			
			angular.forEach($scope.chartData, function(value, key) {
				
                    currentQtyCount.push({
                        "name": value.fsgLocation,
                        "y": value.totalFSGQuantity
                    });
					////console.log('---currentQtyCount--',JSON.stringify(currentQtyCount));

                });
			
	});
	
	$http.get($scope.DEV_DIV_SERVICE_URL+'/DIVServices/getEachFSGConsumptionRate',{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).then(function(result) {
	
			$scope.chartData1 = result.data;
			//////console.log('----',$scope.chartData);
			
			angular.forEach($scope.chartData1, function(value, key) {
				
                    fsgDemand.push({
                        "name": value.fsgLocation,
                        "y": value.totalFSGDemand
                    });
					////console.log('---fsgDemand--',JSON.stringify(fsgDemand));

                });
			
	});
	
	$http.get($scope.DEV_DIV_SERVICE_URL+'/DIVServices/getEachFSGConsumptionRate',{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).then(function(result) {
	
			$scope.chartData2 = result.data;
			//////console.log('----',$scope.chartData);
			
			angular.forEach($scope.chartData2, function(value, key) {
				
                    fsgIntransit.push({
                        "name": value.fsgLocation,
                        "y": value.totalTransitToFSG
                    });
					////console.log('---fsgIntransit--',JSON.stringify(fsgIntransit));

                });
			
	});
	
	$http.get($scope.DEV_DIV_SERVICE_URL+'/DIVServices/getEachFSGConsumptionRate',{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).then(function(result) {
	
			$scope.chartData3 = result.data;
			//////console.log('----',$scope.chartData);
			
			angular.forEach($scope.chartData3, function(value, key) {
				
                    totalFSGShortage.push({
                        "name": value.fsgLocation,
                        "y": value.totalFSGShortage
                    });
					////console.log('---totalFSGShortage--',JSON.stringify(totalFSGShortage));

                });
			
	});
	
	
	
	$http.get($scope.DEV_DIV_SERVICE_URL+'/DIVServices/getEachFSGConsumptionRate',{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).then(function(result) {
	
			$scope.chartData3 = result.data;
			
			$scope.projectData = $scope.chartData3;
				
				var projectData = {
							"details": []
						}
					var i =0;
					for (i = 0; i < $scope.chartData3.length; i++){
					
					if($scope.chartData3[i].fsgLocation!== undefined){
						var fsgLocation=$scope.chartData3[i].fsgLocation;
						}
					else var fsgLocation='';
					
					//class='clickValue'
					var nodeObj = {
						fsgLocation: fsgLocation
					}

					projectData.details.push(nodeObj);
				}
															
					$scope.projectDetails1 = projectData.details;
			////console.log('--projectDetails1--',JSON.stringify($scope.projectDetails1));
	});
	
		
		
		if(document.getElementById("mytable")){
		document.getElementById("mytable").addEventListener("px-row-click", function(e) {
            var clickedRow = e.detail.row;
			
            var name = e.detail.row.row.fsgLocation;
			//var id = e.detail.row.row.projectId;
			//////console.log(name);
			
			
			var nameFormatted = name.substring(98,name.length - 4);
			////console.log(nameFormatted);
			$scope.fsgnameNeeded = nameFormatted;
			//alert($scope.fsgnameNeeded);
			
			$http.get($scope.DEV_DIV_SERVICE_URL+'/div/fsgoverview/getFSGAggregationSummary?fsg='+fsgLocation1,{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).success(function(response) {	
				//alert("1st  ooo");
				////console.log($scope.DEV_DIV_SERVICE_URL+'/div/fsgoverview/getFSGAggregationSummary?fsg='+fsgLocation1);
				$scope.fsgInventory = response.inventory;
				$scope.fsgDemand = response.demand;
				$scope.inTransitToFSG = response.inTransit;
				$scope.fsgShortage = response.shortage;	
			});
	
			$http.get($scope.DEV_DIV_SERVICE_URL+'/div/fsgoverview/getFSGDrillDownDetails?fsg='+fsgLocation1,{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).success(function(response) {	
					$scope.fsgdata = response;			
			});
	
			
			
          });
	}	
		
	
	$http.get($scope.DEV_DIV_SERVICE_URL+'/div/inactivestock/getInactiveInventorydetails?fromDays=10&toDays=20',{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).success(function(response) {
			$scope.newAging0to15data = response;
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
					if(responseData[i].productcost!== undefined){
					//var	Quantity= responseData[i].Quantity;
						if(responseData[i].productcost< 0){
								var productcost="<font style='color:red;'>"+responseData[i].productcost+"</font>";
							}else{
								var productcost=responseData[i].productcost;
							}
					}
					else var productcost='';
					
					var nodeObj111 = {
						material: material,
						Storage_location: Storage_location,
						productcost: productcost
					}

					projectData.push(nodeObj111);
				}
			$scope.aging0to15data = projectData;
			
	});
	
	//Export to Excel for INACTIVE STOCK DETAILED DATA - AGING 10 TO 20 DAYS Start
	
	$(function () {
	  $("#inActivestock10to20").click(function () {
			// $http.get($scope.DEV_DIV_SERVICE_URL+'/div/inactivestock/getInactiveInventorydetails?fromDays=10&toDays=20')
			// .success(function(response) {    
				//var JSONData = $scope.aging0to15data;
				////console.log('--$scope.aging0to15data;--',$scope.aging0to15data);
				var newArray = $scope.newAging0to15data;
							newArray.forEach(function(obj){
							
							delete obj.materialdesc;
							delete obj.quantity;
							
							
				});
				
				
				var ReportTitle = "INACTIVE STOCK DETAILED DATA AGING 10 TO 20 DAYS";
				var ShowLabel = true;
				var headerArray = {
					"material":"MATERIAL",
					//"quantity":"QUANTITY",
					"location":"LOCATION",
					//"materialdesc":"MATERIAL DESCRIPTION",
					"productcost":"PRODUCT COST($$)"
				}
				EnvURLService.JSONToCSVConvertor(newArray, ReportTitle, ShowLabel,headerArray);
			//});
					
	  });
	});
	
	//Export to Excel for INACTIVE STOCK DETAILED DATA - AGING 10 TO 20 DAYS End


	
	$http.get($scope.DEV_DIV_SERVICE_URL+'/div/inactivestock/getInactiveInventorydetails?fromDays=20&toDays=30',{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).success(function(response) {	
			$scope.newAging16to30data = response;			
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
					if(responseData[i].productcost!== undefined){
					//var	Quantity= responseData[i].Quantity;
						if(responseData[i].productcost< 0){
								var productcost="<font style='color:red;'>"+responseData[i].productcost+"</font>";
							}else{
								var productcost=responseData[i].productcost;
							}
					}
					else var productcost='';
					
					var nodeObj111 = {
						material: material,
						Storage_location: Storage_location,
						productcost: productcost
					}

					projectData.push(nodeObj111);
				}
			$scope.aging16to30data = projectData;
	});
	
	//Export to Excel for INACTIVE STOCK DETAILED DATA - AGING 20 TO 30 DAYS Start
	
	$(function () {
	  $("#inActivestock20to30").click(function () {			
				//console.log('--$scope.aging16to30data;--',$scope.aging16to30data);
				var newArray = $scope.newAging16to30data;
							newArray.forEach(function(obj){
							
							delete obj.materialdesc;
							delete obj.quantity;
							
							
				});
				
				
				var ReportTitle = "INACTIVE STOCK DETAILED DATA AGING 20 TO 30 DAYS";
				var ShowLabel = true;
				var headerArray = {
					"material":"MATERIAL",
					//"quantity":"QUANTITY",
					"location":"LOCATION",
					//"materialdesc":"MATERIAL DESCRIPTION",
					"productcost":"PRODUCT COST($$)"
				}
				EnvURLService.JSONToCSVConvertor(newArray, ReportTitle, ShowLabel,headerArray);
			//});
					
	  });
	});
	
	//Export to Excel for INACTIVE STOCK DETAILED DATA - AGING 20 TO 30 DAYS End
	
	$http.get($scope.DEV_DIV_SERVICE_URL+'/div/inactivestock/getInactiveInventorydetails?fromDays=30&toDays=60',{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).success(function(response) {	
			$scope.newAging31to60data = response;			
			//$scope.newAging0to15data = response;
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
					if(responseData[i].productcost!== undefined){
					//var	Quantity= responseData[i].Quantity;
						if(responseData[i].productcost< 0){
								var productcost="<font style='color:red;'>"+responseData[i].productcost+"</font>";
							}else{
								var productcost=responseData[i].productcost;
							}
					}
					else var productcost='';
					
					var nodeObj111 = {
						material: material,
						Storage_location: Storage_location,
						productcost: productcost
					}

					projectData.push(nodeObj111);
				}
			$scope.aging31to60data = projectData;
	});
	
	//Export to Excel for INACTIVE STOCK DETAILED DATA - AGING 31 TO 60 DAYS Start
	
	$(function () {
	  $("#inActivestock30to60").click(function () {
				//console.log('--$scope.aging31to60data;--',$scope.aging31to60data);
				var newArray = $scope.newAging31to60data;
							newArray.forEach(function(obj){
							
							delete obj.materialdesc;
							delete obj.quantity;
							
							
				});
				
				
				var ReportTitle = "INACTIVE STOCK DETAILED DATA AGING 31 TO 60 DAYS";
				var ShowLabel = true;
				var headerArray = {
					"material":"MATERIAL",
					//"quantity":"QUANTITY",
					"location":"LOCATION",
					//"materialdesc":"MATERIAL DESCRIPTION",
					"productcost":"PRODUCT COST($$)"
				}
				EnvURLService.JSONToCSVConvertor(newArray, ReportTitle, ShowLabel,headerArray);
			//});
					
	  });
	});
	
	//Export to Excel for INACTIVE STOCK DETAILED DATA - AGING 31 TO 60 DAYS End
	
	$http.get($scope.DEV_DIV_SERVICE_URL+'/div/inactivestock/getMostInactiveInventorydetails?fromDays=60',{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).success(function(response) {	
			$scope.newAging60plusdata = response;
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
					if(responseData[i].productcost!== undefined){
					//var	Quantity= responseData[i].Quantity;
						if(responseData[i].productcost< 0){
								var productcost="<font style='color:red;'>"+responseData[i].productcost+"</font>";
							}else{
								var productcost=responseData[i].productcost;
							}
					}
					else var productcost='';
					
					var nodeObj111 = {
						material: material,
						Storage_location: Storage_location,
						productcost: productcost
					}

					projectData.push(nodeObj111);
				}
				$scope.aging60plusdata = projectData;
	});
	
	//Export to Excel for INACTIVE STOCK DETAILED DATA - AGING 60+ DAYS Start
	
	$(function () {
	  $("#inActivestock60plus").click(function () {
			// $http.get($scope.DEV_DIV_SERVICE_URL+'/div/inactivestock/getInactiveInventorydetails?fromDays=10&toDays=20')
			// .success(function(response) {    
				//var JSONData = $scope.aging0to15data;
				//console.log('--$scope.aging60plusdata;--',$scope.aging60plusdata);
				var newArray = $scope.newAging60plusdata;
							newArray.forEach(function(obj){
							
							delete obj.materialdesc;
							delete obj.quantity;
							
							
				});
				
				
				var ReportTitle = "INACTIVE STOCK DETAILED DATA AGING 60+ DAYS";
				var ShowLabel = true;
				var headerArray = {
					"material":"MATERIAL",
					//"quantity":"QUANTITY",
					"location":"LOCATION",
					//"materialdesc":"MATERIAL DESCRIPTION",
					"productcost":"PRODUCT COST($$)"
				}
				EnvURLService.JSONToCSVConvertor(newArray, ReportTitle, ShowLabel,headerArray);
			//});
					
	  });
	});
	
	//Export to Excel for INACTIVE STOCK DETAILED DATA - AGING 60+ DAYS End
		 
/*chartconfig 85 - Aging*/
		 //$scope.jk = 35;
		 //$scope.ak = 25;
		 //$scope.ck = 20;
		 //$scope.mk = 20;
		$http.get($scope.DEV_DIV_SERVICE_URL+'/div/inactivestock/getInactiveInventoryRatiodetails',{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).success(function(response) {

			$scope.jk = response.days_11_to_20;
			$scope.ak = response.days_21_to_30;
			$scope.ck = response.days_31_to_60;
			$scope.mk = response.days_60_plus;
				
			$scope.djk = parseFloat($scope.jk);	
			$scope.dak = parseFloat($scope.ak);
			$scope.dck = parseFloat($scope.ck);	
			$scope.dmk = parseFloat($scope.mk);
			////console.log($scope.jk);
			////console.log($scope.djk);
			////console.log($scope.ak);
			////console.log($scope.dak);
			////console.log($scope.ck);
			////console.log($scope.dck);
			////console.log($scope.mk);
			////console.log($scope.dmk);
		
	
 
 /*chartconfig 99 - Avg Installation time per site*/ 

$scope.chartSeries = [{
            name: 'Stock value',
            colorByPoint: true,
            data: [{
                name: '10 to 20 Days',
                y: $scope.djk,
                events: { 
      click: function()
      {
		$('#agingdatadrill').show();
		window.location.hash = '#agingdatadrill';
		 $('#summary4').show();
		 $('#summary1').hide();
		 $('#summary2').hide();
		 $('#summary3').hide();
         
      }
   }
            }, {
                name: '20 to 30 Days',
                y: $scope.dak,
                events: { 
      click: function()
      {
		  $('#agingdatadrill').show();
		  window.location.hash = '#agingdatadrill';
		 $('#summary4').hide();
		 $('#summary1').show();
		 $('#summary2').hide();
		 $('#summary3').hide();
         
      }
   }
            }, {
                name: '30 to 60 Days',
                y: $scope.dck,
               events: { 
      click: function()
      {
		  $('#agingdatadrill').show();
		  window.location.hash = '#agingdatadrill';
		 $('#summary4').hide();
		 $('#summary1').hide();
		 $('#summary2').show();
		 $('#summary3').hide();
         
      }
   }
            }, {
                name: '60+ Days',
                y: $scope.dmk,
                events: { 
      click: function()
      {
		 $('#agingdatadrill').show();
		 window.location.hash = '#agingdatadrill';
		 $('#summary4').hide();
		 $('#summary1').hide();
		 $('#summary2').hide();
		 $('#summary3').show();
         
      }
   }
            }]
        }]; 
                
  $scope.chartConfig999 = {              
    options: {
       chart: {
		   height :500,
		   width :900,
        type: 'column'
      }, 
                  legend: {
            enabled: false
        },
		
      plotOptions: {
		  column: {
                    dataLabels: {
                        enabled: false,
                        formatter: function () {
                            return Highcharts.numberFormat(this.y,2);
                        }
                    },                   
                },
		  series: {
                cursor: 'pointer'
		  }
        },
            tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>$ {point.y}</b></td></tr>',
           footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
            
    },
    series: $scope.chartSeries,
                
                
      
    title: {
        text: 'INACTIVE STOCK OVERVIEW',
        style: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: '1rem',
        fontFamily: 'GE Inspira Sans, sans-serif'
    }
    },
        subtitle: {
        text: '** $$ values are in millions'
        },
        xAxis: {
        title: {
      text: 'Time Interval'
    },
	type: 'category'
        },     
yAxis: {
	            
            title: {
                text: '$$ Value'
            }
        },

    credits: {
      enabled: false
    },
    loading: false,
    size: {}
  }

  $scope.reflow = function () {
    $scope.$broadcast('highchartsng.reflow');
  }; 
/*chartconfig 9 - Avg Installation time per site ends*/
	
 });
 
 $scope.customerlocation = true;		
	$scope.custaggregationdrill = true;
	$scope.summaryCall2 = function (){		
				
				$scope.customerlocation = true;
				$scope.custaggregationdrill = true;	
				$scope.custaggregationtop = false;
				window.location.hash = '#custer';
		};		
		
	$scope.chartData7 = [];
	var currentQtyCount7 = [];
	var returnQtyCount7 = [];
	var demandCount7 = [];
	
	
	
	$scope.finalData7 = [];
	$scope.headerData7 = [];
	$scope.customerDescription7 = [];
	$scope.headerDataPerCustomer7 = [];
	$scope.installedData7 = [];
	$scope.demandData7 = [];
	var returnedData7 = [];
	
	$http.get($scope.DEV_DIV_SERVICE_URL+'/DIVServices/getCustomerConsumptionView',{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).then(function(result) {
	
			$scope.headerData7 = result.data;
			console.log('----',$scope.headerData7);
	});
	
	$http.get($scope.DEV_DIV_SERVICE_URL+'/DIVServices/getReturned',{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).then(function(result) {
	
			$scope.returnChartData7 = result.data;
			//////console.log('--returnedData--',$scope.returnChartData);
			
			angular.forEach($scope.returnChartData7, function(value, key) {
                returnedData7.push({
                    "name": value.location,
                    "y": value.currentQty
                });
            });
			
	});
		
	
	$http.get($scope.DEV_DIV_SERVICE_URL+'/DIVServices/getConsumptionSummary',{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).then(function(result) {
	
			$scope.chartData7 = result.data;
			//////console.log('----',$scope.chartData);
			
			angular.forEach($scope.chartData7, function(value, key) {
				
                    currentQtyCount7.push({
                        "name": value.state,
                        "y": value.currentQty
                    });
					//////console.log('-----',currentQtyCount);

                });
			
	});
	
	$http.get($scope.DEV_DIV_SERVICE_URL+'/DIVServices/getConsumptionSummary',{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).then(function(result) {
	
			$scope.chartData7 = result.data;
			//////console.log('----',$scope.chartData);
			
			angular.forEach($scope.chartData7, function(value, key) {
				
                    returnQtyCount7.push({
                        "name": value.state,
                        "y": value.returnQty
                    });
					//////console.log('-----',currentQtyCount);

                });
			
	});
	
	$http.get($scope.DEV_DIV_SERVICE_URL+'/DIVServices/getConsumptionSummary',{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).then(function(result) {
	
			$scope.chartData7 = result.data;
			//////console.log('----',$scope.chartData);
			
			angular.forEach($scope.chartData7, function(value, key) {
				
                    demandCount7.push({
                        "name": value.state,
                        "y": value.demandQty
                    });
					//////console.log('---demandQty---',currentQtyCount);

                });
			
	});
	
	
	$http.get($scope.DEV_DIV_SERVICE_URL+'/DIVServices/getConsumptionSummary',{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).then(function(result) {
	
			$scope.chartData9 = result.data;
			
			$scope.projectData9 = $scope.chartData9;
				
				var projectData9 = {
							"details9": []
						}
					var i =0;
					for (i = 0; i < $scope.chartData9.length; i++){
					
					if($scope.chartData9[i].state!== undefined){
						var state=$scope.chartData9[i].state;
						}
					else var state='';
					
					//class='clickValue'
					var nodeObj9 = {
						state: state
					}

					projectData9.details9.push(nodeObj9);
				}
															
					$scope.projectDetails9 = projectData9.details9;
			////console.log('--projectDetails9--',$scope.projectDetails9);
	});
	
	$scope.hideShowFun1=function(){
		
	$scope.customerlocation = false;
	window.location.hash = '#customer-location';	
		
  }
 


/*chartconfig 11 - Avg Installation time per site*/ 


 $scope.chartSeries7 = [
 
  {
            type: 'column',
            name: 'Assets Installed',
			color: 'green',  
            data: currentQtyCount7
        } 
		
		,{
             type: 'column',
            name: 'Return',
			color: 'red',  
            data: returnQtyCount7
        }/*   
		,{
             type: 'column',
            name: 'Demand',
			color: 'blue',  
            data: demandCount
        }  */ 
		];
 
$scope.chartConfig11 = {	  
    options: {
      chart: {
		  
        type: 'column',
		width: 1000
      },
	  legend: {
            enabled: true
        },
      plotOptions: {
            series: {
                cursor: 'pointer',
                point: {
                    events: {
                        click: function (evt) {
													
						/* 	var projectData = {
							"details": []
						}
								var i;
					for (i = 0; i < $scope.projectDetails1.length; i++){
					
					if($scope.projectDetails1[i].fsgLocation!== undefined){
						var fsgLocation=$scope.projectDetails1[i].fsgLocation;
						}
					else var fsgLocation='';
					
					//class='clickValue'
					var nodeObj = {
						fsgLocation: fsgLocation
					}

					projectData.details.push(nodeObj);
					////console.log(i);
					////console.log(fsgLocation);
				} */
						var fsgLocation3 = evt.point.name;
						$scope.projectDetails11 = fsgLocation3;
						//////console.log($scope.projectDetails11);
						$scope.custaggregationtop = true;
						$scope.custaggregationdrill = false;
						 //////console.log('state----',$scope.projectDetails11);
						 $('#testing2').focus();
				$http.get($scope.DEV_DIV_SERVICE_URL+'/DIVServices/getCustomerConsumptionTable?state='+$scope.projectDetails11,{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).success(function(result) {	
							$scope.customerTableData = result;	
						//console.log('$scope.customerTableData----',result);
						
											var responseData = result;
										var projectData = [];
										
									for (var i = 0; i < responseData.length; i++){
										
										if(responseData[i].material!== undefined){
											var material=responseData[i].material;
											}
										else var material='';
																					
										if(responseData[i].materialDescription!== undefined){
										var	materialDescription= responseData[i].materialDescription;
										}
										else var materialDescription='';
										
										if(responseData[i].currentQty!== undefined){
										//var	currentQty= responseData[i].currentQty;
											if(responseData[i].currentQty< 0){
												var currentQty="<font style='color:red;'>"+responseData[i].currentQty+"</font>";
											}else{
												var currentQty=responseData[i].currentQty;
											}
										}
										else var currentQty='';
										if(responseData[i].lastDate!== undefined){
										var	lastDate= responseData[i].lastDate;
											
										}
										else var lastDate='';
										
										if(responseData[i].customerDesc!== undefined){
										var	customerDesc=responseData[i].customerDesc;
										}
										else var customerDesc='';
										
										if(responseData[i].returnedQty!== undefined){
											//var returnedQty=responseData[i].returnedQty;
											if(responseData[i].returnedQty< 0){
												var returnedQty="<font style='color:red;'>"+responseData[i].returnedQty+"</font>";
											}else{
												var returnedQty=responseData[i].returnedQty;
											}
										}
										else var returnedQty='';
										
										if(responseData[i].state!== undefined){
											var state=responseData[i].state;
											}
										else var state='';
										if(responseData[i].fsgServedLocation!== undefined){
											var fsgServedLocation=responseData[i].fsgServedLocation;
											}
										else var fsgServedLocation='';
										
										if(responseData[i].customerSite!== undefined){
											var customerSite=responseData[i].customerSite;
											}
										else var customerSite='';
										
										var nodeObj111 = {
											material: material,
											materialDescription:materialDescription,
											currentQty: currentQty,
											lastDate: lastDate,
											customerDesc:customerDesc,
											returnedQty: returnedQty,
											state:state,
											fsgServedLocation:fsgServedLocation,
											customerSite:customerSite
										}

										projectData.push(nodeObj111);
									}
						
							$scope.projectDetails7 = result;

					});							 
								}
							}
						}
					}
				},
				
			  tooltip: {
					headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
					pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
						'<td style="padding:0"><b>{point.y} units</b></td></tr>',
					footerFormat: '</table>',
					//shared: true,
					useHTML: true
				},
				scrollbar: {
						enabled: true,
						barBackgroundColor: 'gray',
						barBorderRadius: 7,
						barBorderWidth: 0,
						buttonBackgroundColor: 'gray',
						buttonBorderWidth: 0,
						buttonArrowColor: 'yellow',
						buttonBorderRadius: 7,
						rifleColor: 'yellow',
						trackBackgroundColor: 'white',
						trackBorderWidth: 1,
						trackBorderColor: 'silver',
						trackBorderRadius: 7
					},
				
			},
			
			series: $scope.chartSeries7,
			
			
			  
			title: {
				text: 'Consumption Summary',
				style: {
				textTransform: 'uppercase',
				fontWeight: 'bold',
				fontSize: '1rem',
				fontFamily: 'GE Inspira Sans, sans-serif'
			}
			},
			subtitle: {
					text: 'Across States'
				},
			xAxis: {
				 min: 0,
				 max:5,
				title: {
			  text: 'Sites'
			},
			categories: $scope.projectDetails9,
			//crosshair: true,
					type: 'category',
				},	
		 yAxis: {
					allowDecimals: false,
					title: {
						text: 'Count'
					},
					//min: 0,
					//max: 1140,
					//tickInterval: 50,
				},
		 
			credits: {
			  enabled: false
			},
			loading: false,
			size: {}
  }

  $scope.reflow = function () {
    $scope.$broadcast('highchartsng.reflow');
  }; 
/*chartconfig 11 - Avg Installation time per site ends*/
 
 
  //Export to Excel for CUSTOMER CONSUMPTION DETAILED DATA TABLE Start
	
	$(function () {
	  $("#inventoryImageId11").click(function () {
			var state = $scope.projectDetails11;
			//////console.log('response--',$scope.customerTableData);
				$scope.customerConsumptionDetailedForExcelDownload = $scope.customerTableData;                          
			
				var JSONData = $scope.customerConsumptionDetailedForExcelDownload;
				var ReportTitle = "CUSTOMER CONSUMPTION DETAILED DATA TABLE";
				var ShowLabel = true;
				var headerArray = {
							"material":"MATERIAL",
							"materialDescription":"MATERIAL DESCRIPTION",
							"currentQty":"INSTALLED QUANTITY",
							"lastDate":"DATE OF INSTALLATION",
							"customerDesc":"CUSTOMER NAME",
							"returnedQty":"RETURNED",
							"state":"STATE",
							"fsgServedLocation":"FSG SERVED",
							"customerSite":"CUSTOMER ID"
						}
				EnvURLService.JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel,headerArray);
			//});
					
	  });
	});

		
		};
		
	var sso = document.querySelector('px-login').querySelector('div').querySelectorAll('button')[1].querySelector('span').textContent;
		//var sso = 502685514;
		// ACS
			
	//Export to Excel for CUSTOMER CONSUMPTION DETAILED DATA TABLE End
	
	  TokenService.getToken().then(
										   function(data) {
												 $scope.config = data.config;
												 $scope.postgresHeader = data.postgresWSHeader;
												 
													$scope.callAllServices();
												});


			
    }]);
});
