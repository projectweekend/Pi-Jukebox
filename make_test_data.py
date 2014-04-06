import sqlite3


INSERT_SONG = '''
INSERT INTO jukebox_song_queue VALUES (?)
'''

TEST_URIS = [
    'spotify:track:5lB3bZKPhng9s4hKB1sSIe', 
    'spotify:track:5MSfgtOBZkbxlcwsI9XNpf',
    'spotify:track:1shuGbTnKx4AXjlx7IauM5'
]


if __name__ == '__main__':

    conn = sqlite3.connect('jukebox.db')
    cursor = conn.cursor()

    for uri in TEST_URIS:
        uri = (uri,)
        cursor.execute(INSERT_SONG, uri)

    conn.commit()
    conn.close()
