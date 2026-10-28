
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import FormResponses from "../components/FormResponses";

function AppRoutes({
  isAuthenticated,
  builderPage,
  formsPage,
  submissionsPage,
  submissions,
  previewPage,
  publicFormPage,
  loginPage,
}) {
  function protect(page) {
    return (
      <ProtectedRoute isAuthenticated={isAuthenticated}>
        {page}
      </ProtectedRoute>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Navigate
            to={isAuthenticated ? "/forms" : "/login"}
            replace
          />
        }
      />

      <Route
        path="/login"
        element={
          isAuthenticated
            ? <Navigate to="/forms" replace />
            : loginPage
        }
      />

      <Route path="/builder" element={protect(builderPage)} />

      <Route path="/forms" element={protect(formsPage)} />

      <Route
        path="/submissions"
        element={protect(submissionsPage)}
      />

      <Route
        path="/submissions/:formId"
        element={protect(<FormResponses submissions={submissions} />)}
      />

      <Route path="/preview" element={protect(previewPage)} />

      {/* Applicants can access public forms without admin login */}
      <Route path="/form/:formId" element={publicFormPage} />

      <Route
        path="*"
        element={
          <Navigate
            to={isAuthenticated ? "/forms" : "/login"}
            replace
          />
        }
      />
    </Routes>
  );
}

export default AppRoutes;
