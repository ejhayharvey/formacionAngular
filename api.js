const express = require('express')
const path = require('path');
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();

app.use(cors())

// Serve only the static files form the root directory
// in case the build folder is located in the root.
app.use(express.static(__dirname + '/dist/ProjectAngular'));

app.get('/*', function(req,res) {
  res.sendFile(__dirname + '/dist/ProjectAngular/index.html');
  console.log('entramos...');
  
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.post('/register', (req, res)=> {

  const body = req.body;
  if(body.name === 'Josep'){
    res.status(404)
    res.send()
  }else{
    res.send({"p":"SUCCESSFULLY REGISTERED!"});
  }
})
