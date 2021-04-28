const mongoose=require('mongoose');
/*
building the User Schema (using mongoose library),
defining the user fields and relationships and constraints
*/
const userSchema=mongoose.Schema(
{
    //all data needed to signup or login
    //personal information
    firstName:{type:String, required:true},
    lastName:{type:String,  required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    mobileNumber:{type:String, required:true},
    gender:{type:Boolean, required:true},
    birthDay:{type:String, required:true},
    image:{type:String},
    //typ information
    isAdmin:{type: Boolean, required:true},
    isDoctor:{type:Boolean, required:true},
    docSpecialization:{type:String, required:false},
    //every user has articles
    article:{type:mongoose.Schema.Types.ObjectId,ref:'Article'},
    //every user can ask questions
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