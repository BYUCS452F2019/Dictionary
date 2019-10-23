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
         values: [req.body.editor_name], // todo: match values
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


   updateEditor: (req, res) => {
      var client = new pg.Client(connectionString);
      client.connect(pgConnectCallback);

      const updateQuery = {
         // give the query a unique name
         text: `UPDATE editor
                SET definition = $2, editor_id = $3 
                WHERE employee_id = $1;"`,
         values: [req.body.edit_id, req.body.def, req.body.editor_id], // todo: match values
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


   // search: (req, res) => {
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

   // getTrans: (req, res) => {
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
