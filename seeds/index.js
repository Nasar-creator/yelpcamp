//cities required
const cities=require('./cities')
const {places,descriptors}=require('./seedHelpers')
const mongoose=require("mongoose");
const campgroundmodel = require("../models/campground");
mongoose.connect('mongodb://127.0.0.1:27017/yelpcamp')


//checking for dbconnection 2

.then(()=>{
    console.log("Connection is working");
})
.catch(err=>{
    console.log("Errrr");
    console.log(err);
})
const sample=(array)=>array[Math.floor(Math.random()*array.length)];


const seeddb=async()=>{
    await campgroundmodel.deleteMany({});
    for(let i=0; i<300; i++){
        const random=Math.floor(Math.random()*1000);
        const price=Math.floor(Math.random()*500);
        const camp=new campgroundmodel({
            author:'65b605b1645fa23a432196ce',
            location:`${cities[random].city},${cities[random].state}`,
            title:`${sample(descriptors)} ,${sample(places)}`,
             price,
             geometry:{
              type:'Point',
              coordinates:[
                cities[random].longitude,
                cities[random].latitude,
              ]
             },
             images: [
                {
                  url: 'https://res.cloudinary.com/db4wknrol/image/upload/v1706549086/yelpcamp/tjsrqk657lhfudyridiw.avif',
                  filename: 'yelpcamp/tjsrqk657lhfudyridiw',
                   },
                {
                  url: 'https://res.cloudinary.com/db4wknrol/image/upload/v1706549086/yelpcamp/t5s0xa83ylaqfuuc6dsk.jpg',
                  filename: 'yelpcamp/t5s0xa83ylaqfuuc6dsk',
                  },
                {
                  url: 'https://res.cloudinary.com/db4wknrol/image/upload/v1706549086/yelpcamp/a5l2dxjgxdy1fy7zqyb6.jpg',
                  filename: 'yelpcamp/a5l2dxjgxdy1fy7zqyb6',
                    }
              ],
            des:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora optio eaque quo veniam commodi quae sunt sapiente laboriosam cumque aliquid!"
        })
        await camp.save()
    }
}

seeddb().then(()=>{
    mongoose.connection.close();
})