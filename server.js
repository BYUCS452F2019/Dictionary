const express = require('express');
// const db = require('./database/database');
const db = require('./database/database2');
const app = express();
const PORT = process.env.PORT || 5000;

app.set('port', PORT)
    .use(express.static('static'))
    .use(express.json())
    .use(express.urlencoded({extended:true}))
    .get('/searchWords', db.searchWords)
    .post('/addWord', db.addWord)
    .delete('/deleteWord', db.deleteWord)
    .put('/updateWord', db.updateWord)
    .post('/addRelatedWord', db.addRelatedWord)
    .delete('/deleteRelatedWord', db.deleteRelatedWord)

    .listen(app.get('port'), () => {
        console.log('Listening on port: ' + app.get('port'));
    });
