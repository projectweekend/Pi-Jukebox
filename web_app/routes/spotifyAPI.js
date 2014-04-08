var SpotifySearch = require( 'spotify-metadata-search' );


var errorHandler = function ( err, res ) {
    console.log( err );
    res.send( 500 );
};


exports.trackSearch = function ( req, res ) {

    var q = req.query.q;
    var page = req.query.page;

    var search = SpotifySearch();
    search.track( q, page, function ( err, data ) {
        if ( err ) {
            return errorHandler( err, res );
        }
        return res.json( data );
    } );

};


exports.albumSearch = function ( req, res ) {

    var q = req.query.q;
    var page = req.query.page;

    var search = SpotifySearch();
    search.album( q, page, function ( err, data ) {
        if ( err ) {
            return errorHandler( err, res );
        }
        return res.json( data );
    } );

};


exports.artistSearch = function ( req, res ) {

    var q = req.query.q;
    var page = req.query.page;

    var search = SpotifySearch();
    search.artist( q, page, function ( err, data ) {
        if ( err ) {
            return errorHandler( err, res );
        }
        return res.json( data );
    } );

};
