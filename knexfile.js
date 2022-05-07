// Update with your config settings.
require("dotenv").config()
let connectionString = process.env.DATABASE_URL;

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

module.exports = {

  development: {
    client: 'pg',
    connection: connectionString
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'blog_db',
      user: 'postgres',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: { connectionString, ssl: {rejectUnauthorized: false}}
  }

};