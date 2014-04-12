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

    $scope.$watch( 'searchInput', function ( val ) {
        if ( !val || val.length === 0 ) {
            return 0;
        }
        setTimeout( function () {
            if ( val === $scope.searchInput ) {
                $scope.SpotifySearch.byTrack( $scope.searchInput );
            }
        }, 750 );
    } );

    $scope.Jukebox = Jukebox;
    $scope.Jukebox.listenForUpdates();
    
} );

cModule.controller( 'ArtistCtrl', function ( $scope, $routeParams, SpotifyLookup ) {

    $scope.artistURI = $routeParams.artistURI;

    $scope.SpotifyLookup = SpotifyLookup;
    $scope.SpotifyLookup.artist( $scope.artistURI );
    
});

cModule.controller( 'AlbumCtrl', function ( $scope, $routeParams, SpotifyLookup ) {
    
    $scope.albumURI = $routeParams.albumURI;
    
    $scope.SpotifyLookup = SpotifyLookup;
    $scope.SpotifyLookup.album( $scope.albumURI );

});
