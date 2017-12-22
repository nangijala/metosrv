const express        = require('express');
const bodyParser     = require('body-parser');
const app            = express();
const fs             = require('fs')

// Read config module.exports.filePath = '/..../data.json'
const dotconf = require("./config")

// static
app.use("/static", express.static(__dirname + '/static')); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
  
// set template engine
app.set('view engine', 'pug')

app.get('/', function (req, res) {
  var data = JSON.parse( fs.readFileSync(dotconf.filePath) )

  var obj = data.pop()
  var tempOutside = obj.air
  var colorClass = ""
  if( tempOutside < 0)
    colorClass = "cold"
  var tags = { innen: `Innen: ${obj.innen} °C`, color : colorClass, aussen: `Aussen: ${temp} °C`, created: obj.created, message: 'Hello there!' }
  res.render('index',tags)    
});

const port = 8000;
app.listen(port, () => {
  console.log('We are live on ' + port);
});
