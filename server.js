const express = require('express');
const db = require('./database/database');
const app = express();
const PORT = process.env.PORT || 5000;

app.set('port', PORT)
   .use(express.static('static'))
   .get('/pg', db.helloWorldQuery)
   .get('/searchWords', db.searchWords)
   .get('/getRelatedWords', db.getRelatedWords)
   .listen(app.get('port'), () => {
       console.log('Listening on port: ' + app.get('port'));
   });
