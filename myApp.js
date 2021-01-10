var express = require('express');
var app = express();

/* Mount a logger root-level middleware */
app.use(logger);
function logger(req, res, next) {
	console.log(req.method + " " + req.path + " - " + req.ip);
	next();
}

app.get("/api/timestamp/:date", (req, res, next) => {
	const date = new Date(req.params.date);
	console.log(date);
	if (date === "Invalid Date") {
		req.error = date;
	} else {
		req.date = date;
	}
	next();
}, (req, res) => {
	if (req.error) {
		res.json({error: req.error});
	} else {
		res.json({
			unix: req.date.getTime(),
			utc: req.date.toUTCString()
		});
	}
});


module.exports = app;