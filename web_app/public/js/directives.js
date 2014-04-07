'use strict';

/* Directives */

var dModule = angular.module( 'myApp.directives', [] );

dModule.directive( 'appVersion', function ( version ) {
    return function( scope, elm, attrs ) {
        elm.text( version );
    };
} );
