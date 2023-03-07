const express =require('express')
const { default: mongoose } = require('mongoose')
const router = express.Router()
const bcrypt = require('bcrypt')
const userModel = require('./../model/userModel')

router.get('/signup', (req, res, next)=>{
    res.status(200).json({
        message: 'You get'
    })
})
router.post('/signup', (req, res ,next)=>{
    bcrypt.hash(req.body.email, 10 , (err, hash)=>{
        if(err){
            return res.status(500).json({
                error : err
            })
        }
    })
    const user = new userModel({
        _id :new mongoose.Types.ObjectId(),
        fristName : req.body.fristName,
        lastName : req.body.lastName,
        email: req.body.email,
        password: bcrypt.hash

    })

    user.save()
    then(result =>{
        res.status(200).json({
            message : 'You create account successful..',
        })
    })
    .catch(err =>{
        res.status(500).json({
            message : "You sign up not found!",
            error : err
        })
    })
    
})

module.exports = router