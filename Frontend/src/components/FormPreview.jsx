
function FormPreview({
    fields,
    formTitle,
    formDescription,
    backLabel,
    onBack,
}) {
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
                    {backLabel}
                </button>
            </div>

            <form
                className="preview-form panel"
                noValidate
                onSubmit={(event) => event.preventDefault()}
            >
                <div className="form-heading">
                    <span className="form-badge">FORM PREVIEW</span>
                    <h2>{formTitle}</h2>
                    <p>{formDescription}</p>
                </div>

                <fieldset className="preview-controls" disabled>
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
                                    />
                                ) : field.type === "dropdown" ? (
                                    <select id={field.id} required={field.required}>
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
                                    />
                                )}
                            </div>
                        ))
                    )}

                    {fields.length > 0 && (
                        <button type="submit" className="submit-button" disabled>
                            Submit Form
                        </button>
                    )}
                </fieldset>
            </form>
        </section>
    );
}

export default FormPreview;
