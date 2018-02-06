/**
 * Configure copying tasks into dist version
 */
module.exports = {
    dist: {
        files: [
            {
                expand: true,
                cwd: 'public',
                src: [
                    'index.html',
                    'polymer-loader.vulcanized.html',
                    'images/*',
                    'sample-data/*',
                    'views/*',
                    'bower_components/webcomponentsjs/webcomponents-lite.js',
					'bower_components/webcomponentsjs/webcomponents-lite.min.js',
                    'bower_components/px/dist/px.min.js',
					'bower_components/px-data-table/aging-inventory-data.json',
					'bower_components/px-data-table/consumption-loc.json',
					'bower_components/px-data-table/movementdata.json',
					'bower_components/px-data-table/materialdata.json',
					'bower_components/px-data-table/fstrend.json',
					'bower_components/px-data-table/demandtrend.json',
					'bower_components/px-data-table/consumptionpop.json',
					'bower_components/px-data-table/returnpop.json',
					'bower_components/px-data-table/custtrend.json',
					'bower_components/px-data-table/custconsumption.json',
					'bower_components/px-data-table/contacts-mini-one.json',
					'bower_components/px-data-table/customer-data.json',
					'bower_components/px-data-table/customer-loc.json',
					'bower_components/px-data-table/customer-overview-data.json',
					'bower_components/px-data-table/custt-overview-data.json',
					'bower_components/px-data-table/dashboard.json',
					'bower_components/px-data-table/fscal-data.json',
					'bower_components/px-data-table/fsg-loc.json',
					'bower_components/px-data-table/fsg-overview-data.json',
					'bower_components/px-data-table/installation.json',
					'bower_components/px-data-table/in-transit-fsg.json',
					'bower_components/px-data-table/modal-data-fsg.json',
					'bower_components/px-data-table/performance-overview-data.json',
					'bower_components/px-data-table/received-fsg.json',
					'bower_components/px-data-table/shortage-overview-data.json',
					'bower_components/px-data-table/siteee-data.json',
					'bower_components/px-data-table/sitee-overview-data.json',
					'bower_components/px-data-table/supplier-overview-data.json',
					'bower_components/px-data-table/supp-overview-data.json',
					'bower_components/px-data-table/transit-overview-data.json',
					'bower_components/px-data-table/tree.json',
					'bower_components/px-data-table/threedata.json',
					'bower_components/px-data-table/demand.json',
					'bower_components/paper-typeahead/demo/pop/type.json',
					'bower_components/paper-typeahead/demo/pop/type1.json',
					'bower_components/paper-typeahead/demo/pop/type2.json',
					'bower_components/paper-typeahead/demo/pop/type3.json',
					'bower_components/paper-typeahead/demo/pop/type4.json',
					'bower_components/paper-typeahead/demo/pop/type5.json',
					'bower_components/paper-typeahead/demo/pop/type6.json',
					'bower_components/orgchart/ga.js',
					'bower_components/orgchart/jquery-1.11.3.min.js',
					'bower_components/orgchart/orgchart.js',
                    'bower_components/es6-promise/dist/es6-promise.min.js',
                    'bower_components/requirejs/require.js',
                    'bower_components/font-awesome/fonts/*',
					'stylesheet/jquerysctipttop.css',
					'stylesheet/orgchart.css',
                    'bower_components/px-typography-design/type/*',
					'bower_components/google-custom-marker/markerclusterer.js' 
                ],
                dest: 'dist/www/'
            }
        ]
    },
    serve: {
        files: [
            {
                expand: true,
                cwd: 'public',
                src: ['polymer-loader.html'],
                rename: function (src, dest) {
                    return 'public/polymer-loader.vulcanized.html';
                }
            }
        ]
    }
};
