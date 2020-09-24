const { model, Schema } = require('mongoose')

const User = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  genre: {
    type: String,
    required: false
  },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }]
}, { timestamps: true })

User.plugin(require('passport-local-mongoose'))

module.exports = model('User', User)
