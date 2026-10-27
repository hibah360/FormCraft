
import { useSortable } from "@dnd-kit/react/sortable";

function SortableField({
  field,
  index,
  selected,
  onSelect,
  onDelete,
}) {
  const { ref, isDragging } = useSortable({
    id: field.id,
    index,
  });

  return (
    <div
      ref={ref}
      className={`form-field-card ${selected ? "selected" : ""
        } ${isDragging ? "dragging" : ""}`}
      onClick={() => onSelect(field.id)}
    >
      <div className="field-card-toolbar">
        <span className="drag-handle" title="Drag to reorder">
          ⠿
        </span>

        <span className="field-type-label">
          {field.type.toUpperCase()}
        </span>

        <button
          type="button"
          className="delete-field-button"
          title="Delete field"
          aria-label={`Delete ${field.label}`}
          onClick={(event) => {
            event.stopPropagation();
            onDelete(field.id);
          }}
        >
          ×
        </button>
      </div>


      <div className="form-field">
        <label>
          {field.label}
          {field.required && <span> *</span>}
        </label>

        {field.type === "dropdown" ? (
          <select disabled defaultValue="">
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
          <div className="choice-placeholder">
            {field.options.map((option, index) => (
              <label key={index}>
                <input type="radio" disabled />
                {option}
              </label>
            ))}
          </div>
        ) : field.type === "textarea" ? (
          <textarea placeholder={field.placeholder} disabled />
        ) : (
          <input
            type={field.type}
            placeholder={field.placeholder}
            disabled
          />
        )}
      </div>
    </div>
  );
}

export default SortableField;
