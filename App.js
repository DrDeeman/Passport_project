const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const router = require('./Controllers/user_controller.js').router;
const passport = require('./Controllers/auth_controller.js').passport;
var passportRouter = require('./Controllers/user_controller.js').passportRouter(passport);
var client = require('./Models/user_model.js').client_pg;
require('dotenv').config();

const app = express();

const parser = express.urlencoded({extended:false});


app.set('view engline','hbs');
app.set('views',__dirname+'/Views');


app.use(cookieParser());
app.use(session({
    secret:"SECRET",
    resave: true,
    saveUninitialized: true
}));


app.use(passport.initialize());
app.use(passport.session());

app.use('/',passportRouter);

client.connect(err=>{
 if(!err){
    app.listen(process.env.PORT_SERVER,process.env.HOST_SERVER,function(){
        console.log('start server');
    });
 }
});
