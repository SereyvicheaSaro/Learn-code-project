const mongoose = require('mongoose')
const { Schema } = mongoose;
const cplusSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title : {
        type: String,
        required: true
    },
    description: {
        type :String,
        required: true
    },
    code:{
        type : String,
        required: true
    },
    answer:{
        type :String,
        required : true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('lessonCplus', cplusSchema)