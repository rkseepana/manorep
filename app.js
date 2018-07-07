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

//var url = 'mongodb://raju:abc123@ds129821.mlab.com:29821/faq?authMechanism=SCRAM-SHA-1';
var url = process.env.MONGODB_URI;
mongoose.connect(url, {
  useMongoClient: true
});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//mongoose.connect('mongodb://rkseepana:@lordM369' +'@' + HOST_NAME + '/' + DATABASE_NAME);
//var url = 'mongodb://localhost:27017/my_database_name'
/*MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);

    // do some work here with the database.

    //Close connection
   // db.close();
  }
});*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/webhook', dfRouter);
app.use('/api', faqRouter);

app.listen(PORT, function () {
  console.log('Listening on port ' + PORT);
});
