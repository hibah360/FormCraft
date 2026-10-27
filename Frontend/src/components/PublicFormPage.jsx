import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PublicForm from "./PublicForm";

function PublicFormPage({ onSubmit }) {
  const { formId } = useParams();

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchForm() {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          `http://localhost:5000/api/forms/${formId}`
        );

        const fetchedForm = {
          ...response.data.form,
          id: response.data.form._id,
          fields: response.data.form.fields.map((field) => ({
            ...field,
            id: field._id,
          })),
        };

        setForm(fetchedForm);
      } catch (error) {
        console.error("Error fetching public form:", error);
        setError(
          error.response?.data?.message ||
            "Unable to load this form."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchForm();
  }, [formId]);

  function handleSubmit(formData) {
    onSubmit(formId, formData);
  }

  if (loading) {
    return (
      <main className="public-form-page">
        <section className="public-form-card">
          <p>Loading form...</p>
        </section>
      </main>
    );
  }

  if (error || !form) {
    return (
      <main className="public-form-page">
        <section className="public-form-card">
          <h2>Form not found</h2>
          <p>{error || "This form is unavailable."}</p>
        </section>
      </main>
    );
  }

  return (
    <PublicForm
      key={formId}
      form={form}
      onSubmit={handleSubmit}
    />
  );
}

export default PublicFormPage;
