'use strict';  //use ES6
const http = require('http');
const https = require('https');
const express = require('express');
const bParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fs = require('fs');

const app = express();

//project libs use
app.use(bParser.urlencoded({extended: true}));
app.use(bParser.json());
app.use(express.static(__dirname + '/publick/'));
app.use(cookieParser());

//routes pages
const index = require('./routes/getIndex');

app.use('/', index);


app.listen(4000, function(){
  console.warn('started server Dark World from port: 4000');
});




// var options = {
//   key: fs.readFileSync('test/fixtures/keys/agent2-key.pem'),
//   cert: fs.readFileSync('test/fixtures/keys/agent2-cert.cert')
// };
// app.listen(443, options, function(){
//   console.warn('started server Dark World from port: 443');
// })

// http.createServer(app).listen(8000);
// This line is from the Node.js HTTPS documentation.
// var options = {
  // key: fs.readFileSync('test/fixtures/keys/agent2-key.pem'),
  // cert: fs.readFileSync('test/fixtures/keys/agent2-cert.cert')
// };

// https.createServer(options, app).listen(443);


// const mongoClient = require("mongodb").MongoClient;

// const url = "mongodb://localhost:27017/"; //url from mongoDB dataBase

// mongoClient.connect(url, function(err, client){
//     const db = client.db("UsersData");
//     const collection = db.collection("users");
//
//     if(err) return console.log(err);
//
//        collection.find().toArray(function(err, results){
//            console.log(results);
//            client.close();
//        });
//
//       //  db.collection("users").remove({name: 'Tom'}, function(err, obj) {
//       //     if (err) throw err;
//       //     console.log(obj.result.n + " document(s) deleted");
//       //     client.close();
//       // });
// });
