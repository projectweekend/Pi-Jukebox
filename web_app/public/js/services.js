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

sModule.value( 'version', '0.1' );
