const mongoose=require('mongoose');

/*
building the Reply Schema (using mongoose library),
defining the reply fields and relationships and constraints
*/
const replySchema=new mongoose.Schema({
    //every reply has a content
    text:{type:String, required:true},
    //every reply has a date 
    date:{type:String},
    //has relationship with question
    question:{type: mongoose.Schema.Types.ObjectId,ref:'Question'},
    //also has relationship with author
    author:{type:mongoose.Schema.Types.ObjectId,ref:'User'}
});

replySchema.virtual('id').get(function () {
    return this._id.toHexString();
});
replySchema.set('toJSON', {
    virtuals: true,
});
exports.Reply=mongoose.model('Reply', replySchema)