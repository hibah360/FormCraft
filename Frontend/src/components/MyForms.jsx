import { useState } from "react";


function MyForms({ forms, onCreateForm, onEditForm, onPreviewForm, onDeleteForm }) {

    const [copiedFormId, setCopiedFormId] = useState(null);

    async function handleCopyLink(formId) {
        const formUrl = `${window.location.origin}/form/${formId}`;

        try {
            await navigator.clipboard.writeText(formUrl);
            setCopiedFormId(formId);

            setTimeout(() => {
                setCopiedFormId(null);
            }, 2000);
        } catch (error) {
            console.error("Failed to copy form link:", error);
            alert("Unable to copy the link. Please copy it manually.");
        }
    }


    return (
        <section className="my-forms-page">
            <header className="my-forms-header">
                <div>
                    <p className="breadcrumb">Workspace / My Forms</p>
                    <h1>My Forms</h1>
                    <p className="page-description">
                        Create and manage your forms in one place.
                    </p>
                </div>

                <button
                    type="button"
                    className="create-form-button"
                    onClick={onCreateForm}
                >
                    + Create New Form
                </button>
            </header>

            <div className="forms-summary">
                <div className="panel summary-card">
                    <span>Total Forms</span>
                    <strong>{forms.length}</strong>
                </div>
            </div>

            <section className="panel forms-table-panel">
                <h3>All Forms</h3>

                {forms.length === 0 ? (
                    <div className="empty-forms">
                        <div className="empty-canvas-icon">＋</div>
                        <h3>No forms created yet</h3>
                        <p>
                            Create your first form to start collecting responses.
                        </p>
                        <button
                            type="button"
                            className="create-form-button"
                            onClick={onCreateForm}
                        >
                            Create Your First Form
                        </button>
                    </div>
                ) : (
                    <div className="forms-table-wrapper">
                        <table className="forms-table">
                            <thead>
                                <tr>
                                    <th>Form Name</th>
                                    <th>Fields</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {forms.map((form) => (
                                    <tr key={form.id}>
                                        <td>
                                            <strong>{form.title || "Add Title"}</strong>
                                            <p className="table-description">
                                                {form.description || "No description"}
                                            </p>
                                        </td>

                                        <td>{form.fields.length}</td>

                                        <td>
                                            <span className={`status-badge ${form.status}`}>
                                                {form.status || "Draft"}
                                            </span>
                                        </td>

                                        <td>
                                            <div className="table-actions">
                                                <button
                                                    type="button"
                                                    onClick={() => onEditForm(form.id)}
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => onPreviewForm(form.id)}
                                                >
                                                    Preview
                                                </button>

                                                <button
                                                    type="button"
                                                    className="delete-action"
                                                    onClick={() => onDeleteForm(form.id)}
                                                >
                                                    Delete
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleCopyLink(form.id)}
                                                >
                                                    {copiedFormId === form.id ? "Copied!" : "Share Form"}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </section>
    );
}

export default MyForms;
