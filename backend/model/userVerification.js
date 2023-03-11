const mongoose = require('mongoose')
const userVerificatioinScheam = mongoose.Schema({
    userId: String,
    otp: String,
    createAt: Date,
    expiresAt: Date
})

module.exports = mongoose.model('userVerification', userVerificatioinScheam)