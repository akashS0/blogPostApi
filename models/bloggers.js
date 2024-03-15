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
        },
        deleted_at: {
            type: 'TIMESTAMP',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
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
