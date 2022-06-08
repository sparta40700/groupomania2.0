module.exports = (sequelizeInstance, Sequelize) => {
  const Post = sequelizeInstance.define("post", {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    tittle: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    content: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    imgUrl: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    author: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return Post;
};
