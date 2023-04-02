const mongoose = require('mongoose')
const lessonJavaSchema = mongoose.Schema({
    _lessonJavaId: mongoose.Types.ObjectId,
    title:{
        type:String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    code: {
        type : String,
        required: String
    },
    answer:{
        type : String,
        required: true
    }
})

module.exports = mongoose.model('lessonJava', lessonJavaSchema)