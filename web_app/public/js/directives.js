'use strict';

/* Directives */

var dModule = angular.module( 'myApp.directives', [] );


dModule.directive( 'appVersion', function ( version ) {
    return function( scope, elm, attrs ) {
        elm.text( version );
    };
} );


dModule.directive( 'jukeboxTrack', function ( ) {
    return {
        restrict: 'E',
        scope: {
            data: "="
        },
        templateUrl: "",
        link: function ( scope, element, attrs ) {
        }
    };
} );



