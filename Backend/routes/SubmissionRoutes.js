const express = require("express");
const router = express.Router();

const {
  createSubmission,
  getAllSubmissions,
} = require("../controllers/SubmissionController");

router.get("/", getAllSubmissions);
router.post("/:formId", createSubmission);

module.exports = router;