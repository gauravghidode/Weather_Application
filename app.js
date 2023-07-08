const express = require('express');
const app = express();
const bodyparser=require('body-parser');

const https = require('https');
const { privateDecrypt } = require('crypto');

app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/public'));


app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html");
})
app.get("/contact", function(req, res){
    res.render("contact");
})
app.get("/about", function (req, res){
    res.render("about");
})

const prevcities = [];

var today = new Date();
let year = today.getFullYear();
let month =today.getMonth()+1;
let day = today.getDate();
let weekdayindex = today.getDay();
const weekdayarr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let weekday=weekdayarr[weekdayindex];
var currday=(day+"-"+month+"-"+year+", "+weekday);

app.post("/", function(req, res){
    const city = (req.body.city);
    const url = "https://api.weatherapi.com/v1/current.json?key=f7fe94aea7184ded90062439230707&q="+city;
    https.get(url, function(response){
        response.on("data", function(data){
            const weatherdata=JSON.parse(data);
            res.render("home", {weatherdata: weatherdata , date: currday, city: city});
        });
    });
});

app.listen(3000, function () {
    console.log("server is running on port 3000");
});