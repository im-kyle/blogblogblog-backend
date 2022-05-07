//express set up
const express = require('express');
const app = express();
const cors = require('cors');

//db auth setup
require("dotenv").config()
const morgan = require('morgan');
const bcrypt = require('bcryptjs');
const dbConnection = require('./db/dbConnection.js');
const session = require("express-session")
const token = require('./utils/token')

//middleware
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

//requests and responses
//All Posts
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

//All Posts by User
app.get('/posts/user/:user', function(req, res){
  dbConnection
  .select('*')
  .where({created_by: req.params.user})
  .from('posts')
  .then(data => res.status(200).json(data))
  .catch(err =>
    res.status(404).json({
        message:
          'The data you are looking for could not be found. Please try again'
    }))
});


//Create Post
app.post('/posts', function(req, res){
  dbConnection
  .insert({ title: req.body.title, content: req.body.content, created_by: req.body.created_by }).from('posts')
      .then((data) => res.status(201).json(data))
      .catch((err) => {
        res.status(404).json({ message: "Something is wrong."})
    })
  });


//Delete Post
app.delete('/posts/', function(req, res){
dbConnection
.delete('*').where({title: req.body.title, created_by:req.body.user}).from('posts')
    .then((data) => res.status(201).json(data))
    .catch((err) => {
      res.status(404).json({ message: "Something is wrong."})
  })
});


//Search Post
app.get('/posts/specific/:title', function(req, res){
dbConnection
.select('*')
.where({title: req.params.title})
.from('posts')
.then((data) => res.status(201).json(data))
.catch((err) => {
      res.status(404).json({ message: "Something is wrong."})
  })
});


//Edit Post
app.patch('/posts/edit', function(req, res){
  dbConnection
  .update({content: req.body.content})
  .where({title: req.body.title, created_by:req.body.user})
  .from('posts')
  .then((data) => res.status(201).json(data))
  .catch((err) => {
        res.status(404).json({ message: "Something is wrong."})
    })
  });


//Register
app.post('/register', async (req, res) => {
  try {
    const {username, password, first_name, last_name} = req.body;
    const user = req.body;
    const hash = await bcrypt.hash(password, 12);
    await dbConnection.insert({username: username, password_hash: hash, first_name: first_name, last_name: last_name}).from('users');
    res.status(201).json(
      "success"
     );
  } catch(e) {
    res.status(500).send('Something Went Wrong');
  }
});

//Login
app.post('/login', async(req, res) => {
  try {
    const {username, password} = req.body;
    user = await dbConnection.select('*').where({username: username}).from('users')
    console.log(user);
    if (user.length) {
      const validPass = await bcrypt.compare(password, user[0].password_hash);
      console.log(user[0].password_hash)
      console.log(password);
      console.log(validPass);
      if(validPass) {
        res.status(200).json({
          user: username,
          token:generateToken(username)
         });
      }
      else {
        res.json('Wrong Password')
      }
    }
      else {
        res.status(404).json('User not found')
      }
    } catch(e) {
    res.status(500).send('Something Went Wrong');
    }
  });


module.exports = app;