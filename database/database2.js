// const pg = require('pg');
// const connectionString = process.env.DATABASE_URL || "postgres://postgres:admin@localhost:5432/postgres";
// const url = require('url');
const neo4j = require('neo4j-driver').v1;

var graphenedbURL = process.env.GRAPHENEDB_BOLT_URL;
var graphenedbUser = process.env.GRAPHENEDB_BOLT_USER;
var graphenedbPass = process.env.GRAPHENEDB_BOLT_PASSWORD;

var driver = neo4j.driver(graphenedbURL, neo4j.auth.basic(graphenedbUser, graphenedbPass));
var session = driver.session();

module.exports = {
    searchWords: (req, res) => {
        var queryData = url.parse(req.url, true);
        var query = queryData.query.q;
        if (query == undefined || query == null) {
            query = '';
        }

        const text = `MATCH (query:word)-[:RELATED]->(result:word)
                WHERE query.name STARTS WITH {q}
                RETURN query, result`;
        const namedParams = {
            q: query
        };

        queryJsonReturn(res, text, namedParams);
    },

    addWord: (req, res) => {
        const word = req.body.word;
        const lang = req.body.language;

        const text = `CREATE (n:word {name: {newWord}, language: {newLang}})`;
        const namedParams = {
            newWord: word,
            newLang: lang
        };

        queryJsonReturn(res, text, namedParams);
    },

    deleteWord: (req, res) => {
        const word = req.body.word;

        const text = `MATCH (n:word)
                      WHERE n.name = {wordToDelete}
                      DETACH DELETE n`;
        const namedParams = {
            wordToDelete: word
        };

        queryJsonReturn(res, text, namedParams);
    },

    updateWord: (req, res) => {
        const currentWord = req.body.word;
        const newWord = req.body.new_word;
        const newLang = req.body.new_lang;

        const text = `MATCH (n:word)
                      WHERE n.name = {current_word}
                      SET n = {name: {new_word}, language: {new_lang}}`;
        const namedParams = {
            current_word: currentWord,
            new_word: newWord,
            new_lang: newLang
        };

        queryJsonReturn(res, text, namedParams);
    },

    addRelatedWord: (req, res) => {
        const fromWord = req.body.from_word;
        const toWord = req.body.to_word;

        const text = `MATCH (a:word), (b:word)
                      WHERE a.name = {from_word} AND b.name = {to_word}
                      CREATE (a)-[:RELATED]->(b)
                      CREATE (b)-[:RELATED]->(a)`;
        const namedParams = {
            from_word: fromWord,
            to_word: toWord
        };

        queryJsonReturn(res, text, namedParams);
    },

    deleteRelatedWord: (req, res) => {
        const fromWord = req.body.from_word;
        const toWord = req.body.to_word;

        const text = `MATCH (n:word {name: {from_word}})-[r:RELATED]->(n2:word {name: {to_word}})
                      DELETE r`;
        const namedParams = {
            from_word: fromWord,
            to_word: toWord
        };

        queryJsonReturn(res, text, namedParams);
    },
};

function queryJsonReturn(res, text, namedParams) {
    session
        .run(text, namedParams)
        .then((result) => {
            session.close()
            res.json(result.records);
        })
        .catch((err) => {
            console.log("An error occurred during cypher neo4j query!");
            console.log(err);
        });
}
