
import { useState } from "react";

function FormPreview({
    fields,
    formTitle,
    formDescription,
    onBack,
    onSubmit,
}) {
    const [formData, setFormData] = useState({});
    const [submitted, setSubmitted] = useState(false);

    function handleChange(fieldId, value) {
        setFormData((previousData) => ({
            ...previousData,
            [fieldId]: value,
        }));
    }



    function handleSubmit(event) {
        event.preventDefault();

        const form = event.currentTarget;

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        setSubmitted(true);
        onSubmit(formData);
    }


    return (
        <section className="preview-page">
            <div className="preview-topbar">
                <div>
                    <p className="breadcrumb">Workspace / Preview</p>
                    <h2>Form Preview</h2>
                </div>

                <button
                    type="button"
                    className="preview-button"
                    onClick={onBack}
                >
                    Back to Builder
                </button>
            </div>

            {submitted && (
                <div className="preview-notice">
                    Your form has been submitted successfully in preview mode.
                </div>
            )}

            <form className="preview-form panel" onSubmit={handleSubmit}>
                <div className="form-heading">
                    <span className="form-badge">FORM PREVIEW</span>
                    <h2>{formTitle}</h2>
                    <p>{formDescription}</p>
                </div>

                {fields.length === 0 ? (
                    <div className="empty-canvas">
                        <h3>No fields added yet</h3>
                        <p>Return to the builder and add fields to your form.</p>
                    </div>
                ) : (
                    fields.map((field) => (
                        <div className="form-field" key={field.id}>
                            <label htmlFor={field.id}>
                                {field.label}
                                {field.required && <span> *</span>}
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

                                    {field.options.map((option, index) => (
                                        <option key={index} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            ) : field.type === "radio" ? (
                                <div className="preview-radio-options">
                                    {field.options.map((option, index) => (
                                        <label key={index} className="radio-option">
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
                    ))
                )}

                {fields.length > 0 && (
                    <button type="submit" className="submit-button">
                        Submit Form
                    </button>
                )}
            </form>
        </section>
    );
}

export default FormPreview;
