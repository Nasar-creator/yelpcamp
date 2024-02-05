if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}



const express=require('express');
const app=express();
const path=require('path');
const ejsmate=require('ejs-mate');
const session=require('express-session')
const flash=require('connect-flash')
const passport=require('passport');
const pplocal=require('passport-local');
const usermodel=require('./models/user.js')
const mongodbstore=require('connect-mongo');
 const dburl=process.env.dburl
// const dburl='mongodb://127.0.0.1:27017/yelpcamp'
const store=mongodbstore.create({
    mongoUrl:dburl,
    touchAfter:24*60*60,
    crypto:{
        secret:"thisissecrete"
    }
})

store.on("error",function(e){
    console.log("Store errr",e)
})
// const catchAsync=require('./utils/catchAsync');
//using public dir
app.use(express.static(path.join(__dirname,'public')))
const campgroundsroute=require('./routers/campgrounds.js')
const userroutes=require('./routers/user.js')
const reviewrouter=require('./routers/reviews.js')


//connection to views dir
app.engine('ejs',ejsmate);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'))

//mongoose connection

//
const mongoose=require("mongoose");
mongoose.connect(dburl)

//checking for dbconnection 2

.then(()=>{
    console.log("Connection is working");
})
.catch(err=>{
    console.log("Errrr");
    console.log(err);
})
const db=mongoose.connection;

//Method-override

const methodoverride=require('method-override');
app.use(methodoverride('_method'));
const sessionconfig={
    store,
    secret:'thisissecret',
    resave:false,
    saveUninitialized:true,
    cookie:{
        httpOnly:true,
        expires:Date.now()+1000*60*60*24*7,
        maxAge:1000*60*60*24*7
    }
}
app.use(session(sessionconfig));
app.use(flash());
//passport
app.use(passport.initialize());
//passport session should write below the session
app.use(passport.session());
passport.use(new pplocal(usermodel.authenticate()));

passport.serializeUser(usermodel.serializeUser());
passport.deserializeUser(usermodel.deserializeUser());

app.use((req,res,next)=>{
    // console.log(req.session)
    res.locals.user=req.user;
    res.locals.success=req.flash('success');
    res.locals.error=req.flash('error');
    next();
})

//use to show requsted body
app.use(express.urlencoded({extended:true}))
//
app.get('/',(req,res)=>{
    res.render('home')
})

//routes for user
app.use('/',userroutes)
//Routes for campgrounds
app.use('/campgrounds',campgroundsroute)
//routes for review
app.use('/campgrounds/:id/reviews',reviewrouter);

app.get('/',(req,res)=>{
    res.render('home');
})
//Error handler
app.all('*',(req,res,next)=>{
    next(new ExpressError('Page Not Found',404))
})
//error middelware
app.use((err,req,res,next)=>{
    const {statuscode=500}=err;
    if(!err.message) err.message='Something Went Wrong'
    res.status(statuscode).render('error',{err});
 
})

app.listen(8080,()=>{
    console.log('I am listening');
})