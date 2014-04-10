/*
 * Serve content over a socket
 */

module.exports = function (socket) {
    socket.emit('send:track:added', {
        trackData: trackData
    });
};
