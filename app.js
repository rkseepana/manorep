var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var faqRouter = require('./routers/faq');
var dfRouter = require('./routers/webhook')

var app = express();

var PORT = 8080;
var HOST_NAME = 'localhost';
var DATABASE_NAME = 'FAQ';

mongoose.connect('mongodb://' + HOST_NAME + '/' + DATABASE_NAME);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/webhook', dfRouter);
app.use('/api', faqRouter);

app.listen(PORT, function () {
  console.log('Listening on port ' + PORT);
});
