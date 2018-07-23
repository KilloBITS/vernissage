'use strict';  //use ES6

const http = require('http');
const express = require('express');
const bParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoClient = require("mongodb").MongoClient;


const url = "mongodb://localhost:27017/"; //url from mongoDB dataBase
const app = express();

//project libs use
app.use(bParser.urlencoded({extended: true}));
app.use(bParser.json());
app.use(express.static(__dirname + '/publick/'));
app.use(cookieParser());

//routes pages
const index = require('./routes/getIndex');
// const game = require('./routes/getGame');
// const panel = require('./routes/getPanel');
// const register = require('./routes/getRegister');
// const support = require('./routes/getSupport');

app.use('/', index);
// app.use('/world', game);
// app.use('/panel', panel);
// app.use('/register', register);
// app.use('/support', support);





mongoClient.connect(url, function(err, client){
    const db = client.db("UsersData");
    const collection = db.collection("users");

    if(err) return console.log(err);

       collection.find().toArray(function(err, results){
           console.log(results);
           client.close();
       });

      //  db.collection("users").remove({name: 'Tom'}, function(err, obj) {
      //     if (err) throw err;
      //     console.log(obj.result.n + " document(s) deleted");
      //     client.close();
      // });
});

//created and started web server node.js
app.listen(80, function(){
  console.warn('started server Dark World from port: 80');5
});
