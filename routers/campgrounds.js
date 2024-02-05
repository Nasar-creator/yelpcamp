const express=require('express')
const router=express.Router();
const catchAsync=require('../utils/catchAsync');
const {islogin,isAuthor,validateschema}=require('../middle.js')
const multer=require("multer");
const {storage}=require('../cloudinary/index.js')
const upload=multer({storage})




//import campground controller
const campgrounds =require('../controllers/campgrounds.js')
router.get('/',catchAsync(campgrounds.index))

//form to create new campdata
router.get('/new',islogin,campgrounds.newform)   
router.post('/',islogin,upload.array('image'),validateschema,catchAsync(campgrounds.createcampground))   
// router.post('/',upload.array('image'),(req,res)=>{
//     console.log(req.body,req.files)
//     res.send('itworked')
// })
//finding by id
router.get('/:id',catchAsync(campgrounds.showcampground));
router.get('/:id/edit',islogin,isAuthor,catchAsync(campgrounds.editform))
router.put('/:id',islogin,isAuthor,upload.array('image'),validateschema,catchAsync(campgrounds.editcampground))
router.delete('/:id',islogin,isAuthor,catchAsync(campgrounds.destroycamp))
module.exports=router;