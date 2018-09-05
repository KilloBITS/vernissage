'use strict';
const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const mongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/"; //url from mongoDB dataBase

router.use(cookieParser());

router.post('/locInit', function(req, res){
  // res.send({code:500, data: undefinded});
});

module.exports = router;
