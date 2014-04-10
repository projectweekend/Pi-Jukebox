Pi-Jukebox
==========

A Raspberry Pi jukebox powered by Spotify

## Jukebox API

### Spotify Track Search

**GET:** `/api/search/tracks`

**Parameters:**

* `q`: Search string (required)
* `page`: The page of the result set to return (optional - defaults to 1)

**Response:**

```
{
    "info": {
        "num_results": 985,
        "limit": 100,
        "offset": 0,
        "query": "alice in chains",
        "type": "track",
        "page": 1
    },
    "tracks": [
        {
            "album": {
                "released": "2006",
                "href": "spotify:album:55t6oH9P2Rf92NQtAm1euu",
                "name": "The Essential Alice In Chains",
                "availability": {
                    "territories": "TW US"
                }
            },
            "name": "Man In The Box",
            "popularity": "0.61",
            "external-ids": [
                {
                    "type": "isrc",
                    "id": "USSM19000727"
                }
            ],
            "length": 286.706,
            "href": "spotify:track:6PvpKM4BW48ic8cbM4Vxcg",
            "artists": [
                {
                    "href": "spotify:artist:64tNsm6TnZe2zpcMVMOoHL",
                    "name": "Alice In Chains"
                }
            ],
            "track-number": "2"
        },
        {
            "album": {
                "released": "1996",
                "href": "spotify:album:5PdgIAHzwDvTZRjIGSQGtN",
                "name": "Unplugged",
                "availability": {
                    "territories": "AD AR AT AU BE BG BO BR CA CH CL CO CR CY CZ DE DK DO EC EE ES FI FR GB GR GT HK HN HR HU IE IS IT LI LT LU LV MC MT MX MY NI NL NO NZ PA PE PH PL PT PY RO SE SG SI SK SV TR TW US UY"
                }
            },
            "name": "Down In A Hole",
            "popularity": "0.63",
            "external-ids": [
                {
                    "type": "isrc",
                    "id": "USSM19601543"
                }
            ],
            "length": 346.026,
            "href": "spotify:track:2yBAPa9HZj3P2szSaaj4k1",
            "artists": [
                {
                    "href": "spotify:artist:64tNsm6TnZe2zpcMVMOoHL",
                    "name": "Alice In Chains"
                }
            ],
            "track-number": "5"
        },
        ...
    ]
}
```

### Spotify Album Search

**GET:**  `/api/search/albums`

**Parameters:**

* `q`: Search string (required)
* `page`: The page of the result set to return (optional - defaults to 1) 

**Response:**

```
{
    "info": {
        "num_results": 125,
        "limit": 100,
        "offset": 0,
        "query": "alice in chains",
        "type": "album",
        "page": 1
    },
    "albums": [
        {
            "name": "The Essential Alice In Chains",
            "popularity": "0.66",
            "external-ids": [
                {
                    "type": "upc",
                    "id": "888880166524"
                }
            ],
            "href": "spotify:album:55t6oH9P2Rf92NQtAm1euu",
            "artists": [
                {
                    "href": "spotify:artist:64tNsm6TnZe2zpcMVMOoHL",
                    "name": "Alice In Chains"
                }
            ],
            "availability": {
                "territories": "TW US"
            }
        },
        {
            "name": "Dirt",
            "popularity": "0.69",
            "external-ids": [
                {
                    "type": "upc",
                    "id": "074645247526"
                }
            ],
            "href": "spotify:album:58NXIEYqmq5dQHg9nV9duM",
            "artists": [
                {
                    "href": "spotify:artist:64tNsm6TnZe2zpcMVMOoHL",
                    "name": "Alice In Chains"
                }
            ],
            "availability": {
                "territories": "AD AR AT AU BE BG BO BR CA CH CL CO CR CY CZ DE DK DO EC EE ES FI FR GB GR GT HK HN HR HU IE IS IT LI LT LU LV MC MT MX MY NI NL NO NZ PA PE PH PL PT PY RO SE SG SI SK SV TR TW US UY"
            }
        },
        ...
    ]
}
```

### Spotify Artist Search

**GET:**  `/api/search/artists`

**Parameters:**

* `q`: Search string (required)
* `page`: The page of the result set to return (optional - defaults to 1) 

**Response:**

```
{
    "info": {
        "num_results": 1,
        "limit": 100,
        "offset": 0,
        "query": "alice in chains",
        "type": "artist",
        "page": 1
    },
    "artists": [
        {
            "href": "spotify:artist:64tNsm6TnZe2zpcMVMOoHL",
            "name": "Alice In Chains",
            "popularity": "0.58"
        }
    ]
}
```

### Jukebox Play Queue

**GET:** `/api/jukebox`

**Parameters:**

* `has_played`: Set this equal to 1 to get tracks that **have been played**. If not used then the results will be tracks that **have not been played**, sorted in the order they will be played. (optional)

**Response:**

```
[
    {
        "spotify_uri": "spotify:track:1lCC3flXDsXQrNPcvDojuI",
        "has_played": 0,
        "name": "Vietnow",
        "artist_name": "Rage Against The Machine",
        "artist_uri": "spotify:artist:2d0hyoQ5ynDBnkvAbJKORj",
        "album_name": "Evil Empire",
        "album_uri": "spotify:album:24E6rDvGDuYFjlGewp4ntF"
    },
    {
        "spotify_uri": "spotify:track:6y1I8cGzw6KWy2zPA572Jq",
        "has_played": 0,
        "name": "Lady Picture Show",
        "artist_name": "Stone Temple Pilots",
        "artist_uri": "spotify:artist:2UazAtjfzqBF0Nho2awK4z",
        "album_name": "Tiny Music...Songs From The Vatican Gift Shop",
        "album_uri": "spotify:album:2JJEIN6LvQJQTJDfnYdDAe"
    }
]
```

### Add To Jukebox Play Queue

**POST:** `/api/jukebox`

**Payload:**

```
{
    "uri": "spotify:track:7yX8ayPTlR5kjECfCyS7ZN"
}
```

**Response:**
```
{
    "track_added": "spotify:track:7yX8ayPTlR5kjECfCyS7ZN"
}
```

### Play Queue Updates Socket

**Socket On:** `'track:added'`

**Data:**

```
{
    $uri: "spotify:track:6y1I8cGzw6KWy2zPA572Jq",
    $name: "Lady Picture Show",
    $artist_name: "Stone Temple Pilots",
    $artist_uri: "spotify:artist:2UazAtjfzqBF0Nho2awK4z",
    $album_name: "Tiny Music...Songs From The Vatican Gift Shop",
    $album_uri: "spotify:album:2JJEIN6LvQJQTJDfnYdDAe"
}
```

**AngularJS Controller Example:**
```
cModule.controller( 'MyCtrl1', function ( $scope, socket ) {
    socket.on( 'track:added', function ( data ) {
        $scope.myPlayQueue.push( data );
    } );
} );
```
