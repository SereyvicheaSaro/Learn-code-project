const express =require('express')
const mongoose = require('mongoose')
const router = express.Router()
const bcrypt = require('bcrypt')
const userModel = require('./../model/userModel')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const nodeemailer = require('nodemailer')

//sign up account

router.post('/signup', (req, res, next)=>{
    let { name , email , password } = req.body

    name = name.trim();
    email = email.trim();
    password = password.trim();


    if(name=="" || email == "" || password ==""){
        res.status(500).json({
            status: 'FAILED',
            message : 'Empty iniput fields'
        })
    }else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
        res.status(500).json({
            status: 'FAILED',
            message : 'Invalid email entered'
        })
    }else if(!/^[a-zA-Z ]*$/.test(name)){
        res.status(500).json({
            status: 'FAILED',
            message : 'Invalid name entered'
        })

    }else if(password.length < 8){
        res.status(500).json({
            status: 'FAILED',
            message : 'Invalid password'
        })
    }else{
        //cheack user already
        userModel.find({email})
        .then(result =>{
            if(result.length){
                //A user already exists
                res.status(500).json({
                    status: 'FAILED',
                    message: 'User with the provided email already exsits'
                })
            }else{
                //try to create new account

                bcrypt.hash(password, 10)
                .then(passwordHash =>{
                    const user = new userModel({
                        name,
                        email,
                        password : passwordHash,
                        isVerified: false,
        
                    })
                    user.save()
                    .then(result=>{
                        res.status(201).json({
                            status: 'SUCCESSFUL',
                            message: 'Create account done'
                        })
                    })
                    .catch(error =>{
                        console.log(error)
                        res.status(500).json({

                            status: 'FAILED',
                            message:  'An error ocurrend whild save user account passowrd',
                            err : error
                        })
                    })
                })
                .catch(error =>{
                    res.status(500).json({
                        status: 'FAILED',
                        message:  'An error ocurrend whild  passowrd',
                        err : error
                    })
                })
            }
        }).catch(err =>{
            res.status(500).json({
                status: 'FEILED',
                message: 'An error occurren while checking for existing user!',
                error: err
            })
        })
    }
})

const createToken = (id) =>{
    return jwt.sign({id}, JWT_SECRET)
}

router.post('/signin', (req, res,next)=>{
    let {email ,password} = req.body
    email = email.trim()
    password = password.trim()

    if(email =="" || password == "")
    {
        res.status(404).json({
            status: 'FALIED',
            message: 'Empty email or password'
        })
    }else{
        userModel.find({email})
        
        .then(result =>{
            if(result){
                //user exists
                const hashPassword = result[0].password
                bcrypt.compare(password, hashPassword)
                .then(data =>{
                    if(data){
                        res.status(200).json({
                            status: 'SUCCESSFUL',
                            message : 'Sign in successful..'

                        })
                    }else{
                        res.status(404).json({
                            status: 'FALIED',
                            message : 'Invaild password enter'
                        })
                    }
                })
                .catch(error =>{
                    res.status(500).json({
                        status: 'FALIED',
                        message: 'An error ocurred while comparing password',
                        error : error
                    })
                })
            }else{
                res.status(404).json(
                    {
                        status: 'FALIED',
                        message: 'Invaild credential enter'
                    }
                )
            }
        })
        .catch(err =>{
            res.status(404).json(
                {
                    status: 'FALIED',
                    message : 'An error ocurred while checking for existsing user ',
                    error : err
                }
            )
        })
    }
})


module.exports = router