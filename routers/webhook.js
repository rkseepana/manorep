var express = require('express');
var Faq = require('../models/faq');
//const { SimpleResponse } = require("actions-on-google");
//const { dialogflow } = require("actions-on-google");


var dfRouter = express.Router();

//const app = dialogflow({debug: true});
/*app.middleware((conv) => {
    conv.hasScreen =
      conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT');
    conv.hasAudioPlayback =
      conv.surface.capabilities.has('actions.capability.AUDIO_OUTPUT');
  });*/

 
dfRouter
.route('/')
.post(function (request, response) {

console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
var qt = request.body.queryResult.queryText;

Faq.find({"article":new RegExp(qt)}, function (error, faq) {

    if (error) {
      response.status(500).send(error);
      return;
    }

    console.log(faq[0].article);
    if ( faq.length === 1) 
    {
    response.setHeader('Content-Type', 'application/json');
    response.send(JSON.stringify({
        "speech" : faq[0].article,
        "displayText" : faq[0].desc
    })); 
  }
   else
   {
    response.setHeader('Content-Type', 'application/json');
 /*   response.send(JSON.stringify({
        "speech" : "please select from the following",
        "displayText" : "please select from the following",
        "suggestions": [
          {
            "title": faq[0].article
          },
          {
            "title": faq[1].article
          },
          {
            "title": faq[2].article
          }
        ]
    })); */

    response.send(JSON.stringify({
      "payload": {
        "google": {
          "expectUserResponse": true,
          "richResponse": {
            "items": [
              {
                "simpleResponse": {
                  "textToSpeech": "please select an option."
                }
              }
             ],
             "suggestions": [
              {
                "title": faq[0].article
              },
              {
                "title": faq[1].article
              },
              {
                "title": faq[2].article
              }
            ],
            "linkOutSuggestion": {
              "destinationName": "Website",
              "url": "https://assistant.google.com"
            }
          }
        }
      }
    }));
    

   }
 //  response.json(faq);
 /*   var data = {};
    var payload = "payload";
    var google = "google";

*/
 
/*

app.intent('Default Welcome Intent', (conv) => {
  conv.ask(new SimpleResponse({
    speech: 'Hi there!',
    text: 'Hello there!',
  }));

}); */

});
});

module.exports = dfRouter;