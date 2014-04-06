import os
import time
import threading
import spotify

import utils


USERNAME = os.getenv('SPOTIFY_USERNAME')
PASSWORD = os.getenv('SPOTIFY_PASSWORD')


class JukeBox(object):

    def __init__(self, username, password):
        self._session = spotify.Session()
        self._loop = spotify.EventLoop(self._session)
        self._loop.start()
        self._audio = spotify.AlsaSink(self._session)
        self._current_track = None
        self._next_track = None
        self._end_of_track = threading.Event()
        self._logged_in = threading.Event()
        self._register_session_events()
        self._login(username, password)
        self._load_tracks()

    def _register_session_events(self):
        self._session.on(spotify.SessionEvent.LOGGED_IN, self._on_logged_in)
        self._session.on(spotify.SessionEvent.END_OF_TRACK, self._on_end_of_track)

    def _login(self, username, password):
        self._session.login(username, password)
        self._logged_in.wait()
        time.sleep(1)

    def _on_logged_in(self, session, error_type):
        assert error_type == spotify.ErrorType.OK, 'Login failed'
        self._logged_in.set()

    def _on_end_of_track(self):
        self._end_of_track.set()

    def _load_tracks(self):
        # first time both are empty
        if self._current_track == None and self._next_track == None:
            spotify_uri = utils.get_song_uri()
            if spotify_uri:
                self._current_track = self._session.get_track(spotify_uri)
                self._current_track.load()
            spotify_uri = utils.get_song_uri()
            if spotify_uri:
                self._next_track = self._session.get_track(spotify_uri)
                self._next_track.load()
        if self._current_track == None and self._next_track != None:
            self._current_track = self._next_track
            self._next_track = None
            spotify_uri = utils.get_song_uri()
            if spotify_uri:
                self._next_track = self._session.get_track(spotify_uri)
                self._next_track.load()

    def on(self):
        while True:
            if self._current_track != None:
                self._session.player.load(self._current_track)
                self._session.player.play()
                self._current_track = None
                while not self._end_of_track.wait(0.1):
                    pass
                self._load_tracks()


if __name__ == '__main__':

    jukebox = JukeBox(USERNAME, PASSWORD)
    try:
        jukebox.on()
    # ctrl + c to exit
    except KeyboardInterrupt:
        pass
