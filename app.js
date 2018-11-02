'use strict';  //use ES6
const http = require('http');
const https = require('https');
const express = require('express');
const bParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const fs = require('fs');
const mongoClient = require("mongodb").MongoClient;
const app = express();

app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));
//project libs use
app.use(bParser.urlencoded({limit: '50mb'}));
app.use(bParser.json());
app.use(express.static(__dirname + '/publick/'));
app.use(cookieParser());
app.use(bParser.raw({limit: '50mb'}));

//routes pages
const index = require('./routes/getIndex');
const tovar = require('./routes/getTovar');
const get404 = require('./routes/get404');
const login = require('./routes/getLogin');
const panel = require('./routes/admin/panel');
const oplata = require('./routes/getOplata');
const details = require('./routes/getDetails');
const contacts = require('./routes/getContacts');
const payment = require('./routes/getPayment');
const account = require('./routes/getAccount');
const setNumbers = require('./controllers/controllerSetNumbers');


app.use('/', index);
app.use('/shop*', tovar);
app.use('/login', login);
app.use('/panel', panel);
app.use('/oplata', oplata);
app.use('/details', details);
app.use('/contacts', contacts);
app.use('/payment', payment);
app.use('/profile', account);
app.use('/setNumbers*', setNumbers);

app.get('*', get404);


const search = require('./controllers/controllerSearch');
app.post('/search', search);

const PostTovar = require('./controllers/controllerTovar');
app.post('/tovar', PostTovar);

const setStars = require('./controllers/controllerTovar');
app.post('/setStars', setStars);

const SendMail = require('./controllers/controllerSendMail');
app.post('/sendMessage', SendMail);

const getbasket = require('./controllers/controllerGetBasket');
app.post('/getbasket', getbasket);

const auth = require('./controllers/controllerAuthification');
app.post('/auth', auth);

const create_accaunt = require('./controllers/controllerAuthification');
app.post('/create_accaunt', create_accaunt);

const newComment = require('./controllers/controllerComments');
app.post('/newComment', newComment);



/*ADMIN*/
//Получить список товаров
const AdmiGetTovar = require('./controllers/admin/controllerTovar');
app.post('/getAdmTovar', AdmiGetTovar);
//удалить товар
const delAdmTovar = require('./controllers/admin/controllerTovar');
app.post('/delAdmTovar', delAdmTovar);
//создать или отредактировать товар
const setAdmTovar = require('./controllers/admin/controllerTovar');
app.post('/setAdmTovar', setAdmTovar);
//получить список меню
const getMenu = require('./controllers/admin/controllerMenu');
app.post('/getMenu', getMenu);
//добавить категорию меню
const addCategory = require('./controllers/admin/controllerMenu');
app.post('/addCategory', addCategory);
//обновить логотип сайта
const updateAva = require('./controllers/admin/controllerUpdateData');
app.post('/updateAva', updateAva);
//выбрать другой загрузчик сайта
const updateLoader = require('./controllers/admin/controllerUpdateData');
app.post('/updateLoader', updateLoader);
//Обновить локализацию индекса
const updateLocal = require('./controllers/admin/controllerUpdateData');
app.post('/updateLocal', updateLocal);
//обновить локализацию раздела товар
const updateLocalTovar = require('./controllers/admin/controllerUpdateData');
app.post('/updateLocalTovar', updateLocalTovar);
//обновить заголовок индекса
const saveTitle = require('./controllers/admin/controllerUpdateData');
app.post('/saveTitle', saveTitle);
//управление сайтом (открыт/в разработке)
const siteStatus = require('./controllers/admin/controllerUpdateData');
app.post('/siteStatus', saveTitle);
//получить список посетителей
const getCounters = require('./controllers/admin/controllerCounters');
app.post('/getCounters', getCounters);
//Редактирование соц сетей
const saveSocials = require('./controllers/admin/controllerSocials');
app.post('/saveSocials', saveSocials);

const setStatusVisibiles = require('./controllers/admin/controllerTovar');
app.post('/SetStatusVisibile', setStatusVisibiles);

const maxAImenu = require('./controllers/admin/controllerMenu');
app.post('/maxAImenu', maxAImenu);

const removecategory = require('./controllers/admin/controllerMenu');
app.post('/removecategory', removecategory);

app.listen(80, function(){
  global.baseName = 'VERNISSAGE';
  global.baseIP = 'mongodb://localhost:27017/';
  global.online = 0;
  console.warn('STARTED VERNISSAGE SERVER ON PORT: 80');
});

// var options = {
//   key: fs.readFileSync('./ssl/apache-selfsigned.key'),
//   cert: fs.readFileSync('./ssl/apache-selfsigned.crt')
// };
// https.createServer(options, app).listen(443);
