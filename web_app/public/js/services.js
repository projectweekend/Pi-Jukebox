'use strict';

/* Services */

var sModule = angular.module( 'myApp.services', [] );

sModule.factory( 'socket', function ( socketFactory ) {
    return socketFactory();
} );

sModule.factory( 'SpotifySearch', function ( $http ) {
    return {
        results: [],
        byTrack: function ( searchText ) {
            var self = this;
            var url = '/api/search/tracks?q=' + searchText;
            $http.get( url ).
                success( function ( data, status ) {
                    self.results = data.tracks;
                } ).
                error( function ( data, status ) {
                    console.log( data );
                } );
        }
    };
} );

sModule.factory( 'Jukebox', function ( $http, socket ) {
    return {
        playQueue: [],
        playHistory: [],
        play: function ( uri ) {
            var url = "/api/jukebox";
            var body = {
                uri: uri
            };
            $http.post( url, body ).
                success( function ( data, status ) {
                    console.log( "track added" );
                } ).
                error( function ( data, status ) {
                    console.log( data );
                } );
        },
        listenForUpdates: function   () {
            var self = this;
        },
        loadPlayQueue: function  () {
            var self = this;
        },
        loadPlayHistory: function () {
            var self = this;
        }
    };
} );

sModule.value( 'version', '0.1' );
