const fs = require('fs')

fs.readFile('../data/genre-info.json', 'utf8', function (err, data) {
  if (err) throw err;

  let genres = JSON.parse(data)

  genres.forEach((genre) => {
    fs.writeFile(`../data/genre-info/${genre.id}.json`, JSON.stringify(genre, null, 2), 'utf8')
  })
})