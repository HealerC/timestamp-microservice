// server.js
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


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// APP
app.get("/api/timestamp/:date", (req, res, next) => {
	let data = req.params.date;
	validateDate(data, req);
	next();
}, (req, res) => {
	handleResponse(req, res);
});

app.get("/api/timestamp/", (req, res, next) => {
	let data = req.query.date;
	validateDate(data, req);
	next();
}, (req, res) => {
	handleResponse(req, res);
});

function validateDate(data, req) {
	let date = {};
	if (data == +data) {
		data = +data;
	}
	if (data) {
		date = new Date(data);
	} else {
		date = new Date();
	}

	if (date.toUTCString() === "Invalid Date") {
		req.error = date.toUTCString();
	} else {
		req.date = date;
	}
}

function handleResponse(req, res) {
	if (req.error) {
		res.json({error: req.error});
	} else {
		res.json({
			unix: req.date.getTime(),
			utc: req.date.toUTCString()
		});
	}
}