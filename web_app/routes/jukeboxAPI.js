var sqlite3 = require('sqlite3');


var errorHandler = function ( err, res ) {
    console.log( err );
    res.send( 500 );
};


exports.addTrackToQueue = function ( req, res ) {

    var db = new sqlite3.Database( '../../jukebox.db' );

    var uri = req.body.uri;

    var sql = db.prepare( "INSERT INTO jukebox_song_queue VALUES (?, 0)" );
    try {
        sql.run( uri );
        sql.finalize();
    } catch ( e ) {
        return errorHandler( e, res );
    }
    db.close();
    return res.json( { track_added: uri } );

};
