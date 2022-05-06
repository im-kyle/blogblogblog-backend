const knex = require("knex");
const knexConfig = require("../knexfile.js")[process.env.NODE_ENV || "development"];

const dbConnection = knex(knexConfig);
module.exports = dbConnection;