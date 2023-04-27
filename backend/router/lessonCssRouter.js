const express = require('express')
const router = express.Router()
const lessonCssModel = require('./../model/lessonCssModel')
const mongoose = require('mongoose')
const hljs = require('highlight.js');


router.get('/', (req,res, next)=>{
    lessonCssModel.find()
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

    const highlightedCode = hljs.highlight('css', req.body.code).value;
    const newLessonJava = new lessonCssModel({
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

router.put('/:lessonCssID', (req,res, next)=>{
    lessonCssModel.findByIdAndUpdate({_id: req.params.lessonCssID}, {
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

router.get('/:lessonCssID', (req, res , next )=>{
    lessonCssModel.findById(req.params.lessonCssID)
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


router.delete('/:lessonCssID', (req, res, next)=>{
    lessonCssModel.findByIdAndDelete({_id : req.params.lessonCssID})
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