const mongoose=require('mongoose');
const pplocalmongoose=require('passport-local-mongoose')
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    }
});

userSchema.plugin(pplocalmongoose);
const usermodel=mongoose.model('user',userSchema);
module.exports=usermodel;