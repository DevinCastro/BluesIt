const { model, Schema } = require('mongoose')

const Comment = new Schema({
  text: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    required: true
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  },
  user: {
  type: Schema.Types.ObjectId,
  ref: 'User'
}
}, { timestamps: true })

module.exports = model('Comment', Comment)