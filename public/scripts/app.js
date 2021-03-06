/**
 * Load controllers, directives, filters, services before bootstrapping the application.
 * NOTE: These are named references that are defined inside of the config.js RequireJS configuration file.
 */
define([
    'jquery',
    'angular',
    'main',
    'routes',
    'interceptors',
    'px-datasource',
    'ng-bind-polymer',
	'ngMap',
	'highcharts-ng',
	'datePicker'
	
], function ($, angular) {
    'use strict';

    /**
     * Application definition
     * This is where the AngularJS application is defined and all application dependencies declared.
     * @type {module}
     */
    var predixApp = angular.module('predixApp', [
        'app.routes',
        'app.interceptors',
        'sample.module',
        'predix.datasource',
        'px.ngBindPolymer',
		'ngMap',
		'highcharts-ng',
		'datePicker'
    ]);

    /**
     * Main Controller
     * This controller is the top most level controller that allows for all
     * child controllers to access properties defined on the $rootScope.
     */
    predixApp.controller('MainCtrl', ['$scope', '$rootScope', 'PredixUserService', function ($scope, $rootScope, predixUserService) {

        //Global application object
        window.App = $rootScope.App = {
            version: '1.0',
            name: 'Predix Seed',
            session: {},
            tabs: [	
				{icon: 'fa-line-chart', state: 'inventory', label: 'Total Inventory'},
				{icon: 'fa-sitemap', state: 'inventory-drilldown', label: 'Network Visibility'},
				{icon: 'fa-th', state: 'fsg-overview', label: 'Consumption Rate'},				
				{icon: 'fa-reorder', state: 'inventory-transactions', label: 'Inventory Transactions'},				
				{icon: 'fa-database', state: '', label: 'File Processing', subitems: [
                    {icon: 'fa-file-excel-o',state: 'myBlobstore', label: 'File Upload'},
                    {state: 'fileLogs', label: 'File Logs'},
					{state: 'sapFileLogs', label: 'SAP File Logs'}
                ]},	
				{icon: 'fa-map-marker', state: 'heat-maps', label: 'Heat Map', subitems: [
                {state: 'googleMap', label: 'Map Drilldown'}]},
				{icon: 'fa-bolt', state: 'fsgtrend', label: 'Trend Analysis'},
					{icon: 'fa-bolt', state: 'contact', label: 'Contact Us'}
				]
        };

        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            if (angular.isObject(error) && angular.isString(error.code)) {
                switch (error.code) {
                    case 'UNAUTHORIZED':
                        //redirect
                        predixUserService.login(toState);
                        break;
                    default:
                        //go to other error state
                }
            }
            else {
                // unexpected error
            }
        });
    }]);


    //Set on window for debugging
    window.predixApp = predixApp;

    //Return the application  object
    return predixApp;
});
