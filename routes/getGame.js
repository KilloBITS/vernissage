'use strict';

var express = require('express');
var routerReg = express.Router();

routerReg.get('/', function(req, res){
  res.render('game.ejs')
});

module.exports = routerReg;
