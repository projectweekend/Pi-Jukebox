'use strict';

/* Services */

var logError = function ( data ) {
    console.log( data );
};

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
                    logError( data );
                } );
        }
    };
} );

sModule.factory( 'SpotifyLookup', function ( $http ) {
    return {
        results: {},
        album: function ( albumURI ) {
            var self = this;
            var url = "/api/lookup?uri=" + albumURI + "&extras=trackdetail";
            $http.get( url ).
                success( function ( data, status ) {
                    self.results = data;
                } ).
                error( function ( data, status ) {
                    logError( data );
                } );
        },
        artist: function ( artistURI ) {
            var self = this;
            var url = "/api/lookup?uri=" + artistURI + "&extras=albumdetail";
            $http.get( url ).
                success( function ( data, status ) {
                    self.results = data;
                } ).
                error( function ( data, status ) {
                    logError( data );
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
                } ).
                error( function ( data, status ) {
                    logError( data );
                } );
        },
        listenForUpdates: function   () {
            var self = this;
            socket.on( 'track:added', function ( data ) {
                self.playQueue.push( data );
            } );
        },
        loadPlayQueue: function  () {
            var self = this;
            var url = "/api/jukebox";
            $http.get( url ).
                success( function ( data, status ) {
                    self.playQueue = data;
                } ).
                error( function ( data, status ) {
                    logError( data );
                } );
        },
        loadPlayHistory: function () {
            var self = this;
            var url = "/api/jukebox?has_played=1";
            $http.get( url ).
                success( function ( data, status ) {
                    self.playHistory = data;
                } ).
                error( function ( data, status ) {
                    logError( data );
                } );
        }
    };
} );

sModule.value( 'version', '0.1' );
