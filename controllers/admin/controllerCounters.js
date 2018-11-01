'use strict';
const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const mongoClient = require("mongodb").MongoClient;
const bParser = require('body-parser');

router.use(cookieParser());

var getCounters = (req, res, next) => {
  mongoClient.connect(global.baseIP ,function(err, client){
   const db = client.db(global.baseName);
   const counters  = db.collection("counters");
   if(err) return console.log(err);
   counters.find().toArray(function(err, results){
       res.send({code:500, counters_data: results});
   });
  });
};


router.post('/getCounters', getCounters, function(req, res, next){});

module.exports = router;