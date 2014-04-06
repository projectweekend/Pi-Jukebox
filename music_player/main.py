import os
import time
import threading
import spotify


USERNAME = os.getenv('SPOTIFY_USERNAME')
PASSWORD = os.getenv('SPOTIFY_PASSWORD')
TEST_TRACK_URI = 'spotify:track:5lB3bZKPhng9s4hKB1sSIe'

END_OF_TRACK = threading.Event()
LOGGED_IN = threading.Event()


def on_end_of_track():
    END_OF_TRACK.set()


def on_logged_in(session, error_type):
    assert error_type == spotify.ErrorType.OK, 'Login failed'
    LOGGED_IN.set()


if __name__ == '__main__':

    session = spotify.Session()

    loop = spotify.EventLoop(session)
    loop.start()

    spotify.AlsaSink(session)

    session.on(spotify.SessionEvent.LOGGED_IN, on_logged_in)
    session.on(spotify.SessionEvent.END_OF_TRACK, on_end_of_track)

    session.login(USERNAME, PASSWORD)
    LOGGED_IN.wait()

    # TODO: figure out why extra time is needed to finish session login...
    time.sleep(3)

    track = session.get_track(TEST_TRACK_URI)
    track.load()

    session.player.load(track)
    session.player.play()

    try:
        # keep things alive while track plays
        while not END_OF_TRACK.wait(0.1):
            pass
    # ctrl + c to exit
    except KeyboardInterrupt:
        pass
