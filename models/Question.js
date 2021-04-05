const mongoose=require('mongoose');


const questionSchema=mongoose.Schema({
    subject: {type:String, default: 'no title'},
    text : {type:String, default: 'text'},
    date: {type:String},
    views: {type: Number},
    image:{type:String},
    author: {type:mongoose.Schema.Types.ObjectId,ref:'User'}
}
);

questionSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
questionSchema.set('toJSON', {
    virtuals: true,
});
exports.Question=mongoose.model('Question',questionSchema);