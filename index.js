var express = require('express');
var find = require('array-find');
var slug = require('slug');
var bodyParser = require('body-parser');
var multer = require('multer');
var mongo = require('mongodb');
var argon2 = require('argon2');
var session = require('express-session');

var uploadAlbumcover = multer({dest: 'static/upload-albumcover'})
var uploadProfilePhoto = multer({dest: 'static/upload-profilephoto'})

require('dotenv').config()

var db = null
var url = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT

mongo.MongoClient.connect(url, function (err, client) {
  if (err) throw err
  db = client.db(process.env.DB_NAME)
})



express()
  .use(express.static('static'))
  .use(bodyParser.urlencoded({
    extended: true
  }))
  .use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET
  }))

  .set('view engine', 'ejs')
  .set('views', 'view')
  .get('/', allsongs)
  .get('/profile/:username', profile)
  .get('/add-song', addform)
  .post('/', uploadAlbumcover.single('albumcover'), addsong)
  .get('/sign-up', signupform)
  .post('/sign-up', uploadProfilePhoto.single('profilephoto'), signup)
  .get('/log-in', loginForm)
  .post('/log-in', login)
  .get('/:id', singlesong)
  .delete('/:id', removesong)
  .use(notFound)
  .listen(1900)

function allsongs(req, res, next) {
  db.collection('music').find().toArray(done)

  function done(err, data) {
    if (err) {
      next(err)
    } else {
      res.render('allsongs.ejs', {
        data: data,
        user: req.session.user
      })
    }
  }
}

function singlesong(req, res, next) {
  var id = req.params.id;

  db.collection('music').findOne({
    _id: mongo.ObjectID(id)
  }, done)

  function done(err, data) {
    if (err) {
      next(err)
    } else {
      res.render('singlesong.ejs', {data: data})
    }
  }
}

function addform(req, res) {
  if (req.session.user) {
   res.render('addmusic.ejs')
 } else {
   res.status(401).send('Credentials required')
 }
}

function addsong(req, res, next) {
  if (!req.session.user) {
    res.status(401).send('Credentials required')
    return
  }

  var id = req.params.id;

  db.collection('music').insertOne({
    id: id,
    songTitle: req.body.title,
    songArtist: req.body.artist,
    songAlbum: req.body.album,
    songYear: req.body.year,
    songDuration: req.body.duration,
    songReleaseDate: req.body.song_releasedate,
    songAlbumcover: req.file ? req.file.filename : null
  }, done)

  function done(err, data) {
    if (err) {
      next(err)
    } else {
      res.redirect('/' + data.insertedId)
    }
  }
}

function removesong(req, res, next) {
  if (!req.session.user) {
    res.status(401).send('Credentials required')
    return
  }

  var id = req.params.id
  db.collection('music').deleteOne({
    _id: mongo.ObjectID(id)
  }, done)

  function done(err) {
    if (err) {
      next(err)
    } else {
      res.json({status: 'ok'})
    }
  }
}

function signupform(req, res, next) {
  res.render('sign-up.ejs')
}

function signup(req, res, next) {

  var username = req.body.username;
  var password = req.body.password;

  db.collection('users').findOne({
    username: username
  }, done)

  function done(err, data) {
    if (err) {
      next(err)
    } else if (data) {
      res.status(409).send('Username already in use')
    } else {
      argon2.hash(password).then(onhash, next)
    }
  }

  function onhash(hash) {
    db.collection('users').insertOne({
      username: req.body.username,
      hash: hash,
      firstname: req.body.firstname,
      additionalname: req.body ? req.body.additional_name : null,
      surname: req.body.surname,
      birthday: req.body.birthday,
      profilephoto: req.file ? req.file.filename : null
    }, oninsert)
    function oninsert(err) {
      if (err) {
        next(err)
      } else {
        req.session.user = {
          username: username
        }
        res.redirect('/profile/' + username)
      }
    }
  }
}

function profile(req, res, next) {
  var username = req.params.username;

  db.collection('users').findOne({
    username: username
  }, done)

  function done(err, data) {
    if (err) {
      next(err)
    } else {
      res.render('profile.ejs', {data: data})
    }
  }
}

function loginForm(req, res, next) {
  res.render('log-in.ejs')
}

function login(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  if (!username || !password) {
    res.status(400).send('Username or password are missing')
    return
  }
  //
  db.collection('users').findOne({
    username: username
  }, done)

  function done(err, data) {

    if (err) {
      next(err)
    } else if (data) {
      argon2.verify(data.hash, password).then(onverify, next)
    } else {
      res.status(401).send('Username does not exist')
    }
    function onverify(match) {
      if (match) {
        req.session.user = {
          username: user.username
        };
        res.redirect('/')
      } else {
        res.status(401).send('Password incorrect')
      }
    }
  }
}





function notFound(req, res) {
  res.status(404).render('not-found.ejs')
}
