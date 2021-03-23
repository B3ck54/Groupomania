const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json())

// const path = require('path'); //donne accès au chemin de système de fichier
// const helmet = require("helmet");// sécurité entêtes http

const dotenv = require('dotenv').config();

const cors = require('cors')
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
 
const db = require('../back-end/config/db.config.js');
  
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync with { force: true }');
// });

// app.use(helmet());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

const postRoutes = require ('./routes/post');
const userRoutes = require ('./routes/user');
const commentRoutes = require ('./routes/comment');


const path = require('path');
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

module.exports = app;