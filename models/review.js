const mongoose=require('mongoose')

const reviewschema=new mongoose.Schema({
    body:String,
    rating:Number,
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
});
const reviewmodel=mongoose.model('Review',reviewschema)

module.exports=reviewmodel;