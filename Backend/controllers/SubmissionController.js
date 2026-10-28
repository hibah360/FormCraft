
const mongoose = require("mongoose");
const Form = require("../models/Form");
const Submission = require("../models/Submission");

const createSubmission = async (req, res) => {
  try {
    const { formId } = req.params;
    const { responses } = req.body;

    // Validate the form ID
    if (!mongoose.Types.ObjectId.isValid(formId)) {
      return res.status(400).json({
        message: "Invalid form ID",
      });
    }

    // Find the form being submitted
    const form = await Form.findById(formId);

    if (!form) {
      return res.status(404).json({
        message: "Form not found",
      });
    }

    // Validate the submitted responses
    if (
      !responses ||
      typeof responses !== "object" ||
      Array.isArray(responses)
    ) {
      return res.status(400).json({
        message: "Responses must be a valid object",
      });
    }

    // Check required fields
    for (const field of form.fields) {
      const value = responses[field._id.toString()];

      if (
        field.required &&
        (value === undefined ||
          value === null ||
          String(value).trim() === "")
      ) {
        return res.status(400).json({
          message: `${field.label} is required`,
        });
      }
    }

    // Keep only answers belonging to fields in this form
    const allowedFieldIds = new Set(
      form.fields.map((field) => field._id.toString())
    );

    const validatedResponses = {};

    for (const [fieldId, value] of Object.entries(responses)) {
      if (allowedFieldIds.has(fieldId)) {
        validatedResponses[fieldId] = value;
      }
    }

    // Save the submission
    const submission = await Submission.create({
      formId: form._id,
      responses: validatedResponses,
    });

    return res.status(201).json({
      message: "Response submitted successfully",
      submission,
    });
  } catch (error) {
    console.error("Error saving submission:", error);

    return res.status(500).json({
      message: "Failed to save response",
    });
  }
};

const getAllSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find()
      .populate("formId", "title")
      .sort({ createdAt: 1 });

    const formattedSubmissions = submissions.map((submission) => ({
      id: submission._id,
      formId: submission.formId?._id,
      formTitle: submission.formId?.title || "Deleted Form",
      responses: submission.responses,
      submittedAt: submission.createdAt,
    }));

    res.status(200).json(formattedSubmissions);
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res.status(500).json({
      message: "Failed to fetch submissions",
    });
  }
};

module.exports = { createSubmission, getAllSubmissions };
