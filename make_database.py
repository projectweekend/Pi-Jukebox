import sqlite3


CREATE_SONG_QUEUE = '''
CREATE TABLE IF NOT EXISTS 
jukebox_song_queue (
    spotify_uri TEXT
);
'''


if __name__ == '__main__':

    conn = sqlite3.connect('jukebox.db')
    cursor = conn.cursor()
    cursor.execute(CREATE_SONG_QUEUE)
    conn.commit()
    conn.close()
