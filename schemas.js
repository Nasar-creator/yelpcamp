const joi=require('joi');

module.exports.campgroundschema=joi.object({
    campgrounds:joi.object({
        title:joi.string().required(),
        price:joi.number().required().min(0),
        // image:joi.string().required(),
        location:joi.string().required(),
        des:joi.string().required()
    }).required(),
    deleteImages:joi.array()
});

module.exports.reviewschema=joi.object({
    review:joi.object({
        body:joi.string().required(),
        rating:joi.string().required().min(1).max(5)
    }).required()
});