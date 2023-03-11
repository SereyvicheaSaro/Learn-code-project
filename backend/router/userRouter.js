const express =require('express')
const mongoose = require('mongoose')
const router = express.Router()
const bcrypt = require('bcrypt')
const userModel = require('./../model/userModel')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const nodeemailer = require('nodemailer')
const path = require('path')
const userVerification = require('./../model/userVerification')
//sign up account

const {v4: uuidv4} = require('uuid')
let transporter = nodeemailer.createTransport({
    service: 'gmail',
    auth:{
        user: 'kl195070@gmail.com',
        pass: 'ojbxvksxcuasigqp'
    }
})
transporter.verify((error , successful)=>{
    if(error){
        console.log(error)
    }else{
        console.log('Readt for message')
        console.log(successful)
    }
})

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
                        //send otp you email
                        sendOTPverificationEmail(result, res)
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



const sendOTPverificationEmail = async({_id, email}, res)=>{
    try{
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`
        const mailOption = {
            from:  'kl195070@gmail.com',
            to: email,
            subject: 'Verify your email',
            html: 
            `
            <p>Enter ${otp} in the app to verify your email address and complete</p>
            <p>This code <b>expires in 1 hour</b>. </p>
            `


        }
        const saltRounds = 10
        const hashedOTP = await bcrypt.hash(otp, saltRounds)
        const newOTPverification = await userVerification({
            userId: _id,
            otp: hashedOTP,
            createAt: Date.now(),
            expiresAt : Date.now() + 3600000
        })
        //save otp record

        await newOTPverification.save()
        await transporter.sendMail(mailOption)
        res.json({
            status: 'PENDING',
            message: 'Verificaiton otp email send',
            data :{
                userId: _id,
                email
            }
        })
        .then()
        .catch(error=>{
            console.log(error)
            res.status(500).json(
                {
                    status: 'FALIED',
                    message: error.message
                }
            )

        })

    }catch(error){
        console.log(error)
    }
}


router.post('/verify', async(req, res)=>{
    try{
        let {userId , otp} = req.body
        if(!userId || !otp){
            throw Error('Empty otp detail are not allowed')
        }else{
            const userVerificationRecords = await userVerification.find({
                userId
            })
            if(userVerificationRecords.length <=0){
                throw new Error("Account record does't exist or has been verified already. Please sign up or login")
            }else{
                const {expiresAt} = userVerificationRecords[0].otp
                const hashedOTP = userVerificationRecords[0].otp
                if(expiresAt < Date.now()){
                    await userVerification.deleteMany({userId})
                    throw new Error("Code has expires . Please request again.")
                }else{
                    const vaildOTP = await bcrypt.compare(otp, hashedOTP)

                    if(!vaildOTP){
                        //supplied otp is wrong
                        throw new Error("Invaild code passed. Cheack your inbox.")
                    }else{
                        //successful...
                        await userModel.updateOne({_id: userId}, {verify: true})
                        await userVerification.deleteMany({userId})
                        res.status(201).json({
                            status: 'VERIFIED',
                            message: 'User email verified successfully'
                        })
                    }
                }

            }
        }

    }catch(error){
        console.log(error)
        res.status(500).json(
            {
                status: "FALIED",
                message :error.message
            }
        )
    }
})

router.post('/resend', async ( req,res)=>{
    try{
        let { userId , email} = req.body

        if(!userId || !email){
            throw Error("Empty user detali are not allowed")
        }else{
            //delete existing records and resend
            await userVerification.deleteMany({userId})
            sendOTPverificationEmail({_id: userId,email}, res)
        }

    }catch(error ){
        res.status(500).json({
            status: 'FALIED',
            message : error.message
        })
    }
})
module.exports = router