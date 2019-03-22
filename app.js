'use strict';  //use ES6
const http = require('http');
const https = require('https');
const express = require('express');
const bParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const fs = require('fs');
const mongoClient = require("mongodb").MongoClient;
const request = require("request");
const app = express();
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
// const analytics = require('node-analytics');

app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
        url: 'mongodb://localhost:27017/SHOP_DB'
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 * 2 // two weeks
    }
}));

//project libs use
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'})); 
app.use(bParser.urlencoded({limit: '50mb'}));
app.use(bParser.json());
app.use(express.static(__dirname + '/publick/'));
app.use(cookieParser());
app.use(bParser.raw({limit: '50mb'}));
// app.use(analytics());


/* Global methods*/
require('./controllers/system/controllerLanguage');
require('./controllers/system/controllerDate');
require('./controllers/system/controllerNotification');

//User routes
const index = require('./routes/getIndex');
const tovar = require('./routes/getTovar');
const getStock = require('./routes/getStock');
const get404 = require('./routes/get404');
const login = require('./routes/getLogin');
const oplata = require('./routes/getOplata');
const details = require('./routes/getDetails');
const contacts = require('./routes/getContacts');
const payment = require('./routes/getPayment');
const account = require('./routes/getAccount');
const setNumbers = require('./controllers/controllerSetNumbers');
const delivery = require('./routes/getDelivery');
const termsofuse = require('./routes/getTermsofuse');
const pp = require('./routes/getPrivacyPolicy');
const dap = require('./routes/getDAP');
const map = require('./routes/getSiteOfMap');
const about = require('./routes/getAbout');

app.use('/', index);
app.use('/shop*', tovar);
app.use('/stock*', getStock);
app.use('/login', login);
app.use('/oplata', oplata);
app.use('/details', details);
app.use('/contacts', contacts);
app.use('/payment', payment);
app.use('/profile', account);
app.use('/setNumbers*', setNumbers);
app.use('/delivery*', delivery);
app.use('/termsofuse', termsofuse);
app.use('/privacy_policy', pp);
app.use('/discounts-and-promotions', dap);
app.use('/site_of_map', map);
app.use('/about', about);


//Admin routes
const admAbout = require('./routes/panel/getAboutPanel');
const admAPI = require('./routes/panel/getAPIPanel');
const admCatalog = require('./routes/panel/getCatalogPanel');
const admCatalogEdit = require('./routes/panel/getaddfromeditTovar');
const admDB = require('./routes/panel/getDBPanel');
const admFaq = require('./routes/panel/getFaqPanel');
const admIndex = require('./routes/panel/getIndexPanel');
const admLocal = require('./routes/panel/getLocalPanel');
const admNews = require('./routes/panel/getNewsPanel');
const admHead = require('./routes/panel/getHeadPanel');
const admNewsEdit = require('./routes/panel/getaddfromeditNews');
const admPaydel = require('./routes/panel/getPaydelPanel');
const admSystem = require('./routes/panel/getSystemPanel');
const admUsers = require('./routes/panel/getUsersPanel');
const admVisual = require('./routes/panel/getVisualPanel');
const admMenu = require('./routes/panel/getMenuPanel');
const admPrivacePolicy = require('./routes/panel/getPrivacePolicyPanel');
const admTermsOfUse = require('./routes/panel/getTermsOfUsePAnel');

app.use('/about-panel', admAbout);
app.use('/API-panel', admAPI);
app.use('/catalog-panel', admCatalog);
app.use('/editTovar*', admCatalogEdit);
app.use('/DB-panel', admDB);
app.use('/index-panel', admIndex);
app.use('/local-panel', admLocal);
app.use('/news-panel', admNews);
app.use('/head-panel', admHead);
app.use('/editNews*', admNewsEdit);
app.use('/paydel-panel', admPaydel);
app.use('/system-panel', admSystem);
app.use('/users-panel', admUsers);
app.use('/visual-panel', admVisual);
app.use('/faq-panel', admFaq);
app.use('/menu-panel', admMenu);
app.use('/privacepolicy-panel', admPrivacePolicy);
app.use('/termsofuse-panel', admTermsOfUse);


const podpiska = require('./controllers/controllerNewCallUserTovar');
app.post('/getMessagesFromTovar', podpiska);

const status = require('./controllers/system/controllerGetStatus');
app.post('/getstatus', status);

const search = require('./controllers/controllerSearch');
app.post('/search', search);

const PostTovar = require('./controllers/controllerTovar');
app.post('/tovar', PostTovar);

const setStars = require('./controllers/controllerTovar');
app.post('/setStars', setStars);

