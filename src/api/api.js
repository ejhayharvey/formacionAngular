const express = require('express')
const path = require('path');
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();

app.use(cors())

// Serve only the static files form the dist directory
app.use(express.static(__dirname + './dist/ProjectAngular'));

app.get('/*', function(req,res) {ProjectAngular

res.sendFile(path.join(__dirname + './dist/ProjectAngular/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.post('/register', (req, res)=> {
  console.log(req, 'req');
  console.log(req.body, 'body');
  const body = req.body;
  if(body.name === 'Josep'){
    res.status(404)
    res.send()
  }else{
    res.send({"p":"SUCCESSFULLY REGISTERED!"});
  }
})

app.listen(8000, () => {
  console.log('server listening on port 8000!')
});

