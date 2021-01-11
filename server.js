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
var listener = app.listen(8000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// APP
/*
 * The app uses two routes, one route for route parameters for the user to use
 * the api by typing the date on the link, the other when the user submits a form
 * using a GET route
 * The first uses route parameters
 */
app.get("/api/timestamp/:date?", (req, res, next) => {
	let data = req.params.date;				// The date parameter
	validateDate(data, req);				
		// The same middleware is used in both routes to validate the data provided
	next();
}, (req, res) => {
		// Method that handles responses
	handleResponse(req, res);
});

/* When the user submits the form using a GET route. It goes to route query */
app.get("/api/timestamp/", (req, res, next) => {
	let data = req.query.date;
	validateDate(data, req);
	next();
}, (req, res) => {
	handleResponse(req, res);
});

/**
 * @method validateDate method called in the middleware to validate the data first
 * and sets the date before response
 * @param {String|undefined} data The data queried. It may be a string,
 * it can also be undefined. That is the user just used the api endpoint or just 
 * submitted the form without any data_string
 * @param {Object} req The requeset object received
 */
function validateDate(data, req) {
	let date = {};					// The date object at the end of the day
	
	
	/* Now, if the data parameter or query is empty, the "data" variable should be 
	undefined. If this is so, then the date and time should be today's date and time */
	if (data) {
		
		/* Used when the date_string supplied by the user is a number actually in unix form. 
		It is received as a string even though Date() only accepts values of type Number
		in unix form. So it should check if what was supplied is loosely equal to the 
		same value converted to Number. Then convert it to a "Number" that can be used 
		by the Date() constructor to construct a Date object */
		if (data == +data) {
			data = +data;		// A unix number was provided.
		}

		date = new Date(data);
	} else {
		// data is undefined. Today's date and time
		date = new Date();
	}

	/* An invalid value was provided as date. Error!*/
	if (date.toUTCString() === "Invalid Date") {
		req.error = date.toUTCString();
	} else {
		req.date = date;
	}
}

/**
 * @method handleResponse Handles the response to the user. It there's an error,
 * send an error. Otherwise send the JSON containing the data in unix 
 * and utc format.
 * @param {Object} req The request object - The middleware has modified it and it will
 * determine the response.
 * @param {Object} res The response object
*/
function handleResponse(req, res) {
	if (req.error) {
		res.json({error: req.error});		// Invalid date provided
	} else {
		res.json({
			unix: req.date.getTime(),
			utc: req.date.toUTCString()
		});
	}
}