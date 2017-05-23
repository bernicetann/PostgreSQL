const knex = require('knex')({
  client: 'pg',
  connection: 'postgres://development:development@localhost:5432/vagrant?ssl=true',//process.env.PG_CONNECTION_STRING,
  searchPath: 'knex,public'
});
const settings = require("./settings"); // settings.json
const firstName = process.argv[2];
const lastName = process.argv[3];
const birthDate = process.argv[4];

function logPeople(people) {
  people.forEach(function (person) {
    console.log("-", person.id, ":", person.first_name, person.last_name, "born", person.birthdate);
  })
}

//Implement an add_person.js script that takes in the first name,
//last name and date of a famous person as three command line arguments
//and uses Knex to perform an insert.

knex('famous_people').insert({ first_name : firstName,
                               last_name : lastName ,
                               birthdate : birthDate }).asCallback((error, people) => {
  console.log(people);
  knex.destroy();
});


