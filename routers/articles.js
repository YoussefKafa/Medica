const mongoose=require('mongoose');
const express=require('express');
const { Article } = require('../models/Article');
const verifyToken = require('./VerifyToken');
const router=express.Router();

//findAll
router.get('/findAll', (req,res)=>{
    Article.find().then(
        (articlesList)=>{res.status(200).send(articlesList)}
    ).catch((err)=> {res.status(404).send(err)});
    });
    
    
    
    //findById
    router.get('/findById/:id', (req,res)=>{
    let article=Article.findById(req.params.id).then((article)=>{res.status(200).send(article)}).catch((err)=>{
        res.status(404).send(err);
    })
    });
    
    
    //deleteById
    router.delete('/deleteById/:id',verifyToken,(req,res)=>{
        Article.findByIdAndDelete(req.params.id).then(
            res.status(200).json({message:'article has been deleted'})
        ).catch(  (err)=>{res.status(400).json({err})} )
    });
    
    //count
    router.get('/count',(req,res)=>{
    Article.countDocuments().then((articleCount)=>{res.status(200).json(articleCount)})
    .catch((err)=>{res.status(400).json(err)})
    });
    //save
    router.post('/save',verifyToken,(req,res)=>
    {
        let article= new Article({
            subject: req.body.subject,
            text: req.body.text,
            date: req.body.date,
            views:req.body.views,
            author: req.body.author
        });
    article.save().then(res.status(200).send(article)).catch((err)=>{res.status(400).send(err)});
    }
    );
    
    
    //update
    
    
    
    //deleteAll
    router.delete('/deleteAll',verifyToken,(req,res)=>{
        Article.remove({}).then(
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