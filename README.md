Pi-Jukebox
==========

A Raspberry Pi jukebox powered by Spotify

## Jukebox API

### Spotify Track Search

**GET: ** `/api/search/spotify/track`

**Parameters: **

* `q`: Search string (required)
* `page`: The page of the result set to return (optional - defaults to 1)

**Response: **

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

**GET: **  `/api/search/spotify/album`

**Parameters: **

* `q`: Search string (required)
* `page`: The page of the result set to return (optional - defaults to 1) 

**Response: **

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

**GET: **  `/api/search/spotify/artist`

**Parameters: **

* `q`: Search string (required)
* `page`: The page of the result set to return (optional - defaults to 1) 

**Response: **

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
