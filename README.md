![Logo](http://i.imgur.com/oQaK5uU.jpg)

This project contains the source code and data for the [Map of Metal website](https://mapofmetal.com) first launched in 2010. An interactive map of Metal history and the influential bands that helped shape the genres we know today.

### https://mapofmetal.com

## Contributing

To submit a bug report please visit https://github.com/patrickgalbraith/mapofmetal/issues/new

### Playlist Contributions

All playlists are stored in the [/data/genre-info/ directory](https://github.com/patrickgalbraith/mapofmetal/tree/data/data/genre-info).

Each genre is stored as a seperate `json` file with the following structure:

```js
{
  // Genre Title
  "title": "Heavy Metal",

  // Genre Description - May contain HTML
  "description": "Heavy metal (often referred to simply as metal)...",

  // List of tracks
  "tracklist": [
    {
      "artist": "Black Sabbath", // Track artist name
      "title": "Black Sabbath",  // Track name
      "year": "1970",            // Year released

      "videos": [                // List of YouTube video IDs
        "0lVdMbUx1_k",           // The ID can be found in the URL https://www.youtube.com/watch?v=[THIS BIT]
        "2KnyL4IFcwo",           // If a video fails to play the next video in the list is tried
        "qrVKmTPFYZ8"
      ]
    },
    // ...and so on
  ],

  // Genre ID
  "id": "heavymetal"
}
```

To make changes follow these instructions https://help.github.com/articles/editing-files-in-another-user-s-repository/.

> **Important**
> Before submitting any changes to a json data file make sure it is valid by pasting the contents into https://jsonlint.com/.

### Genre Suggestions

I am happy to receive suggestions for new genres however due to the amount of work involved I would expect at least the following to be provided.

 * Name of genre
 * Short description of genre or link to a description of the genre
 * Decade that genre began - 80s, 90s, 00s, etc...
 * List of tracks exemplifying the genre (at least 4, ideally 8-10)

Please be aware that adding a new genre to the map can take time as it requires making changes to the underlying map design.

## Installation

**Requirements**

```
NodeJS & NPM - https://nodejs.org
Gulp         - npm install -g gulp
```

**Install**
```
npm install
```

**Build**
```
gulp build
```

**Watch**
```
gulp watch
```

## License

Basically I am happy for you to use anything **except** for the images, design, and name (Map of Metal).

See the COPYRIGHT and associated LICENSE files for details.