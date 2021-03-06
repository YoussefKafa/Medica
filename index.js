const express = require('express');
const bodyParser=require('body-parser');
const index=express();
require('dotenv/config');
const cors=require('cors');
const mongoose=require('mongoose');
const userRouter=require('./routers/users.js')
const articleRouter=require('./routers/articles.js')
const questionRouter=require('./routers/questions.js')
const replyRouter=require('./routers/replies.js')
const authController=require('./routers/authController')
const PORT = process.env.PORT || 5000;
//middleware
index.use(bodyParser.urlencoded({ extended: true }))
index.use(bodyParser.json());
index.use(cors());
index.use('/api/user', userRouter);
index.use('/api/article',articleRouter);
index.use('/api/question',questionRouter);
index.use('/api/reply',replyRouter);
index.use('/auth', authController);
//databaseconnection
mongoose.connect("mongodb+srv://youssefkafaa:123kafa123@cluster0.ni7ks.mongodb.net/libApp-database?retryWrites=true&w=majority" ,{ useNewUrlParser: true,useUnifiedTopology: true,useFindAndModify:false, dbName:'libApp-database' } )
.then(()=>{
console.log("mongodb is connected");
}).catch(
    (err)=>{
        console.log(err);
    }
);
//serverConnection
index.listen(PORT, () => console.log(`Listening on ${ PORT }`));
