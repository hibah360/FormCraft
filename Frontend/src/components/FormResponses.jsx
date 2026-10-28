import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";

function FormResponses({ submissions = [] }) {
    const { formId } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    const formSubmissions = submissions.filter(
        (submission) => submission.formId === formId
    );

    const totalPages = Math.ceil(formSubmissions.length / pageSize);

    const paginatedSubmissions = useMemo(() => {
        const startIndex = (currentPage - 1) * pageSize;

        return formSubmissions.slice(startIndex, startIndex + pageSize);
    }, [formSubmissions, currentPage, pageSize]);


    useEffect(() => {
        async function fetchForm() {
            try {
                setLoading(true);
                setError("");

                const response = await api.get(`/api/forms/${formId}`);
                setForm(response.data.form || response.data);
            } catch (err) {
                console.error("Error fetching form:", err);
                setError("Unable to load the form details.");
            } finally {
                setLoading(false);
            }
        }

        fetchForm();
    }, [formId]);

    useEffect(() => {
        setCurrentPage(1);
    }, [formId, pageSize]);

    if (loading) {
        return <section className="form-responses-page">Loading responses...</section>;
    }

    if (error) {
        return (
            <section className="form-responses-page">
                <button
                    type="button"
                    className="back-to-submissions-button"
                    onClick={() => navigate("/submissions")}
                >
                    ← Back to Submissions
                </button>
                <p className="responses-error">{error}</p>
            </section>
        );
    }

    const fields = form?.fields || [];

    return (
        <section className="form-responses-page">
            <button
                type="button"
                className="back-to-submissions-button"
                onClick={() => navigate("/submissions")}
            >
                <span aria-hidden="true">←</span>
                Back to Submissions
            </button>

            <header className="form-responses-header">
                <p className="breadcrumb">Workspace / Submissions</p>
                <h1>{form?.title || formSubmissions[0]?.formTitle || "Form Responses"}</h1>
                <p className="page-description">
                    View individual responses submitted for this form.
                </p>
            </header>

            <div className="responses-summary-card">
                <span>Total Responses</span>
                <strong>{formSubmissions.length}</strong>
            </div>

            {formSubmissions.length === 0 ? (
                <div className="responses-empty-state">
                    <h3>No responses yet</h3>
                    <p>Responses submitted through this form will appear here.</p>
                </div>
            ) : (

                <div className="response-card">

                    <div className="response-table-wrapper">
                        <table className="response-table">
                            <thead>
                                <tr>
                                    <th>No.</th>

                                    {fields.map((field) => (
                                        <th key={field._id || field.id}>
                                            {field.label}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                {paginatedSubmissions.map((submission, index) => (
                                    <tr key={submission.id}>
                                        <td>{(currentPage - 1) * pageSize + index + 1}</td>

                                        {fields.map((field) => {
                                            const fieldId = field._id || field.id;
                                            const answer = submission.responses?.[fieldId];

                                            return (
                                                <td key={fieldId}>
                                                    {Array.isArray(answer)
                                                        ? answer.join(", ")
                                                        : String(answer ?? "—")}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>


                    <div className="responses-pagination">
                        <div className="pagination-page-size">
                            <label htmlFor="response-page-size">Rows per page:</label>

                            <select
                                id="response-page-size"
                                value={pageSize}
                                onChange={(event) => setPageSize(Number(event.target.value))}
                            >
                                {[5, 10, 25, 50].map((size) => (
                                    <option key={size} value={size}>
                                        {size}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="pagination-navigation">
                            <span>
                                {formSubmissions.length === 0
                                    ? "0 records"
                                    : `${(currentPage - 1) * pageSize + 1}–${Math.min(
                                        currentPage * pageSize,
                                        formSubmissions.length
                                    )} of ${formSubmissions.length}`}
                            </span>

                            <button
                                type="button"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage((page) => page - 1)}
                            >
                                Previous
                            </button>

                            <button
                                type="button"
                                disabled={currentPage >= totalPages}
                                onClick={() => setCurrentPage((page) => page + 1)}
                            >
                                Next
                            </button>
                        </div>
                    </div>

                </div>
            )}
        </section>
    );
}

export default FormResponses;
