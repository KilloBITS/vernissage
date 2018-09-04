'use strict';
const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const mongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/"; //url from mongoDB dataBase
const bParser = require('body-parser');

router.use(cookieParser());

var initFunction = (req, res, next) => {
  res.send({code:500, userDATA: JSON.stringify(results[0])})
  console.log(req.cookies.uID);
};

router.post('/init', initFunction, function(req, res, next){});

module.exports = router;
