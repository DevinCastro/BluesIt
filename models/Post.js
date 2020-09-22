const { model, Schema } = require('mongoose')

const Post = new Schema({
    text: {
        type: String,
        required: true
    },
    likes: {
        
    }
}, { timestamps: true })


module.exports = model('Post', Post)