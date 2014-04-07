'use strict';

/* Filters */

var fModule = angular.module( 'myApp.filters', [] );

fModule.filter( 'interpolate', function ( version ) {
    return function ( text ) {
        return String( text ).replace( /\%VERSION\%/mg, version );
    };
} );
