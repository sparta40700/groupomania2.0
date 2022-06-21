module.exports = (sequelizeInstance, Sequelize) => {
    const Comment = sequelizeInstance.define("Comment", {
        postId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        author: {
            type: Sequelize.STRING,
            allowNull: false
        },
        content: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return Comment;
};