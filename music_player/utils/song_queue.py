import sqlite3


SELECT_QUERY = '''
SELECT ROWID, spotify_uri FROM jukebox_song_queue WHERE has_played <> 1 ORDER BY ROWID ASC LIMIT 1
'''

UPDATE_QUERY = '''
UPDATE jukebox_song_queue SET has_played = 1 WHERE ROWID=? and spotify_uri=?
'''


def select_song_uri(cursor):
    cursor.execute(SELECT_QUERY)
    return cursor.fetchone()


def get_song_uri():
    output = ''
    connection = sqlite3.connect('../jukebox.db')
    cursor = connection.cursor()
    result = select_song_uri(cursor)
    if result:
        cursor.execute(UPDATE_QUERY, result)
        output = result[1]
        connection.commit()
    connection.close()
    return output
