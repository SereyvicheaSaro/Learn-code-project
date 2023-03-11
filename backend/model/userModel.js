const mongoose = require('mongoose')

const userSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
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
    date_create:{
        type: Date,
        default: Date.now()
    }

})

module.exports = mongoose.model('user', userSchema)