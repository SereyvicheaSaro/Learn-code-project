const mongoose = require('mongoose')
const cprogrammingSchema = mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    description: {
        type :String,
        required: true
    },
    code:{
        tpye: String,
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

module.exports = mongoose.model('lessonFluter', cprogrammingSchema)