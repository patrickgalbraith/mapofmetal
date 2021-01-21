const fs   = require('fs')
const path = require('path')

const DATA_DIR = path.resolve(__dirname, '../data')

const processFiles = (filenames, progressFn, finishFn) => {
  let genres = []

  const next = (index) => () => {
    const filename = filenames[index]

    fs.readFile(DATA_DIR + '/genre-info/' + filename, 'utf8', function (err, data) {
      //console.log('Parsing', filename)
      let genre = JSON.parse(data)

      genres.push(genre)

      if (index + 1 < filenames.length)
        progressFn(null, next(index + 1), genre)
      else
        finishFn(null, genres)
    })
  }

  next(0)()
}

function run(cb) {
  fs.readdir(DATA_DIR + '/genre-info/', (err, filenames) => {
    processFiles(filenames,
      // Progress Fn
      (err, next, genre) => {
        //console.log('Added genre', genre.id)
        next()
      },
      // Finish Fn
      (err, genres) => {
        fs.writeFile(DATA_DIR + '/genre-info.json', JSON.stringify(genres, null, 2), 'utf8', cb)
      })
  })
}

// If called directly then run
if (require.main === module) {
  run(() => {})
}

module.exports = run