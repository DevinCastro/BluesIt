const router = require('express').Router()
const { User, Post, Comment } = require('../models')
const passport = require('passport')
const jwt = require('jsonwebtoken')


// GET all users
// router.get('/users', (req, res) => {
//   User.find()
//     .populate('posts')
//     .then(users => res.json(users))
//     .catch(err => console.log(err))
// })

// // POST one user
// router.post('/users', (req, res) => {
//   User.create(req.body)
//     .then(user => res.json(user))
//     .catch(err => console.log(err))
// })


router.post('/users/register', (req, res) => {
  const { name, username, email, password } = req.body
  User.register(new User({ name, email, username }), password, err => {
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

router.get('/users/posts', passport.authenticate('jwt'), (req, res) => {
  res.json(req.user)
})



module.exports = router