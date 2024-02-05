//Import campgroungmodel
const campgroundmodel=require('../models/campground')
//requiring geocoding from mapbox
const mbGeocoding=require('@mapbox/mapbox-sdk/services/geocoding')
//require token from env its an optional u can write directly
const mapboxtoken=process.env.mapbox_token;
const geocoder= mbGeocoding({accessToken:mapboxtoken})
const{cloudinary}=require('../cloudinary/index')


module.exports.index=async(req,res)=>{
    const campgroundsdisplay=await campgroundmodel.find({})
    res.render('campgrounds/index',{campgroundsdisplay})
    }

module.exports.newform=(req,res)=>{
       
    res.render('campgrounds/new');
}

module.exports.createcampground=async(req,res,next)=>{

     const geodata=await geocoder.forwardGeocode({
        query:req.body.campgrounds.location,
        limit:1
       }).send()
       //getting an lat and log

    const newcamp=new campgroundmodel (req.body.campgrounds);
       newcamp.geometry=geodata.body.features[0].geometry
    newcamp.images=req.files.map(f=>({url:f.path,filename:f.filename}))
    newcamp.author=req.user._id;
    await newcamp.save();
    console.log(newcamp)
    req.flash('success','New Campground Added Successfully');
    res.redirect(`/campgrounds/${newcamp._id}`)
}
module.exports.showcampground=async(req,res)=>{
    const campgroundshow=await campgroundmodel.findById(req.params.id).populate('author').populate(
      { path:'reviews',
        populate:{path:'author'}
    });
    // console.log(campgroundshow);
    if(!campgroundshow){
        req.flash('error','Not Found')
        return res.redirect('/campgrounds')
    }
    res.render('campgrounds/show',{campgroundshow})
    }
module.exports.editform=async(req,res)=>{
    const {id}=req.params
    const campgroundedit=await campgroundmodel.findById(id)
  
   
    if(!campgroundedit){
        req.flash('error','Not Found')
        return res.redirect('/campgrounds')
    } 
    
    
    res.render('campgrounds/edit',{campgroundedit})
}
module.exports.editcampground=async(req,res)=>{
    const{id}=req.params;
    console.log(req.body)
    const campgroundupdate= await campgroundmodel.findByIdAndUpdate(id,{...req.body.campgrounds});
    const imgs=req.files.map(f=>({url:f.path,filename:f.filename}));
   
    campgroundupdate.images.push(...imgs)
    if(req.body.deleteImages){
        for(let filename of req.body.deleteImages){
            await cloudinary.uploader.destroy(filename);
        }
      await  campgroundupdate.updateOne({$pull:{images:{filename:{$in:req.body.deleteImages}}}})
    }
     await campgroundupdate.save()
    req.flash('success','Updated Successfully');     
    res.redirect(`/campgrounds/${campgroundupdate._id}`)
}
module.exports.destroycamp=async(req,res)=>{
    const{id}=req.params;
   
    await campgroundmodel.findByIdAndDelete(id);
    req.flash('success','Successfully Deleted your campground')
    res.redirect('/campgrounds')
}