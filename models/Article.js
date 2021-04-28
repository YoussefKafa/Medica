const mongoose =require('mongoose');

/*
building the Article Schema (using mongoose library),
defining the article fields and relationships and constraints
*/
const articleSchema=new mongoose.Schema(
    {
          subject: {type:String, default: 'no title'},
          text : {type:String, default: 'text'},
          date: {type:String},
          views: {type: Number},
          author: {type:mongoose.Schema.Types.ObjectId,ref:'User'}
    }
);
articleSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
articleSchema.set('toJSON', {
    virtuals: true,
});

exports.Article=mongoose.model('Article',articleSchema);