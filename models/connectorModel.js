module.exports = (sequelize, dataType) => {
  return sequelize.define("connector", {
    id: {
      type: dataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: dataType.STRING,
      allowNull: false,
    },
    mobile: {
      type: dataType.INTEGER,
      allowNull: false,
    },
    city: {
      type: dataType.STRING,
      allowNull: false,
    },
    email: {
      type: dataType.STRING,
      allowNull: false,
    },
    pin: {
      type: dataType.STRING,
      allowNull: false,
    },
  });
};
