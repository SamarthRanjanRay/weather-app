const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

// this is the api key
const apiKey = '**************************';
var ret;
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')


app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        // used to get clouds and all stuff
        let wc = weather.clouds.all;
        res.render('index', {weather: weather.main.temp, wm: weather.weather[0].main, wd: weather.weather[0].description, wi: weather.weather[0].icon, wp: weather.main.pressure, wh: weather.main.humidity, wmax: weather.main.temp_max, wmin: weather.main.temp_min, wc: wc, city: city, error: null});
      }
    }
  });
})

app.listen(3000, function () {
  console.log('Weather-App listening on port 3000!')
})

function titleCase(str){
   str = str.toLowerCase().split(' ');
   let final = [ ];
    for(let  word of str){
      final.push(word.charAt(0).toUpperCase()+ word.slice(1));
    }
  return final.join(' ')
}
