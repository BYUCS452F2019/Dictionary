const pg = require('pg');
const connectionString = process.env.DATABASE_URL || "postgres://postgres:admin@localhost:5432/postgres";
const url = require('url');

module.exports = {
   helloWorldQuery: (req, res) => {
      var client = new pg.Client(connectionString);
      client.connect(pgConnectCallback);

      client.query('SELECT * FROM Editor;', (error, result) => {
         if (error) {
            console.log("Error in query: ");
            console.log(error);
            res.json({"result":"error"})
         }
         else {
            res.json(result.rows);
         }
      });
   },

   searchWords: (req, res) => {
      var client = new pg.Client(connectionString);
      client.connect(pgConnectCallback);

      var queryData = url.parse(req.url, true);
      var query = queryData.query.q;
      if (query == undefined || query == null) {
         query = '';
      }

      var sql = `SELECT word_id, word, definition, lang 
                 FROM Word w INNER JOIN Language l
                 ON w.lang_id = l.lang_id
                 WHERE word LIKE LOWER($1)
                 ORDER BY word`;
      var vals = ['%' + query + '%'];

      client.query(sql, vals)
          .then(result => {
             res.json(result.rows);
          })
          .catch(e => console.error(e.stack));
   },

   getRelatedWords: (req, res) => {
      var client = new pg.Client(connectionString);
      client.connect(pgConnectCallback);

      var queryData = url.parse(req.url, true);
      var wordId = queryData.query.wordId;

      // Returns the words related to the given id
      // Returns word_id, word, lang
      var sql = `SELECT w.word_id, w.word, l.lang
                 FROM Word w INNER JOIN Related_Word rw
                 ON w.word_id = rw.to_word INNER JOIN Language l
                 ON w.lang_id = l.lang_id
                 WHERE rw.from_word = $1;`;
      var vals = [wordId];

      client.query(sql, vals)
          .then(result => {
             res.json(result.rows);
          })
          .catch(e => console.error(e.stack));
   },

   addWord: (req, res) => {
      var client = new pg.Client(connectionString);
      client.connect(pgConnectCallback);

      const addQuery = {
         // give the query a unique name
         text: `INSERT INTO Word (name, definition, lang_id, last_edit_id) 
                VALUES ($1, $2, $3, $4);"`,
         values: [req.body.word, req.body.def, req.body.lang_id, req.body.editor_id], // todo: match values
      };

      client.query(addQuery, (error, result) => {
         if (error) {
            console.log("Error in query: ");
            console.log(error);
            res.json({"result":"error"})
         }
         else {
            res.json(result);
         }
      });
   },

   deleteWord: (req, res) => {
      var client = new pg.Client(connectionString);
      client.connect(pgConnectCallback);

      const removeQuery = {
         // give the query a unique name
         text: `DELETE FROM word
                WHERE word_id=$1;"`,
         values: [req.body.word_id], // todo: match values
      };

      client.query(removeQuery, (error, result) => {
         if (error) {
            console.log("Error in query: ");
            console.log(error);
            res.json({"result":"error"})
         }
         else {
            res.json(result);
         }
      });
   },

   updateWord: (req, res) => {
      var client = new pg.Client(connectionString);
      client.connect(pgConnectCallback);

      const updateQuery = {
         // give the query a unique name
         text: `UPDATE word
                SET definition = $2, editor_id = $3 
                WHERE employee_id = $1;"`,
         values: [req.body.word_id, req.body.def, req.body.editor_id], // todo: match values
      };

      client.query(updateQuery, (error, result) => {
         if (error) {
            console.log("Error in query: ");
            console.log(error);
            res.json({"result":"error"})
         }
         else {
            res.json(result);
         }
      });
   },


   addEditor: (req, res) => {
      var client = new pg.Client(connectionString);
      client.connect(pgConnectCallback);

      const addQuery = {
         // give the query a unique name
         text: `INSERT INTO editor (name) 
                VALUES ($1);"`,
         values: [req.body.edit_name], // todo: match values
      };

      client.query(addQuery, (error, result) => {
         if (error) {
            console.log("Error in query: ");
            console.log(error);
            res.json({"result":"error"})
         }
         else {
            res.json(result);
         }
      });
   },

   deleteEditor: (req, res) => {
      var client = new pg.Client(connectionString);
      client.connect(pgConnectCallback);

      const removeQuery = {
         // give the query a unique name
         text: `DELETE FROM editor
                WHERE edit_id=$1;"`,
         values: [req.body.edit_id], // todo: match values
      };

      client.query(removeQuery, (error, result) => {
         if (error) {
            console.log("Error in query: ");
            console.log(error);
            res.json({"result":"error"})
         }
         else {
            res.json(result);
         }
      });
   },

   // addRelatedWord: (req, res) => {
   //    var client = new pg.Client(connectionString);
   //    client.connect(pgConnectCallback);
   //
   //    const addQuery = {
   //       // give the query a unique name
   //       text: `INSERT INTO Word (word, definition, lang_id, last_edit_id)
   //              VALUES ($1, $2, $3, $4);"`,
   //       values: [req.body.word, req.body.def, req.body.lang_id, req.body.editor_id], // todo: match values
   //    };
   //
   //    client.query(addQuery, (error, result) => {
   //       if (error) {
   //          console.log("Error in query: ");
   //          console.log(error);
   //          res.json({"result":"error"})
   //       }
   //       else {
   //          res.json(result);
   //       }
   //    });
   // },

   // TranslateWord: (req, res) => {
   //    var client = new pg.Client(connectionString);
   //    client.connect(pgConnectCallback);
   //
   //    const addQuery = {
   //       // give the query a unique name
   //       text: `INSERT INTO Word (word, definition, lang_id, last_edit_id)
   //              VALUES ($1, $2, $3, $4);"`,
   //       values: [req.body.word, req.body.def, req.body.lang_id, req.body.editor_id], // todo: match values
   //    };
   //
   //    client.query(addQuery, (error, result) => {
   //       if (error) {
   //          console.log("Error in query: ");
   //          console.log(error);
   //          res.json({"result":"error"})
   //       }
   //       else {
   //          res.json(result);
   //       }
   //    });
   // },
   //
   // removeRW: (req, res) => {
   //    var client = new pg.Client(connectionString);
   //    client.connect(pgConnectCallback);
   //
   //    const addQuery = {
   //       // give the query a unique name
   //       text: `INSERT INTO Word (word, definition, lang_id, last_edit_id)
   //              VALUES ($1, $2, $3, $4);"`,
   //       values: [req.body.word, req.body.def, req.body.lang_id, req.body.editor_id], // todo: match values
   //    };
   //
   //    client.query(addQuery, (error, result) => {
   //       if (error) {
   //          console.log("Error in query: ");
   //          console.log(error);
   //          res.json({"result":"error"})
   //       }
   //       else {
   //          res.json(result);
   //       }
   //    });
   // },



   // getEditor: (req, res) => {
   //    var client = new pg.Client(connectionString);
   //    client.connect(pgConnectCallback);
   //
   //    const addQuery = {
   //       // give the query a unique name
   //       text: `FROM word
   //              SELECT *
   //              VALUES ($1, $2, $3, $4);"`,
   //       values: [req.body.word, req.body.def, req.body.lang_id, req.body.editor_id], // todo: match values
   //    };
   //
   //    client.query(addQuery, (error, result) => {
   //       if (error) {
   //          console.log("Error in query: ");
   //          console.log(error);
   //          res.json({"result":"error"})
   //       }
   //       else {
   //          res.json(result);
   //       }
   //    });
   // },
};

function pgConnectCallback(error) {
   if (error) {
      console.log("Error connection to postgres: ");
      console.log(error);
   }
   else {
      console.log("Successfully connected to postgres");
   }
}
