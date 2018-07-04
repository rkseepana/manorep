var express = require('express');
var Faq = require('../models/faq');

var faqRouter = express.Router();

faqRouter
  .route('/articles')
  .post(function (request, response) {

    console.log('POST /articles');

    var faq = new Faq(request.body);

    faq.save();

    response.status(201).send(faq);
  })
  .get(function (request, response) {

    console.log('GET /articles');

    Faq.find(function (error, faq) {

      if (error) {
        response.status(500).send(error);
        return;
      }

      console.log(faq);

      response.json(faq);
    });
  });

  faqRouter
  .route('/articles/:name')
  .get(function (request, response) {

    console.log('GET /articles/:aname');
    
    var aname = request.params.name;
    aname.replace(/%20/g, " ");
    console.log("article name", aname);
    //var regexValue='\.'+aname+'\.';
    //{"article":new RegExp(regexValue, 'i')}

    Faq.find({"article":new RegExp(aname)}, function (error, faq) {

      if (error) {
        response.status(500).send(error);
        return;
      }

      console.log(faq);

      response.json(faq);

    });
  })
  .put(function (request, response) {

    console.log('PUT /items/:itemId');

    var fid = request.params.fId;

    Faq.findOne({ id: fid }, function (error, faq) {

      if (error) {
        response.status(500).send(error);
        return;
      }

      if (faq) {
        faq.article = request.body.article;
        faq.desc = request.body.desc;
        faq.rating = request.body.rating;
        
        Faq.save();

        response.json(faq);
        return;
      }

      response.status(404).json({
        message: 'faq with id ' + fid + ' was not found.'
      });
    });
  })
  .patch(function (request, response) {

    console.log('PATCH /items/:itemId');

    var itemId = request.params.itemId;

    Faq.findOne({ id: itemId }, function (error, item) {
      
      if (error) {
        response.status(500).send(error);
        return;
      }

      if (item) {

        for (var property in request.body) {
          if (request.body.hasOwnProperty(property)) {
            if (typeof item[property] !== 'undefined') {
              item[property] = request.body[property];
            }
          }
        }

        // if (request.body.name) {
        //   item.name = request.body.name;
        // }

        // if (request.body.description) {
        //   item.description = request.body.description;
        // }

        // if (request.body.quantity) {
        //   item.quantity = request.body.quantity;
        // }

        item.save();

        response.json(item);
        return;
      }

      response.status(404).json({
        message: 'Item with id ' + itemId + ' was not found.'
      });
    });
  })
  .delete(function (request, response) {

    console.log('DELETE /items/:itemId');

    var itemId = request.params.itemId;

    Faq.findOne({ id: itemId }, function (error, item) {
      
      if (error) {
        response.status(500).send(error);
        return;
      }

      if (item) {
        item.remove(function (error) {

          if (error) {
            response.status(500).send(error);
            return;
          }

          response.status(200).json({
            'message': 'Item with id ' + itemId + ' was removed.'
          });
        });
      } else {
        response.status(404).json({
          message: 'Item with id ' + itemId + ' was not found.'
        });
      }
    });
  });

module.exports = faqRouter;