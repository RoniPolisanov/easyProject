const express = require('express');
const app = express();
const {routes} = require('./routes/routes');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8000;
const cors = require('cors');

var rawBodySaver = (req, res, buf, encoding) => {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || 'utf8');
  }
}

app.set('port', PORT);
app.use(cors());

//  refers root to API file
app.use('/', express.static('./public'));
app.use('/assets', express.static(`${__dirname}/public`));

app.use(function (req, res, next) {
  res.setHeader("Content-Type", "application/json");
  next();
});

// app.use(bearerToken());

app.use(express.static("."));
app.use(bodyParser.json());         // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true,
  limit: process.env.REQUEST_LIMIT || '10mb',
  type: 'application/x-www-form-urlencoded',
  parameterLimit: 50000
}));

// @TODO: Implement process.env.REQUEST_LIMIT
app.use(bodyParser.json({ verify: rawBodySaver, limit: process.env.REQUEST_LIMIT || '10mb' }));
app.use(bodyParser.raw({ verify: rawBodySaver, type: '*/*', limit: process.env.REQUEST_LIMIT || '10mb' }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, WWW-Authenticate");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});
routes(app);
app.all('/*', (req, res) => {
  res.status(404).send({ "Message": `This page was not found` });

  // respond with html page
  if (req.accepts('html')) {
    res.render('404', { url: req.url });
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`)
})