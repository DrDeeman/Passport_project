const passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
let getUser = require('../Models/user_model.js').getUser;


passport.serializeUser(function({name,is_admin},done){
 done(null,{name:name,is_admin:is_admin});
});

passport.deserializeUser(function(user,done){
  done(null,user);
});


passport.use('login',new LocalStrategy({
  usernameField:'uname',
  passwordField:'upassword',
  passReqToCallback : true
},async function(req,uname,upass,done){
  var row = await getUser({uname:uname,upassword:upass});
if(row)
return done(null,row);
else
return done(null,false,{message:'no user'});
}));


exports.passport = passport;




