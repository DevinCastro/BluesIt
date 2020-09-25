const router = require('express').Router()
const { Comment, Post, User } = require('../models')
const passport = require('passport')

// GET all Posts
router.get('/comments', (req, res) => {
  Comment.find()
    .populate('post')
    .populate('user')
    .then(comments => res.json(comments))
    .catch(err => console.log(err))
})

// POST one Post
router.post('/comments', passport.authenticate('jwt'), (req, res) => {
  Comment.create({
    text: req.body.text,
    // likes: req.body.likes,
    post: req.body.post,
    user: req.user._id
  })
    .then(comment => {
      Post.findByIdAndUpdate(comment.post, { $push: { comments: comment._id } })
        .then(() => res.json(comment))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

// router.post('/comments/bulk', passport.authenticate('jwt'), (req, res) => {
//   const comments = req.body.map(comment => ({
//     ...comment,
//     post: req.post._id
//   }))

//   Comment.create(comments)
//     .then(comments => {
//       const commentIds = comments.map(comment => comment._id)
//       Post.findById(req.post._id)
//         .then(post => {
//           const allcomments = [...post.comments, ...commentIds]
//           Post.findByIdAndUpdate(req.post._id, { comments: allcomments })
//             .then(() => res.sendStatus(200))
//             .catch(err => console.log(err))
//         })
//     })
// })

// // PUT one comment
// router.put('/comments/:id', passport.authenticate('jwt'), (req, res) => {
//   comment.findByIdAndUpdate(req.params.id, req.body)
//     .then(() => res.sendStatus(200))
//     .catch(err => console.log(err))
// })

// DELETE one post
router.delete('/comments/:id', passport.authenticate('jwt'), (req, res) => {
  Comment.findByIdAndDelete(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
})

module.exports = router