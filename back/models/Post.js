module.exports = (sequelizeInstance, Sequelize) => {
    const Post = sequelizeInstance.define("Post", {
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        content: {
            type: Sequelize.STRING,
            allowNull: false
        },
        imageUrl: {
            type: Sequelize.STRING,
        },
        author: {
            type: Sequelize.STRING,
        },
        nbLikes: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        nbDislikes: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    });
    return Post;
};