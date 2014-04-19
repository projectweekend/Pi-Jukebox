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
            // artist profile image
            var biggestImage = results.lastFmArtist.image.pop();
            output.image = biggestImage['#text'];
            // 
            output.bio = results.lastFmArtist.bio.summary;
            if ( err ) {
                return errorHandler( err, res );
            }
            return res.json( output );
        } );

    } );

};


exports.byAlbumURI = function ( req, res ) {

    var uri = req.query.uri;

    var search = SpotifySearch();
    search.lookup( uri, [ "track" ], function ( err, data ) {
        if ( err ) {
            return errorHandler( err, res );
        }
        // start building the output object
        var output = {
            name: data.album.name,
            href: data.album.href,
            artist: {
                name: data.album.artist,
                href: data.album["artist-id"]
            },
            tracks: data.album.tracks
        };
        var tasks = {
            lastFmAlbum: function ( callback ) {
                var params = {
                    artist: data.album.artist,
                    album: data.album.name
                };
                LastFM.album.getInfo( params, function ( err, album ) {
                    if ( err ) {
                        return callback( err );
                    }
                    callback( null, album );
                } );
            }
        };
        async.parallel( tasks, function ( err, results ) {
            if ( err ) {
                return errorHandler( err, res );
            }
            var biggestImage = results.lastFmAlbum.image.pop();
            output.image = biggestImage["#text"];
            output.released = results.lastFmAlbum.releasedate;
            output.wiki = results.lastFmAlbum.wiki.content;
            return res.json( output );
        } );
    } );

};
