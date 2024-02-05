const express=require('express');
const router=express.Router();
const passport=require('passport')

const catchAsync=require('../utils/catchAsync')
const{storeReturnTo}=require('../middle.js')
const users=require('../controllers/users.js')

router.get('/register',users.regForm)
router.post('/register',catchAsync(users.register));

router.get('/login',users.loginForm)
router.post('/login',storeReturnTo,passport.authenticate('local',{failureFlash:true,failureRedirect:'/login'}),
users.login)

router.get('/logout',users.logout);
module.exports=router;