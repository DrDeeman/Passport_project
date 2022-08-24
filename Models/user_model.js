const pg = require('pg');
require('dotenv').config();

const client = new pg.Client( `postgres://${process.env.USER_DATABASE}:${process.env.PASSWORD_DATABASE}@${process.env.HOST_DATABASE}/${process.env.NAME_DATABASE}`);

exports.client_pg = client;

exports.addUser = function({uname,upassword}){
    return new Promise((res,rej)=>{       
  client.query("INSERT INTO passport_users(name,password) VALUES($1,$2)",
  [uname,upassword],
  (err,result)=>result?.rowCount!=0? res(true): res(false));
});
}

exports.getUser = function({uname,upassword}){
    return new Promise((res,rej)=>{ 
          
  client.query("SELECT * FROM passport_users WHERE name=$1 AND password = $2 LIMIT 1",
  [uname,upassword],
  (err,result)=>  result?.rows.length!=0? res(result.rows[0]):res(false));
  
});
}

exports.getAllUserNoAdmin = function(){
    return new Promise((res,rej)=>{ 
          
  client.query("SELECT * FROM passport_users WHERE name!='Admin'",
  (err,result)=>  result?.rows.length!=0? res(result.rows):res(false));
  
});
}
