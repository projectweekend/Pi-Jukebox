'use strict';

/* Controllers */

var cModule = angular.module( 'myApp.controllers', [] );

cModule.controller( 'AppCtrl', function ( $scope, socket ) {
    socket.on( 'send:name', function ( data ) {
        $scope.name = data.name;
    } );
} );

cModule.controller( 'MyCtrl1', function ( $scope, socket ) {
    socket.on( 'send:time', function ( data ) {
        $scope.time = data.time;
    } );
} );

cModule.controller( 'MyCtrl2', function ( $scope ) {
    // write Ctrl here
});
