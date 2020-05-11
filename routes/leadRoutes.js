const express = require("express");
const router = express.Router();
const { authorize } = require("../middleware/authentication");

const {
  getAllLeads,
  postLead,
  getLeadDocumentById,
  updateLeadById,
  getSecured,
} = require("../controllers/leadControllers");

router.get("/lead", getAllLeads);
router.get("/secured", getSecured);
router.post("/lead", authorize, postLead);
router.get("/lead/docs/:id", authorize, getLeadDocumentById);
router.put("/lead/update/:id", authorize, updateLeadById);

module.exports = router;
