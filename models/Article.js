const mongoose =require('mongoose');


const articleSchema=new mongoose.Schema(
    {
          subject: {type:String, default: 'no title'},
          text : {type:String, default: 'text'},
          date: {type:String},
          views: {type: Number},
          authorId: {type:String}
    }
);
articleSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
articleSchema.set('toJSON', {
    virtuals: true,
});

exports.Article=mongoose.model('Article',articleSchema);