module.exports = (sequelize, DataTypes) => {
  const UserList = sequelize.define("UserList", {
    item: {
      type: DataTypes.STRING,
      allownull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allownull: false,
    },
  });
  return UserList;
};
