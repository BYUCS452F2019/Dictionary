const express = require('express');
const db = require('./database/database');
const app = express();
const PORT = process.env.PORT || 5000;

app.set('port', PORT)
<<<<<<< HEAD
    .use(express.static('static'))
    .get('/pg', db.helloWorldQuery)
    .get('/searchWords', db.searchWords)
    .get('/addWord', db.addWord)
    .get('/deleteWord', db.deleteWord)
    .get('/updateWord', db.updateWord)
    .get('/addEditor', db.addEditor)
    .get('/deleteEditor', db.deleteEditor)
    .get('/addRelatedWord', db.addRelatedWord)
    .get('/deleteRelatedWord', db.deleteRelatedWord)
    .get('/getRelatedWords', db.getRelatedWords)


    .listen(app.get('port'), () => {
        console.log('Listening on port: ' + app.get('port'));
    });
=======
   .use(express.static('static'))
   .get('/searchWords', db.searchWords)
   .get('/getRelatedWords', db.getRelatedWords)
   .listen(app.get('port'), () => {
       console.log('Listening on port: ' + app.get('port'));
   });
>>>>>>> Fixed errors
