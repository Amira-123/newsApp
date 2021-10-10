///////////////request Api
const request = require("request");
const url ="https://newsapi.org/v2/everything?q=keyword&apiKey=cfde8fc0b20640c2b07c1d72d258cd3f";

////////////////express 
const express= require('express');
const app=express();
const port=3000;
// //////////////connect to public folder (css)///////
const path=require('path');
const defaultPath=path.join(__dirname,'../public');
app.use(express.static( defaultPath));
////////////////using hbs and change path
app.set('view engine', 'hbs');
const viewPath=path.join(__dirname,'../templtes/views')
app.set('views',viewPath);
//////////////////////////////connect to partial folder
const hbs=require('hbs');
const partialPath=path.join(__dirname,'../templtes/partials');
hbs.registerPartials(partialPath);

app.get('/',(req,res)=>{
    request({url,json: true },(error, response) => {
        if (error) {
        console.log("error is occured");
        } 
        else if (response.body.code)
         {
         console.log(response.body.code);
        }
         else 
        {
          console.log( "hello"+response.body.articles);
        }
        res.render('index',{
            data:response.body.articles
          })
      })
})
app.get('/about',(req,res)=>{
  res.render('about',{
    title:'this is about page'
  })
})

 
app.get('*',(req,res)=>{
  res.render('404page',{
    title:'not found page'
  })
})



//////////run express server

app.listen(port,()=>{
console.log('server is running')
})

