import sqlite3


CREATE_SONG_QUEUE = '''
CREATE TABLE IF NOT EXISTS 
jukebox_song_queue (
    spotify_uri TEXT,
    has_played INTEGER DEFAULT 0,
    name TEXT,
    artist_name TEXT,
    artist_uri TEXT,
    artist_image TEXT,
    album_name TEXT,
    album_uri TEXT,
    album_image TEXT
);
'''


if __name__ == '__main__':

    conn = sqlite3.connect('jukebox.db')
    cursor = conn.cursor()
    cursor.execute(CREATE_SONG_QUEUE)
    conn.commit()
    conn.close()
