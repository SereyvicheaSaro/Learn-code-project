const mongoose = require('mongoose')
const { Schema } = mongoose;
const flutterSchema =new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title : {
        type: String,
    },
    description: {
        type :String,
    },
    code:{
        tpye: String,
    },
    answer:{
        type :String,
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('lessonFluter', flutterSchema)