
const fieldTypes = [
  { type: "text", label: "Short Text", icon: "T" },
  { type: "email", label: "Email", icon: "@" },
  { type: "number", label: "Number", icon: "#" },
  { type: "dropdown", label: "Dropdown", icon: "☰" },
  { type: "radio", label: "Multiple Choice", icon: "◉" },
  { type: "textarea", label: "Long Text", icon: "¶" },
];

function FieldPanel({ onAddField }) {
  return (
    <section className="panel field-panel">
      <h3>Add Fields</h3>

      <p className="panel-description">
        Choose a field to add to your form.
      </p>

      <div className="field-list">
        {fieldTypes.map((field) => (
          <button
            type="button"
            className="field-option"
            key={field.type}
            onClick={() => onAddField(field)}
          >
            <span className="field-icon">{field.icon}</span>
            <span>{field.label}</span>
            <span className="plus">+</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default FieldPanel;
