var sqlite3 = require('sqlite3');


var errorHandler = function ( err, res ) {
    console.log( err );
    res.send( 500 );
};

var db = new sqlite3.Database( '../jukebox.db' );


exports.getTrackQueue = function ( req, res ) {

    var sql = "SELECT * FROM jukebox_song_queue WHERE has_played = 0 ORDER BY ROWID ASC";
    if ( req.query.has_played === '1' ) {
        sql = "SELECT * FROM jukebox_song_queue WHERE has_played = 1 ORDER BY ROWID DESC";
    }
    db.all( sql, function ( err, data ) {
        if ( err ) {
            return errorHandler( err, res );
        }
        return res.json( data );
    } );

};


exports.addTrackToQueue = function ( req, res ) {

    var sql = "INSERT INTO jukebox_song_queue VALUES (?, 0)";
    db.run( sql, [ req.body.uri ], function ( err ) {
        if ( err ) {
            return errorHandler( err, res );
        }
        return res.json( { track_added: uri } );
    } );

};
