const bodyParser = require('body-parser')
const express = require('express')
const { default: mongoose } = require('mongoose')
const morgan = require('morgan')
const app = express()
const url = 'mongodb+srv://Rotha:Rotha@cluster0.hxnopta.mongodb.net/?retryWrites=true&w=majority'
const userRouter= require('./router/userRouter')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(morgan('dev'))
app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*")
    req.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Control-Type, Accept, Authorzation"

    )

    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'GET, POST,PATCH,DELETE' )
        return res.status(200).json({})
    }
    next()
})

app.use((error, req,res, next) =>{
    res.status(error.status || 500);

    res.json({
        error: {
            message: error.message
        }
    })
})


async function connect(){
    try{
        await mongoose.connect(url)
        console.log('You connect mongoose successful')
    }catch(err){
        console.log(err)
    }
}
connect()
app.use('/user', userRouter )
module.exports = app