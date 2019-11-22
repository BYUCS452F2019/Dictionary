const express = require('express');
// const db = require('./database/database');
const db = require('./database/database2');
const app = express();
const PORT = process.env.PORT || 5000;

app.set('port', PORT)
    .use(express.static('static'))
    .get('/searchWords', db.searchWords)
    .get('/addWord', db.addWord)
    .get('/deleteWord', db.deleteWord)
    .get('/updateWord', db.updateWord)
    .get('/addRelatedWord', db.addRelatedWord)
    .get('/deleteRelatedWord', db.deleteRelatedWord)

    .listen(app.get('port'), () => {
        console.log('Listening on port: ' + app.get('port'));
    });
