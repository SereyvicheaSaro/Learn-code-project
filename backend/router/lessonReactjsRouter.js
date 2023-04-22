const express = require('express')
const router = express.Router()
const lessonReactJs = require('./../model/lessonReactjs')
const mongoose = require('mongoose')
const hljs = require('highlight.js');


router.get('/', (req,res, next)=>{
    lessonReactJs.find()
    .exec()
    .then(result=>{
        res.status(200).json({
            message: 'lesson java',
            data: result
        })
    })
    .catch(err=>{
        res.status(500).json(err)
    })
   
})

router.post("/", (req,res, next)=>{

    const highlightedCode = hljs.highlight('java', req.body.code).value;
    const newLessonJava = new lessonReactJs({
        _id :new mongoose.Types.ObjectId(),
    
        title : req.body.title,
        description : req.body.description,
        code : highlightedCode,
        answer : req.body.answer
    });
    newLessonJava.save()
    .then((result)=>{
        res.status(201).json({
            message : "create done",
            result : result
        })
    })
    .catch((err)=>{
        res.status(500).json({
            message : 'post lessonJava error',
            error : err
        })
    })
})

router.put('/:lessonJavaID', (req,res, next)=>{
    lessonReactJs.findByIdAndUpdate({_id: req.params.lessonJavaID}, {
        $set:{
            title : req.body.title,
            description : req.body.description,
            code : req.body.code,
            answer : req.body.answer
        }
    })
    .exec()
    .then(data =>{
        res.status(201).json({
            message: 'You update lesson java done',
            data : data
        })
    })
    .catch(error=>{
        console.log(error)
    })
})

router.get('/:lessonJavaID', (req, res , next )=>{
    lessonReactJs.findById(req.params.lessonJavaID)
    .exec()
    .then(doc =>{
        if(doc){
            res.status(200).json(doc)
            console.log(doc)
        }else{
            res.status(404).json({
                message: 'errpr'
            })
        }
     
    })
    .catch(err=>{
        res.status(500).json(err)
    })
})


router.delete('/:lessonJavaID', (req, res, next)=>{
    lessonReactJs.findByIdAndDelete({_id : req.params.lessonJavaID})
    .exec()
    .then(doc =>{
        res.status(200).json({
            data : 'delete done'
        })
    })
    .catch((err)=>{
        res.status(500).json(err)
    })
})
module.exports = router