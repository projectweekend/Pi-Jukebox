import sqlite3


SELECT_QUERY = '''
SELECT spotify_uri FROM jukebox_song_queue ORDER BY ROWID ASC LIMIT 1
'''

DELETE_QUERY = '''
DELETE FROM jukebox_song_queue WHERE spotify_uri=?
'''


def get_song():
    output = ''
    connection = sqlite3.connect('jukebox.db')
    cursor = connection.cursor()
    cursor.execute(SELECT_QUERY)
    result = cursor.fetchone()
    if result:
        cursor.execute(DELETE_QUERY, result)
        output = result[0]
        connection.commit()
    connection.close()
    return output
