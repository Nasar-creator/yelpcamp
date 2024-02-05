//mongoose connection
const mongoose=require("mongoose");
const schema=mongoose.Schema;
const review=require('./review')
const opts={toJSON:{virtuals:true}}

//creating schema


const campgroundschema=new schema({
    title:String,
    images:[{
        url:String,
        filename:String
    }],
    geometry:{
        type:{
            type:String,
            enum:['Point'],
            required:true
        },
        coordinates:{
            type:[Number],
            required:true
        }
    },
    price:Number,
    des:String,
    location:String,
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Review'
    }]
    
},opts)

campgroundschema.virtual('properties.popupmarkup').get(function(){
    return `<strong><a href="/campgrounds/${this._id}"> ${this.title}</a></strong>
    <p>${this.des.substring(0,25)}...</p>`
})




campgroundschema.post('findOneAndDelete',async function(doc){
   if(doc){
    await review.deleteMany({
        _id:{
            $in: doc.reviews
        }
    })
   }
})
const campgroundmodel=mongoose.model('campground',campgroundschema);

module.exports=campgroundmodel;