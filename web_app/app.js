
/**
 * Module dependencies
 */

var express = require('express'),
  routes = require('./routes'),
  api = require('./routes/api'),
  http = require('http'),
  path = require('path'),
  spotifyAPI = require('./routes/spotifyAPI'),
  lookupAPI = require('./routes/lookupAPI'),
  jukeboxAPI = require('./routes/jukeboxAPI');

var app = module.exports = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);


// development only
if (app.get('env') === 'development') {
  app.use(express.errorHandler());
}

// production only
if (app.get('env') === 'production') {
  // TODO
}


/**
 * Routes
 */

// serve index and view partials
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

// JSON API
app.get('/api/search/tracks', spotifyAPI.trackSearch);
app.get('/api/search/albums', spotifyAPI.albumSearch);
app.get('/api/search/artists', spotifyAPI.artistSearch);
app.get('/api/lookup', lookupAPI.byURI);
app.get('/api/jukebox', jukeboxAPI.getTrackQueue);
app.post('/api/jukebox', jukeboxAPI.addTrackToQueue(io));

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

// Socket.io Communication
io.sockets.on('connection', require('./routes/socket'));

/**
 * Start Server
 */

server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
