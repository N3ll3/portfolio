const path=require('path');
const express = require('express');
const hbs = require('hbs');
const getWeatherFor = require("./utils/getWeatherFor");

const app = express();


// Define paths for Express config
const publicDirPath = path.join(__dirname,'../public');
const viewsPath =  path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');


// Setup handlebars / hbs and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup publicDirectory css/js client to serve by express
app.use(express.static(publicDirPath));

const user = {
    name:'Nelle',
    location:'La Rochelle'
}

app.get('/',(req,res)=>{
    res.render('index',{
        title : 'Portfolio',
        name : user.name
    });
})

app.get('/morpion',(req,res)=>{
    res.render('morpion',{
        title : 'Morpion',
        name : user.name
    });
})

app.get('/meteo',(req,res)=>{
    res.render('meteo',{ 
                user, 
                title:'Ma météo',
                name:user.name   
            })       
    })

app.get('/getweather/:location',(req, res)=>{
    if (!req.params.location) {
        return res.send({
            error: 'Aucune adresse'
        })
    }
        const location = req.params.location;
              
        getWeatherFor(location, function (error, {location,current}={}) {
            if (error) {
                return  res.send({error});
            }
            return res.send(
                { 
                    weatherIcon: current.weather_icons[0],
                    weatherInfo:`${location.name} (${location.country}) : ${current.weather_descriptions}. Il fait ${current.temperature} degres. Il y a ${current.precip} % de chance de pleuvoir`,
                });
        });
        
})
   
app.get('/morpion/*',(req,res)=>{
    res.render('404',{
        title : '404 Page',
        name:user.name,
        errorMessage:'Wrong Url, try Again'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title : '404 Page',
        name:user.name,
        errorMessage:'Page not found'
    })
})

app.listen(3000,()=>{
    console.log('server on port 3000.');
});