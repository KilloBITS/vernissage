'use strict';
const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const mongoClient = require("mongodb").MongoClient;
const bParser = require('body-parser');

router.use(cookieParser());

router.post('/create_accaunt', function(req, res, next){
    mongoClient.connect(global.baseIP, function(err, client){
      const db = client.db(global.baseName);
      const comments = db.collection("comments");
      if(err) return console.log(err);

      var NEXT_AI = results_users[0].AI + 1;
      var NEW_COMMENT = {};
      NEW_COMMEN.author = req.body.user.split('@')[0];
      NEW_COMMEN.text = req.body.text;
      NEW_COMMEN.tovar_AI = req.body.tovai;
      // NEW_COMMEN
      users.insertOne(NEW_COMMENT);

      res.send({code: 500});
    });

});

module.exports = router;
