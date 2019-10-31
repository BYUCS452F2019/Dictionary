const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL || "postgres://postgres:admin@localhost:5432/postgres";
const pool = new Pool({connectionString: connectionString});
const url = require('url');

pool.on('error', (err, client) => {
   console.error('Unexpected error on idle client', err)
   process.exit(-1)
})

module.exports = {
   searchWords: (req, res) => {
      var queryData = url.parse(req.url, true);
      var query = queryData.query.q;
      if (query == undefined || query == null) {
         query = '';
      }

      const statement = {
         text: `SELECT word_id, word, lang 
                 FROM Word w INNER JOIN Language l
                 ON w.lang_id = l.lang_id
                 WHERE word LIKE LOWER($1)
                 ORDER BY word`,
         values: ['%' + query + '%']

      }

      queryJsonReturn(res, statement);
   },

   getRelatedWords: (req, res) => {
      var queryData = url.parse(req.url, true);
      var wordId = queryData.query.wordId;

      // Returns the words related to the given id
      // Returns word_id, word, lang

      const statement = {
         text: `SELECT w.word_id, w.word, l.lang
                 FROM Word w INNER JOIN Related_Word rw
                 ON w.word_id = rw.to_word INNER JOIN Language l
                 ON w.lang_id = l.lang_id
                 WHERE rw.from_word = $1;`,
         values: [wordId]
      }

      queryJsonReturn(res, statement);
   },

   addWord: (req, res) => {
      const statement = {
         // give the query a unique name
         text: `INSERT INTO Word (name, lang_id, last_edit_id) 
                VALUES ($1, $2, $3);"`,
         values: [req.body.word, req.body.lang_id, req.body.editor_id], // todo: match values
      };

      queryJsonReturn(res, statement);
   },

   deleteWord: (req, res) => {
      const statement = {
         // give the query a unique name
         text: `DELETE FROM word
                WHERE word_id=$1;`,
         values: [req.body.word_id], // todo: match values
      };

      queryJsonReturn(res, statement);
   },

   updateWord: (req, res) => {
      const statement = {
         // give the query a unique name
         text: `UPDATE word
                SET name = $2, editor_id = $3 
                WHERE employee_id = $1;`,
         values: [req.body.word_id, req.body.word, req.body.editor_id], // todo: match values
      };

      queryJsonReturn(res, statement);
   },

   addEditor: (req, res) => {
      const statement = {
         // give the query a unique name
         text: `INSERT INTO editor (name) 
                VALUES ($1);`,
         values: [req.body.editor_name], // todo: match values
      };

      queryJsonReturn(res, statement);
   },

   deleteEditor: (req, res) => {
      const statement = {
         // give the query a unique name
         text: `DELETE FROM editor
                WHERE editor_id=$1;`,
         values: [req.body.editor_id], // todo: match values
      };

      queryJsonReturn(res, statement);
   },

   addRelatedWord: (req, res) => {
      const statement = {
         // give the query a unique name
         text: `INSERT INTO RelatedWord(from_word, to_word, last_edit_id)
                VALUES ($1, $2, $3);`,
         values: [req.body.from_word, req.body.to_word, req.body.editor_id], // todo: match values
      };
      
      queryJsonReturn(res, statement);
   },

   deleteRelatedWord: (req, res) => {
      const statement = {
         // give the query a unique name
         text: `DELETE FROM related_word
                WHERE related_words_id=$1;`,
         values: [req.body.editor_id], // todo: match values
      };

      queryJsonReturn(res, statement);
   },
};

function queryJsonReturn(res, query) {
   pool.connect()
      .then(client => {
         return client
            .query(query)
            .then(result => {
               client.release();
               res.json(result.rows);
            })
            .catch(e => {
               client.release();
               console.log(e.stack);
            });
      });
}
