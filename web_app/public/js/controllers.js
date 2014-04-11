'use strict';

/* Controllers */

var cModule = angular.module( 'myApp.controllers', [] );

cModule.controller( 'AppCtrl', function ( $scope, socket ) {
    socket.on( 'send:name', function ( data ) {
        $scope.name = data.name;
    } );
} );

cModule.controller( 'HomeCtrl', function ( $scope, socket, SpotifySearch, Jukebox ) {

    $scope.SpotifySearch = SpotifySearch;
    $scope.search = function () {
        $scope.SpotifySearch.byTrack( $scope.searchInput );
    };
    $scope.Jukebox = Jukebox;
    $scope.Jukebox.listenForUpdates();
    
} );

cModule.controller( 'MyCtrl2', function ( $scope ) {
    // write Ctrl here
});
