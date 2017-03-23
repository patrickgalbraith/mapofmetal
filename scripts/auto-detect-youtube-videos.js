const fs = require('fs')

require('isomorphic-fetch')

var arrayUnique = function(a) {
  return a.reduce(function(p, c) {
    if (p.indexOf(c) < 0) p.push(c)
    return p
  }, [])
}

function getSources(track, artist) {
  const url = `http://rageagain.loopback.link/youtube/get_sources.json?track_name=${encodeURIComponent(track)}&track_artist=${encodeURIComponent(artist)}`

  console.log(`Searching for "${track}" by "${artist}"`)

  return fetch(url)
    .then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server")
      }

      return response.json()
    })
    .then(function(json) {
      console.log(` - Found ${json.sources.length} sources`)
      return json.sources
    })
}

const parseTracks = (genres, progressFn, finalFn) => {
  const next = (genreIndex, trackIndex) => () => {
    const genre = genres[genreIndex]
    const track = genre.tracklist[trackIndex]

    // Remove unwanted title text
    let title = track.title.replace('[P] ', '')
                           .replace('(Live)', '')

    const doNext = () => {
      let nextGenreId = genreIndex
      let nextTrackId = trackIndex + 1

      if (nextTrackId >= genre.tracklist.length) {
        nextTrackId = 0
        nextGenreId = genreIndex + 1
      }

      if (nextGenreId >= genres.length) {
        finalFn(null, genres)
      } else {
        progressFn(null, next(nextGenreId, nextTrackId), track)
      }
    }

    getSources(title, track.artist).then((newSources) => {
      let sources = []

      const newSourceIds = newSources.map((source) => source.id)

      if (Array.isArray(track.videos)) {
        sources = track.videos.concat(newSourceIds)
      } else {
        sources = [track.videos].concat(newSourceIds)
      }

      genre.tracklist[trackIndex] = Object.assign({}, track, {
        videos: arrayUnique(sources)
      })

      doNext()
    })
    .catch(function(err) {
      console.log(' - Error ', err)
      doNext()
    })
  }

  next(0, 0)()
}

function run() {
  const sleep = 1000

  fs.readFile('../data/genre-info.json', 'utf8', function (err, data) {
    if (err)
      throw err

    let genreInfo = JSON.parse(data)

    parseTracks(genreInfo,
      // Progress fn
      (err, next, track) => {
        // Write file as it progresses
        fs.writeFile('../data/genre-info-updated-TEMP.json', JSON.stringify(genreInfo, null, 2), 'utf8')

        setTimeout(() => {
          next()
        }, sleep)
      },
      // Finish fn
      (err, genreInfo) => {
        fs.writeFile('../data/genre-info-updated.json', JSON.stringify(genreInfo, null, 2), 'utf8')
      })
  })
}

run()