const express=require('express');
const {User}=require('../models/User');
const router=express.Router();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
var config = require('../config');
const verifyToken = require('./VerifyToken');
//findAll
router.get('/findAll', verifyToken, (req,res)=>{
User.find().then(
    (usersList)=>{res.status(200).send(usersList)}
).catch((err)=> {res.status(404).send(err)});
});



//findById
router.get('/findById/:id', verifyToken, (req,res)=>{
let user=User.findById(req.params.id).then((user)=>{
    user=user.toJSON();
    //delete operator in js removes a property from an object
    delete user._id;
    res.status(200).send(user)}).catch((err)=>{
    res.status(404).send(err);
})
});


//deleteById
router.delete('/deleteById/:id',verifyToken,(req,res)=>{
    User.findByIdAndDelete(req.params.id).then(
        res.status(200).json({message:'user has been deleted'})
    ).catch(  (err)=>{res.status(400).json({err})} )
});

//count
router.get('/count',verifyToken,(req,res)=>{
User.countDocuments().then((userCount)=>{res.status(200).json(userCount)})
.catch((err)=>{res.status(400).json(err)})
});

//deleteAll
router.delete('/deleteAll',verifyToken,(req,res)=>{
    User.remove({}).then(
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

