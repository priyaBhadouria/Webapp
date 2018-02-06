define(['angular', './sample-module'], function (angular, controllers) {
    'use strict';
    // Controller definition
    controllers.controller('fsgtrendCtrl', ['$scope', '$http', '$compile', '$log', 'PredixAssetService', 'PredixViewService', 'EnvURLService', '$timeout','TokenService', function ($scope, $http, $compile, $log, PredixAssetService, PredixViewService, EnvURLService, $timeout,TokenService) {
		
		 $scope.blobStore_url = EnvURLService.config().BLOBSTORE_SERVICE_URL;
	   $scope.DEV_DIV_SERVICE_URL = EnvURLService.config().DEV_DIV_SERVICE_URL;
		
		$scope.plantdata1 = true;
		$scope.plantdata2 = true;
		$scope.custdata1 = true;
		$scope.custdata2 = true;
		$scope.overview = true;	
		$scope.overview1 = true;
		$scope.overview2 = true;
		$scope.overview7 = true;
		$scope.overview9 = true;
		$scope.fsgInputdate;
		$scope.validUser=false;
		$scope.InvalidUser=false;
		
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
		
	$scope.summary = false;
		$scope.hideShowFun=function(){
	$scope.overview = false;	
	$scope.summary = true;	
  }
  $scope.hideShowFun1=function(){
	$scope.overview1 = false;	
	$scope.summary = true;	
  }
  $scope.hideShowFun2=function(){
	$scope.overview2 = false;	
	$scope.summary = true;	
  }
  
  $scope.hideShowFun7=function(){
	$scope.overview7 = false;	
	$scope.summary = true;	
	$scope.overview2 = true;
  }
  $scope.hideShowFun9=function(){
	$scope.overview9 = false;	
	$scope.summary = true;	
	$scope.overview2 = true;
  }
  
  
  $scope.summaryCall = function (){						
				$scope.overview = true;
				$scope.summary = false;	          		
		};
		$scope.summaryCall1 = function (){						
				$scope.overview1 = true;
				$scope.summary = false;	          		
		};
		$scope.summaryCall1 = function (){						
				$scope.overview1 = true;
				$scope.summary = false;	          		
		};
		$scope.summaryCall2 = function (){						
				$scope.overview2 = true;
				$scope.summary = false;	          		
		};

		$scope.summaryCall7 = function (){						
				$scope.overview7 = true;
				$scope.summary = true;	
				$scope.overview2 = false;          		
		};
		$scope.summaryCall9 = function (){						
				$scope.overview9 = true;
				$scope.summary = true;
$scope.overview2 = false;				
		};
		
		$scope.stateChanged = function (qId) {
			
		if($scope.answers[qId]){ //If it is checked
       
	   $scope.demandd = false;
		}
else {
	   
	   $scope.demandd = true;
	   
   }
};

$http.get($scope.DEV_DIV_SERVICE_URL+'/getFSGSummary',{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).success(function(response) {	
			$scope.serviceProviderDropdown = response;
			//console.log($scope.serviceProviderDropdown);
		});
		
		$http.get($scope.DEV_DIV_SERVICE_URL+'/getCustomerSummary',{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).success(function(response) {	
			$scope.customerSiteIdDropdown = response;
			//console.log($scope.customerSiteIdDropdown);
		});

$scope.stateChanged1 = function (qId1) {
			
		if($scope.answers1[qId1]){ //If it is checked
      
	   $scope.demanddd = false;
		}
else {
	  
	   $scope.demanddd = true;
	   
   }
};

$scope.stateChanged2 = function (qId2) {
			
		if($scope.answers2[qId2]){ //If it is checked
      
	   $scope.demandddd = false;
		}
else {
	   
	   $scope.demandddd = true;
	   
   }
};
		
		/* $scope.changeFunction7 = function (){
			alert("in");
			if ($('#basic-form-checkbox').hasClass('inform')){
		var myEl = angular.element( document.querySelectorAll( '.inform' )[0] );
		myEl.attr('ng-checked',"false");
       $scope.demandd = true;
		$('#basic-form-checkbox').removeClass('inform');	   
    } 
	else if ($('#basic-form-checkbox').hasClass('')){
		var myEl = angular.element( document.querySelectorAll( '#basic-form-checkbox' )[0] );
		myEl.attr('ng-checked',"true");
       $scope.demandd = false;
    } 
			
								
		}; */
		
		var fsgReceived = [];
		var fsgReceivedNew = [];
		var fsgIssued = [];
		var fsgLoc = null;
		var fsgReceivedLoc = [];
		var fsgIssuedLoc = [];
		var fsgReceivedLoc2 = [];
		var fsgIssuedLoc2 = [];
		var fstrendData =[];
		var custCons = [];
		var custReturn =[];
		var custConsSite1 = [];
		var custReturnSite1 =[];
		var custConsSite2 = [];
		var custReturnSite2 =[];
        $scope.myModel4 = 'all';
        $scope.myModel8 = 'all'; 
        
		$scope.changeFunction1 = function (){
			 var area = $('#fsgs').val();
			 $scope.fsgLocData11 = area;
			$scope.myModel4 = $scope.fsgLocData11;
            
			if($scope.fsgLocData11 == ''){
				$scope.myModel4 = 'all';
			}
			var myModel4 = $scope.myModel4;
            
			// $scope.fsgLoc = $scope.fsgLocData11;
			
			// console.log('--$scope.fsgLoc--'+$scope.fsgLoc);
				// if ( area === '') 
				// {
					
				// $('#booxx').attr('disabled', true);
				// $('#booxx').addClass('btn--disabled');
				// $scope.plantdata = false;
				// $scope.plantdata1 = true;				
				// $scope.plantdata2 = true;
				// }
				// else if ( area === 'FSIL') {
				// // $scope.fsgLocData11 = area;
			    // // $scope.fsgLoc = $scope.fsgLocData11;
				// $('#booxx').removeAttr('disabled');
				// $('#booxx').removeClass('btn--disabled');
				// $scope.plantdata1 = false;
				// $scope.plantdata = true;
				// $scope.plantdata2 = true;
				// }	
				// else if ( area === 'FSTX') {
			    // // $scope.fsgLocData11 = area;
			    // // $scope.fsgLoc = $scope.fsgLocData11;
				// $('#booxx').removeAttr('disabled');
				// $('#booxx').removeClass('btn--disabled');
				// $scope.plantdata1 = true;
				// $scope.plantdata = true;
				// $scope.plantdata2 = false;
				// }	
				
				fsgReceivedNew.length = 0;
				fsgIssued.length = 0;
				$http.get($scope.DEV_DIV_SERVICE_URL+'/getFSGReciptTrendSummary?fsg='+$scope.myModel4,{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).then(function (response) {
			 $scope.fsgReceivedData = response.data;
			 
				   angular.forEach($scope.fsgReceivedData, function(value, key) {
						   fsgReceivedNew.push([value.receiptDate,value.actualQuantity]);
						   
					});
					//console.log(fsgReceivedNew);
			});
			
		$http.get($scope.DEV_DIV_SERVICE_URL+'/getFSGIssuedTrendSummary?fsg='+$scope.myModel4,{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).then(function (response) {
			
			 $scope.fsgIssuedData = response.data;
			 
				   angular.forEach($scope.fsgIssuedData, function(value, key) {
						   fsgIssued.push([value.issuedDate,value.quantity]);
					});
			});
		};
		
		$scope.changeFunction3 = function (){
			
			var area1 = $('#customer').val();
			$scope.custLocData11 = area1;
			$scope.myModel8 = $scope.custLocData11;
			if($scope.custLocData11 == ''){
				$scope.myModel8 = 'all';
			}
            var myModel8 = $scope.myModel8;
			
			
			
				// if ( area1 === '') 
				// {
					
				// $('#booxx').attr('disabled', true);
				// $('#booxx').addClass('btn--disabled');
				// $scope.custdata = false;
				// $scope.custdata1 = true;				
				// $scope.custdata2 = true;
				// }
				// else if ( area1 === '142623') {
					
				// $('#booxx').removeAttr('disabled');
				// $('#booxx').removeClass('btn--disabled');
				// $scope.custdata1 = false;
				// $scope.custdata = true;
				// $scope.custdata2 = true;
				// }	
				// else if ( area1 === '158841') {
					
				// $('#booxx').removeAttr('disabled');
				// $('#booxx').removeClass('btn--disabled');
				// $scope.custdata1 = true;
				// $scope.custdata = true;
				// $scope.custdata2 = false;
				// }	

				custCons.length = 0;
				custReturn.length = 0;
$http.get($scope.DEV_DIV_SERVICE_URL+'/getCustomerConsumptionTrendSummary?customerSiteId='+$scope.myModel8,{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).then(function (response) {
	
	 $scope.custConsSite1Data = response.data;
	 
           angular.forEach($scope.custConsSite1Data, function(value, key) {
				   custCons.push([value.issuedDate,value.quantity]);
				   //console.log(custCons);
			});
	});
	
$http.get($scope.DEV_DIV_SERVICE_URL+'/getCustomerReturnTrendSummary?customerSiteId='+$scope.myModel8,{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).then(function (response) {
	
	 $scope.custReturnSite1Data = response.data;
	 
           angular.forEach($scope.custReturnSite1Data, function(value, key) {
				   custReturn.push([value.returnDate,value.quantity]);
				   //console.log(custReturn);
			});
	});				
		};
		
		$scope.changeFunction = function (){
			var area = $('#fsg').val();
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
	
	

 /*chartconfig 99 - Avg Installation time per site*/ 

$scope.chartSeries = [
	{         
            name: 'Stock',
            color: 'orange',
            index:0,                                                
            legendIndex:0,     
            xAxis:1,
            data: [532, 332, 111, 123, 241, 123, 321]
			//data: fsgIntransit
	},
	{        
            name: 'Shortage',
            color: 'red',
            index:1,                                                
            legendIndex:1,           
            //colorByPoint: true,
            data: [350, 470, 214, 567, 215, 245, 567]
			//data: currentQtyCount
			
	}
               
                
            
                                                

        
  ]; 
                
  $scope.chartConfig123 = {              
    options: {
       chart: {
            type: 'column',
            options3d: {
                enabled: true,
                alpha: 15,
                beta: 15,
                viewDistance: 25,
                depth: 40
            }
        }, 
                  legend: {
            enabled: true
        },
      
		plotOptions: {
            series: {
                cursor: 'pointer',
				point: {
                        events: {
                            click: function (e) {
								//alert(this.series.name);
                                $('#testing7').focus();
								}
                        }
                    },
            },
			column: {
                stacking: 'normal',
                depth: 40
            },
			
        },
            tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key} - Material Safety</span><table>',			
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y} units</b></td></tr>',
           footerFormat: '</table>',
            shared: true,
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
        text: 'Safety Stock Overview',
        style: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: '1rem',
        fontFamily: 'GE Inspira Sans, sans-serif'
    }
    },
        subtitle: {
        text: ''
        },
        xAxis:
		[{
			categories: [
				 'FSIL',
                 'FSIL',
				 'FSIL',
				 'FSCA',
				 'FSCA',
				 'FSTX',
				 'FSTX'
		]},
		{ categories: [
				 '93018831',
                 '93016815',
				 '93033519',
				 '93027471',
				 '93030349',
				 '93041132',
				 '93030349'
		],opposite: true
		},
        ],
		
		
yAxis: {
        allowDecimals: false,
              
            title: {
                text: 'SKU'
            },
			 
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
	
	
	
	

 /*chartconfig 99 - Avg Installation time per site*/ 

$scope.chartSeries = [
	{         
            name: 'Stock',
            color: 'green',
            index:0,                                                
            legendIndex:0,                 
            data: [532, 332, 111, 123, 241, 123, 321]
			//data: fsgIntransit
	} 
  ]; 
                
  $scope.chartConfig312 = {              
    options: {
       chart: {
            type: 'line',
            options3d: {
                enabled: true,
                alpha: 15,
                beta: 15,
                viewDistance: 25,
                depth: 40
            }
        }, 
                  legend: {
            enabled: false
        },
      
		plotOptions: {
            series: {
                cursor: 'pointer',
				point: {
                        events: {
                            click: function (e) {
								//alert(this.series.name);
                                $('#testing9').focus();
								}
                        }
                    },
            },
			
        },
            tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key} - Material Safety</span><table>',			
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y} units</b></td></tr>',
           footerFormat: '</table>',
            shared: true,
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
        text: 'Material Served Quantity',
        style: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: '1rem',
        fontFamily: 'GE Inspira Sans, sans-serif'
    }
    },
        subtitle: {
        text: ''
        },
        xAxis:
		[{
			categories: [
				 'FSIL',
                 'FSIL',
				 'FSIL',
				 'FSCA',
				 'FSCA',
				 'FSTX',
				 'FSTX'
		]},
		{ categories: [
				 '93018831',
                 '93016815',
				 '93033519',
				 '93027471',
				 '93030349',
				 '93041132',
				 '93030349'
		],opposite: true
		},
        ],
		
		
yAxis: {
        allowDecimals: false,
              
            title: {
                text: 'SKU'
            },
			 
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
	
	

 
	var dsSelectedDate;

	$http.get($scope.DEV_DIV_SERVICE_URL+'/div/trendanalysis/demandsupply/graphsummary',{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).success(function(response) 
	{
		$scope.inventoryGraphResponse = JSON.parse(response.inventoryGraphResponse);
		$scope.inTransitGraphResponse = JSON.parse(response.inTransitGraphResponse);
		$scope.demandGraphResponse = JSON.parse(response.demandGraphResponse);
		$scope.shortageGraphResponse = JSON.parse(response.shortageGraphResponse);		
		//console.log($scope.inTransitGraphResponse);

 $scope.chartConfig = {
		
        options: {
            subtitle: {
                text: 'Click and drag to zoom in.'
            },
            chart: {
                backgroundColor: 'transparent',
                zoomType: 'xy',
                resetZoomButton: {
                    position: {
                        x: 0,
                        y: -35
                    },
                    theme: {
                        fill: 'white',
                        stroke: 'silver',
                        r: 0,
                        states: {
                            hover: {
                                fill: '#41739D',
                                style: {
                                    color: 'white'
                                }
                            }
                        }
                    }
                }
            },
            navigator: {
                enabled: true,
                
            },
            rangeSelector: {
				enabled: true,
                selected: 0				
            },
			
             plotOptions: {
                series: {
					//compare: 'percent',
                    showInNavigator: true,
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: function (e) {								 
								var date = new Date(this.category);
								var month = date.getMonth() + 1;
								dsSelectedDate = date.getFullYear() + "-" + month + "-" + date.getDate();
								$scope.selected_date = dsSelectedDate;								
								//console.log($scope.selected_date);
								////console.log("dsSelectedDate :"+dsSelectedDate);
		$http.get($scope.DEV_DIV_SERVICE_URL+'/div/trendanalysis/demandsupply/drilldown?date='+dsSelectedDate,{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).then(function(result) {
					$scope.demandtrenddata = result.data;
					$scope.demandtrendActualdata = result.data;
		
					var dsDrillData11 = {
							"dsDetails": []
						}
						
					var i =0;
					for (i = 0; i < $scope.demandtrenddata.length; i++){
					
					if($scope.demandtrenddata[i].material!== undefined){
						var material=$scope.demandtrenddata[i].material;
						}
					else var material='';
					
					if($scope.demandtrenddata[i].materialDesc!== undefined){
						var materialDesc=$scope.demandtrenddata[i].materialDesc;
						}
					else var materialDesc='';
					
					if($scope.demandtrenddata[i].inventory!== undefined){
						var inventory=$scope.demandtrenddata[i].inventory;
						}
					else var inventory='';
					
					if($scope.demandtrenddata[i].inTransit!== undefined){
						var inTransit=$scope.demandtrenddata[i].inTransit;
						}
					else var inTransit='';
					
					if($scope.demandtrenddata[i].demand!== undefined){
						var demand=$scope.demandtrenddata[i].demand;
						}
					else var demand='';
					
					if($scope.demandtrenddata[i].shortage!== undefined){
						var shortage=$scope.demandtrenddata[i].shortage;
						}
					else var shortage='';
					
					var nodeObj11 = {
						material: material,
						materialDesc: materialDesc,
						inventory: (inventory == 0) ? inventory : "<a href='javascript:void(0)' onclick='dsInventoryLink()' style='text-decoration: none'>"+inventory+"</a>",
						inTransit: (inTransit == 0) ? inTransit : "<a href='javascript:void(0)' onclick='dsInTransitLink()' style='text-decoration: none'>"+inTransit+"</a>",
						demand: (demand == 0) ? demand : "<a href='javascript:void(0)' onclick='dsDemandLink()' style='text-decoration: none'>"+demand+"</a>",
						shortage: (shortage == 0) ? shortage : "<a href='javascript:void(0)' onclick='dsShortageLink()' style='text-decoration: none'>"+shortage+"</a>"					
					}
					dsDrillData11.dsDetails.push(nodeObj11);					
				}					
					$scope.demandtrenddata = dsDrillData11.dsDetails;
		
		});
                                $('#testing1').focus();
								}
                        }
                    },
                    marker: {
                        lineWidth: 1
                    }
                }
            },
            exporting: false,
            xAxis: [{
                type: 'datetime'
            }],
            yAxis: [

                { // Primary yAxis

                    min: 0,
					alignTicks :true,
                    allowDecimals: false,
                    title: {
                        text: 'Units',
                        style: {
                            color: '#80a3ca'
                        }
                    },
                    labels: {
                        format: '{value}',
                        style: {
                            color: '#80a3ca'
                        }
                    }


                },
                
            ],

            title: {
                text: 'Demand & Supply Trend'},

            legend: {
            enabled: true,              
           },
            credits: {
                enabled: false
            },

            loading: false,
            tooltip: {
                crosshairs: [
                    {
                        width: 1,
                        dashStyle: 'dash',
                        color: '#898989'
                    },
                    {
                        width: 1,
                        dashStyle: 'dash',
                        color: '#898989'
                    }
                ],
                headerFormat: '<div class="header">{point.key}</div>',
                pointFormat: '<div class="line"><div class="circle" style="background-color:{series.color};float:left;margin-left:10px!important;clear:left;"></div><p class="country" style="float:left;">{series.name}</p><p>{point.y:,.0f} {series.tooltipOptions.valueSuffix} </p></div>',
                borderWidth: 1,
                borderRadius: 5,
                borderColor: '#a4a4a4',
                shadow: false,
                useHTML: true,
                percentageDecimals: 2,
                backgroundColor: "rgba(255,255,255,.7)",
                style: {
                    padding: 0
                },
                shared: true

            },
            useHighStocks: true

        },
        series: [
		{
                name: 'Demand',
				type: 'line',
				color: 'orange',
                marker: {
                    enabled: true,
                    radius: 3
                },
                shadow: true,
				data: $scope.demandGraphResponse,
				//data: [[1484524800000,350],[1484611200000,700],[1484697600000,800]], 				
                tooltip: {
                    valueDecimals: 2,
					valueSuffix: ' units'
                }},
				{
                name: 'Inventory',
				type: 'line',
				color: 'green',
                marker: {
                    enabled: true,
                    radius: 3
                },
                shadow: true,
                data: $scope.inventoryGraphResponse,
				//data: [[1484524800000,500],[1484611200000,300],[1484697600000,700]],				
                tooltip: {
                    valueDecimals: 2,
					valueSuffix: ' units'
                }},
				{
					
                name: 'Shortage',
				type: 'line',
				color: 'red',
                marker: {
                    enabled: true,
                    radius: 3
                },
                shadow: true,
                data: $scope.shortageGraphResponse,
				//data: [[1484524800000,900],[1484611200000,500],[1484697600000,600]],				
                tooltip: {
                    valueDecimals: 2,
					valueSuffix: ' units'
                }},
				
				{
		
				name: 'In-Transit',
				type: 'line',
				color: 'skyblue',
                marker: {
                    enabled: true,
                    radius: 3
                },
                shadow: true,
				data: $scope.inTransitGraphResponse,
				//data: [[1484524800000,100],[1484611200000,300],[1484697600000,400]],				
                tooltip: {
                    valueDecimals: 2,
					valueSuffix: ' units'
                }}		
		],

        func: function (chart) {
            //console.log(chart);
            $scope.chartData = chart;
            $scope.chartExport = $.proxy(chart.exportChart, chart);
        }


    }	
	
	});
	//Export to Excel for Demand and Supply trend Detailed Table Start
	
				$(function () {
				$("#inventoryImageDemandtrenddata").click(function () {
					var JSONData = $scope.demandtrendActualdata;
					var ReportTitle = "DEMAND AND SUPPLY TREND DETAILED TABLE";
					var ShowLabel = true;
					var headerArray = {
						"material":"MATERIAL",
						"materialDesc":"MATERIAL DESCRIPTION",
						"inventory":"INVENTORY",
						"demand":"DEMAND",
						"inTransit":"IN-TRANSIT",
						"shortage":"SHORTAGE"
						
					}
					EnvURLService.JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel,headerArray);
							
				});
			});
	
			//Export to Excel for Demand and Supply trend Detailed Table End
	
	if(document.getElementById("dsTrendDrill")){
		document.getElementById("dsTrendDrill").addEventListener("px-row-click", function(e) {
            var clickedRow = e.detail.row;
			
            var material = e.detail.row.row.material;			
			//console.log(material);
			////console.log(dsSelectedDate);			
			$http.get($scope.DEV_DIV_SERVICE_URL+'/div/trendanalysis/demandsupply/inventorypopup?material='+material+'&date='+dsSelectedDate,{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).success(function(response) {				
					$scope.dsInventoryPopUpData = response;			
			});	
			//Export to Excel for Demand and Supply Inventory Detailed Table Start
	
				$(function () {
				$("#inventoryImageDsInventoryPopUpData").click(function () {
					var JSONData = $scope.dsInventoryPopUpData;
					var ReportTitle = "DEMAND AND SUPPLY INVENTORY DETAILED TABLE";
					var ShowLabel = true;
					var headerArray = {
						"material":"MATERIAL",
						"location":"LOCATION",
						"materialdesc":"MATERIAL DESCRIPTION",
						"Quantity":"QUANTITY",
						"unitofmeasure":"UNIT OF MEASURE",
						"productcost":"PRODUCT COST",
						"transaction_date":"DATE"
					}
					EnvURLService.JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel,headerArray);
							
				});
			});
	
			//Export to Excel for Demand and Supply Inventory Detailed Table End
	
			$http.get($scope.DEV_DIV_SERVICE_URL+'/div/trendanalysis/demandsupply/intransitpopup?material='+material+'&date='+dsSelectedDate,{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).success(function(response) {				
					$scope.dsInTransitPopUpData = response;			
			});	
			//Export to Excel for Demand and Supply InTransit Detailed Table Start
	
				$(function () {
				$("#inventoryImageDsInTransitPopUpData").click(function () {
					var JSONData = $scope.dsInTransitPopUpData;
					var ReportTitle = "DEMAND AND SUPPLY INTRANSIT DETAILED TABLE";
					var ShowLabel = true;
					var headerArray = {
						"material":"MATERIAL",
						"location":"TO LOCATION",
						"materialdesc":"MATERIAL DESCRIPTION",
						"Quantity":"QUANTITY",
						"unitofmeasure":"UNIT OF MEASURE",
						"receivedfrom":"FROM LOCATION",
						"productcost":"PRODUCT COST($$)",
						"carriername":"CARRIER NAME",
						"pronumber":"PRO NUMBER",
						"transaction_date":"DATE"
						
					}
					EnvURLService.JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel,headerArray);
							
				});
			});
	
			//Export to Excel for Demand and Supply InTransit Detailed Table End
	
			$http.get($scope.DEV_DIV_SERVICE_URL+'/div/trendanalysis/demandsupply/demandpopup?material='+material+'&date='+dsSelectedDate,{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).success(function(response) {	
				//console.log('Demand data',response);
					$scope.dsDemandPopUpData = response;			
			});	
			
			//Export to Excel for Demand and Supply Demand Detailed Table Start
	
				$(function () {
				$("#inventoryImageDsDemandPopUpData").click(function () {
					var JSONData = $scope.dsDemandPopUpData;
					var ReportTitle = "DEMAND AND SUPPLY DEMAND DETAILED TABLE";
					var ShowLabel = true;
					var headerArray = {
						"material":"MATERIAL",
						"location":"LOCATION",
						"year":"YEAR",
						"materialdesc":"MATERIAL DESCRIPTION",
						"custcode":"CUSTOMER ID",
						"demand_week":"DEMAND WEEK",
						"demand_qty":"DEMAND QUANTITY",						
						"transaction_date":"DATE"						
					}
					EnvURLService.JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel,headerArray);
							
				});
			});
	
			//Export to Excel for Demand and Supply Demand Detailed Table End
	
			$http.get($scope.DEV_DIV_SERVICE_URL+'/div/trendanalysis/demandsupply/shortagepopup?material='+material+'&date='+dsSelectedDate,{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).success(function(response) {				
					$scope.dsShortagePopUpData = response;			
			});	
			//Export to Excel for Demand and Supply Shortage Detailed Table Start
	
				$(function () {
				$("#inventoryImageDsShortagePopUpData").click(function () {
					var JSONData = $scope.dsShortagePopUpData;
					//console.log('----$scope.dsShortagePopUpData----',$scope.dsShortagePopUpData);
					JSONData.forEach(function(obj){
								delete obj.location;
							
				}); 
					var ReportTitle = "DEMAND AND SUPPLY SHORTAGE DETAILED TABLE";
					var ShowLabel = true;
					var headerArray = {
						"material":"MATERIAL",
						"year":"YEAR",
						"materialdesc":"MATERIAL DESCRIPTION",
						"custcode":"CUSTOMER ID",
						"demand_week":"FISCAL WEEK",
						"shortage_qty":"SHORTAGE QUANTITY",
						"transaction_date":"DATE"
						
					}
					EnvURLService.JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel,headerArray);
							
				});
			});
	
			//Export to Excel for Demand and Supply Shortage Detailed Table End
	
          });
	}
	
	
$scope.chartConfig1 = {
		
        options: {
            subtitle: {
                text: 'Click and drag to zoom in.'
            },
            chart: {
                backgroundColor: 'transparent',
                zoomType: 'xy',
                resetZoomButton: {
                    position: {
                        x: 0,
                        y: -35
                    },
                    theme: {
                        fill: 'white',
                        stroke: 'silver',
                        r: 0,
                        states: {
                            hover: {
                                fill: '#41739D',
                                style: {
                                    color: 'white'
                                }
                            }
                        }
                    }
                }
            },
            navigator: {
                enabled: true,
                series: {
                    data: [
]
                }
            },
            rangeSelector: {
				enabled: true,
                selected: 0				
            },
			
            plotOptions: {
                series: {
					compare: 'percent',
                    showInNavigator: true,
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: function (e) {
								//alert(this.series.name);
                                $('#testing3').focus();
								}
                        }
                    },
                    marker: {
                        lineWidth: 1
                    }
                }
            },
            exporting: false,
            xAxis: [{
                type: 'datetime'
            }],
            yAxis: [

                { // Primary yAxis

                    //min: 0,
                    allowDecimals: false,
                    title: {
                        text: 'SKU',
                        style: {
                            color: '#80a3ca'
                        }
                    },
                    labels: {
                        format: '{value}',
                        style: {
                            color: '#80a3ca'
                        }
                    }


                },
                
            ],

            title: {
                text: 'FSG Trend'            },

            legend: {
            enabled: true,              
           },
            credits: {
                enabled: false
            },

            loading: false,
            tooltip: {
                crosshairs: [
                    {
                        width: 1,
                        dashStyle: 'dash',
                        color: '#898989'
                    },
                    {
                        width: 1,
                        dashStyle: 'dash',
                        color: '#898989'
                    }
                ],
                headerFormat: '<div class="header">{point.key}</div>',
                pointFormat: '<div class="line"><div class="circle" style="background-color:{series.color};float:left;margin-left:10px!important;clear:left;"></div><p class="country" style="float:left;">{series.name}</p><p>{point.y:,.0f} {series.tooltipOptions.valueSuffix} </p></div>',
                borderWidth: 1,
                borderRadius: 5,
                borderColor: '#a4a4a4',
                shadow: false,
                useHTML: true,
                percentageDecimals: 2,
                backgroundColor: "rgba(255,255,255,.7)",
                style: {
                    padding: 0
                },
                shared: true

            },
            useHighStocks: true

        },
        series: [
		{
                name: 'FSG Received',
				type: 'line',
                marker: {
                    enabled: true,
                    radius: 3
                },
                shadow: true,
				data: [
],
                
                tooltip: {
                    valueDecimals: 2,
					valueSuffix: ' units'
                }},
				{
                name: 'FSG Issued',
				color: 'orange',
				type: 'line',
                marker: {
                    enabled: true,
                    radius: 3
                },
                shadow: true,
                data: [
],
                tooltip: {
                    valueDecimals: 2,
					valueSuffix: ' units'
                }}
		
		
		],

        func: function (chart) {
            //console.log(chart);
            $scope.chartData = chart;
            $scope.chartExport = $.proxy(chart.exportChart, chart);
        }


    }


	
$scope.chartConfig2 = {
		
        options: {
            subtitle: {
                text: 'Click and drag to zoom in.'
            },
            chart: {
                backgroundColor: 'transparent',
                zoomType: 'xy',
                resetZoomButton: {
                    position: {
                        x: 0,
                        y: -35
                    },
                    theme: {
                        fill: 'white',
                        stroke: 'silver',
                        r: 0,
                        states: {
                            hover: {
                                fill: '#41739D',
                                style: {
                                    color: 'white'
                                }
                            }
                        }
                    }
                }
            },
            navigator: {
                enabled: true,
                series: {
                    data: [
]
                }
            },
            rangeSelector: {
				enabled: true,
                selected: 0				
            },
			
            plotOptions: {
                series: {
					compare: 'percent',
                    showInNavigator: true,
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: function (e) {
								//alert(this.series.name);
                                $('#testing3').focus();
								}
                        }
                    },
                    marker: {
                        lineWidth: 1
                    }
                }
            },
            exporting: false,
            xAxis: [{
                type: 'datetime'
            }],
            yAxis: [

                { // Primary yAxis

                    //min: 0,
                    allowDecimals: false,
                    title: {
                        text: 'SKU',
                        style: {
                            color: '#80a3ca'
                        }
                    },
                    labels: {
                        format: '{value}',
                        style: {
                            color: '#80a3ca'
                        }
                    }


                },
                
            ],

            title: {
                text: 'FSG Illinois Trend' },

            legend: {
            enabled: true,              
           },
            credits: {
                enabled: false
            },

            loading: false,
            tooltip: {
                crosshairs: [
                    {
                        width: 1,
                        dashStyle: 'dash',
                        color: '#898989'
                    },
                    {
                        width: 1,
                        dashStyle: 'dash',
                        color: '#898989'
                    }
                ],
                headerFormat: '<div class="header">{point.key}</div>',
                pointFormat: '<div class="line"><div class="circle" style="background-color:{series.color};float:left;margin-left:10px!important;clear:left;"></div><p class="country" style="float:left;">{series.name}</p><p>{point.y:,.0f} {series.tooltipOptions.valueSuffix} </p></div>',
                borderWidth: 1,
                borderRadius: 5,
                borderColor: '#a4a4a4',
                shadow: false,
                useHTML: true,
                percentageDecimals: 2,
                backgroundColor: "rgba(255,255,255,.7)",
                style: {
                    padding: 0
                },
                shared: true

            },
            useHighStocks: true

        },
        series: [
		{
                name: 'FSG Received',
				type: 'line',
                marker: {
                    enabled: true,
                    radius: 3
                },
                shadow: true,
				data: [
],
                
                tooltip: {
                    valueDecimals: 2,
					valueSuffix: ' units'
                }},
				{
                name: 'FSG Issued',
				color: 'orange',
				type: 'line',
                marker: {
                    enabled: true,
                    radius: 3
                },
                shadow: true,
                data: [

],
                tooltip: {
                    valueDecimals: 2,
					valueSuffix: ' units'
                }}
		
		
		],

        func: function (chart) {
            //console.log(chart);
            $scope.chartData = chart;
            $scope.chartExport = $.proxy(chart.exportChart, chart);
        }


    }

	
$scope.chartConfig3 = {
		
        options: {
            subtitle: {
                text: 'Click and drag to zoom in.'
            },
            chart: {
                backgroundColor: 'transparent',
                zoomType: 'xy',
                resetZoomButton: {
                    position: {
                        x: 0,
                        y: -35
                    },
                    theme: {
                        fill: 'white',
                        stroke: 'silver',
                        r: 0,
                        states: {
                            hover: {
                                fill: '#41739D',
                                style: {
                                    color: 'white'
                                }
                            }
                        }
                    }
                }
            },
            navigator: {
                enabled: true,
                series: {
                    data: [

] 
                }
            },
            rangeSelector: {
				enabled: true,
                selected: 0				
            },
			
            plotOptions: {
                series: {
					compare: 'percent',
                    showInNavigator: true,
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: function (e) {
								//alert(this.series.name);
                                $('#testing1').focus();
								}
                        }
                    },
                    marker: {
                        lineWidth: 1
                    }
                }
            },
            exporting: false,
            xAxis: [{
                type: 'datetime'
            }],
            yAxis: [

                { // Primary yAxis

                    //min: 0,
                    allowDecimals: false,
                    title: {
                        text: 'SKU',
                        style: {
                            color: '#80a3ca'
                        }
                    },
                    labels: {
                        format: '{value}',
                        style: {
                            color: '#80a3ca'
                        }
                    }


                },
                
            ],

            title: {
                text: 'Safety Stock Overview' },

            legend: {
            enabled: true,              
           },
            credits: {
                enabled: false
            },

            loading: false,
            tooltip: {
                crosshairs: [
                    {
                        width: 1,
                        dashStyle: 'dash',
                        color: '#898989'
                    },
                    {
                        width: 1,
                        dashStyle: 'dash',
                        color: '#898989'
                    }
                ],
                headerFormat: '<div class="header">{point.key}</div>',
                pointFormat: '<div class="line"><div class="circle" style="background-color:{series.color};float:left;margin-left:10px!important;clear:left;"></div><p class="country" style="float:left;">{series.name}</p><p>{point.y:,.0f} {series.tooltipOptions.valueSuffix} </p></div>',
                borderWidth: 1,
                borderRadius: 5,
                borderColor: '#a4a4a4',
                shadow: false,
                useHTML: true,
                percentageDecimals: 2,
                backgroundColor: "rgba(255,255,255,.7)",
                style: {
                    padding: 0
                },
                shared: true

            },
            useHighStocks: true

        },
        series: [
		{
                name: 'Material Safety Stock',
				type: 'column',				                
				data: [
],
                
                tooltip: {
                    valueDecimals: 2,
					valueSuffix: ' units'
                }},
				{
                name: 'Material Safety Stock Shortage',
				color: 'orange',
				type: 'column',
				
                data: [
],
                tooltip: {
                    valueDecimals: 2,
					valueSuffix: ' units'
                }}
		
		
		],

        func: function (chart) {
          //  console.log(chart);
            $scope.chartData = chart;
            $scope.chartExport = $.proxy(chart.exportChart, chart);
        }


    }
	
	
$scope.chartConfig4 = {
		
        options: {
            subtitle: {
                text: 'Click and drag to zoom in.'
            },
			chart: {
                backgroundColor: 'transparent',
                zoomType: 'xy',
                resetZoomButton: {
                    position: {
                        x: 0,
                        y: -35
                    },
                    theme: {
                        fill: 'white',
                        stroke: 'silver',
                        r: 0,
                        states: {
                            hover: {
                                fill: '#41739D',
                                style: {
                                    color: 'white'
                                }
                            }
                        }
                    }
                }
            },
           
            navigator: {
                enabled: true,
                
            },
            rangeSelector: {
				enabled: true,
                selected: 0,			
            },
			
            
            xAxis: [{
                type: 'datetime'
            }],
            yAxis: [

                { // Primary yAxis

                    //min: 0,
                    allowDecimals: false,
                    title: {
                        text: 'SKU',
                        style: {
                            color: '#80a3ca'
                        }
                    },
                    labels: {
                        format: '{value}',
                        style: {
                            color: '#80a3ca'
                        }
                    }


                },
                
            ],

            title: {
                text: 'Material Served Quantity'            },

            legend: {
            enabled: false,              
           },
            credits: {
                enabled: false
            },

            loading: false,
            tooltip: {
                crosshairs: [
                    {
                        width: 1,
                        dashStyle: 'dash',
                        color: '#898989'
                    },
                    {
                        width: 1,
                        dashStyle: 'dash',
                        color: '#898989'
                    }
                ],
                headerFormat: '<div class="header">{point.key}</div>',
                pointFormat: '<div class="line"><div class="circle" style="background-color:{series.color};float:left;margin-left:10px!important;clear:left;"></div><p class="country" style="float:left;">{series.name}</p><p>{point.y:,.0f} {series.tooltipOptions.valueSuffix} </p></div>',
                borderWidth: 1,
                borderRadius: 5,
                borderColor: '#a4a4a4',
                shadow: false,
                useHTML: true,
                percentageDecimals: 2,
                backgroundColor: "rgba(255,255,255,.7)",
                style: {
                    padding: 0
                },
                shared: true

            },
            useHighStocks: true

        },
        series: [
		{
                name: 'FSG Received',
				type: 'line',
                marker: {
                    enabled: true,
                    radius: 3
                },
                shadow: true,
				data: [

],
                
                tooltip: {
                    valueDecimals: 2,
					valueSuffix: ' units'
                }}
		
		
		],

        func: function (chart) {
            //console.log(chart);
            $scope.chartData = chart;
            $scope.chartExport = $.proxy(chart.exportChart, chart);
        }


    }

$scope.chartConfig5 = {
		
        options: {
            subtitle: {
                text: 'Click and drag to zoom in.'
            },
            chart: {
				width : 1000,
                backgroundColor: 'transparent',
                zoomType: 'xy',
                resetZoomButton: {
                    position: {
                        x: 0,
                        y: -35
                    },
                    theme: {
                        fill: 'white',
                        stroke: 'silver',
                        r: 0,
                        states: {
                            hover: {
                                fill: '#41739D',
                                style: {
                                    color: 'white'
                                }
                            }
                        }
                    }
                }
            },
            navigator: {
                enabled: true,
                
            },
            rangeSelector: {
				enabled: true,
                selected: 0				
            },
			
            plotOptions: {
                series: {
					//compare: 'percent',
                    showInNavigator: true,
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: function (e) {
                                
                                //$scope.fsgInputdate = this.category;
								var d = new Date(this.category);
								$scope.fsgInputdate = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
								
                                //alert($scope.myModel8);
								driilDownCust($scope.fsgInputdate,$scope.myModel8);
                              
                                //alert(this.series.name);
                                $('#testing2').focus();
								}
                        }
                    },
                    marker: {
                        lineWidth: 1
                    }
                }
            },
            exporting: false,
            xAxis: [{
                type: 'datetime'
            }],
            yAxis: [

                { // Primary yAxis

                    //min: 0,
					min: 0,
					alignTicks :true,
                    allowDecimals: false,
                    title: {
                        text: 'Units',
                        style: {
                            color: '#80a3ca'
                        }
                    },
                    labels: {
                        format: '{value}',
                        style: {
                            color: '#80a3ca'
                        }
                    }


                },
                
            ],

            title: {
                text: 'Customer Consumption Trend' },

            legend: {
            enabled: true,              
           },
            credits: {
                enabled: false
            },

            loading: false,
            tooltip: {
                crosshairs: [
                    {
                        width: 1,
                        dashStyle: 'dash',
                        color: '#898989'
                    },
                    {
                        width: 1,
                        dashStyle: 'dash',
                        color: '#898989'
                    }
                ],
                headerFormat: '<div class="header">{point.key}</div>',
                pointFormat: '<div class="line"><div class="circle" style="background-color:{series.color};float:left;margin-left:10px!important;clear:left;"></div><p class="country" style="float:left;">{series.name}</p><p>{point.y:,.0f} {series.tooltipOptions.valueSuffix} </p></div>',
                borderWidth: 1,
                borderRadius: 5,
                borderColor: '#a4a4a4',
                shadow: false,
                useHTML: true,
                percentageDecimals: 2,
                backgroundColor: "rgba(255,255,255,.7)",
                style: {
                    padding: 0
                },
                shared: true

            },
            useHighStocks: true

        },
        series: [
		{
                name: 'Customer Consumption',
				type: 'line',
                marker: {
                    enabled: true,
                    radius: 3
                },
                shadow: true,
				data: custCons,
				tooltip: {
                    valueDecimals: 2,
					valueSuffix: ' units'
                }},
				{
                name: 'Customer Returns',
				type: 'line',
                marker: {
                    enabled: true,
                    radius: 3
                },
                shadow: true,
                data: custReturn ,
				tooltip: {
                    valueDecimals: 2,
					valueSuffix: ' units'
                }}				
				
				
		
		
		],

        func: function (chart) {
           // console.log(chart);
            $scope.chartData = chart;
            $scope.chartExport = $.proxy(chart.exportChart, chart);
        }


    }	
		
    $scope.myIssued = function (material) { 
        for(var i=0; i<$scope.fsgDrilldownData.length; i++){
            var tmpobj = $scope.fsgDrilldownData[i];
            if(tmpobj.material == material){
			var material =material;
			var date = tmpobj.date;
			var reqInput = 'fsgIssued';
			var fsgId = $scope.myModel4;
			console.log("FSG Name :"+fsgId);
			//$http.get('https://divtrendanalysis.run.aws-usw02-pr.ice.predix.io/getFSGLocSummary?material='+material+'&date='+date+'&reqInput='+reqInput).success(function(response) {
                $http.get($scope.DEV_DIV_SERVICE_URL+'/getFSGLocSummary?material='+material+'&date='+date+'&reqInput='+reqInput+'&fsgName='+fsgId,{	
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).success(function(response) {	
				var fsgI_pudata = response;
					
				var projectData113 = {
							"details113": []
						}
					var i =0;
					for (i = 0; i < fsgI_pudata.length; i++){
					
					if(fsgI_pudata[i].date!== undefined){
					var	date=fsgI_pudata[i].date;
					}
					else var date='';
					
					if(fsgI_pudata[i].fsgIssuedquantity!== undefined){
					var	fsgIssuedquantity= fsgI_pudata[i].fsgIssuedquantity;
					}
					else var fsgIssuedquantity='';
					
					if(fsgI_pudata[i].issuedLocation!== undefined){
					var	fsg = fsgI_pudata[i].issuedLocation;
					}
					else var fsg='';
					
					var nodeObj113 = {
						date: date,
						Quantity:fsgIssuedquantity,
						fsgserved: fsg
					}

					projectData113.details113.push(nodeObj113);
				}
															
					$scope.fsgIssueddrillData = projectData113.details113;
                    //console.log("$scope.fsgIssueddrillData0000000", $scope.fsgIssueddrillData);
			});			
			
                
            }
        }
    }
	
	 //Export to Excel for FSG Issued detailed Data Start
	
	$(function () {
	  $("#inventoryImageFsgIssueddrillData").click(function () {
				var JSONData = $scope.fsgIssueddrillData;
				var ReportTitle = "FSG ISSUED DETAILED DATA";
				var ShowLabel = true;
				var headerArray = {
					"date":"DATE OF RECEIVED",
					"Quantity":"QUANTITY",
					"fsgserved":"FSG"					
				}
				EnvURLService.JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel,headerArray);
					
	   });
	});
	
	//Export to Excel for FSG Issued Detailed Data End
	

    $scope.myReceived = function (material) { 
        for(var i=0; i<$scope.fsgDrilldownData.length; i++){
            var tmpobj = $scope.fsgDrilldownData[i];
            if(tmpobj.material == material){
			var material = material;
			var date = tmpobj.date;
			var reqInput = 'fsgReceived';
			var fsgId = $scope.myModel4;
			console.log("FSG Name :"+fsgId);
			$http.get($scope.DEV_DIV_SERVICE_URL+'/getFSGLocSummary?material='+material+'&date='+date+'&reqInput='+reqInput+'&fsgName='+fsgId,{	
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).success(function(response) {	
				var fsgR_pudata = response;
					//console.log("response receicved--", response);
				var projectData113 = {
							"details113": []
						}
					for (var i = 0; i < fsgR_pudata.length; i++){
					
					if(fsgR_pudata[i].date!== undefined){
					var	date=fsgR_pudata[i].date;
					}
					else var date='';
					
					if(fsgR_pudata[i].fsgReceivedquantity!== undefined){
					var	fsgReceivedquantity= fsgR_pudata[i].fsgReceivedquantity;
					}
					else var fsgReceivedquantity='';
					
					if(fsgR_pudata[i].location!== undefined){
					var	fsg = fsgR_pudata[i].location;
					}
					else var fsg='';
					
					var nodeObj113 = {
						date: date,
						Quantity:fsgReceivedquantity,
						fsgserved: fsg
					}

					projectData113.details113.push(nodeObj113);
				}
															
					$scope.fsgReceiveddrillData = projectData113.details113;	
               // console.log('$scope.fsgReceiveddrillData______----',$scope.fsgReceiveddrillData);
			});		
			
                
            }
        }
    }
    
    //Export to Excel for FSG Received Detailed Data Start
	
	$(function () {
	  $("#inventoryImageFsgReceiveddrillData").click(function () {
				var JSONData = $scope.fsgReceiveddrillData;
				var ReportTitle = "FSG RECEIVED DETAILED DATA";
				var ShowLabel = true;
				var headerArray = {
					"fsgserved":"FSG",
					"Quantity":"QUANTITY",
					"date":"DATE OF RECEIVED"
				}
				EnvURLService.JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel,headerArray);
					
	   });
	});
	
	//Export to Excel for FSG Received Detailed Data End
	
    
    
    
    
   // $scope.consumptionpop = [];
    
    //var custId;
    $scope.custConsumption = function (material) { 
        for(var i=0; i<$scope.custConsTrendData.length; i++){
            var tmpobj = $scope.custConsTrendData[i];
            if(tmpobj.material == material){
			var material =material;
			var date = tmpobj.date;
			var reqInput = 'custCons';
			var custId = $scope.myModel8;



                
		
 $http.get($scope.DEV_DIV_SERVICE_URL+'/getCustTrendFSGLocSummary?material='+material+'&date='+date+'&reqInput='+reqInput+'&customerId='+custId,{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).success(function(response) {
                    //console.log("REsponse-------------",response);
				var custConsI_pudata = response;
					
				var projectData113 = {
							"details113": []
						}
					var i =0;
					for (i = 0; i < custConsI_pudata.length; i++){
					
                    if(custConsI_pudata[i].date!== undefined){
					var	date=custConsI_pudata[i].date;
					}
					else var date='';
                    
                    if(custConsI_pudata[i].custConsumptions!== undefined){
					var	custConsumptions= custConsI_pudata[i].custConsumptions;
					}
					else var custConsumptions='';
                    
                    if(custConsI_pudata[i].installationLoc!== undefined){
					var	installationLoc = custConsI_pudata[i].installationLoc;
					}
					else var installationLoc='';
                    
                    if(custConsI_pudata[i].material!== undefined){
					var	material= custConsI_pudata[i].material;
					}
					else var material='';
                    
                    if(custConsI_pudata[i].materialDesc!== undefined){
					var	materialDesc= custConsI_pudata[i].materialDesc;
					}
					else var materialDesc='';
                    
                     
                    if(custConsI_pudata[i].custDesc!== undefined){
					var	custDesc= custConsI_pudata[i].custDesc;
					}
					else var custDesc='';
                    
                    if(custConsI_pudata[i].custId!== undefined){
					var	custId= custConsI_pudata[i].custId;
					}
					else var custId='';
                    //console.log(custConsumptions);
					var nodeObj113 = {
                        custId: custId,
                        custDesc: custDesc,
                        installationLoc: installationLoc,
                        custConsumptions: custConsumptions,
                        date: date
					}

					projectData113.details113.push(nodeObj113);
				}
															
					
                    $timeout(function() {                        
                        $scope.consumptionpop = projectData113.details113;
                       // console.log("$scope.consumptionpop0000000", $scope.consumptionpop);
                    }, 100);
                    
                    
			});			
			
                
            }
        }
    }
    
    
    //Export to Excel for Customer Consumption Detailed Data Start
	
	$(function () {
	  $("#inventoryImageConsumptionpop").click(function () {
				var JSONData = $scope.consumptionpop;
				var ReportTitle = "CUSTOMER CONSUMPTION DETAILED DATA";
				var ShowLabel = true;
				var headerArray = {
					"custId":"CUSTOMER ID",
					"custDesc":"CUSTOMER NAME",
					"installationLoc":"FSG SERVED",
					"custConsumptions":"QUANTITY",
					"date":"DATE OF INSTALLATION"
				}
				EnvURLService.JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel,headerArray);
					
	   });
	});
	
	//Export to Excel for Customer Consumption Detailed Data End
	
    
    
    
    
    
   $scope.customerReturns = function (material) { 
        for(var i=0; i<$scope.custConsTrendData.length; i++){
            var tmpobj = $scope.custConsTrendData[i];
            if(tmpobj.material == material){
			var material = material;
			var date = tmpobj.date;
			var reqInput = 'custReturn';
			var custId = $scope.myModel8;
			$http.get($scope.DEV_DIV_SERVICE_URL+'/getCustTrendFSGLocSummary?material='+material+'&date='+date+'&reqInput='+reqInput+'&customerId='+custId,{	
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).success(function(response) {	
				var custConsI_pudata = response;
					//console.log("response receicved--", response);
				var projectData113 = {
							"details113": []
						}
					for (var i = 0; i < custConsI_pudata.length; i++){
					
					if(custConsI_pudata[i].custId!== undefined){
					var	custId= custConsI_pudata[i].custId;
					}
					else var custId='';
                        
                    if(custConsI_pudata[i].custDesc!== undefined){
					var	custDesc= custConsI_pudata[i].custDesc;
					}
					else var custDesc='';
                        
                    if(custConsI_pudata[i].Quantity!== undefined){
					var	Quantity= custConsI_pudata[i].Quantity;
					}
					else var Quantity='';
                        
                    if(custConsI_pudata[i].fsgserved!== undefined){
					var	fsgserved= custConsI_pudata[i].fsgserved;
					}
					else var fsgserved='';
					
					var nodeObj113 = {
                        custId: custId,
                        custDesc: custDesc,
                        Quantity: Quantity,
                        fsgserved: fsgserved
					}

					projectData113.details113.push(nodeObj113);
				}
															
					$scope.returnpop = projectData113.details113;	
                //console.log('$scope.returnpop----',$scope.returnpop);
			});		
			
                
            }
        }
    }
    
    
    //Export to Excel for Customer Returns Detailed Data Start
	
	$(function () {
	  $("#inventoryImageReturnpop").click(function () {
				var JSONData = $scope.returnpop;
				var ReportTitle = "CUSTOMER RETURNS DETAILED DATA";
				var ShowLabel = true;
				var headerArray = {
					"custId":"CUSTOMER ID",
					"custDesc":"CUSTOMER NAME",
					"Quantity":"MATERIAL RETURN COUNT",
					"fsgserved":"FSG LOCATION"
				}
				EnvURLService.JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel,headerArray);
					
	   });
	});
	
	//Export to Excel for Customer Returns Detailed Data End
	
    
     
    
    
    
    
    
    
    
    
    
    
    
    
    
    
// $http.get('https://divtrendanalysis.run.aws-usw02-pr.ice.predix.io/getCustomerConsumptionTrendSummary').then(function (response) {
	
	 // $scope.custConsData = response.data;
	 
           // angular.forEach($scope.custConsData, function(value, key) {
				   // custCons.push([value.issuedDate,value.quantity]);
			// });
	// });
	
// $http.get('https://divtrendanalysis.run.aws-usw02-pr.ice.predix.io/getCustomerReturnTrendSummary').then(function (response) {
	
	 // $scope.custReturnData = response.data;
	 
           // angular.forEach($scope.custReturnData, function(value, key) {
				   // custReturn.push([value.issuedDate,value.quantity]);
			// });
	// });
$http.get($scope.DEV_DIV_SERVICE_URL+'/getCustomerConsumptionTrendSummary?customerSiteId=all',{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).then(function (response) {
	
	 $scope.custConsSite1Data = response.data;
	 
           angular.forEach($scope.custConsSite1Data, function(value, key) {
				   custCons.push([value.issuedDate,value.quantity]);
				  // console.log(custCons);
			});
	});
	
$http.get($scope.DEV_DIV_SERVICE_URL+'/getCustomerReturnTrendSummary?customerSiteId=all',{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).then(function (response) {
	
	 $scope.custReturnSite1Data = response.data;
	 
           angular.forEach($scope.custReturnSite1Data, function(value, key) {
				   custReturn.push([value.returnDate,value.quantity]);
				  // console.log(custReturn);
			});
	});
// $http.get('https://divtrendanalysis.run.aws-usw02-pr.ice.predix.io/getCustomerConsumptionSiteIdTrendSummary?customerSiteId=158841').then(function (response) {
	
	 // $scope.custConsSite2Data = response.data;
	 
           // angular.forEach($scope.custConsSite2Data, function(value, key) {
				   // custConsSite2.push([value.issuedDate,value.quantity]);
			// });
	// });
	
// $http.get('https://divtrendanalysis.run.aws-usw02-pr.ice.predix.io/getCustomerReturnSiteIdTrendSummary?customerSiteId=158841').then(function (response) {
	
	 // $scope.custReturnSite2Data = response.data;
	 
           // angular.forEach($scope.custReturnSite2Data, function(value, key) {
				   // custReturnSite2.push([value.issuedDate,value.quantity]);
			// });
	// });
	
       function driilDownCust(a_Date,myModel8) {
//$http.get('https://divtrendanalysis.run.aws-usw02-pr.ice.predix.io/getCustConsTrendDrilldownSummary').then(function (response) {
$http.get($scope.DEV_DIV_SERVICE_URL+'/getCustConsTrendDrilldownSummary?date='+a_Date+'&customerSiteId='+myModel8,{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).then(function (response) {
	
	 //$scope.custConsTrendData = response.data;
	 
           $scope.finalData111 = response.data;
			//console.log('Customer Trend',$scope.finalData111);
			$scope.projectData111 = $scope.finalData111;
				
				var projectData111 = {
							"details111": []
						}
					var i =0;
					for (i = 0; i < $scope.finalData111.length; i++){
					
					if($scope.finalData111[i].material!== undefined){
						var material=$scope.finalData111[i].material;
						}
					else var material='';
					
					if($scope.finalData111[i].materialDesc!== undefined){
						var materialDesc=$scope.finalData111[i].materialDesc;
						}
					else var materialDesc='';
																
					if($scope.finalData111[i].date!== undefined){
					var	date= $scope.finalData111[i].date;
					}
					else var date='';
					
					if($scope.finalData111[i].custConsumptions!== undefined){
					var	custConsumptions= $scope.finalData111[i].custConsumptions;
					}
					else var custConsumptions='';
					
					if($scope.finalData111[i].custReturns!== undefined){
					var	custReturns= $scope.finalData111[i].custReturns;
					}
					else var custReturns='';
                        
                    if(custConsumptions==0){
                        //console.log(custConsumptions);
                        var nodeObj111 = {
						material: material,
						materialDesc: materialDesc,
						date: date,
						custConsumptions: "<font>"+custConsumptions+"</font>",
						custReturns: "<a href='javascript:void(0)' onclick='gotoLink1(event,"+material+")'>"+custReturns+"</a>"
					}
                        }
                        else if(custReturns==0){
                       // console.log(custReturns);
                        var nodeObj111 = {
						material: material,
						materialDesc: materialDesc,
						date: date,
						custConsumptions: "<a href='javascript:void(0)' onclick='gotoLink(event,"+material+")'>"+custConsumptions+"</a>",
						custReturns: "<font>"+custReturns+"</font>"   
					}
                        
                    }else{
                        
                        var nodeObj111 = {
						material: material,
						materialDesc: materialDesc,
						date: date,
						custConsumptions: "<a href='javascript:void(0)' onclick='gotoLink(event,"+material+")'>"+custConsumptions+"</a>",
						custReturns: "<a href='javascript:void(0)' onclick='gotoLink1(event,"+material+")'>"+custReturns+"</a>"
					}
                    }
                    
					
                    
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
					/*var nodeObj111 = {
						material: material,
						materialDesc: materialDesc,
						date: date,
						custConsumptions: "<a href='javascript:void(0)' onclick='gotoLink(event,"+material+")'>"+custConsumptions+"</a>",
						custReturns: "<a href='javascript:void(0)' onclick='gotoLink1()'>"+custReturns+"</a>"
					}*/

					projectData111.details111.push(nodeObj111);
				}
															
					$scope.custConsTrendData = projectData111.details111;
	});
	
	//Export to Excel for Customer Consumption Trend Detailed Table Start
	
				$(function () {
				$("#inventoryImageCustConsTrendData").click(function () {
					var JSONData = $scope.finalData111;
					JSONData.forEach(function(obj){
							
							delete obj.custDesc;
								delete obj.custId;
								delete obj.installationLoc;
								delete obj.receivedLoc;
							
				}); 
					var ReportTitle = "CUSTOMER CONSUMPTION TREND DETAILED TABLE";
					var ShowLabel = true;
					var headerArray = {
						"material":"MATERIAL",
						"materialDesc":"MATERIAL DESCRIPTION",
						"date":"DATE",
						"custConsumptions":"CUSTOMER CONSUMPTION",
						"custReturns":"CUSTOMER RETURNS"
						
					}
					EnvURLService.JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel,headerArray);
							
				});
			});
	
			//Export to Excel forCustomer Consumption trend Detailed Table End
	
       }
$scope.chartConfig7 = {
		
        options: {
            subtitle: {
                text: 'Click and drag to zoom in.'
            },
            chart: {
				width:1000,
                backgroundColor: 'transparent',
                zoomType: 'xy',
                resetZoomButton: {
                    position: {
                        x: 0,
                        y: -35
                    },
                    theme: {
                        fill: 'white',
                        stroke: 'silver',
                        r: 0,
                        states: {
                            hover: {
                                fill: '#41739D',
                                style: {
                                    color: 'white'
                                }
                            }
                        }
                    }
                }
            },
            navigator: {
                enabled: true,
                
            },
            rangeSelector: {
				enabled: true,
                selected: 0				
            },
			
            plotOptions: {
                series: {
					//compare: 'percent',
                    showInNavigator: true,
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: function (e) {
								//$scope.fsgInputdate = this.category;
								var d = new Date(this.category);
								// var finalDate = d.getDate();
								// var varDate = d.getDate();
								// var strDate = varDate.toString;
								// if(strDate.length=1){
									// finalDate = '0'+finalDate;
								// }
								
								//console.log('length==========',sizeOfDate.length);
								$scope.fsgInputdate = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
								
                                $('#testing3').focus();
                               
								driilDown($scope.fsgInputdate,$scope.myModel4);
								}
                        }
                    },
                    marker: {
                        lineWidth: 1
                    }
                }
            },
            exporting: false,
            xAxis: [{
                type: 'datetime'
            }],
            yAxis: [

                { // Primary yAxis

                    //min: 0,
					min: 0,
					alignTicks :true,
                    allowDecimals: false,
                    title: {
                        text: 'Units',
                        style: {
                            color: '#80a3ca'
                        }
                    },
                    labels: {
                        format: '{value}',
                        style: {
                            color: '#80a3ca'
                        }
                    }


                },
                
            ],

            title: {
                text: 'FSG Trend' },

            legend: {
            enabled: true,              
           },
            credits: {
                enabled: false
            },

            loading: false,
            tooltip: {
                crosshairs: [
                    {
                        width: 1,
                        dashStyle: 'dash',
                        color: '#898989'
                    },
                    {
                        width: 1,
                        dashStyle: 'dash',
                        color: '#898989'
                    }
                ],
                headerFormat: '<div class="header">{point.key}</div>',
                pointFormat: '<div class="line"><div class="circle" style="background-color:{series.color};float:left;margin-left:10px!important;clear:left;"></div><p class="country" style="float:left;">{series.name}</p><p>{point.y:,.0f} {series.tooltipOptions.valueSuffix} </p></div>',
                borderWidth: 1,
                borderRadius: 5,
                borderColor: '#a4a4a4',
                shadow: false,
                useHTML: true,
                percentageDecimals: 2,
                backgroundColor: "rgba(255,255,255,.7)",
                style: {
                    padding: 0
                },
                shared: true

            },
            useHighStocks: true

        },
        series: [
		{
                name: 'FSG Received',
				type: 'line',
                marker: {
                    enabled: true,
                    radius: 3
                },
                shadow: true,
				data: fsgReceivedNew ,
				//data: [[1482796800000,2726],[1482883200000,13679],[1482969600000,456],[1483401600000,18522],[1483488000000,6280],[1483574400000,1838]],
				tooltip: {
                    valueDecimals: 2,
					valueSuffix: ' units'
                }},
				{
                name: 'FSG Issued',
				type: 'line',
                marker: {
                    enabled: true,
                    radius: 3
                },
                shadow: true,
                data: fsgIssued ,
				
				tooltip: {
                    valueDecimals: 2,
					valueSuffix: ' units'
                }}
		
		
		],

        func: function (chart) {
           // console.log(chart);
            $scope.chartData = chart;
            $scope.chartExport = $.proxy(chart.exportChart, chart);
        }


    }


// $http.get('https://divtrendanalysis.run.aws-usw02-pr.ice.predix.io/getFSGReciptTrendSummary').then(function (response) {
	
	 // $scope.fsgReceivedData = response.data;
	 
           // angular.forEach($scope.fsgReceivedData, function(value, key) {
				   // fsgReceived.push([value.receiptDate,value.actualquantity]);
			// });
	// });
	
// $http.get('https://divtrendanalysis.run.aws-usw02-pr.ice.predix.io/getFSGIssuedTrendSummary').then(function (response) {
	
	 // $scope.fsgIssuedData = response.data;
	 
           // angular.forEach($scope.fsgIssuedData, function(value, key) {
				   // fsgIssued.push([value.issuedDate,value.quantity]);
			// });
	// });
	
	$http.get($scope.DEV_DIV_SERVICE_URL+'/getFSGReciptTrendSummary?fsg=all',{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).then(function (response) {
	
	 $scope.fsgReceivedData = response.data;
	 //alert($scope.fsgReceivedData);
           angular.forEach($scope.fsgReceivedData, function(value, key) {
				   fsgReceivedNew.push([value.receiptDate,value.actualQuantity]);
				  // console.log('----fsgReceivedNew----',fsgReceivedNew);
			});
	});
	
$http.get($scope.DEV_DIV_SERVICE_URL+'/getFSGIssuedTrendSummary?fsg=all',{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).then(function (response) {
	
	 $scope.fsgIssuedData = response.data;
	 //alert($scope.fsgIssuedData)
           angular.forEach($scope.fsgIssuedData, function(value, key) {
				   fsgIssued.push([value.issuedDate,value.quantity]);
			});
	});
	
	
// $http.get('https://divtrendanalysis.run.aws-usw02-pr.ice.predix.io/getFSGIssuedLocationTrendSummary?fsg=FSIL').then(function (response) {
	
	
	// //console.log('--fsgLoc--'+fsgLoc);
	// // console.log('--url--'+'https://divtrendanalysis.run.aws-usw02-pr.ice.predix.io/getFSGIssuedLocationTrendSummary?fsg='+$scope.fsgLoc);
	 // $scope.fsgIssuedLocData = response.data;
	          // //console.log('--$scope.fsgIssuedLocData--'+$scope.fsgIssuedLocData);
           // angular.forEach($scope.fsgIssuedLocData, function(value, key) {
				   // fsgIssuedLoc.push([value.issuedDate,value.quantity]);
			// });
	// });	
// $http.get('https://divtrendanalysis.run.aws-usw02-pr.ice.predix.io/getFSGReciptLocationTrendSummary?fsg=FSIL').then(function (response) {
	
	 // $scope.fsgReceivedLocData = response.data;
	 
           // angular.forEach($scope.fsgReceivedLocData, function(value, key) {
				   // fsgReceivedLoc.push([value.receiptDate,value.actualquantity]);
			// });
	// });
	
	/*$http.get('https://divtrendanalysis.run.aws-usw02-pr.ice.predix.io/getFSGReciptTrendSummary?fsg=FSIL').then(function (response) {
	
		 $scope.fsgReceivedLocData = response.data;
	        angular.forEach($scope.fsgReceivedLocData, function(value, key) {
				   fsgReceivedLoc.push([value.receiptDate,value.actualQuantity]);
				   console.log(fsgReceivedLoc);
			});
	});
	
	$http.get('https://divtrendanalysis.run.aws-usw02-pr.ice.predix.io/getFSGIssuedTrendSummary?fsg=FSIL').then(function (response) {
	
	 $scope.fsgIssuedLocData = response.data;
	 //alert($scope.fsgIssuedLocData)
           angular.forEach($scope.fsgIssuedLocData, function(value, key) {
				   fsgIssuedLoc.push([value.issuedDate,value.quantity]);
			});
	});*/
        
        
	function driilDown(a_Date,myModel4) {
	//https://divtrendanalysis.run.aws-usw02-pr.ice.predix.io/getFSGTrendDrilldownSummary?date=27-12-2016&fsg=all
$http.get($scope.DEV_DIV_SERVICE_URL+'/getFSGTrendDrilldownSummary?date='+a_Date+'&fsg='+myModel4,{
		    headers : {'Content-Type': undefined,
		  'digitalInventoryAuthentication':$scope.postgresHeader}
			}).then(function (response) {
	
			$scope.finalData11 = response.data;
			//console.log('---$scope.Data----',$scope.finalData11);
			$scope.projectData11 = $scope.finalData11;
				var materialDescription = '';
				var projectData11 = {
							"details11": []
						}
					var i =0;
					for (i = 0; i < $scope.finalData11.length; i++){
					
					if($scope.finalData11[i].material!== undefined){
						var material=$scope.finalData11[i].material;
						}
					else var material='';
					
					if($scope.finalData11[i].materialDescription!== undefined){
						materialDescription=$scope.finalData11[i].materialDescription;
						}
					else {
                        materialDescription='';
                    }
																
					if($scope.finalData11[i].date!== undefined){
					var	date= $scope.finalData11[i].date;
					}
					else var date='';
					
					if($scope.finalData11[i].fsgReceivedquantity!== undefined){
					var	fsgReceivedquantity= $scope.finalData11[i].fsgReceivedquantity;
					}
					else var fsgReceivedquantity='';
					
					if($scope.finalData11[i].fsgIssuedquantity!== undefined){
					var	fsgIssuedquantity= $scope.finalData11[i].fsgIssuedquantity;
					}
					else var fsgIssuedquantity='';
					if(fsgReceivedquantity==0){
                       // console.log(fsgReceivedquantity);
                        var nodeObj11 = {
						material: material,
						materialDescription: materialDescription,
						date: date,
						fsgReceivedquantity: "<font>"+fsgReceivedquantity+"</font>",
						fsgIssuedquantity: "<a href='javascript:void(0)' onclick='gotofsgIssuedLink(event,"+material+")'>"+fsgIssuedquantity+"</a>"
					}
                        }
                        else if(fsgIssuedquantity==0){
                        //console.log(fsgIssuedquantity);
                        var nodeObj11 = {
						material: material,
						materialDescription: materialDescription,
						date: date,
						fsgReceivedquantity: "<a href='javascript:void(0)' onclick='gotofsgReceivedLink(event,"+material+")'>"+fsgReceivedquantity+"</a>",
						fsgIssuedquantity: "<font>"+fsgIssuedquantity+"</font>"   
					}
                        
                    }else{
                        
                        var nodeObj11 = {
						material: material,
						materialDescription: materialDescription,
						date: date,
						fsgReceivedquantity: "<a href='javascript:void(0)' onclick='gotofsgReceivedLink(event,"+material+")'>"+fsgReceivedquantity+"</a>",
						fsgIssuedquantity: "<a href='javascript:void(0)' onclick='gotofsgIssuedLink(event,"+material+")'>"+fsgIssuedquantity+"</a>"
					}
                    }
					

					projectData11.details11.push(nodeObj11);
				}
															
					$scope.fsgDrilldownData = projectData11.details11;
    
                   
                    
	});
	
	//Export to Excel for FSG Operational  Trend Detailed Table Start
	
				$(function () {
				$("#inventoryImageFsgDrilldownData").click(function () {
					var JSONData = $scope.finalData11;					
					JSONData.forEach(function(obj){
							
							delete obj.issuedLocation;
								delete obj.location;
							
				}); 
					var ReportTitle = "FSG OPERATIONAL TREND DETAILED TABLE";
					var ShowLabel = true;
					var headerArray = {
						"material":"MATERIAL",
						"materialDescription":"MATERIAL DESCRIPTION",
						"fsgIssuedquantity":"FSG ISSUED",
						"fsgReceivedquantity":"FSG RECEIVED",
						"date":"DATE"					
					}
					EnvURLService.JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel,headerArray);
							
				});
			});
	
			//Export to Excel for FSG Operational trend Detailed Table End
	
    }
	/*
	if(document.getElementById("mytable_fsg")){
		document.getElementById("mytable_fsg").addEventListener("px-row-click", function(e) {
			
            
		  }
	}
	*/
        
        
        
	/*if(document.getElementById("mytable_fsg")){
		document.getElementById("mytable_fsg").addEventListener("px-row-click", function(e) {
			
            var clickedRow = e.detail.row;
			var material = e.detail.row.row.material;
			var date = e.detail.row.row.date;
			var reqInput = 'fsgReceived';
			$http.get('https://divtrendanalysis.run.aws-usw02-pr.ice.predix.io/getFSGLocSummary?material='+material+'&date='+date+'&reqInput='+reqInput).success(function(response) {	
				var fsgR_pudata = response;
					
				var projectData113 = {
							"details113": []
						}
					for (var i = 0; i < fsgR_pudata.length; i++){
					
					if(fsgR_pudata[i].date!== undefined){
					var	date=fsgR_pudata[i].date;
					}
					else var date='';
					
					if(fsgR_pudata[i].fsgReceivedquantity!== undefined){
					var	fsgReceivedquantity= fsgR_pudata[i].fsgReceivedquantity;
					}
					else var fsgReceivedquantity='';
					
					if(fsgR_pudata[i].location!== undefined){
					var	fsg = fsgR_pudata[i].location;
					}
					else var fsg='';
					
					var nodeObj113 = {
						date: date,
						Quantity:fsgReceivedquantity,
						fsgserved: fsg
					}

					projectData113.details113.push(nodeObj113);
				}
															
					$scope.fsgReceiveddrillData = projectData113.details113;			
			});			
			
			
          });
	}*/
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
