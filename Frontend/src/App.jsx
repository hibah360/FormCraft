import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "axios";
import api from "./api/api"

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import FieldPanel from "./components/FieldPanel";
import FormCanvas from "./components/FormCanvas";
import FieldSettings from "./components/FieldSettings";
import FormPreview from "./components/FormPreview";
import MyForms from "./components/MyForms";
import AppRoutes from "./routes/AppRoutes";
import PublicFormPage from "./components/PublicFormPage";
import Submissions from "./components/Submissions";
import Login from "./components/Login";
import Snackbar from "./components/Snackbar";

import "./App.css";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const isPublicForm = location.pathname.startsWith("/form/");
  const isLoginPage = location.pathname === "/login";
  const hideSidebar = isPublicForm || isLoginPage;

  const [fields, setFields] = useState([]);
  const [selectedFieldId, setSelectedFieldId] = useState(null);

  const [formTitle, setFormTitle] = useState("Add Title");
  const [formDescription, setFormDescription] = useState(
    "Add a description to explain the purpose of your form."
  );

  const [forms, setForms] = useState([]);
  const [currentFormId, setCurrentFormId] = useState(null);
  const [submissions, setSubmissions] = useState([]);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem("formcraft-authenticated") === "true"
  );

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [formToDelete, setFormToDelete] = useState(null);

  useEffect(() => {
    async function fetchForms() {
      try {
        const response = await api.get(
          "/api/forms"
        );

        const fetchedForms = response.data.forms.map((form) => ({
          ...form,
          id: form._id,
          fields: form.fields.map((field) => ({
            ...field,
            id: field._id,
          })),
        }));

        setForms(fetchedForms);
      } catch (error) {
        console.error("Error fetching forms:", error);
        alert("Failed to fetch forms from the server.");
      }
    }

    if (isAuthenticated) {
      fetchForms();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    async function fetchSubmissions() {
      try {
        const response = await api.get("/api/submissions");
        setSubmissions(response.data);
      } catch (error) {
        console.error("Error fetching submissions:", error);
        alert("Failed to fetch submissions from the server.");
      }
    }

    if (isAuthenticated && location.pathname === "/submissions") {
      fetchSubmissions();
    }
  }, [isAuthenticated, location.pathname]);

  const selectedField =
    fields.find((field) => field.id === selectedFieldId) || null;

  function handleAddField(fieldType) {
    const newField = {
      id: crypto.randomUUID(),
      type: fieldType.type,
      label: fieldType.label,
      placeholder: `Enter ${fieldType.label.toLowerCase()}`,
      required: false,
      options:
        fieldType.type === "dropdown" ||
          fieldType.type === "radio"
          ? ["Option 1", "Option 2"]
          : [],
    };

    setFields((previous) => [...previous, newField]);
    setSelectedFieldId(newField.id);
  }

  function showSnackbar(message, type = "success") {
    setSnackbar({
      open: true,
      message,
      type,
    });
  }

  function closeSnackbar() {
    setSnackbar((previous) => ({
      ...previous,
      open: false,
    }));
  }

  // function handleUpdateField(fieldId, updates) {
  //   setFields((previous) =>
  //     previous.map((field) =>
  //       field.id === fieldId ? { ...field, ...updates } : field
  //     )
  //   );
  // }

  function handleUpdateField(fieldId, updates) {
    setFields((previous) =>
      previous.map((field) =>
        field.id === fieldId
          ? { ...field, ...updates }
          : field
      )
    );
  }

  function handleCancelEdit() {
    resetCurrentForm();
    navigate("/forms");
  }

  function handleDeleteField(fieldId) {
    setFields((previous) =>
      previous.filter((field) => field.id !== fieldId)
    );

    setSelectedFieldId((current) =>
      current === fieldId ? null : current
    );
  }

  function handleReorderFields(fromIndex, toIndex) {
    setFields((previous) => {
      if (
        fromIndex < 0 ||
        toIndex < 0 ||
        fromIndex >= previous.length ||
        toIndex >= previous.length ||
        fromIndex === toIndex
      ) {
        return previous;
      }

      const updated = [...previous];
      const [moved] = updated.splice(fromIndex, 1);

      updated.splice(toIndex, 0, moved);

      return updated;
    });
  }

  function handleUpdateForm(updates) {
    if (updates.formTitle !== undefined) {
      setFormTitle(updates.formTitle);
    }

    if (updates.formDescription !== undefined) {
      setFormDescription(updates.formDescription);
    }
  }

  function resetCurrentForm() {
    setFields([]);
    setSelectedFieldId(null);
    setFormTitle("Add Title");
    setFormDescription(
      "Add a description to explain the purpose of your form."
    );
    setCurrentFormId(null);
  }

  function handleCreateForm() {
    resetCurrentForm();
    navigate("/builder");
  }

  // function handleSaveForm() {
  //   if (!formTitle.trim()) {
  //     alert("Please enter a form title before saving.");
  //     return;
  //   }

  //   if (fields.length === 0) {
  //     alert("Please add at least one field before saving.");
  //     return;
  //   }

  //   const savedForm = {
  //     id: currentFormId || crypto.randomUUID(),
  //     title: formTitle.trim(),
  //     description: formDescription.trim(),
  //     fields: fields.map((field) => ({
  //       ...field,
  //       options: [...field.options],
  //     })),
  //     status: "Draft",
  //     updatedAt: new Date().toISOString(),
  //   };

  //   setForms((previous) => {
  //     const exists = previous.some(
  //       (form) => form.id === savedForm.id
  //     );

  //     return exists
  //       ? previous.map((form) =>
  //         form.id === savedForm.id ? savedForm : form
  //       )
  //       : [...previous, savedForm];
  //   });

  //   setCurrentFormId(savedForm.id);

  //   // Clear the builder for the next new form
  //   setFields([]);
  //   setSelectedFieldId(null);
  //   setFormTitle("Add Title");
  //   setFormDescription(
  //     "Add a description to explain the purpose of your form."
  //   );
  //   setCurrentFormId(null);

  //   navigate("/forms");
  // }


  async function handleSaveForm() {
    // Validate form title
    if (!formTitle.trim()) {
      showSnackbar("Please enter a form title before saving.", "error");
      return;
    }

    // Validate form fields
    if (fields.length === 0) {
      alert("Please add at least one field before saving.");
      return;
    }

    // Prepare form data
    const savedForm = {
      title: formTitle.trim(),
      description: formDescription.trim(),
      fields: fields.map((field) => ({
        ...field,
        options: [...(field.options || [])],
      })),
      status: "Draft",
    };

    try {
      let response;

      if (currentFormId) {
        // Update an existing form
        response = await api.put(
          `/api/forms/${currentFormId}`,
          savedForm
        );
      } else {
        // Create a new form
        response = await api.post(
          "/api/forms",
          savedForm
        );
      }

      // Get the saved form from MongoDB
      const formFromDB = {
        ...response.data.form,
        id: response.data.form._id,
        fields: response.data.form.fields.map((field) => ({
          ...field,
          id: field._id || field.id,
          options: [...(field.options || [])],
        })),
      };

      // Update the forms list in React state
      // setForms((previous) => {
      //   const exists = previous.some(
      //     (form) => form.id === formFromDB.id
      //   );

      //   return exists
      //     ? previous.map((form) =>
      //       form.id === formFromDB.id ? formFromDB : form
      //     )
      //     : [...previous, formFromDB];
      // });

      setForms((previous) => {
        const exists = previous.some(
          (form) => form.id === formFromDB.id
        );

        const updatedForms = exists
          ? previous.map((form) =>
            form.id === formFromDB.id ? formFromDB : form
          )
          : [formFromDB, ...previous];

        return updatedForms;
      });

      showSnackbar("Form saved successfully!", "success");

      // Reset the builder after successful saving
      resetCurrentForm();

      // Navigate to My Forms
      navigate("/forms");
    } catch (error) {
      console.error("Error saving form:", error);

      showSnackbar(
        error.response?.data?.message ||
        "Failed to save form. Please try again.",
        "error"
      );
    }
  }


  function handleEditForm(formId) {
    const form = forms.find((item) => item.id === formId);

    if (!form) return;

    console.log("Editing form:", form);
    console.log("Form fields:", form.fields);
    console.log(
      "Field IDs:",
      form.fields.map((field) => field.id)
    );

    setCurrentFormId(form.id);
    setFormTitle(form.title);
    setFormDescription(form.description);

    setFields(
      form.fields.map((field) => ({
        ...field,
        options: [...(field.options || [])],
      }))
    );

    setSelectedFieldId(null);
    navigate("/builder");
  }

  // function handleDeleteForm(formId) {
  //   const confirmed = window.confirm(
  //     "Are you sure you want to delete this form?"
  //   );

  //   if (!confirmed) return;

  //   setForms((previous) =>
  //     previous.filter((form) => form.id !== formId)
  //   );

  //   if (currentFormId === formId) {
  //     resetCurrentForm();
  //   }
  // }

  async function handleDeleteForm(formId) {
    try {
      await api.delete(`/api/forms/${formId}`);

      setForms((previous) =>
        previous.filter((form) => form.id !== formId)
      );

      if (currentFormId === formId) {
        resetCurrentForm();
      }

      showSnackbar("Form deleted successfully!", "success");
    } catch (error) {
      console.error("Error deleting form:", error);

      showSnackbar(
        error.response?.data?.message ||
        "Failed to delete form. Please try again.",
        "error"
      );
    }
  }


  function handleDeleteClick(formId) {
    setFormToDelete(formId);
    setShowDeleteDialog(true);
  }


  function handlePreviewSavedForm(formId) {
    const form = forms.find((item) => item.id === formId);

    if (!form) return;

    setCurrentFormId(form.id);
    setFormTitle(form.title);
    setFormDescription(form.description);

    setFields(
      form.fields.map((field) => ({
        ...field,
        options: [...(field.options || [])],
      }))
    );

    setSelectedFieldId(null);
    navigate("/preview");
  }

  function handlePreviewSubmit(formData) {
    console.log("Preview form submission:", formData);
    alert("Form submitted successfully in preview mode!");
  }

  function handlePublicFormSubmit(formId, formData) {
    console.log("Form ID:", formId);
    console.log("Applicant Response:", formData);
  }

  function handleLogin({ email, password }) {
    if (!email.trim() || !password) {
      showSnackbar("Please enter your email and password.", "error");
      return;
    }

    sessionStorage.setItem("formcraft-authenticated", "true");
    setIsAuthenticated(true);
    navigate("/forms", { replace: true });
  }

  function handleLogout() {
    sessionStorage.removeItem("formcraft-authenticated");
    setIsAuthenticated(false);
    navigate("/login", { replace: true });
  }

  const activePage =
    location.pathname === "/forms"
      ? "forms"
      : location.pathname.startsWith("/submissions")
        ? "submissions"
        : "builder";

  return (
    <div className="app">

      {isAuthenticated && !hideSidebar && (
        <Sidebar
          activePage={activePage}
          onNavigate={(page) => {
            const routes = {
              builder: "/builder",
              forms: "/forms",
              submissions: "/submissions",
            };

            navigate(routes[page] || "/builder");
          }}
          onLogout={handleLogout}
        />
      )}

      <main
        className={
          hideSidebar
            ? "public-main-content"
            : "main-content"
        }
      >
        <AppRoutes
          isAuthenticated={isAuthenticated}
          submissions={submissions}

          loginPage={
            <Login onLogin={handleLogin} />
          }

          builderPage={
            <>
              <Header
                onPreview={() => navigate("/preview")}
                onSave={handleSaveForm}
                onCancel={handleCancelEdit}
                isEditing={Boolean(currentFormId)}
                hasFields={fields.length > 0}
              />

              <div className="builder-layout">
                <FieldPanel onAddField={handleAddField} />

                <FormCanvas
                  fields={fields}
                  selectedFieldId={selectedFieldId}
                  onSelectField={setSelectedFieldId}
                  onDeleteField={handleDeleteField}
                  onReorderFields={handleReorderFields}
                  formTitle={formTitle}
                  formDescription={formDescription}
                  onUpdateForm={handleUpdateForm}
                />

                <FieldSettings
                  field={selectedField}
                  onUpdateField={handleUpdateField}
                />
              </div>
            </>
          }
          formsPage={
            <MyForms
              forms={forms}
              onCreateForm={handleCreateForm}
              onEditForm={handleEditForm}
              onPreviewForm={handlePreviewSavedForm}
              onDeleteForm={handleDeleteClick}
            />
          }
          submissionsPage={
            <Submissions
              submissions={submissions}
              onViewSubmission={(formId) => {
                navigate(`/submissions/${formId}`);
              }}
            />
          }
          previewPage={
            <FormPreview
              fields={fields}
              formTitle={formTitle}
              formDescription={formDescription}
              onBack={() => navigate("/builder")}
              onSubmit={handlePreviewSubmit}
            />
          }
          publicFormPage={
            <PublicFormPage
              forms={forms}
              onSubmit={handlePublicFormSubmit}
            />
          }

        />

      </main>

      {showDeleteDialog && (
        <div
          className="confirm-dialog-overlay"
          onClick={() => {
            setShowDeleteDialog(false);
            setFormToDelete(null);
          }}
        >
          <div
            className="confirm-dialog"
            role="alertdialog"
            aria-modal="true"
            onClick={(event) => event.stopPropagation()}
          >
            <p>Are you sure you want to delete this form?</p>

            <div className="confirm-dialog-actions">
              <button
                type="button"
                className="confirm-no-button"
                onClick={() => {
                  setShowDeleteDialog(false);
                  setFormToDelete(null);
                }}
              >
                No
              </button>

              <button
                type="button"
                className="confirm-yes-button"
                onClick={async () => {
                  const id = formToDelete;

                  setShowDeleteDialog(false);
                  setFormToDelete(null);

                  if (id) {
                    await handleDeleteForm(id);
                  }
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {snackbar.open && (
        <Snackbar
          message={snackbar.message}
          type={snackbar.type}
          onClose={closeSnackbar}
        />
      )}
    </div>
  );
}

export default App;
