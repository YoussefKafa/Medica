const mongoose=require('mongoose');

const userSchema=mongoose.Schema(
{
    firstName:{type:String, required:true},
    lastName:{type:String,  required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    mobileNumber:{type:String, required:true},
    gender:{type:Boolean, required:true},
    birthDay:{type:String, required:true},
    image:{type:String},
    isAdmin:{type: Boolean, required:true},
    isDoctor:{type:Boolean, required:true},
    docSpecialization:{type:String, required:false},
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