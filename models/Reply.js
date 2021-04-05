const mongoose=require('mongoose');


const replySchema=new mongoose.Schema({
    text:{type:String, required:true},
    date:{type:String},
    question:{type: mongoose.Schema.Types.ObjectId,ref:'Question'},
    author:{type:mongoose.Schema.Types.ObjectId,ref:'User'}
});

replySchema.virtual('id').get(function () {
    return this._id.toHexString();
});
replySchema.set('toJSON', {
    virtuals: true,
});
exports.Reply=mongoose.model('Reply', replySchema)