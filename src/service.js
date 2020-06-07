const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const dbConnection = require('./db')
const PORT = process.env.PORT || 8000

app.use(express.static("."));
app.use(bodyParser.json());         // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(bodyParser.raw());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, WWW-Authenticate");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

module.exports = () => {
  //connect to mongoDB
  dbConnection()

  app.all('/*', (req, res) => {
    res.status(404);

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
}