const bodyParser = require('body-parser')
const express = require('express')
const { default: mongoose } = require('mongoose')
const morgan = require('morgan')
const app = express()
const url = 'mongodb+srv://Rotha:Rotha@cluster0.hxnopta.mongodb.net/?retryWrites=true&w=majority'
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use(morgan('dev'))
app.use(express.urlencoded({extended: true}))



const userRouter= require('./router/userRouter')
const videoFlutter = require('./router/router_lesson_video/flutterVideo')
const lessonJavaRouter = require('./router/lessonJavaRouter')
const lessonFlutterRouter = require('./router/lessonFlutterRouter')
const lessonHtmlRouter = require('./router/lessonHtmlRouter')
const lessonCssRouter = require('./router/lessonCssRouter')
const lessonCprogrammingRouter = require('./router/lessonCprogrammingRouter')
const lessonCplusRouter = require('./router/lessonCplusRouter')
const lessonReactJsRouter = require('./router/lessonReactjsRouter')
const lessonNodeJsRouter = require('./router/lessonNodejsRouter')



app.set('view engine', 'ejs')
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
//read file
app.use(express.static(__dirname + '/public'))

//set data lesson to database 
app.use('/', userRouter )
app.use('/', videoFlutter)
app.use('/lesson', lessonJavaRouter)
app.use('/flutter', lessonFlutterRouter)
app.use('/html', lessonHtmlRouter)
app.use('/css', lessonCssRouter)
app.use('/nodejs', lessonNodeJsRouter)
app.use('/reactjs', lessonReactJsRouter)
app.use('/cprogramming', lessonCprogrammingRouter)
app.use('/cplus', lessonCplusRouter)

module.exports = app    