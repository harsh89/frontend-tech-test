const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var cors = require('cors')

function appMiddleware(app) {
	// Middleware for Static File - https://expressjs.com/en/starter/static-files.html
	// app.use('/static', express.static(path.resolve(__dirname, 'public')));
	const publicPath = path.resolve('server/public');
	console.log('publicPath: ', publicPath);
	app.use('/static', express.static(publicPath));

	// https://medium.com/@adamzerner/how-bodyparser-works-247897a93b90

	// JSON Request: https://stackoverflow.com/a/10007542
	app.use(bodyParser());

	// Form Data: https://stackoverflow.com/a/38763341
	app.use(
		bodyParser.urlencoded({
			extended: true
		})
  );

  var corsOptions = {
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With', 'Accept'],
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
  app.use(cors(corsOptions));

  // app.use(cors());

	// app.use(function(req, res, next) {
	// 	console.log('Time:', Date.now());
	// 	next();
	// });

	// https://www.claudiokuenzler.com/blog/507/node.js-error-bodyparser-is-no-longer-bundled-with-express#.WnSNSZP1Xxs
	// app.use(express.bodyParser());
}

module.exports = appMiddleware;
