const mongoose=require('mongoose');

/*
building the Question Schema (using mongoose library),
defining the question fields and relationships and constraints
*/
const questionSchema=mongoose.Schema({
    //every question has a subject
    subject: {type:String, default: 'no title'},
    //every question has a content
    text : {type:String, default: 'text'},
    //every question has a date
    date: {type:String},
    //counting the how many users read the question
    views: {type: Number},
    //can attach images
    image:{type:String},
    //every question has an author of type User
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