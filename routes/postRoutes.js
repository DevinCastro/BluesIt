const router = require('express').Router()
const { Post, User } = require('../models')
const passport = require('passport')

// GET all Posts
router.get('/posts', (req, res) => {
  Post.find()
    .populate('user')
    .then(posts => res.json(posts))
    .catch(err => console.log(err))
})

// POST one Post
router.post('/posts', passport.authenticate('jwt'), (req, res) => {
  Post.create({
    text: req.body.text,
    likes: req.body.likes,
    user: req.user._id
  })
    .then(post => {
      User.findByIdAndUpdate(post.user, { $push: { posts: post._id } })
        .then(() => res.json(post))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

router.post('/posts/bulk', passport.authenticate('jwt'), (req, res) => {
  const posts = req.body.map(post => ({
    ...post,
    user: req.user._id
  }))

  Post.create(posts)
    .then(posts => {
      const postIds = posts.map(post => post._id)
      User.findById(req.user._id)
        .then(user => {
          const allposts = [...user.posts, ...postIds]
          User.findByIdAndUpdate(req.user._id, { posts: allposts })
            .then(() => res.sendStatus(200))
            .catch(err => console.log(err))
        })
    })
})

// // PUT one post
// router.put('/posts/:id', passport.authenticate('jwt'), (req, res) => {
//   post.findByIdAndUpdate(req.params.id, req.body)
//     .then(() => res.sendStatus(200))
//     .catch(err => console.log(err))
// })

// DELETE one post
router.delete('/posts/:id', passport.authenticate('jwt'), (req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
})

module.exports = router