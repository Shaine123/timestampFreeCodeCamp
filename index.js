// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});



app.get("/api", function (req, res) {
  const {dates} = req.params
  const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let obj = new Date()
  
  
  res.json({
     unix: obj.getTime(),
     utc: obj.getTime()
  })
});


// your first API endpoint... 
app.get("/api/:dates?", function (req, res) {
    const {dates} = req.params
    let obj = ''
     

    if(isNaN(dates)){
      if(new Date(dates.toString()).toString() === 'Invalid Date'){
        res.json({error:'Invalid Date'}) 
      }else{
        obj = new Date(`${dates}`)

        res.json(
          {
            unix: obj.getTime(), 
            utc: obj.toUTCString()
          }
        )
      }
    }else{
       obj = new Date(parseInt(dates))
       console.log()
       res.json(
        {
          unix: obj.getTime(), 
          utc: obj.toUTCString()
        }
      )
    }
   
});




// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
