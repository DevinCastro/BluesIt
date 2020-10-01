const router = require('express').Router()
const { User, Post, Comment } = require('../models')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const { Base64 } = require('js-base64')


// =================test
var fs = require('fs');
var path = require('path');
var { join } = require('path');
var multer = require('multer');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now())
  }
});

var upload = multer({ storage: storage }); 
// =================test

router.post('/users/register', upload.single('image'), (req, res, next ) => {
  let img = {
    data: fs.readFileSync(path.join(__dirname,'..','uploads',req.file.filename)),
    contentType: 'image/png'
  }
  const { name, username, email, password } = req.body
  User.register(new User({ name, email, username, img }), password, err => {
    if (err) { console.log(err) }
    res.sendStatus(200)
  })
})

router.post('/users/login', (req, res) => {
  const { username, password } = req.body
  User.authenticate()(username, password, (err, user) => {
    if (err) { console.log(err) }
    res.json(user ? jwt.sign({ id: user._id }, process.env.SECRET) : null)
  })
})

router.get('/users', passport.authenticate('jwt'), (req, res) => {
  res.json({
    ...req.user,
    img: { 
      contentType: req.user.img.contentType,
      data: Base64.fromUint8Array(new Uint8Array(req.user.img.data))
    }
  })
})


module.exports = router