const SendMail = require('./controllers/controllerSendMail');
app.post('/sendmessage', SendMail);

const getbasket = require('./controllers/controllerGetBasket');
app.post('/getbasket', getbasket);

const auth = require('./controllers/controllerAuthification');
app.post('/auth', auth);

const create_accaunt = require('./controllers/controllerAuthification');
app.post('/create_accaunt', create_accaunt);

const newComment = require('./controllers/controllerComments');
app.post('/newComment', newComment);

const updateAvaUser = require('./controllers/controllerProfile');
app.post('/updateAvaUser', updateAvaUser);

const addToJelaniya = require('./controllers/controllerProfile');
app.post('/addToJelaniya', addToJelaniya);

const counters = require('./controllers/controllerCounters');
app.post('/counters', counters);

const stock = require('./controllers/controllerStock');
app.post('/getStock', stock);

const newPartnersNumber =  require('./controllers/controllerPartners');
app.post('/newPartnersNumber', newPartnersNumber);

const getMapPoint = require('./controllers/controllerGetMap');
app.post('/getMapPoint', getMapPoint)


/*ADMIN*/
const panelNewsController = require('./controllers/panel/panelNews_controller');
app.post('/setNewNews', panelNewsController);
app.post('/saveEditNews', panelNewsController);
app.post('/setRemoveNews', panelNewsController);

const usersPanelMethods = require('./controllers/panel/panelUser_controller');
app.post('/setAdmUser', usersPanelMethods);
app.post('/deleteUser', usersPanelMethods);
app.post('/blockUser', usersPanelMethods);

const aboutPanelMethods = require('./controllers/panel/panelAbout_controller');
app.post('/saveAboutText', aboutPanelMethods);

const privacepolicyPanelMethods = require('./controllers/panel/panelPrivacePolicy_controller');
app.post('/savePrivacePolicyText', privacepolicyPanelMethods);

const termsofusePanelMethods = require('./controllers/panel/panelTermsOfUse_controller');
app.post('/saveTermsOfUseText', termsofusePanelMethods);

const aboutCatalogMethods = require('./controllers/panel/panelCatalog_controller');
app.post('/getTypesOfCatalog', aboutCatalogMethods);
app.post('/addTovar', aboutCatalogMethods);
app.post('/setcolor', aboutCatalogMethods);
app.post('/saveTovar', aboutCatalogMethods);
app.post('/removeTovar', aboutCatalogMethods);
app.post('/addImportFileTovar', aboutCatalogMethods);

const menuPanelMethods = require('./controllers/panel/panelMenu_controller');
app.post('/gettypes', menuPanelMethods);
app.post('/saveeditlink', menuPanelMethods);
app.post('/addcategory', menuPanelMethods);
app.post('/addtype', menuPanelMethods);
app.post('/removecategory', menuPanelMethods);

var options = {
  key: fs.readFileSync('./ssl/apache-selfsigned.key'),
  cert: fs.readFileSync('./ssl/apache-selfsigned.crt')
};

const Nexmo = require('nexmo')
const nexmo = new Nexmo({
  apiKey: '8e5f959d',
  apiSecret: 't3KDkf6suo3RQBjV'
})
app.get('/logout', function(req, res) {
  req.session.destroy();
  res.redirect('/');
});

app.get('*', get404);
app.listen(80, function(){
  global.baseName = 'SHOP_DB';
  global.baseIP = 'mongodb://localhost:27017/';
  global.online = 0;
  // require('./controllers/telegram/telegaBOT');
  console.warn('STARTED HTTP LM_SHOP SERVER ON PORT: 80');
  PARSE_DB()
});
//проверка базы
var DEFAULT_COLLECTION = ['CONFIG','CONTACTS','DISCOUNTS','LOCALE','LOGS','MAINSLIDE','MANUFACTURERS','MENU','NEWS','NOTIFICATION','PARTNERS','PAYMENTANDDELIVERY','PAYMENTS','TOVAR', 'USERS']
var PARSE_DB = function(){
  mongoClient.connect(global.baseIP, function(err, database) {
    const db = database.db(global.baseName);
    if (err) throw err;
    // db.listCollections().toArray(function(err, collInfos) {
    //   for(var i = 0; i < DEFAULT_COLLECTION.length; i++){
    //     if(collInfos.find(x => x.name === DEFAULT_COLLECTION[i]) === undefined){
    //       db.createCollection(DEFAULT_COLLECTION[i], function(err, result) {
    //         if (err) throw err;
    //         console.log("Collection "+ result.name +" is created!");        
    //       });
    //     }
    //   }
    // });  
  });
};
