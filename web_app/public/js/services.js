'use strict';

/* Services */

var sModule = angular.module( 'myApp.services', [] );

sModule.factory( 'socket', function ( socketFactory ) {
    return socketFactory();
} );

sModule.value( 'version', '0.1' );
