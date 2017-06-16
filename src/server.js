let express            = require('express'),
	app                = express(),
	bodyParser         = require('body-parser'),
	morgan             = require('morgan'),
	port               = process.env.PORT || 8080,
	request            = require('request'),
	path               = require('path');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

// bundle our routes
let apiRoutes = express.Router();

// Serve pandash app
app.use(express.static(__dirname + '/'));

// frontpage request
app.get('/', function(req, res) {
  res.sendfile(path.join(__dirname, '../index.html'));
});

app.use(function(err, req, res, next) {
    console.dir(err);

    //set response error here for morgan module to log
    res.error = err;

    res.status(500).send('error');
});

// Start the server
app.listen(port);
console.log('You got it, Tristan. This server is for Pandash. Found at port:' + port);
