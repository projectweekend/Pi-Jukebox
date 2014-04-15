var SpotifySearch = require( 'spotify-metadata-search' ),
    LastfmAPI = require('lastfmapi');


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

        // Get more interesting data from lastFM
        // TODO: use Async library here to make calls to external services
        // LastFM.artist.getInfo();

        return res.json( data );
    } );

};
