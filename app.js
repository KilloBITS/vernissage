'use strict';  //use ES6

const http = require('http');
const express = require('express');
const bParser = require('body-parser');
const cookieParser = require('cookie-parser');

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


//created and started web server node.js
app.listen(80, function(){
  console.warn('started server Dark World from port: 80');5
});
