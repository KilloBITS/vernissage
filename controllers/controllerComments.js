'use strict';
const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const mongoClient = require("mongodb").MongoClient;
const bParser = require('body-parser');

router.use(cookieParser());

router.post('/newComment', function(req, res, next){
  if (req.session && req.session.user !== undefined) //&& req.session.admin && req.session.user !== undefined
    {
      mongoClient.connect(global.baseIP, function(err, client){
        const db = client.db(global.baseName);
        const comments = db.collection("comments");
        if(err) return console.log(err);

        // var NEXT_AI = results_users[0].AI + 1;
        var NEW_COMMENT = {};
        NEW_COMMENT.author = req.session.user.split('@')[0];
        NEW_COMMENT.text = req.body.text;
        NEW_COMMENT.tovar_AI = parseInt(req.body.tovai);
        // NEW_COMMEN
        comments.insertOne(NEW_COMMENT);
        res.send({code: 500, msg: NEW_COMMENT});
      });
    }else{
      res.send({code: 403});
    }


});

module.exports = router;
