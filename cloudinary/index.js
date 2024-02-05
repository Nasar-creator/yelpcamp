const cloudinary=require('cloudinary').v2;
const {CloudinaryStorage}=require("multer-storage-cloudinary")

cloudinary.config({
    // cloud_name:process.env.cloudinary_cloud_name,
    // api_key:process.env.cloudinary_key,
    // api_secret:process.env.cloudinary_secret
    cloud_name:"db4wknrol",
    api_key:486666712328217,
    api_secret:"dylg4agNPZTR0Fr8vf_50iRsPoY"

});
const storage=new CloudinaryStorage({
    cloudinary,
    params:{
    folder:'yelpcamp',
    allowedFormats:['jpeg','png','jpg'],
    }
});
module.exports={cloudinary,storage}