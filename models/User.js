const mongoose=require('mongoose');

const userSchema=mongoose.Schema(
{
    firstName:{type:String, require:true},
    lastName:{type:String, require:true},
    email:{type:String, require:true},
    password:{type:String, require:true},
    mobileNumber:{type:String, require:true},
    gender:{type:Boolean, require:true},
    birthDay:{type:String, require:true},
    image:{type:String, require:true},
    isAdmin:{type: Boolean, require:true},
    isDoctor:{type:Boolean, require:true},
    docSpecialization:{type:String, require:false},
    article:{type:mongoose.Schema.Types.ObjectId,ref:'Article'},
    question:{type:mongoose.Schema.Types.ObjectId,ref:'Question'}
}
);
userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
userSchema.set('toJSON', {
    virtuals: true,
});

exports.User=mongoose.model('User',userSchema);