var express = require('express')
var find = require('array-find');

var data = [
  {
    id: 'levels-avicii',
    title: 'Levels',
    artist: 'Avicii',
    album: 'true',
    year: '2011'
  },
  {
    id: 'hey-brother-avicii',
    title: 'Hey brother',
    artist: 'Avicii',
    album: 'true',
    year: '2011'
  },
  {
    id: 'broken-arrows-avicii',
    title: 'Broken arrows',
    artist: 'Avicii',
    album: 'true',
    year: '2011'
  },
  {
    id: 'wake-me-up-avicii',
    title: 'Wake me up',
    album: 'true',
    artist: 'Avicii',
    year: '2012'
  },
]

express()
  .use(express.static('static'))
  .set('view engine', 'ejs')
  .set('views', 'view')
  .get('/', allsongs)
  .get('/:id', singlesong)
  .use(notFound)
  .listen(1900)

function allsongs(req, res) {
  res.render('allsongs.ejs', {data: data})
}

function singlesong(req, res, next) {
  var id = req.params.id;
  var song = find(data, function (value) {
    return value.id === id
  })

  if (!song) {
    next()
    return
  }

  res.render('singlesong.ejs', {data: song})
}
function notFound(req, res) {
  res.status(404).render('not-found.ejs')
}
