var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var faqRouter = require('./routers/faq');
var dfRouter = require('./routers/webhook')

var app = express();
//var MongoClient = mongodb.MongoClient;
var PORT = process.env.PORT || 5000;
var HOST_NAME = 'ds129821.mlab.com:29821';
var DATABASE_NAME = 'faq';

var url = process.env.MONGODB_URI;
mongoose.connect(url, {
  useMongoClient: true
});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/webhook', dfRouter);
app.use('/api', faqRouter);

app.listen(PORT, function () {
  console.log('Listening on port ' + PORT);
});
