/**
 * Router Config
 * This is the router definition that defines all application routes.
 */
define(['angular', 'angular-ui-router'], function(angular) {
    'use strict';
    return angular.module('app.routes', ['ui.router']).config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

        //Turn on or off HTML5 mode which uses the # hash
        $locationProvider.html5Mode(true).hashPrefix('!');

        /**
         * Router paths
         * This is where the name of the route is matched to the controller and view template.
         */
        $stateProvider
		
            .state('secure', {
                template: '<ui-view/>',
                abstract: true,
                resolve: {
                    authenticated: ['$q', 'PredixUserService', function ($q, predixUserService) {
                        var deferred = $q.defer();
                        predixUserService.isAuthenticated().then(function(userInfo){
						
                            deferred.resolve(userInfo);
                        }, function(){
                            deferred.reject({code: 'UNAUTHORIZED'});
                        });
                        return deferred.promise;
                    }]
                }
            })
			.state('inventory', {
            parent: 'secure',
                url: '/inventory',
                templateUrl: 'views/inventory.html',
                controller: 'inventoryCtrl'
            })
            .state('inventory-drilldown', {
          parent: 'secure',
                url: '/inventory-drilldown',
                templateUrl: 'views/inventory-drilldown.html',
                controller: 'inventorydrillCtrl'
            })
			.state('fsg-overview', {
            parent: 'secure',
                url: '/fsg-overview',
                templateUrl: 'views/fsg-overview.html',
                controller: 'fsgCtrl'
            })
			.state('inventory-transactions', {
                url: '/inventory-transactions',
                templateUrl: 'views/inventory-transactions.html',
				controller: 'transactionsCtrl'			
            })
			.state('heat-maps', {
                url: '/heat-maps',
                templateUrl: 'views/heat-maps.html',
				controller: 'heatmapCtrl'
            })
			.state('googleMap', {
                url: '/googleMap',
                templateUrl: 'views/googleMap.html',
				controller: 'googleMapCtrl'
            })
			.state('fsgtrend', {
				 parent: 'secure',
				url: '/fsgtrend',
                templateUrl: 'views/fsgtrend.html',
				controller: 'fsgtrendCtrl'

            })
			.state('myBlobstore', {
		   parent: 'secure',
				url: '/myBlobstore',
                templateUrl: 'views/myBlobstore.html',
				controller: 'BlobCtrl'
				

            })
			.state('unauthorized', {
		parent: 'secure',
				url: '/unauthorized',
                templateUrl: 'views/unauthorized.html'
			//	controller: 'BlobCtrl'
				

            })
			
			.state('contact', {
		//parent: 'secure',
				url: '/contact',
                templateUrl: 'views/contact.html',
				controller: 'contactCtrl'
				

            })
			
			.state('fileLogs', {
			parent: 'secure',
				url: '/fileLogs',
                templateUrl: 'views/fileLogs.html',
				controller: 'FileLogsCtrl'
				

            }).state('sapFileLogs', {
			parent: 'secure',
				url: '/sapFileLogs',
                templateUrl: 'views/sapFileLogs.html',
				controller: 'SAPFileLogsCtrl'
				

            });
           
        $urlRouterProvider.otherwise(function ($injector) {
            var $state = $injector.get('$state');
            document.querySelector('px-app-nav').markSelected('/inventory');
            $state.go('inventory');
        });

    }]);
});
