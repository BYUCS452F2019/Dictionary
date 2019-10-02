const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.set('port', PORT)
   .get('/', (req, res) => {
       res.send('Hello World');
   })
   .listen(app.get('port'), () => {
       console.log('Listening on port: ' + app.get('port'));
   });
