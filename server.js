// Requires \\
var fs          = require('fs')
var express     = require('express');
var bodyParser  = require('body-parser');
var logger      = require('morgan');

// Create Express App Object \\
var app = express();

// Application Configuration \\
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(__dirname + '/public'));

// Routes \\

app.get('/', function(request, response){
  fs.readFile('./public/index.html',function(error, body){
    response.header('Content-Type','text/html')
    response.send(body)
  })
})

app.get('/:filename',function(request, response){
  fs.readFile('./public/' + request.params.filename, function(error,body){
    if(error==null){
      response.header('Content-Type','text/html')
      response.send(body)
    } else {
      fs.readFile('./public/default.html', function(error,body){
        response.header('Content-Type','text/html')
        response.send(body)
      })
    }
  })
})

// Creating Server and Listening for Connections \\
var port = 3000
app.listen(port, function(){
  console.log('Server running on port ' + port);

})
