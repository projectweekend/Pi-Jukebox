'use strict';

/* Services */

var logError = function ( data ) {
    console.log( data );
};


var sModule = angular.module( 'myApp.services', [ 'ngSanitize' ] );


sModule.factory( 'socket', function ( socketFactory ) {
    return socketFactory();
} );


sModule.factory( 'SpotifySearch', function ( $http ) {
    return {
        results: [],
        status: {
            loading: false,
            error: false
        },
        byTrack: function ( searchText ) {

            var self = this;
            var url = '/api/search/tracks?q=' + searchText;

            self.status.loading = true;
            $http.get( url ).
                success( function ( data, status ) {
                    self.results = [];
                    data.tracks.forEach( function ( element, index, array ) {
                        var territories = element.album.availability.territories;
                        if ( territories.indexOf( 'US' ) != -1 ) {
                            self.results.push( element );
                        }
                    } );
                    self.status.loading = false;
                    self.status.error = false;
                } ).
                error( function ( data, status ) {
                    logError( data );
                    self.status.loading = false;
                    self.status.error = true;
                } );

        }
    };
} );


sModule.factory( 'SpotifyLookup', function ( $http ) {
    return {
        results: {},
        status: {
            loading: false,
            error: false
        },
        album: function ( albumURI ) {
            var self = this;
            var url = "/api/lookup?uri=" + albumURI + "&extras=trackdetail";

            self.status.loading = true;
            $http.get( url ).
                success( function ( data, status ) {
                    self.results = data.album;
                    self.status.loading = false;
                    self.status.error = false;
                } ).
                error( function ( data, status ) {
                    logError( data );
                } );
        },
        artist: function ( artistURI ) {
            var self = this;
            var url = "/api/lookup/artist?uri=" + artistURI;

            self.status.loading = true;
            $http.get( url ).
                success( function ( data, status ) {
                    self.results = data;
                    self.results.albumsUS = [];
                    data.albums.forEach( function ( element, index, array ) {
                        var territories = element.album.availability.territories;
                        if ( territories.indexOf( 'US' ) != -1 ) {
                            self.results.albumsUS.push( element );
                        }
                    } );
                    self.status.loading = false;
                    self.status.error = false;
                } ).
                error( function ( data, status ) {
                    logError( data );
                    self.status.loading = false;
                    self.status.error = true;                    
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
