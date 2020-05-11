// API for prelude conclusions
require("dotenv").config();
const express = require("express");
const { sequelize } = require("./util/database");
const authRoute = require("./routes/authRoutes");
const connectorRoute = require("./routes/connectorRoutes");
const leadRoute = require("./routes/leadRoutes");
const cors = require("cors");
const { errMiddleware } = require("./middleware/authentication");
const multer = require("multer");

const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, cb);
  },
  filename: function (rew, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("file");

app.use(express.static("public"));
app.use(express.json());
app.use(cors());
app.use(authRoute);
app.use(connectorRoute);
app.use(leadRoute);
app.use(errMiddleware);

sequelize.sync().then((connection) => {
  app.listen(process.env.PORT, () =>
    console.log(`Server connected and running on port ${process.env.PORT}`)
  );
});
