const pg = require("pg");
const settings = require("./settings"); // settings.json
const someName = process.argv[2];

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT * FROM famous_people WHERE first_name = $1::text OR last_name = $1::text", [someName], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log("-", result.rows[0].id, ":", result.rows[0].first_name, result.rows[0].last_name, "born", result.rows[0].birthdate);
    client.end();
  });
});