'use strict';

// Declare app level module which depends on filters, and services

var app = angular.module( 'myApp', [
    'ngRoute',

    'myApp.controllers',
    'myApp.filters',
    'myApp.services',
    'myApp.directives',

    // 3rd party dependencies
    'btford.socket-io',
    'fully-loaded'
] );

app.config( function ( $routeProvider, $locationProvider ) {
    $routeProvider.
    when( '/home', {
        templateUrl: 'partials/home',
        controller: 'HomeCtrl'
    } ).
    when( '/artist/:artistURI', {
        templateUrl: 'partials/artist',
        controller: 'ArtistCtrl'
    } ).
    when( '/album/:albumURI', {
        templateUrl: 'partials/album',
        controller: 'AlbumCtrl'
    } ).
    otherwise( {
        redirectTo: '/home'
    } );

    $locationProvider.html5Mode( true );
});
