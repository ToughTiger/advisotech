const express = require("express");
const { authorize, isAdmin } = require("../middleware/authentication");
const router = express.Router();
const {
  postConnector,
  getConnector,
  getConnectorById,
  updateConnectorById,
  getConnectorBetweenDates,
  deleteConnectorById,
  getConnectorByUserId,
  verifyMobile,
  verifyCode,
} = require("../controllers/connectorController");

router.post("/verifyMobile", verifyMobile);
router.post("/verifyCode", verifyCode);
router.get("/connector/date", authorize, getConnectorBetweenDates);
router.post("/connector", postConnector);
router.get("/connector", authorize, getConnector);
router.get("/connector/:id", authorize, getConnectorById);
router.get("/connector/user/:id", authorize, getConnectorByUserId);
router.put("/connector/:id", authorize, isAdmin, updateConnectorById);
router.delete("/connector/:id", authorize, isAdmin, deleteConnectorById);

module.exports = router;
