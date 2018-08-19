'use strict';

const express = require('express');
const router = express.Router();
const mongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/"; //url from mongoDB dataBase

router.get('/', function(req, res, next){
  mongoClient.connect(url, function(err, client){
      const db = client.db("news");
      const collection = db.collection("newsGame");

      if(err) return console.log(err);

         collection.find().toArray(function(err, results){
             res.render('index.ejs',{news: results})
             client.close();
         });

        //  db.collection("users").remove({name: 'Tom'}, function(err, obj) {
        //     if (err) throw err;
        //     console.log(obj.result.n + " document(s) deleted");
        //     client.close();
        // });
  });

});

module.exports = router;
