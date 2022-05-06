//express set up
const express = require('express');
const app = express();
const knex = require("knex");
const cors = require('cors');

//db auth setup
require("dotenv").config()
const morgan = require('morgan');
const bcrypt = require ('bcryptjs');
const dbConnection = require('./db/dbConnection.js');
const session = require("express-session")
const token = require('./utils/token')

//middleware
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

//requests and responses
app.get('/posts', function(req, res){
  dbConnection
  .select('*')
  .from('posts')
  .then(data => res.status(200).json(data))
  .catch(err =>
    res.status(404).json({
        message:
          'The data you are looking for could not be found. Please try again'
    }))
});


module.exports = app;