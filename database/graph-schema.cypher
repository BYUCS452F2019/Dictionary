// DESTROY ENTIRE DATABASE
MATCH (n:word) DETACH DELETE n

// CREATE WORDS
CREATE (:word {name:'hello', language:'english'})
CREATE (:word {name:'hola', language:'spanish'})
CREATE (:word {name:'bonjour', language:'french'})
CREATE (n:word {name:'ola', language:'portuguese'})
RETURN type(n)

// CREATE RELATIONSHIPS AMONG WORDS
MATCH (a:word), (b:word), (c:word), (d:word)
WHERE a.name = 'hello' AND b.name = 'hola' AND c.name = 'bonjour' AND d.name = 'ola'
CREATE (a)-[:RELATED]->(b)
CREATE (a)-[:RELATED]->(c)
CREATE (a)-[:RELATED]->(d)
CREATE (b)-[:RELATED]->(a)
CREATE (b)-[:RELATED]->(c)
CREATE (b)-[:RELATED]->(d)
CREATE (c)-[:RELATED]->(a)
CREATE (c)-[:RELATED]->(b)
CREATE (c)-[:RELATED]->(d)
CREATE (d)-[:RELATED]->(a)
CREATE (d)-[:RELATED]->(b)
CREATE (d)-[r:RELATED]->(c)
RETURN type(r)


// QUERIES FOR API

// Searching for words. This will also return the relationships
// [array]->_fields->[1]->properties->name/language
// by default, the relation should be in index [1], however, you can check by looking in _fieldLookup
MATCH (query:word)-[:RELATED]->(result:word)
WHERE query.name START WITH '$1'
RETURN query, result

// create a word
CREATE (n:word {name: '$1', language: '$2'})

// create a relationship
MATCH (a:word), (b:word)
WHERE a.name = '$1' AND b.name = '$2'
CREATE (a)-[:RELATED]->(b)
CREATE (b)-[r:RELATED]->(a)
RETURN type(r)