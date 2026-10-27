
import { useState } from "react";

function PublicForm({
    form,
    onSubmit,
}) {
    const [formData, setFormData] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    function handleChange(fieldId, value) {
        setFormData((previous) => ({
            ...previous,
            [fieldId]: value,
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (!event.currentTarget.checkValidity()) {
            event.currentTarget.reportValidity();
            return;
        }

        onSubmit(formData);
        setIsSubmitted(true);
    }

    if (!form) {
        return (
            <main className="public-form-page">
                <section className="public-form-card">
                    <h2>Form not found</h2>
                    <p>This form may have been removed or is unavailable.</p>
                </section>
            </main>
        );
    }

    if (isSubmitted) {
        return (
            <main className="public-form-page">
                <section className="public-form-card submission-success">
                    <div className="success-icon">✓</div>
                    <h2>Response Submitted!</h2>
                    <p>
                        Thank you for completing {form.title}.
                        Your response has been submitted successfully.
                    </p>
                </section>
            </main>
        );
    }

    return (
        <main className="public-form-page">
            <form
                className="public-form-card"
                onSubmit={handleSubmit}
            >
                <header className="public-form-heading">
                    <span className="form-badge">FORM</span>
                    <h1>{form.title}</h1>
                    <p>{form.description}</p>
                </header>

                {form.fields.map((field) => (
                    <div className="public-form-field" key={field.id}>
                        <label htmlFor={field.id}>
                            {field.label}
                            {field.required && (
                                <span className="required-mark"> *</span>
                            )}
                        </label>

                        {field.type === "textarea" ? (
                            <textarea
                                id={field.id}
                                placeholder={field.placeholder}
                                required={field.required}
                                value={formData[field.id] || ""}
                                onChange={(event) =>
                                    handleChange(field.id, event.target.value)
                                }
                            />
                        ) : field.type === "dropdown" ? (
                            <select
                                id={field.id}
                                required={field.required}
                                value={formData[field.id] || ""}
                                onChange={(event) =>
                                    handleChange(field.id, event.target.value)
                                }
                            >
                                <option value="">
                                    {field.placeholder || "Select an option"}
                                </option>

                                {(field.options || []).map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        ) : field.type === "radio" ? (
                            <div className="public-radio-options">
                                {(field.options || []).map((option, index) => (
                                    <label
                                        className="public-radio-option"
                                        key={index}
                                    >
                                        <input
                                            type="radio"
                                            name={field.id}
                                            value={option}
                                            required={field.required && index === 0}
                                            checked={formData[field.id] === option}
                                            onChange={() =>
                                                handleChange(field.id, option)
                                            }
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        ) : (
                            <input
                                id={field.id}
                                type={field.type}
                                placeholder={field.placeholder}
                                required={field.required}
                                value={formData[field.id] || ""}
                                onChange={(event) =>
                                    handleChange(field.id, event.target.value)
                                }
                            />
                        )}
                    </div>
                ))}

                <button
                    type="submit"
                    className="public-submit-button"
                >
                    Submit Response
                </button>
            </form>
        </main>
    );
}

export default PublicForm;
