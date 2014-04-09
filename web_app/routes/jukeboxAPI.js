var sqlite3 = require('sqlite3'),
    SpotifySearch = require( 'spotify-metadata-search' );


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

    var search = SpotifySearch();
    search.lookup( req.body.uri, null, function ( err, data ) {
        if ( err ) {
            return errorHandler( err, res );
        }
        var trackInfo = {
            $uri: data.track.href,
            $name: data.track.name,
            $artist_name: data.track.artists[0].name,
            $artist_uri: data.track.artists[0].href,
            $album_name: data.track.album.name,
            $album_uri: data.track.album.href
        };

        var sql = "INSERT INTO jukebox_song_queue VALUES ($uri, 0, $name, $artist_name, $artist_uri, $album_name, $album_uri)";
        db.run( sql, trackInfo, function ( err ) {
            if ( err ) {
                return errorHandler( err, res );
            }
            return res.json( { track_added: trackInfo.$uri } );
        } );

    } );

};
