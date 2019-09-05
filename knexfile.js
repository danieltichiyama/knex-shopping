// Update with your config settings.

const dotenv = require("dotenv").config();

module.exports = {
  client: "postgresql",
  connection: {
    database: "knex_shopping",
    user: "danielti",
    password: "password"
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: "knex_migrations"
  }
};
