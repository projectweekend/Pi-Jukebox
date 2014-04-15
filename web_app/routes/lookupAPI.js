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
            lastFmArtistInfo: function ( callback ) {
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
            output.artist.image = results.lastFmArtistInfo.image[2]['#text'];
            if ( err ) {
                return errorHandler( err, res );
            }
            return res.json( output );
        } );

    } );

};
