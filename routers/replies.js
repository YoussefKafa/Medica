const mongoose=require('mongoose')
const express=require('express');
const { Reply } = require('../models/Reply');
const verifyToken = require('./VerifyToken');
const router=express.Router();
//findAll


router.get('/findAll',verifyToken, (req,res)=>{
    Reply.find().then(
        (replyList)=>{res.status(200).send(replyList)}
    ).catch((err)=> {res.status(404).send(err)});
    });
    
    
    
    //findById
    router.get('/findById/:id',verifyToken, (req,res)=>{
    let reply=Reply.findById(req.params.id).then((reply)=>{res.status(200).send(reply)}).catch((err)=>{
        res.status(404).send(err);
    })
    });
    
    
    //deleteById
    router.delete('/deleteById/:id',verifyToken,(req,res)=>{
        Reply.findByIdAndDelete(req.params.id).then(
            res.status(200).json({message:'Reply has been deleted'})
        ).catch(  (err)=>{res.status(400).json({err})} )
    });
    
    //count
    router.get('/count',verifyToken,(req,res)=>{
    Reply.countDocuments().then((replyCount)=>{res.status(200).json(replyCount)})
    .catch((err)=>{res.status(400).json(err)})
    });
    //save
    router.post('/save',verifyToken,(req,res)=>
    {
        let reply= new Reply({
            text:req.body.text,
            date:req.body.date,
            question:req.body.question,
            author:req.body.author
        });
    reply.save().then(res.status(200).send(reply)).catch((err)=>{res.status(400).send(err)});
    }
    );
    
    
    //update
    
    
    
    //deleteAll
    router.delete('/deleteAll',verifyToken,(req,res)=>{
        Reply.remove({}).then(
          ()=>{
           res.status(201).json({status:true,message:'dll documents removed'});
          }
      ).catch(
          (err)=>{
           res.status(500).json({error:err,status:false})
          }
      )
      });

module.exports=router;