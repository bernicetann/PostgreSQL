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

function logPeople(people) {
  people.forEach(function (person) {
    console.log("-", person.id, ":", person.first_name, person.last_name, "born", person.birthdate);
  })
}

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT * FROM famous_people WHERE first_name = $1::text OR last_name = $1::text", [someName], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    logPeople(result.rows);
    client.end();
  });
});