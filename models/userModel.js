module.exports = (sequelize, dataType) => {
  return sequelize.define("user", {
    id: {
      type: dataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: dataType.STRING,
      allowNull: false,
    },
    email: {
      type: dataType.STRING,
      allowNull: false,
    },
    password: {
      type: dataType.STRING,
      allowNull: false,
    },
    address: {
      type: dataType.TEXT,
      allowNull: false,
    },
    userRole: {
      type: dataType.STRING,
      allowNull: false,
    },
    image: {
      type: dataType.STRING,
      allowNull: false,
    },
  });
};
