var http = require( 'http' );


var errorHandler = function ( err, res ) {
    console.log( err );
    res.send( 500 );
};


exports.trackSearch = function ( req, res ) {

    var apiOptions = {
        hostname: "ws.spotify.com",
        path: "/search/1/track.json?q=" + req.query.q
    };

    var output = "";
    var jsonData = "";
    http.get( apiOptions, function ( spotifyResponse ) {
        spotifyResponse.on( 'data', function ( chunk ) {
            output += chunk;
        } );
        spotifyResponse.on( 'end', function () {
            try {
                jsonData = JSON.parse( output );
            } catch( e ) {
                return errorHandler( e, res );
            }
            res.json( jsonData );
        } );
    } );

};
