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

// /* GMAIL API*/
// const readline = require('readline');
// const {google} = require('googleapis');
//
// const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
// const TOKEN_PATH = 'token.json';
//
// fs.readFile('credentials.json', (err, content) => {
//   if (err) return console.log('Error loading client secret file:', err);
//   authorize(JSON.parse(content), listLabels);
// });
//
// function authorize(credentials, callback) {
//   const {client_secret, client_id, redirect_uris} = credentials.installed;
//   const oAuth2Client = new google.auth.OAuth2(
//       client_id, client_secret, redirect_uris[0]);
//
//   // Check if we have previously stored a token.
//   fs.readFile(TOKEN_PATH, (err, token) => {
//     if (err) return getNewToken(oAuth2Client, callback);
//     oAuth2Client.setCredentials(JSON.parse(token));
//     callback(oAuth2Client);
//   });
// }
//
// function getNewToken(oAuth2Client, callback) {
//   const authUrl = oAuth2Client.generateAuthUrl({
//     access_type: 'offline',
//     scope: SCOPES,
//   });
//   console.log('Authorize this app by visiting this url:', authUrl);
//   const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   });
//   rl.question('Enter the code from that page here: ', (code) => {
//     rl.close();
//     oAuth2Client.getToken(code, (err, token) => {
//       if (err) return console.error('Error retrieving access token', err);
//       oAuth2Client.setCredentials(token);
//       // Store the token to disk for later program executions
//       fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
//         if (err) return console.error(err);
//         console.log('Token stored to', TOKEN_PATH);
//       });
//       callback(oAuth2Client);
//     });
//   });
// }
//
// function listLabels(auth) {
//   const gmail = google.gmail({version: 'v1', auth});
//   gmail.users.labels.list({
//     userId: 'me',
//   }, (err, res) => {
//     if (err) return console.log('The API returned an error: ' + err);
//     const labels = res.data.labels;
//     if (labels.length) {
//       console.log('Labels:');
//       labels.forEach((label) => {
//         console.log(`- ${label.name}`);
//       });
//
//     } else {
//       console.log('No labels found.');
//     }
//   });
//   getRecentEmail(auth);
// }
//
// function getRecentEmail(auth) {
//     const gmail = google.gmail({version: 'v1', auth});
//     gmail.users.messages.list({auth: auth, userId: 'me', maxResults: 1,}, function(err, response) {
//       console.log(response)
//       //   if (err) {
//       //       console.log('The API returned an error: ' + err);
//       //       return;
//       //   }
//       //
//       //
//       // var message_id = response['data']['messages'][0]['id'];
//       //
//       // // Retreive the actual message using the message id
//       // gmail.users.messages.get({auth: auth, userId: 'me', 'id': message_id}, function(err, response) {
//       //     if (err) {
//       //         console.log('The API returned an error: ' + err);
//       //         return;
//       //     }
//       //
//       //    console.log(response['data']);
//       // });
//     });
// }
// const ViberBot = require('viber-bot').Bot;
// const BotEvents = require('viber-bot').Events;
//
// const bot = new ViberBot({
// 	authToken: "48b39990fbe7d092-4a58ca694be85a6d-8f368a42bb2bdf5e",
// 	name: "EchoBot",
// 	avatar: "http://viber.com/avatar.jpg" // It is recommended to be 720x720, and no more than 100kb.
// });
//
// // Perfect! Now here's the key part:
// bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
// 	// Echo's back the message to the client. Your bot logic should sit here.
// 	response.send(message);
// });
//
// // Wasn't that easy? Let's create HTTPS server and set the webhook:
//
// const port = process.env.PORT || 4010;
//
// // Viber will push messages sent to this URL. Web server should be internet-facing.
//
//
// const TextMessage = require('viber-bot').Message.Text;
//
//
//
//
// http.createServer(bot.middleware()).listen(port, () => {
//   console.log("started viber");
//   bot.getBotProfile().then(response => console.log(`Public Account Named: ${response.name}`));
//
//   // bot.sendMessage(userProfile, new TextMessage("Thanks for shopping with us"));
// });
//

app.listen(80, function(){
  global.baseName = 'VERNISSAGE';
  global.baseIP = 'mongodb://localhost:27017/';
  global.online = 0;
  console.warn('STARTED VERNISSAGE SERVER ON PORT: 4000');
});

// const Nexmo = require('nexmo');
// const nexmo = new Nexmo({
//   apiKey: "a616dae5",
//   apiSecret: "01oaiMhN0lsZ3L2g"
// });
//
// const from = 'Nexmo'
// const to = '380664273160'
// const text = 'kuku'
//
// nexmo.message.sendSms(from, to, text)


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
