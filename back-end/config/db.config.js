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

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.user = require('../models/User.js')(sequelize, Sequelize);
db.posts = require('../models/Post.js')(sequelize, Sequelize);
db.answers = require('../models/Answer.js')(sequelize, Sequelize);

/**ANSWERS */

db.answers.belongsTo(db.user, {
  foreignKey: 'UserId',
  onDelete: 'CASCADE',
});
db.answers.belongsTo(db.posts, {
  foreignKey: 'PostId',
  onDelete: 'CASCADE',
});


/**POST */
db.posts.belongsTo(db.user, {
  foreignKey: 'UserId',
  // targetKey: 'id', 
  onDelete: 'CASCADE',
});
db.posts.hasMany(db.answers, {
  foreignKey: 'PostId',
  sourceKey: 'id' 
});

/**USER */
db.user.hasMany(db.answers, {
  foreignKey: 'UserId',
  sourceKey: 'id'}, {
    onDelete: 'CASCADE',
    hooks: true
});
db.user.hasMany(db.posts, {
  foreignKey: 'UserId',
  sourceKey: 'id'
});


module.exports = db;