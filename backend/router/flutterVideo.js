const express = require('express')
const fs = require('fs')
const router = express.Router()

router.get('/videoFlutter' , (req, res , next)=>{
    const range = req.headers.range
    if (!range) {
        res.status(400).send("Requires Range header");
    }


    const videoPath = './video/test.mp4'
    const videoSize = fs.statSync(videoPath).size
   
    const chuk_size = 1 * 1e+6;
    const start = Number(range.replace(/\D/g, ''))
    const end = Math.min(start + chuk_size , videoSize-1)
    

    const contentLength = end - start +1
    const header  = {
        "Content-Range" : `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges" :  "bytes",
        "Content-Length" : contentLength,
        "Content-Type": "video/mp4"
    }
    res.writeHead(206 , header)

    const stream = fs.createReadStream(videoPath , {start,end})
    
    stream.pipe(res)



})

router.get('/videoTest' , (req, res , next)=>{
    const range = req.headers.range
    if (!range) {
        res.status(400).send("Requires Range header");
    }
    const videoPath = './video/test02.mp4'
    const videoSize = fs.statSync(videoPath).size
   
    const chuk_size = 1 * 1e+6;
    const start = Number(range.replace(/\D/g, ''))
    const end = Math.min(start + chuk_size , videoSize-1)
    

    const contentLength = end - start +1
    const header  = {
        "Content-Range" : `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges" :  "bytes",
        "Content-Length" : contentLength,
        "Content-Type": "video/mp4"
    }
    res.writeHead(206 , header)

    const stream = fs.createReadStream(videoPath , {start,end})
    stream.pipe(res)



})

module.exports = router