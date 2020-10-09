const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allownull: false,
    },
    password: {
      type: DataTypes.STRING,
      allownull: false,
    },
  });
  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };
  User.addHook("beforeCreate", (user) => {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(), null);
  });
  User.associate = function (models) {
    User.hasMany(models.UserList);
  };
  return User;
};
