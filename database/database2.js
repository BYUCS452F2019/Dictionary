// const pg = require('pg');
// const connectionString = process.env.DATABASE_URL || "postgres://postgres:admin@localhost:5432/postgres";
// const url = require('url');
const neo4j = require('neo4j-driver').v1;

var graphenedbURL = process.env.GRAPHENEDB_BOLT_URL;

var graphenedbUser = process.env.GRAPHENEDB_BOLT_USER;

var graphenedbPass = process.env.GRAPHENEDB_BOLT_PASSWORD;

var driver = neo4j.driver(graphenedbURL, neo4j.auth.basic(graphenedbUser, graphenedbPass));
var session = driver.session();

session
    .run("CREATE (n {hello: 'World'}) RETURN n.name")
    .then(function(result) {
        result.records.forEach(function(record) {
            console.log(record)
        });

        session.close();
    })
    .catch(function(error) {
        console.log(error);
    });

// module.exports = {
//     searchWords: (req, res) => {
//         var queryData = url.parse(req.url, true);
//         var query = queryData.query.q;
//         if (query == undefined || query == null) {
//             query = '';
//         }
//
//         const statement = {
//             text: `SELECT w.word_id, w.word, l2.lang, json_agg(json_build_object('word', w2.word, 'lang', l.lang)) AS "related_words"
//                 FROM Word w INNER JOIN Related_Word rw
//                 ON w.word_id = rw.from_word INNER JOIN word w2
//                 ON rw.to_word = w2.word_id INNER JOIN language l
//                 ON w2.lang_id = l.lang_id INNER JOIN language l2
//                 ON w.lang_id = l2.lang_id
//                 WHERE w.word LIKE $1
//                 GROUP BY w.word_id, w.word, l2.lang
//                 LIMIT 100;`,
//             values: ['%' + query + '%']
//         }
//
//         queryJsonReturn(res, statement);
//     },
//
//     getRelatedWords: (req, res) => {
//         var queryData = url.parse(req.url, true);
//         var wordId = queryData.query.wordId;
//
//         // Returns the words related to the given id
//         // Returns word_id, word, lang
//
//         const statement = {
//             text: `SELECT w.word_id, w.word, l.lang
//                  FROM Word w INNER JOIN Related_Word rw
//                  ON w.word_id = rw.to_word INNER JOIN Language l
//                  ON w.lang_id = l.lang_id
//                  WHERE rw.from_word = $1;`,
//             values: [wordId]
//         }
//
//         queryJsonReturn(res, statement);
//     },
//
//     addWord: (req, res) => {
//         const statement = {
//             // give the query a unique name
//             text: `INSERT INTO Word (name, lang_id, last_edit_id)
//                 VALUES ($1, $2, $3);"`,
//             values: [req.body.word, req.body.lang_id, req.body.editor_id], // todo: match values
//         };
//
//         queryJsonReturn(res, statement);
//     },
//
//     deleteWord: (req, res) => {
//         const statement = {
//             // give the query a unique name
//             text: `DELETE FROM word
//                 WHERE word_id=$1;`,
//             values: [req.body.word_id], // todo: match values
//         };
//
//         queryJsonReturn(res, statement);
//     },
//
//     updateWord: (req, res) => {
//         const statement = {
//             // give the query a unique name
//             text: `UPDATE word
//                 SET name = $2, editor_id = $3
//                 WHERE employee_id = $1;`,
//             values: [req.body.word_id, req.body.word, req.body.editor_id], // todo: match values
//         };
//
//         queryJsonReturn(res, statement);
//     },
//
//     addEditor: (req, res) => {
//         const statement = {
//             // give the query a unique name
//             text: `INSERT INTO editor (name)
//                 VALUES ($1);`,
//             values: [req.body.editor_name], // todo: match values
//         };
//
//         queryJsonReturn(res, statement);
//     },
//
//     deleteEditor: (req, res) => {
//         const statement = {
//             // give the query a unique name
//             text: `DELETE FROM editor
//                 WHERE editor_id=$1;`,
//             values: [req.body.editor_id], // todo: match values
//         };
//
//         queryJsonReturn(res, statement);
//     },
//
//     addRelatedWord: (req, res) => {
//         const statement = {
//             // give the query a unique name
//             text: `INSERT INTO RelatedWord(from_word, to_word, last_edit_id)
//                 VALUES ($1, $2, $3);`,
//             values: [req.body.from_word, req.body.to_word, req.body.editor_id], // todo: match values
//         };
//
//         queryJsonReturn(res, statement);
//     },
//
//     deleteRelatedWord: (req, res) => {
//         const statement = {
//             // give the query a unique name
//             text: `DELETE FROM related_word
//                 WHERE related_words_id=$1;`,
//             values: [req.body.editor_id], // todo: match values
//         };
//
//         queryJsonReturn(res, statement);
//     },
// };
//
// function queryJsonReturn(res, query) {
//     var client = new pg.Client(connectionString);
//     client.connect(pgConnectCallback);
//
//     client.query(query)
//         .then(result => {
//             res.json(result.rows);
//             client.end();
//         })
//         .catch(e => {
//             console.error(e.stack);
//             client.end();
//         });
// }
//
// function pgConnectCallback(error) {
//     if (error) {
//         console.log("Error connection to postgres: ");
//         console.log(error);
//     }
//     else {
//         console.log("Successfully connected to postgres");
//     }
// }
