const { response } = require("express");
const express = require("express");
const bodyParser = require("body-parser")
const app = express();
const https = require("https");

app.use(bodyParser.urlencoded({extended:true}));

app.post("/", function(req, res){
    console.log(req.body.cityName);
    const query = req.body.cityName;
    const apikey = "615c2f8f6a1757bdd6ea0e2f542c8992";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&APPID="+ apikey +"&units="+unit+"";
    https.get(url, function(response){
        
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherdata= JSON.parse(data)
            const temp = weatherdata.main.temp
            const weatherdescription = weatherdata.weather[0].description
            const icon = weatherdata.weather[0].icon
            console.log(icon);
            const imageurl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
            res.write("<h1>The temperature in "+query+" is "+ temp+ "degree celcius</h1>");
            res.write("<p> The weather is currently " + weatherdescription + "<p>");
            res.write("<img src="+imageurl+">");
            res.send();
        });
    });
})

app.get("/", function(req, res){

    res.sendFile(__dirname + "/index.html");
     
});


app.listen(3000, function(){
    console.log("server staring at port 3000");
});