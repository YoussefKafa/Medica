const express = require('express');
const bodyParser=require('body-parser');
const index=express();
require('dotenv/config');
const mongoose=require('mongoose');
const userRouter=require('./routers/users.js')
const articleRouter=require('./routers/articles.js')
const questionRouter=require('./routers/questions.js')
const replyRouter=require('./routers/replies.js')
const authController=require('./routers/authController')
const PORT = process.env.PORT || 5000;
//middleware
index.use(bodyParser.json());
index.use('/api/user', userRouter);
index.use('/api/article',articleRouter);
index.use('/api/question',questionRouter);
index.use('/api/reply',replyRouter);
index.use('/auth', authController);
//databaseconnection
mongoose.connect(process.env.MONGODB_URI || process.env.databaseConnectionString ,{ useNewUrlParser: true,useUnifiedTopology: true, dbName:'libApp-database' } )
.then(()=>{
console.log("mongodb is connected");
}).catch(
    (err)=>{
        console.log(err);
    }
);
//serverConnection
index.listen(PORT, () => console.log(`Listening on ${ PORT }`));
