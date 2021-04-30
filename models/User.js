const mongoose=require('mongoose');

const userSchema=mongoose.Schema(
{
    firstName:{type:String, required:false},
    lastName:{type:String,  required:false},
    email:{type:String, required:false},
    password:{type:String, required:false},
    mobileNumber:{type:String, required:false},
    gender:{type:Boolean, required:false},
    birthDay:{type:String, required:false},
    image:{type:String},
    isAdmin:{type: Boolean, required:false},
    isDoctor:{type:Boolean, required:false},
    docSpecialization:{type:String, required:false}
}
);
userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
userSchema.set('toJSON', {
    virtuals: true,
});

exports.User=mongoose.model('User',userSchema);