var express = require('express'),
    app = express(),
    port = process.env.PORT || 8080;


app.use(express.static(__dirname + '/app'));

// set the home page route
app.get('/', function(req, res) {
  res.render('index.html');
});

app.listen(port, function() {
  console.log('This app is running on port: ' + port);
});