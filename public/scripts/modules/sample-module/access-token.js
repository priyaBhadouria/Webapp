define(['angular', './sample-module'], function(angular, module) {
    'use strict';

    module.factory('TokenService', ['$q', '$http', function($q, $http) {
 
        var getAuthToken = function(){  
                                                                   
            var deferred = $q.defer();
            var data = 'client_id=devgeCurrentEnterpriseEE&grant_type=client_credentials';
            var headersConfig = {
                headers : {
                    'content-Type' : 'application/x-www-form-urlencoded',
                    'authorization' : 'Basic ZGV2Z2VDdXJyZW50RW50ZXJwcmlzZUVFOmNsaWVudHBAc3N3QGQ='
				}
            };

           $http.post('https://3239cd0c-9cfd-4cae-b9dd-6d357421a6a2.predix-uaa.run.aws-usw02-pr.ice.predix.io/oauth/token',data,headersConfig)
                 .success(function(data){
				 var accessToken = data.access_token;
                var auth = 'bearer '+ accessToken;
				 var config = {
                        headers : {
                            'Authorization' : auth,
                            'Content-Type' : 'application/json',
                            'Predix-Zone-Id' : '0da112ff-f441-4362-ac52-c5bc1752e404'
                        }
                    };
					
					var postgresWSHeader =  accessToken;		 
						 
					var returnData = {
					 "config" : config,
					 "postgresWSHeader": postgresWSHeader
					
					};	 
							 deferred.resolve(returnData);
                       }).error(function(msg, code) {
                      deferred.reject(msg);
                                                 
                });                                                                                                                                 
                    return deferred.promise;                                                                                                               
                                                                                                                                                                                
                  }
			
			
            return {        
                    getToken:getAuthToken
                  }
                
    }]);
});
