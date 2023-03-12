const mongoose = require('mongoose')
const commentSchema = mongoose.Schema({
    author: String,
    comment: String
})

module.exports = mongoose.model('comment', commentSchema)