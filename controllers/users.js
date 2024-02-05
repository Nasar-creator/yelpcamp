const usermodel=require('../models/user')

module.exports.regForm=(req,res)=>{
    res.render('users/register');
}
module.exports.register=async (req,res,next)=>{
    try{
    const{email,username,password}=req.body;
    const user=new usermodel({email,username});
    const registeruser=await usermodel.register(user,password);
    req.login(registeruser,err=>{
        if(err)return next(err)
     req.flash('success','Welcome To YelpCamp')
    res.redirect('/campgrounds');
    })
   
}catch(e){
    req.flash('error',e.message)
    res.redirect('/register')
}
}
module.exports.loginForm=(req,res)=>{
    res.render('users/login')
}
module.exports.login=(req,res)=>{
    req.flash('success','Welcome Back')
    const redirectUrl=res.locals.returnTo || '/campgrounds'
    res.redirect(redirectUrl)
    }
module.exports.logout= (req,res)=>{
    req.logout((err)=>{
        if(err){
            return next(err)
        }
    req.flash('success','We miss you')
    res.redirect('/campgrounds')
});
}