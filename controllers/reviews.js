//Import campgroungmodel
const campgroundmodel=require('../models/campground')
const Review=require('../models/review.js')

module.exports.createreview=async(req,res)=>{
    const campground=await campgroundmodel.findById(req.params.id);
    const review=new Review(req.body.review);
    review.author=req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success','Review added successfully')
    res.redirect(`/campgrounds/${campground._id}`);
    
}

module.exports.destroyreview=async(req,res,next)=>{
    const{id, reviewId}=req.params;
    await campgroundmodel.findByIdAndUpdate(id,{$pull:{reviews : reviewId}})
    await Review.findByIdAndDelete(reviewId);
    req.flash('success','Review was Deleted')
    res.redirect(`/campgrounds/${id}`)
}