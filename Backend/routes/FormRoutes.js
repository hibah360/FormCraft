
const express = require("express");
const router = express.Router();

const {
  createForm,
  updateForm,
  getAllForms,
  deleteForm,
  getFormById,
} = require("../controllers/FormController");

// Fetch all forms
router.get("/", getAllForms);

// Fetch one form by ID
router.get("/:id", getFormById);

// Create a new form
router.post("/", createForm);

// Update an existing form
router.put("/:id", updateForm);

// Delete an existing form
router.delete("/:id", deleteForm);

module.exports = router;
