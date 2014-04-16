var SpotifySearch = require( 'spotify-metadata-search' ),
    LastfmAPI = require('lastfmapi'),
    async = require('async');


var errorHandler = function ( err, res ) {
    console.log( err );
    res.send( 500 );
};


var LastFM = new LastfmAPI({
    api_key : process.env.LAST_FM_KEY,
    secret : process.env.LAST_FM_SECRET
});


exports.byArtistURI = function ( req, res ) {

    var uri = req.query.uri;

    var search = SpotifySearch();
    search.lookup( uri, [ "albumdetail" ], function ( err, data ) {
        if ( err ) {
            return errorHandler( err, res );
        }
        // start building the output object
        var output = {
            name: data.artist.name,
            href: data.artist.href,
            albums: data.artist.albums
        };
        // Get more interesting data from other services
        var tasks = {
            lastFmArtist: function ( callback ) {
                var params = {
                    artist: data.artist.name
                };
                LastFM.artist.getInfo( params, function ( err, artist ) {
                    if ( err ) {
                        return callback( err );
                    }
                    callback( null, artist );
                } );
            }
        };
        async.parallel( tasks, function ( err, results ) {
            var biggestImage = results.lastFmArtist.image.pop();
            output.image = biggestImage['#text'];
            if ( err ) {
                return errorHandler( err, res );
            }
            return res.json( output );
        } );

    } );

};


exports.byURI = function ( req, res ) {

    var uri = req.query.uri;
    var extras = req.query.extras;

    if ( extras ) {
        extras = extras.split( "," );
    }

    var search = SpotifySearch();
    search.lookup( uri, extras, function ( err, data ) {
        if ( err ) {
            return errorHandler( err, res );
        }
        // start building the output object
        var output = {
            artist: {
                name: data.artist.name,
                href: data.artist.href
            }
        };

        // Get more interesting data from other services
        var tasks = {
            lastFmArtist: function ( callback ) {
                var params = {
                    artist: data.artist.name
                };
                LastFM.artist.getInfo( params, function ( err, artist ) {
                    if ( err ) {
                        return callback( err );
                    }
                    callback( null, artist );
                } );
            }
        };
        async.parallel( tasks, function ( err, results ) {
            output.artist.image = results.lastFmArtist.image[2]['#text'];
            if ( err ) {
                return errorHandler( err, res );
            }
            return res.json( output );
        } );

    } );

};
