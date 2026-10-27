
import { useMemo, useState } from "react";

function Submissions({ submissions = [], onViewSubmission }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedForm, setSelectedForm] = useState("all");

  const formOptions = useMemo(() => {
    return [
      ...new Map(
        submissions.map((submission) => [
          submission.formId,
          {
            id: submission.formId,
            title: submission.formTitle,
          },
        ])
      ).values(),
    ];
  }, [submissions]);

  const filteredSubmissions = submissions.filter((submission) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      submission.applicantName.toLowerCase().includes(search) ||
      submission.email.toLowerCase().includes(search) ||
      submission.formTitle.toLowerCase().includes(search);

    const matchesForm =
      selectedForm === "all" ||
      submission.formId === selectedForm;

    return matchesSearch && matchesForm;
  });

  return (
    <section className="submissions-page">
      <header className="submissions-header">
        <div>
          <p className="breadcrumb">Workspace / Submissions</p>
          <h1>Submissions</h1>
          <p className="page-description">
            Review and manage responses submitted through your forms.
          </p>
        </div>
      </header>

      <div className="submissions-summary">
        <div className="panel summary-card">
          <span>Total Submissions</span>
          <strong>{submissions.length}</strong>
        </div>
      </div>

      <section className="panel submissions-panel">
        <div className="submissions-toolbar">
          <input
            type="search"
            placeholder="Search applicant, email, or form..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            aria-label="Search submissions"
          />

          <select
            value={selectedForm}
            onChange={(event) => setSelectedForm(event.target.value)}
            aria-label="Filter by form"
          >
            <option value="all">All Forms</option>

            {formOptions.map((form) => (
              <option key={form.id} value={form.id}>
                {form.title}
              </option>
            ))}
          </select>
        </div>

        {filteredSubmissions.length === 0 ? (
          <div className="empty-submissions">
            <div className="empty-canvas-icon">▤</div>
            <h3>
              {submissions.length === 0
                ? "No submissions yet"
                : "No matching submissions"}
            </h3>
            <p>
              {submissions.length === 0
                ? "Applicant responses will appear here once someone submits a form."
                : "Try changing your search or form filter."}
            </p>
          </div>
        ) : (
          <div className="forms-table-wrapper">
            <table className="forms-table">
              <thead>
                <tr>
                  <th>Applicant</th>
                  <th>Form</th>
                  <th>Submitted On</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredSubmissions.map((submission) => (
                  <tr key={submission.id}>
                    <td>
                      <strong>{submission.applicantName}</strong>
                      <p className="table-description">
                        {submission.email}
                      </p>
                    </td>

                    <td>{submission.formTitle}</td>

                    <td>
                      {new Date(
                        submission.submittedAt
                      ).toLocaleString()}
                    </td>

                    <td>
                      <button
                        type="button"
                        className="submission-view-button"
                        onClick={() =>
                          onViewSubmission?.(submission.id)
                        }
                      >
                        View Response
                      </button>
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

export default Submissions;
