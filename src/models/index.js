const Sequelize = require('sequelize');

const dbHost = process.env.DB_HOST;
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbDatabase = process.env.DB_DATABASE;
const dbDialect = process.env.DB_DIALECT;

const sequelize = new Sequelize(dbDatabase, dbUsername, dbPassword, {
    host: dbHost,
    dialect: dbDialect,
    pool: { max: 5, min: 0, idle: 100000 }
});

sequelize.authenticate()
    .then(() => {
        console.log("Database connection established");
    })
    .catch(err => {
        console.log("Error establishing database connection" + err);
    });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.bloggers = require('./bloggers')(sequelize, Sequelize);
db.authors = require('./author')(sequelize, Sequelize);

db.bloggers.belongsTo(db.authors, { foreignKey: 'author_id' });
db.authors.hasMany(db.bloggers, { foreignKey: 'author_id' });
db.sequelize.sync()
    .then(() => {
        console.log("Database Synced sucessfully.");
    })

module.exports = db;