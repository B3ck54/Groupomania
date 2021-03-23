const env = require('./env.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: 0,
 
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});
 
const db = {};
 
// db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
//Models/tables
db.user = require('../models/User.js')(sequelize, Sequelize);
db.posts = require('../models/Post.js')(sequelize, Sequelize);
db.comments = require('../models/Comment.js')(sequelize, Sequelize);

module.exports = db;