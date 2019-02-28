const express = require('express');
const app = express();
const port = 3000;

const appMiddleware = require('./middleware');
appMiddleware(app);

const appRouting = require('./routing');
appRouting(app);

app.listen(port, () => console.log('Example app listening on port 3000!'));
