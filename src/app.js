const express = require("express")
const path = require("path")

const app = express()
const x = path.join(__dirname , '../public')
app.use(express.static(x))

const port = process.env.PORT || 3000





app.get( '/prices' , (req,res) => {
    res.send("Price page content 'route from (/prices)'")
 })


 app.get( '/about' , (req,res) => {
    res.send("About page content 'route from (/about)'")
 })

 app.get( '/page1' , (req,res) => {
    res.send('<h2>Page1 content: route from (/page1) </h2><h2>my name is Marah </h2>  <button>Submit</button>')
 })

 app.get( '/page2' , (req,res) => {
    res.send({
        name : "Marah",
        age : 30,
        city : "Damascus",
        dec: "Page2 content 'rout from(/page2)'"
    })
 })


 app.get( '/page3' , (req,res) => {
    res.send({
        name : "Yara",
        age : 31,
        city : "Damascus",
         dec: "Page3 content 'rout from(/page3)'"
    })
 })

/******************************************************************************************************************************************************** */

 app.set('view engine', 'hbs');

 const viewsDirectory = path.join (__dirname , '../Templates/views')
 app.set('views', viewsDirectory);

  // to read partials : 
  var hbs = require('hbs');
  const partialsPath = path.join(__dirname , "../Templates/partials")
  hbs.registerPartials(partialsPath)

  app.use(express.urlencoded({
   extended: true
 }));


  app.get ('/' , (req,res) => {
   res.render('index' , {
       title : "HOME",
       desc : "This is hps home page",
       name: req.body.name
   })
})

app.get ('/service' , (req,res) => {
    res.render('service' , {
        title : "SERVICE",
        name: "OurService",
        city:"Syria",
        img: "images/service1.jpg"
    })
 })
 
 
 app.get ('/team' , (req,res) => {
    res.render('team' , {
        title : "TEAM",
        name: "OurTeam",
        city:"Damascus",
        img: "images/member2-col.jpg"
    })
 })
 



const forecast = require('./weatherAPIs/forecast.js')
const geocode = require('./weatherAPIs/geocode.js')

app.get('/weather',(req,res)=>{
   if(!req.query.address){
       return res.send({
           error:'please add address!'
       })
   }
     geocode(req.query.address,(error,data)=>{
       if(error){
         
           return res.send({error})
       } 
           forecast(data.latitude,data.longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location:req.query.address,
                latitude:data.latitude,
                longitude: data.longitude
            })
       })
   })
})



app.get('*' , (req , res)=> {
   res.send('404 Page Not Founded')
})


 app.listen( port , () => {
    console.log("app listening on port 3000")
})
