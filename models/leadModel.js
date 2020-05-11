module.exports = (sequelize, dataType) => {
  return sequelize.define("lead", {
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
    address: {
      type: dataType.TEXT,
      allowNull: false,
    },
    incomeType: {
      type: dataType.STRING,
      allowNull: false,
    },
    annualIncome: {
      type: dataType.INTEGER,
      allowNull: false,
    },
    email: {
      type: dataType.STRING,
      allowNull: false,
    },

    loanType: {
      type: dataType.STRING,
      allowNull: false,
    },
    sourcedBy: {
      type: dataType.STRING,
      allowNull: false,
    },
    amount: {
      type: dataType.INTEGER,
      allowNull: false,
    },
  });
};
