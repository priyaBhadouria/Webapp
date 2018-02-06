define(['angular', './sample-module'], function(angular, envmodule) {
    'use strict';

	
	envmodule.factory('EnvURLService', ['$q','$http', function($q,$http) {
		return{
			
			  
			config:function() {
				  var deferred = $q.defer();
				
				    var data = {
				    		
						'BLOBSTORE_SERVICE_URL':'https://dev-gecurrent-div-data-feed-services.run.aws-usw02-pr.ice.predix.io',					
						'DEV_DIV_SERVICE_URL':'https://dev-gecurrent-div-services.run.aws-usw02-pr.ice.predix.io',
						'BLOBSTORE_SERVICE_URL_EXCEL':'https://dev-gecurrent-div-blobstore-app.run.aws-usw02-pr.ice.predix.io',
						'SAP_UPLOAD_URL':'https://dev-gecurrent-div-data-feed-services.run.aws-usw02-pr.ice.predix.io'
					
					};
					if(data.length !== 0)
					{
						deferred.resolve(data);
						return data;
					}
					
				return deferred.promise;
				 
			},
			
			JSONToCSVConvertor:function(JSONData, ReportTitle, ShowLabel,headerArray) {
									//console.log('JSONData----'+JSONData);
							//If JSONData is not an object then JSON.parse will parse the JSON string in an Object
							var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

							var CSV = '';
							//Set Report title in first row or line

							CSV += ReportTitle + '\r\n\n';

							//This condition will generate the Label/Header
							if (ShowLabel) {
											var row = "";

											//This loop will extract the label from 1st index of on array
											for (var index in headerArray) {

															//Now convert each value to string and comma-seprated
															row += headerArray[index] + ',';
											}

											row = row.slice(0, -1);

											//append Label row with line break
											CSV += row + '\r\n';
							}

							//1st loop is to extract each row
							for (var i = 0; i < arrData.length; i++) {
											var row = "";

											//2nd loop will extract each column and convert it in string comma-seprated
											for (var index in arrData[i]) {
															//console.log(JSON.stringify(arrData[i]));
															row += '"' + arrData[i][index] + '",';
											}

											row.slice(0, row.length - 1);
											//// alert(row);
											//add a line break after each row
											CSV += row + '\r\n';
							}

							if (CSV == '') {
											//// alert("Invalid data");
											return;
							}

							//Generate a file name
							var fileName = "Report_";
							
					// For IE compatibility	 msieversion() function is used	
					function msieversion() {
						console.log('--ReportTitle   in msieversion----',ReportTitle);
						
						fileName += ReportTitle.replace(/ /g, "_");
					  var ua = window.navigator.userAgent;
					  var msie = ua.indexOf("MSIE ");
					  if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) // If Internet Explorer, return true
					  {
						return true;
					  } else { // If another browser,
					  return false;
					  }
					  return false;
					}
					
					
					
					var blob = new Blob([CSV], {type: 'text/csv'});
					//var filename1 =  $scope.getFileNameFromHttpResponse(CSV);
					if(window.navigator.msSaveOrOpenBlob) {
						
						fileName += ReportTitle.replace(/ /g, "_");
						window.navigator.msSaveBlob(blob, fileName+'.csv');
						
						console.log('--fileName   if block----',fileName);
					}
					else{
						fileName += ReportTitle.replace(/ /g, "_");
						var elem = window.document.createElement('a');
						elem.href = window.URL.createObjectURL(blob);
						elem.download = fileName+'.csv';
						
						console.log('--fileName   in else block----',fileName);
						document.body.appendChild(elem);
						elem.click();
						document.body.removeChild(elem);
					}
					
					
					
			}
			
		}
	}]);
});