
const Form = require("../models/Form");

const createForm = async (req, res) => {
    try {
        const { title, description, fields, status } = req.body;

        // Validate required data
        if (!title || !title.trim()) {
            return res.status(400).json({
                message: "Form title is required",
            });
        }

        if (!Array.isArray(fields) || fields.length === 0) {
            return res.status(400).json({
                message: "At least one field is required",
            });
        }

        // Create a new form document
        const newForm = new Form({
            title,
            description,
            fields,
            status: status || "Draft",
        });

        // Save the form in MongoDB
        const savedForm = await newForm.save();

        return res.status(201).json({
            message: "Form saved successfully",
            form: savedForm,
        });
    } catch (error) {
        console.error("Error saving form:", error);

        return res.status(500).json({
            message: "Failed to save form",
        });
    }
};


const updateForm = async (req, res) => {
    try {
        const { title, description, fields, status } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({
                message: "Form title is required",
            });
        }

        if (!Array.isArray(fields) || fields.length === 0) {
            return res.status(400).json({
                message: "At least one field is required",
            });
        }

        const updatedForm = await Form.findByIdAndUpdate(
            req.params.id,
            {
                title: title.trim(),
                description,
                fields,
                status,
            },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedForm) {
            return res.status(404).json({
                message: "Form not found",
            });
        }

        return res.status(200).json({
            message: "Form updated successfully",
            form: updatedForm,
        });
    } catch (error) {
        console.error("Error updating form:", error);

        if (error.name === "CastError") {
            return res.status(400).json({
                message: "Invalid form ID",
            });
        }

        return res.status(500).json({
            message: "Failed to update form",
        });
    }
};


const getAllForms = async (req, res) => {
    try {
        const forms = await Form.find().sort({ updatedAt: -1 });

        return res.status(200).json({
            message: "Forms fetched successfully",
            forms,
        });
    } catch (error) {
        console.error("Error fetching forms:", error);

        return res.status(500).json({
            message: "Failed to fetch forms",
        });
    }
};


const deleteForm = async (req, res) => {
    try {
        const deletedForm = await Form.findByIdAndDelete(
            req.params.id
        );

        if (!deletedForm) {
            return res.status(404).json({
                message: "Form not found",
            });
        }

        return res.status(200).json({
            message: "Form deleted successfully",
            form: deletedForm,
        });
    } catch (error) {
        console.error("Error deleting form:", error);

        if (error.name === "CastError") {
            return res.status(400).json({
                message: "Invalid form ID",
            });
        }

        return res.status(500).json({
            message: "Failed to delete form",
        });
    }
};


const getFormById = async (req, res) => {
    try {
        const form = await Form.findById(req.params.id);

        if (!form) {
            return res.status(404).json({
                message: "Form not found",
            });
        }

        return res.status(200).json({
            message: "Form fetched successfully",
            form,
        });
    } catch (error) {
        console.error("Error fetching form:", error);

        if (error.name === "CastError") {
            return res.status(400).json({
                message: "Invalid form ID",
            });
        }

        return res.status(500).json({
            message: "Failed to fetch form",
        });
    }
};





module.exports = { createForm, updateForm, getAllForms, deleteForm, getFormById };
