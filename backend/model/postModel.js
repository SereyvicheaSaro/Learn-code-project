const mongoose = require('mongoose')
const postSchema = mongoose.Schema({
    title:String,
    description: String,
    comment:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'comment'
        }
    ]
})

module.exports = mongoose.model('post', postSchema)