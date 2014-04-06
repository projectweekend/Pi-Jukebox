import sqlite3


INSERT_SONG = '''
INSERT INTO jukebox_song_queue VALUES (?)
'''

TEST_URIS = [
    'spotify:track:68MToCqJRJvNW8tYoxDl5p',
    'spotify:track:0p1VSXFdkr71f0nO21IEyq',
    'spotify:track:7udJ4LFSIrRnySD3eI8lad'
]


if __name__ == '__main__':

    conn = sqlite3.connect('jukebox.db')
    cursor = conn.cursor()

    for uri in TEST_URIS:
        uri = (uri,)
        cursor.execute(INSERT_SONG, uri)
        conn.commit()

    conn.close()
