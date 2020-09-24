const { model, Schema } = require('mongoose')

const Post = new Schema({
  text: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }]
}, { timestamps: true })

module.exports = model('Post', Post)
