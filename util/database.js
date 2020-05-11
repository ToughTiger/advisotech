const Sequelize = require("sequelize");
const userModel = require("../models/userModel");
const leadModel = require("../models/leadModel");
const connectorModel = require("../models/connectorModel");

const sequelize = new Sequelize({
  host: "localhost",
  username: "root",
  password: "",
  database: "advisotech",
  dialect: "mysql",
});

const User = userModel(sequelize, Sequelize);
const Lead = leadModel(sequelize, Sequelize);
const Connector = connectorModel(sequelize, Sequelize);

module.exports = {
  sequelize,
  User,
  Lead,
  Connector,
};
