function FieldSettings({
    field,
    onUpdateField,
    formTitle,
    formDescription,
    onUpdateForm,
}) {

    if (!field) {
        return (
            <section className="panel settings-panel">
                <h3>Field Settings</h3>

                <div className="empty-settings">
                    <div className="settings-icon">⚙</div>

                    <strong>No field selected</strong>

                    <p>
                        Select a field in your form to customize its
                        properties.
                    </p>
                </div>
            </section>
        );
    }


    function handleOptionChange(index, value) {
        const updatedOptions = [...field.options];
        updatedOptions[index] = value;

        onUpdateField(field.id, { options: updatedOptions });
    }

    function handleAddOption() {
        onUpdateField(field.id, {
            options: [...field.options, `Option ${field.options.length + 1}`],
        });
    }

    function handleDeleteOption(index) {
        const updatedOptions = field.options.filter(
            (_, optionIndex) => optionIndex !== index
        );

        onUpdateField(field.id, { options: updatedOptions });
    }

    const hasOptions =
        field.type === "dropdown" || field.type === "radio";

    return (
        <section className="panel settings-panel">
            <h3>Field Settings</h3>

            <p className="settings-description">
                Customize the selected field.
            </p>

            <div className="setting-group">
                <label htmlFor="field-label">Field Label</label>

                <input
                    id="field-label"
                    type="text"
                    value={field.label}
                    onChange={(event) =>
                        onUpdateField(field.id, {
                            label: event.target.value,
                        })
                    }
                />
            </div>

            {field.type !== "radio" && (
                <div className="setting-group">
                    <label htmlFor="field-placeholder">Placeholder</label>

                    <input
                        id="field-placeholder"
                        type="text"
                        value={field.placeholder}
                        onChange={(event) =>
                            onUpdateField(field.id, {
                                placeholder: event.target.value,
                            })
                        }
                    />
                </div>
            )}

            {hasOptions && (
                <div className="setting-group">
                    <label>
                        {field.type === "dropdown"
                            ? "Dropdown Options"
                            : "Choice Options"}
                    </label>

                    <div className="option-list">
                        {field.options.map((option, index) => (
                            <div className="option-row" key={index}>
                                <input
                                    type="text"
                                    aria-label={`Option ${index + 1}`}
                                    value={option}
                                    onChange={(event) =>
                                        handleOptionChange(index, event.target.value)
                                    }
                                />

                                <button
                                    type="button"
                                    className="remove-option-button"
                                    aria-label={`Remove option ${index + 1}`}
                                    disabled={field.options.length <= 1}
                                    onClick={() => handleDeleteOption(index)}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>

                    <button
                        type="button"
                        className="add-option-button"
                        onClick={handleAddOption}
                    >
                        + Add Option
                    </button>
                </div>
            )}

            <div className="required-setting">
                <label htmlFor="field-required">Required field</label>

                <input
                    id="field-required"
                    type="checkbox"
                    checked={field.required}
                    onChange={(event) =>
                        onUpdateField(field.id, {
                            required: event.target.checked,
                        })
                    }
                />
            </div>
        </section>
    );
}

export default FieldSettings;
