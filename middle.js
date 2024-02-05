const {campgroundschema ,reviewschema}=require('./schemas.js')
const ExpressError=require('./utils/ExpressError.js');
const campgroundmodel=require('./models/campground.js')
const Review=require('./models/review.js')

module.exports.storeReturnTo=(req,res,next)=>{
    if(req.session.returnTo){
        res.locals.returnTo=req.session.returnTo;
    }
    next();
}

module.exports.islogin=(req,res,next)=>{
    console.log('Req.User..',req.user)
    if(!req.isAuthenticated()){
        req.session.returnTo=req.originalUrl;
        req.flash('error','Sorry,Please Register or Login and try again')
        return res.redirect('/login')
}
next();
}
//validate the data
module.exports.validateschema=(req,res,next)=>{
    
    const {error}=campgroundschema.validate(req.body);
    if(error){
        const msg=error.details.map(el=>el.message).join(',');
        throw new ExpressError(msg,400);
    }else{
        next();
    }
    
}

module.exports.isAuthor=async(req,res,next)=>{
    const {id}=req.params;
    const campid=await campgroundmodel.findById(id);
    if(!campid.author.equals(req.user._id)){
        req.flash('error','You Cannot do anything to this campground..')
        return res.redirect(`/campgrounds/${id}`)
    }
    next();
}
module.exports.isReviewAuthor=async(req,res,next)=>{
    const {id,reviewId}=req.params;
    const review=await Review.findById(reviewId);
    if(!review.author.equals(req.user._id)){
        req.flash('error','You Cannot anything to this campground..')
        return res.redirect(`/campgrounds/${id}`)
    }
    next();
}

module.exports.validatereview=(req,res,next)=>{
    const {error}=reviewschema.validate(req.body)
    if(error){
        const msg=error.details.map(el=>el.message).join(',');
        throw new ExpressError(msg,400);
    }else{
        next();
    }
    
    }
