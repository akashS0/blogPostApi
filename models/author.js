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
    },
    created_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    updated_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
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
