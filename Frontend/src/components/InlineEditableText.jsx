
import { useEffect, useRef, useState } from "react";

function InlineEditableText({
  value,
  onSave,
  placeholder,
  multiline = false,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef(null);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  function saveChanges() {
    const updatedValue = draft.trim();

    if (updatedValue) {
      onSave(updatedValue);
    } else {
      setDraft(value);
    }

    setIsEditing(false);
  }

  function cancelChanges() {
    setDraft(value);
    setIsEditing(false);
  }

  function handleKeyDown(event) {
    if (event.key === "Escape") {
      event.preventDefault();
      cancelChanges();
    }

    if (event.key === "Enter" && (!multiline || !event.shiftKey)) {
      event.preventDefault();
      saveChanges();
    }
  }

  if (isEditing) {
    const sharedProps = {
      ref: inputRef,
      value: draft,
      placeholder,
      onChange: (event) => setDraft(event.target.value),
      onBlur: saveChanges,
      onKeyDown: handleKeyDown,
      className: `inline-edit-input ${
        multiline ? "inline-edit-textarea" : ""
      }`,
      "aria-label": placeholder,
    };

    return multiline ? (
      <textarea {...sharedProps} rows={3} />
    ) : (
      <input {...sharedProps} type="text" />
    );
  }

  return (
    <div
      className={`inline-edit-display ${
        multiline ? "inline-edit-description" : ""
      }`}
      onClick={() => setIsEditing(true)}
      title="Click to edit"
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setIsEditing(true);
        }
      }}
    >
      {value || placeholder}
      <span className="inline-edit-hint"> ✎</span>
    </div>
  );
}

export default InlineEditableText;
