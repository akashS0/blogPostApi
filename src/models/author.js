module.exports = (sequelize, Sequelize)=>{
const authors = sequelize.define("authors",{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    uuid: {
        type: Sequelize.STRING
    },
    name:{
        type: Sequelize.TEXT
    },
    email:{
        type: Sequelize.STRING
    }
}, {
    created_at: 'created_at',
    updated_at: 'updated_at',
    paranoid: true,
    timestamps: true,
    underscored: true,
    tableName: 'author'
});
return authors;
}
