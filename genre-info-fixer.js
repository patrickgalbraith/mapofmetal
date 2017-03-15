const fs = require('fs')

fs.readFile('./data/genre-info-utf8.json', 'utf8', function (err, data) {
  if (err) throw err;

  const json = JSON.parse(data)

  json.forEach((item) => {
    item.tracklist = item.tracklist.track
  })

  fs.writeFile('./data/genre-info-v2.json', JSON.stringify(json, null, 2), 'utf8')
});