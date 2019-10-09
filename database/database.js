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
   }
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
