const bodyParser = require('body-parser')
const express = require('express')
const morgan = require('morgan')
const app = express()
const url = 'mongodb+srv://Rotha:Rotha@cluster0.hxnopta.mongodb.net/?retryWrites=true&w=majority'

app.get('/', (req,res, next)=>{
    console.log('hello')
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(morgan('dev'))
module.exports = app