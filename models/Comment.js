const { model, Schema } = require('mongoose')

const Comment = new Schema({
  text: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: false
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }
}, { timestamps: true })

module.exports = model('Comment', Comment)