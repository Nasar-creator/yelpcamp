const express=require('express')
const router=express.Router({mergeParams:true});
const catchAsync=require('../utils/catchAsync');

const {validatereview,islogin,isReviewAuthor}=require('../middle.js')
const review=require('../controllers/reviews.js')

//route for review
router.post('/',islogin,validatereview,catchAsync(review.createreview))

router.delete('/:reviewId',islogin,isReviewAuthor,catchAsync(review.destroyreview))

module.exports=router;