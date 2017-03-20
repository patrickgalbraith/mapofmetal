const fs = require('fs')

fs.readFile('../data/genre-overlays.json', 'utf8', function (err, data) {
  if (err) throw err;

  const from = 'map-overlay__punkrock'

  let json = JSON.parse(data)
  let fromFound = false

  json = json.map((item) => {
    if (item.id === from) {
      fromFound = true
      return item
    }

    if (!fromFound)
      return item

    item.px = Math.round(item.px - (item.width / 2))
    item.py = Math.round(item.py - (item.height / 2))

    return item
  })

  fs.writeFile('../data/genre-overlays.json', JSON.stringify(json, null, 2), 'utf8')
})