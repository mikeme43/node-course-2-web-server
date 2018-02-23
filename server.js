const express = require('express');
const hbs = require('hbs');
const fs = require("fs");

var app = express();

hbs.registerPartials(__dirname+"/views/partials");

app.set('view engine', 'hbs');



app.use((req, res, next) => {
  var now = new Date().toString();

  var log = `${now} ${req.method} ${req.url}`;

  fs.appendFile("server.log", log+"\n", (err) => {
    if(err){
        console.log("Unable to append to log file");
    }
  });
  console.log(log);
  next();
});

//app.use((req, res, next)=>{

//  res.render("maintenance.hbs");
    //next();
//});

app.use(express.static(__dirname+"/public"));

hbs.registerHelper("currentYear", ()=>{
  return new Date().getFullYear();
});

hbs.registerHelper("screamIt", (text)=>{
  return text.toUpperCase();
});

var passParam = {
    title:"Home Page For Testing",
    header:"Home Page",
    text:"Welcome. And we are  off!!  Home",
}


app.get('/', (req, res)=>{
  res.render('home.hbs', passParam);
});

app.get('/about', (req, res)=>{
   res.render('about.hbs', {
       title:"About Page For Testing",
       header:"About Page",
       text:"Welcome. And we are  off!!  About",
   });
});


app.get('/bad', (req, res)=>{
    res.send({
      error:"404",
      message:"Page not found"
    });
});


app.listen(3000, ()=>{
  console.log("Server is up on port :3000");
});
