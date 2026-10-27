
function Header({ onPreview, onSave, isEditing, hasFields }) {
  return (
    <header className="topbar">
      <div>
        <p className="breadcrumb">Workspace / Form Builder</p>
        <h1>{isEditing ? "Edit Form" : "Create a Form"}</h1>
      </div>

      <div className="header-actions">
        <button
          type="button"
          className="preview-button"
          onClick={onPreview}
          disabled={!hasFields}
        >
          Preview Form
        </button>

        <button
          type="button"
          className="save-form-button"
          onClick={onSave}
          disabled={!hasFields}
        >
          Save Form
        </button>
      </div>
    </header>
  );
}

export default Header;
