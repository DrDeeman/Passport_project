const express = require('express');
const bodyParser = require('body-parser');
const { route } = require('express/lib/application');
var {addUser,getAllUserNoAdmin} = require('../Models/user_model.js');
exports.passportRouter = function(passport){
const router = express.Router();

router.route('/').get(function(req,res){
    if(req.isAuthenticated()){
    req.user.is_admin?res.redirect('/admin'):res.redirect('/home');
    }
    else
    res.redirect('/login');
});

router.route('/register').get(function(req,res){
   res.render('register.hbs');
}).post(bodyParser.urlencoded({ extended: false }),async function(req,res){
    await addUser(req.body)? res.redirect('/'): res.redirect('/register');
});

router.route('/login').get(function(req,res){
    if(!req.isAuthenticated())
    res.render('login.hbs');
    else
    res.redirect('/home');
}).post(bodyParser.urlencoded({ extended: false }), passport.authenticate('login',{
    successRedirect:'/',
    failureRedirect:'/login'

}));

router.use('/home',function(req,res){
if(req.isAuthenticated())
res.render('home.hbs',{login:req.user.name});
else
res.redirect('/');
});

router.use('/admin',async function(req,res){
    if(req.isAuthenticated()){
    req.user.is_admin?res.render('admin.hbs',{
        login:req.user.name,
        users:(await getAllUserNoAdmin())
    }):res.redirect('/home');
    }
    else
    res.redirect('/login');
});

router.route('/logout').get(function(req,res){
        req.logout(err=>{
        if(!err)res.redirect('/');
        });

})
return router;
}