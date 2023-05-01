const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type :String,
        required: true
    },
    email : {
        type: String,
        unique : true,
        required: true
    },

    password: {
        type: String,
        required: true
    },
    createAt:{
        type: Date,
        default: Date.now()
    },
    isVerified: Boolean


})

module.exports = mongoose.model('user', userSchema)