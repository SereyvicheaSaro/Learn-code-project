const express =require('express')
const { default: mongoose } = require('mongoose')
const router = express.Router()
const bcrypt = require('bcrypt')
const userModel = require('./../model/userModel')
router.post('/signUp', (req, res ,next)=>{
    bcrypt.hash(req.body.email, 10 , (err, hash)=>{
        if(err){
            return res.status(500).json({
                error : err
            })
        }
    })
    const user = new userModel({
        _id : mongoose.Types.ObjectId(),
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email: req.body.email,
        password: 

    })
})

module.exports = router