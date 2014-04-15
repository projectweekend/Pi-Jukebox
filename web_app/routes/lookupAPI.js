var SpotifySearch = require( 'spotify-metadata-search' ),
    LastfmAPI = require('lastfmapi');


var errorHandler = function ( err, res ) {
    console.log( err );
    res.send( 500 );
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
        return res.json( data );
    } );

};
