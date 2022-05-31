module.exports = (sequelizeInstance, Sequelize) => {
  const User = sequelizeInstance.define("User", {
    pseudo: {
      type: Sequelize.STRING,
      allowNull: false,
      notEmpty: true,
      minlength: 3,
      maxlength: 20,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      notEmpty: true,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      notEmpty: true,
      minlength: 6,
      maxlength: 50,
    },
    avatar: {
      type: Sequelize.STRING,
      default: "../public/img/user.png",
      allowNull: false,
      notEmpty: true,
    },
    isAdmin: {
      type: Sequelize.BOOLEAN,
      default: false,
    },
  });
  return User;
};
