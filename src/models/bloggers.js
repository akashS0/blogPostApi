module.exports = (sequelize, Sequelize)=>{
    const bloggers = sequelize.define("bloggers",{
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        uuid: {
            type: Sequelize.STRING
        },
        title: {
            type: Sequelize.TEXT
        },
        content: {
            type: Sequelize.TEXT
        },
        author_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'author',
                key: 'id'
            }
        },
    }, {
        created_at: 'created_at',
        updated_at: 'updated_at',
        deleted_at: 'deleted_at',
        paranoid: true,
        timestamps: true,
        underscored: true,
        tableName: 'blog'
    });
    return bloggers;
}
