
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes({
  isAuthenticated,
  builderPage,
  formsPage,
  submissionsPage,
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

      <Route
        path="/builder"
        element={protect(builderPage)}
      />

      <Route
        path="/forms"
        element={protect(formsPage)}
      />

      <Route
        path="/submissions"
        element={protect(submissionsPage)}
      />

      <Route
        path="/preview"
        element={protect(previewPage)}
      />

      {/* Applicants can access public forms without admin login */}
      <Route
        path="/form/:formId"
        element={publicFormPage}
      />

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
