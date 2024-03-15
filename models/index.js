const Sequelize = require('sequelize');

const sequelize = new Sequelize('blogCrud', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    pool:{max:5, min:0, idle:100000}
});

sequelize.authenticate()
.then(()=>{
    console.log("connected");
})
.catch(err=>{
    console.log("Error"+err);
}); 

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.bloggers = require('./bloggers')(sequelize, Sequelize);
db.authors = require('./author')(sequelize, Sequelize);

db.sequelize.sync()
.then(()=>{
    console.log("synced");
})

module.exports = db;