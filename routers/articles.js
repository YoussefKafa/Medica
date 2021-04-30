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
        article=  article.save().then(article => res.json(article)).catch(err=> res.json(err));}
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


      router.get('/incViews/:id',async (req,res)=>{
        const articleG=await Article.findById(req.params.id);
        if(articleG) {
              articleG.views= articleG.views + 1;
              articleG.save(articleG);
            res.status(200).send(articleG);
        }
         if (!articleG){
             res.status(404).json("not found");
         }
      });
       // find a particular article and update its fields
      router.put('/update/:id', (req,res)=>{
       Article.findByIdAndUpdate(
            req.params.id, 
            {
                subject: req.body.subject,
                text : req.body.text,
                date: req.body.date
            },
            {new: true})
        .then(
            (article)=>{
                res.status(201).json({status:true,message:'updated'});
               }
        )
        .catch(
            (err)=>{
                res.status(500).json({error:err,status:false})
               }
        );
        });
module.exports=router;