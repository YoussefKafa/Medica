
const mongoose=require('mongoose');
const express=require('express');
const { Question } = require('../models/Question.js');
const verifyToken = require('../routers/verifyToken');
const router=express.Router();

//findAll
router.get('/findAll', (req,res)=>{
    Question.find().then(
        (questionList)=>{res.status(200).send(questionList)}
    ).catch((err)=> {res.status(404).send(err)});
    });
    
    
    
    //findById
    router.get('/findById/:id', (req,res)=>{
    let question=Question.findById(req.params.id).then((question)=>{res.status(200).send(question)}).catch((err)=>{
        res.status(404).send(err);
    })
    });
    
    
    //deleteById
    router.delete('/deleteById/:id',verifyToken,(req,res)=>{
        Question.findByIdAndDelete(req.params.id).then(
            res.status(200).json({message:'Question has been deleted'})
        ).catch(  (err)=>{res.status(400).json({err})} )
    });
    
    //count
    router.get('/count',(req,res)=>{
    Question.countDocuments().then((questionCount)=>{res.status(200).json(questionCount)})
    .catch((err)=>{res.status(400).json(err)})
    });
    //save
    router.post('/save',verifyToken,(req,res)=>
    {
        let question= new Question({
            subject: req.body.subject,
            text: req.body.text,
            date: req.body.date,
            views:req.body.views,
            image:req.body.image,
            author: req.body.author
        });
    question.save().then(res.status(200).send(question)).catch((err)=>{res.status(400).send(err)});
    }
    );
    
    
    //update
    
    
    
    //deleteAll
    router.delete('/deleteAll',verifyToken,(req,res)=>{
        Question.remove({}).then(
          ()=>{
           res.status(201).json({status:true,message:'dll documents removed'});
          }
      ).catch(
          (err)=>{
           res.status(500).json({error:err,status:false})
          }
      )
      });
      router.put('/update/:id', (req,res)=>{
        Question.findByIdAndUpdate(
             req.params.id, 
             {
                 subject: req.body.subject,
                 text : req.body.text,
                 date: req.body.date,
    image:req.body.image,
             },
             {new: true})
         .then(
             (question)=>{
                 res.status(201).json({status:true,message:'updated'});
                }
         )
         .catch(
             (err)=>{
                 res.status(500).json({error:err,status:false})
                }
         );
         });
         router.get('/incViews/:id',async (req,res)=>{
            const questionG=await Question.findById(req.params.id);
            if(questionG) {
                questionG.views= questionG.views + 1;
                questionG.save(questionG);
                res.status(200).send(questionG);
            }
             if (!questionG){
                 res.status(404).json("not found");
             }
          });
module.exports=router;