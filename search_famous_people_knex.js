// const pg = require("pg");
const knex = require('knex')({
  client: 'pg',
  connection: 'postgres://development:development@localhost:5432/vagrant?ssl=true',//process.env.PG_CONNECTION_STRING,
  searchPath: 'knex,public'
});
const settings = require("./settings"); // settings.json
const someName = process.argv[2];

// const client = new pg.Client({
//   user     : settings.user,
//   password : settings.password,
//   database : settings.database,
//   host     : settings.hostname,
//   port     : settings.port,
//   ssl      : settings.ssl
// });

function logPeople(people) {
  people.forEach(function (person) {
    console.log("-", person.id, ":", person.first_name, person.last_name, "born", person.birthdate);
  })
}

knex('famous_people').where({'first_name': someName}).orWhere({'last_name': someName}).asCallback((error, people) => {
  logPeople(people);
  knex.destroy();
});